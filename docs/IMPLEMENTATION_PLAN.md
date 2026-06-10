# FasoLocal — Phase 2 Implementation Plan

Goal: a working end-to-end staging deployment where a tester can register, browse
products, place an order, and pay via CinetPay sandbox.

Definition of "Phase 2 done": all P0 tasks below have their acceptance criteria
green, on the staging URL ([docs/STAGING.md](STAGING.md)).

## Sequencing

```
P0-A (Infra)
  1. CI workflow fix          ← DONE
  2. Vercel + Neon staging    ← YOU (dashboard work)
  3. Prisma db:push to staging

P0-B (Foundations — blocks everything else)
  4. Seed data
  5. NextAuth credentials wired
  6. Auth pages

P0-C (Core flows — depend on B)
  7. Product list + detail (real DB)
  8. Cart (already in Context; verify persist)
  9. Order create (no payment yet — COD only)

P0-D (Payments — depends on C)
  10. CinetPay client + webhook
  11. Checkout wired to CinetPay
  12. Order status transitions

P1 (Post-launch, after testers validate P0)
  13. Vendor dashboard
  14. Admin moderation
  15. Image upload
  16. Reviews
  17. Tests
```

## Auth & authorization matrix

| Role | Resource | Allowed actions |
| --- | --- | --- |
| Anonymous | Product list/detail | read |
| Anonymous | Auth pages | access |
| CUSTOMER | Own profile, addresses | read/write |
| CUSTOMER | Own orders | create, read; cancel only while status ∈ {PENDING, CONFIRMED} |
| CUSTOMER | Reviews | create only on products in DELIVERED orders; read all |
| VENDOR | Own products | create, read, update, soft-delete (set isAvailable=false) |
| VENDOR | Orders containing own products | read; update orderStatus along PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED |
| VENDOR | Other vendors' products/orders | none |
| ADMIN | All resources | full |

Enforcement: in `src/services/*` — every mutation function takes the calling
user's id+role, asserts ownership or role before touching the DB. No middleware
shortcut; the service is the boundary.

---

## P0-A — Infrastructure

### Task 1 — CI workflow fix ✅
Already done. Workflow runs typecheck/lint/build on push to master+develop.

### Task 2 — Vercel + Neon staging
**Owner:** you, in the dashboard. Follow [docs/STAGING.md](STAGING.md).
**Acceptance:**
- A push to `develop` triggers a Vercel deploy that succeeds
- `fasolocal-staging.vercel.app` (or whatever alias you pick) returns the homepage
- `echo $DATABASE_URL` in Vercel runtime points at Neon staging branch

### Task 3 — Schema push to staging DB
**Files:** none, this is `npx prisma db push` against Neon staging URL.
**Acceptance:**
- `User`, `Product`, `Order`, etc. tables exist in Neon staging
- `npx prisma studio` connects and shows empty tables

---

## P0-B — Foundations

### Task 4 — Seed data
**New file:** `prisma/seed.ts`
**Content needed:**
- 3 producers (e.g., "Coopérative Karité de Bobo", "Apiculteurs du Sud-Ouest", "Tisserands de Koudougou")
- 12 products spread across `ProductCategory` enum values; integer FCFA prices; 1+ ProductImage URL each (Unsplash for now)
- 2 customer test users (`tester1@fasolocal.test` / `tester2@fasolocal.test`) with bcrypt-hashed `password123`
- 1 sample address per customer

**Acceptance:**
- `npm run db:seed` against staging completes without error
- Homepage renders 12 products fetched from DB (not hardcoded)

### Task 5 — NextAuth credentials wired
**File:** `src/lib/auth.ts`
**Change:** replace the `return null` stub in `authorize()` with: lookup by email
via `db.user.findUnique`, `bcrypt.compare` against `hashedPassword`, return
`{ id, email, role, name: firstName + ' ' + lastName }`.
**Deps to add:** `bcryptjs`, `@types/bcryptjs`
**Also:** extend NextAuth JWT callback to include `role` in the token + session
(needed for authorization checks).

**Acceptance:**
- POST to `/api/auth/callback/credentials` with tester1's email/password returns a session
- The session payload includes `user.role === 'CUSTOMER'`

### Task 6 — Auth pages
**New files:**
- `src/app/auth/login/page.tsx` — email/password form + Google button, calls `signIn`
- `src/app/auth/register/page.tsx` — calls a new `/api/auth/register` route handler that bcrypts password and creates `User` + initial empty cart context
- `src/app/auth/forgot-password/page.tsx` — placeholder ("contact support") for now

