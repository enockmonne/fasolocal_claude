# CinetPay Integration Spec

Owner: payment integration for FasoLocal — Orange Money + Moov Money + Coris Money.
Reference docs: https://docs.cinetpay.com/api/1.0-en/

## Why CinetPay over Stripe

Stripe does not support Burkina Faso mobile money. CinetPay aggregates the three
operators that matter in BF (Orange Money, Moov Money, Coris Money) behind one
API, settles in XOF (FCFA), and has documented webhooks. Same model as Paystack
for Nigeria or Flutterwave for West Africa more broadly.

## Accounts and credentials needed

| Item | Where to get it | Goes into env var |
| --- | --- | --- |
| Sandbox API key | https://app-sandbox.cinetpay.com → Profile → API keys | `CINETPAY_API_KEY` (staging) |
| Sandbox site ID | Same place, per-website | `CINETPAY_SITE_ID` (staging) |
| Sandbox secret key | Same place | `CINETPAY_SECRET_KEY` (staging) |
| Live API key / site ID / secret | https://app.cinetpay.com — needs business verification first | same vars, production scope in Vercel |

Sandbox uses a separate base URL and accepts a fixed test phone number
(`+22507000000` is in CinetPay's docs); always test on sandbox first.

## Currency and amount rules

- Settlement currency: **XOF** (FCFA)
- Amounts are sent as **integers** (no decimals — XOF has no subunit)
- Minimum amount: **100 XOF** (sandbox accepts lower for testing; live rejects below 100)
- Maximum per transaction: **1,500,000 XOF** for mobile money

## Endpoints we use

### 1. Initiate payment
```
POST https://api-checkout.cinetpay.com/v2/payment
Content-Type: application/json

{
  "apikey": "<CINETPAY_API_KEY>",
  "site_id": "<CINETPAY_SITE_ID>",
  "transaction_id": "<our Order.orderNumber, must be unique>",
  "amount": 12500,
  "currency": "XOF",
  "description": "Commande FasoLocal <orderNumber>",
  "notify_url": "https://fasolocal.vercel.app/api/payments/webhook",
  "return_url": "https://fasolocal.vercel.app/checkout/complete?order=<orderNumber>",
  "channels": "MOBILE_MONEY",
  "customer_name": "<first name>",
  "customer_surname": "<last name>",
  "customer_email": "<email>",
  "customer_phone_number": "+226XXXXXXXX",
  "customer_address": "<street>",
  "customer_city": "<city>",
  "customer_country": "BF",
  "customer_state": "<region or BF>",
  "customer_zip_code": "00000"
}
```

Response on success:
```json
{
  "code": "201",
  "message": "CREATED",
  "data": {
    "payment_token": "...",
    "payment_url": "https://checkout.cinetpay.com/payment/..."
  }
}
```

We redirect the user to `data.payment_url`. The user picks operator, enters phone,
confirms with USSD/PIN.

### 2. Webhook (we receive)
CinetPay POSTs `application/x-www-form-urlencoded` to our `notify_url` with:
```
cpm_site_id=...
cpm_trans_id=<our orderNumber>
cpm_amount=12500
cpm_currency=XOF
cpm_payid=<their internal id>
cpm_payment_date=YYYY-MM-DD HH:mm:ss
cpm_payment_time=...
cpm_result=00         # 00 = success; anything else = failure
cpm_trans_status=ACCEPTED   # or REFUSED, CANCELED
cpm_error_message=...
signature=<HMAC>
```

### 3. Verify transaction (server → CinetPay)
After webhook (or on return_url landing if webhook is slow), we **must** verify:
```
POST https://api-checkout.cinetpay.com/v2/payment/check
{
  "apikey": "...",
  "site_id": "...",
  "transaction_id": "<our orderNumber>"
}
```
Treat this response — not the raw webhook body — as the source of truth.

## Signature verification

CinetPay signs the webhook body with HMAC-SHA256 using `CINETPAY_SECRET_KEY`.
The signed string is a concatenation of specific fields in documented order
(see CinetPay's "Notification" docs). **Implementation rule:** always verify, then
*also* re-fetch via the check endpoint above. Don't trust a webhook with no
signature or one we couldn't verify — log and drop.

## Idempotency

The webhook can fire more than once for the same `cpm_trans_id` (retries on
timeout, manual replays from CinetPay support). Our handler must be idempotent:

```
upsert by Order.orderNumber:
  if Order.paymentStatus == COMPLETED  → 200 OK, no-op
  if Order.paymentStatus == FAILED && incoming success → flip to COMPLETED
  else → update according to verified result
always → respond 200 OK quickly (CinetPay retries on non-2xx)
```

## State machine

| Current paymentStatus | Webhook result | New paymentStatus | New orderStatus |
| --- | --- | --- | --- |
| PENDING | success (verified) | COMPLETED | CONFIRMED |
| PENDING | failure | FAILED | PENDING (user can retry) |
| PENDING | cancel | FAILED | CANCELLED |
| COMPLETED | any | COMPLETED (no-op) | unchanged |
| FAILED | success (rare, retried by user) | COMPLETED | CONFIRMED |

## Error catalog (what to show users)

| CinetPay code | French message |
| --- | --- |
| `00` | Paiement confirmé ✓ |
| `627` | Solde insuffisant — réessayez avec un autre numéro |
| `622` | Numéro de téléphone invalide |
| `Annulé par l'utilisateur` | Paiement annulé — votre commande est conservée, vous pouvez réessayer |
| any other failure | Le paiement a échoué. Réessayez ou choisissez paiement à la livraison |

Always offer COD as the bail-out option on a failed payment screen.

## Implementation plan (mirrors IMPLEMENTATION_PLAN.md Task 10)

### `src/lib/cinetpay.ts`

```ts
type InitiateParams = {
  orderNumber: string;
  amount: number; // integer FCFA
  customer: { firstName: string; lastName: string; email: string; phone: string;
              street: string; city: string; region?: string };
};

export async function initiatePayment(p: InitiateParams):
  Promise<{ paymentUrl: string; paymentToken: string }>;

export async function checkPaymentStatus(orderNumber: string):
  Promise<{ status: 'ACCEPTED' | 'REFUSED' | 'PENDING'; rawCode: string; amount: number }>;

export function verifyWebhookSignature(body: Record<string, string>, signature: string):
  boolean;
```

### `src/app/api/payments/initiate/route.ts`
- POST handler
- Auth: must have NextAuth session
- Validate the Order belongs to the calling user, status is PENDING
- Call `cinetpay.initiatePayment`
- Return `{ paymentUrl }`

### `src/app/api/payments/webhook/route.ts`
- POST handler, NO auth (CinetPay's server is the caller)
- Parse form body
- Verify signature → if invalid, log + return 200 (don't leak why)
- Call `checkPaymentStatus(cpm_trans_id)` for source of truth
- Apply state machine in a Prisma transaction
- Return 200 OK

### Removing Stripe
Once CinetPay is working on staging:
- delete `src/lib/stripe.ts`
- remove `stripe` from `package.json` dependencies
- remove `STRIPE_*` from `.env.example`

## Testing strategy

1. **Unit:** `verifyWebhookSignature` with a fixture payload + known good/bad signature
2. **Integration:** mock the CinetPay HTTP client, exercise the state machine table above
3. **Manual on staging:** real round-trip with sandbox creds, document the test phone number used
4. **Webhook replay test:** capture one successful webhook payload, POST it twice — second call must be a no-op

## Open questions

- **3DS / SMS OTP UX:** CinetPay handles this in their checkout, but the redirect interrupts the SPA — confirm return path lands cleanly
- **Refunds:** CinetPay supports them via dashboard only (no API at the time of writing). For v1, refunds are manual. Document in admin runbook later.
- **Webhook retry behavior on our side:** if we 5xx, CinetPay retries N times — confirm N from their docs and make sure our handler can survive that without double-charging anything (idempotency above should cover it)