**Acceptance:**
- A new visitor can register → land on homepage signed in
- They can sign out and back in
- Bad credentials show a French error message inline

---

## P0-C — Core flows

### Task 7 — Product list + detail from DB
**Files:** `src/app/(shop)/page.tsx`, `src/app/(shop)/products/[id]/page.tsx`,
`src/services/productService.ts`
**Change:** render via Prisma queries (server components → no client-side fetch
needed). Use `Product.slug` for URL, not id (matches PRD).
**Acceptance:**
- Homepage shows 12 seeded products
- Clicking one routes to `/products/<slug>` and renders detail
- 404 on unknown slug

### Task 8 — Cart verify
**Files:** `src/context/CartContext.tsx`, `src/services/cartService.ts`
**Decision needed up front:** cart is **client-only** for anonymous users
(localStorage), syncs to server only after login. Don't try to merge on login
yet — overwrite client cart with server cart, or vice versa; pick one and
document it.
**Acceptance:**
- Add to cart works for anonymous + logged-in
- Cart survives a page refresh
- After login, decision above is honored (document which way)

### Task 9 — Order create (COD only first)
**Files:** `src/app/(shop)/checkout/page.tsx`, `src/services/orderService.ts`,
`src/app/api/orders/route.ts`
**Scope this phase:** only `paymentMethod: CASH_ON_DELIVERY`. CinetPay comes in P0-D.
**Acceptance:**
- Submitting checkout creates an Order + OrderItems in DB
- Stock decrements on creation
- Order appears in `/account/orders`
- Tester gets a "commande #ABC-123 confirmée" page

---

## P0-D — Payments

### Task 10 — CinetPay client + webhook
**Spec:** [docs/PAYMENTS_CINETPAY.md](PAYMENTS_CINETPAY.md)
**New files:**
- `src/lib/cinetpay.ts` — `initiatePayment()`, `verifyWebhookSignature()`
- `src/app/api/payments/initiate/route.ts`
- `src/app/api/payments/webhook/route.ts`
**Delete:** `src/lib/stripe.ts` and the Stripe env vars from `.env.example`

**Acceptance:**
- Sandbox payment from staging completes round-trip: redirect to CinetPay → return → webhook fires → Order.paymentStatus = COMPLETED
- Failed payment leaves Order.paymentStatus = FAILED and orderStatus = PENDING (so user can retry)
- Webhook is idempotent: replaying the same payload doesn't double-process

### Task 11 — Checkout wired to CinetPay
**File:** `src/components/checkout/PaymentForm.tsx`
**Change:** when ORANGE_MONEY/MOOV_MONEY/CORIS_MONEY selected, POST to
`/api/payments/initiate` → redirect to returned `payment_url`.
**Acceptance:**
- Choosing mobile money on staging redirects to CinetPay sandbox
- COD path still works unchanged

### Task 12 — Order status transitions
**File:** `src/services/orderService.ts`
**Rules:**
- COD: created as `paymentStatus=PENDING, orderStatus=CONFIRMED`
- Mobile money: starts `PENDING/PENDING` → webhook flips to `COMPLETED/CONFIRMED`
- Vendor (P1) advances orderStatus only — never touches paymentStatus

**Acceptance:** end-to-end COD order goes PENDING → CONFIRMED in DB.
End-to-end mobile money goes PENDING → COMPLETED in DB after webhook.

---

## P1 — Post-launch (only after testers validate P0)

- **Task 13 — Vendor dashboard** — new route group `src/app/(dashboard)/vendor/*`, middleware gate on role
- **Task 14 — Admin moderation** — same pattern, role=ADMIN, list/approve products
- **Task 15 — Image upload** — pick Vercel Blob or S3; replace ProductImage.url generation
- **Task 16 — Reviews** — gated by "user has a DELIVERED order for this product"
- **Task 17 — Tests** — Vitest for services, Playwright for the registration → order → payment flow on staging

## Risks logged

1. **NextAuth v5 is still beta** — may need to pin version, watch for breaking changes between updates
2. **CinetPay sandbox flakiness** — keep COD as the always-working fallback during testing
3. **Stock decrement on order create vs payment confirm** — current plan decrements on create, which means abandoned mobile-money carts hold stock. Acceptable for v1, revisit if it bites
4. **No migrations yet** — using `prisma db push` not `prisma migrate`. Fine for now; switch to `migrate` before going to real production with real customer data
