# FasoLocal — Claude Code Handoff

Read once at the start of a session if context beyond CLAUDE.md is needed.

## What's actually here (2026-06-10)

The repo runs on **Next.js 16 + TypeScript + Prisma + NextAuth**, not the
Vite + Supabase + Zustand stack described in PRD/TDD v1.0. See CLAUDE.md
for the full layout. The Vite source under `FasoLocalUpdate/` and
`files/fasolocal-v2-source/` is historical — do not modify.

Today we got the homepage rendering at http://localhost:3000 after:
- fixing the `@import` order in `src/styles/globals.css` (must precede Tailwind directives)
- adding `postcss.config.js` (Tailwind/autoprefixer plugins)

## Decisions and why

| Decision | Chosen | Rejected | Reason |
|---|---|---|---|
| Framework | Next.js 16 (App Router) | Vite SPA | SSR for product-page SEO; smaller client bundles for low-bandwidth mobile (70%+ of users) |
| Language | TypeScript | JavaScript | Project size warrants the type safety |
| DB / ORM | Postgres + Prisma | Supabase | Full control, no vendor lock-in (accept extra wiring for auth/storage/authz) |
| Auth | NextAuth.js v5 (JWT) | Supabase Auth | Stays with the Next-native stack |
| Payments | CinetPay (Orange Money + Moov Money + Coris) | Stripe | Stripe does not serve mobile money in Burkina Faso |
| State | React Context (Cart/Auth) | Zustand | Sufficient for current needs; revisit if perf becomes a concern |
| Hosting | Vercel | — | Best Next.js integration |

## Open known issues (priority order)

1. **NextAuth Credentials provider is a stub** — `src/lib/auth.ts:23` returns
   `null`. Wire bcrypt compare against `User.hashedPassword`.
2. **`src/lib/stripe.ts` is the wrong provider** — delete after CinetPay client
   is in. The `Order.paymentMethod` enum already includes ORANGE/MOOV/CORIS.
3. **No `prisma/seed.ts`** — `npm run db:seed` fails. Need ~12 products + a
   few producers + sample addresses.
4. **API route handlers exist but contents unverified** — `src/app/api/*/route.ts`
   files need to be read and either implemented or marked TODO.
5. **No `/auth/login` or `/auth/register` pages** — NextAuth `pages.signIn` is
   configured but the route group doesn't exist yet.
6. **No vendor or admin UI** — `Role` enum has VENDOR/ADMIN but no dashboards.
7. **PRD/TDD v1.0 still spec Vite/Supabase/Zustand stack** — headers were updated
   on 2026-06-10 to point at Next.js, but body sections describing component
   files, RLS, etc. are stale. Treat code as source of truth.

## Tech debt logged
- No tests anywhere (plan: Vitest unit + Playwright E2E)
- No i18n library (plan: next-intl for Mooré + Dioula in v1.5)
- No rate limiting on auth endpoints
- CinetPay client + webhook not written
- Image storage not chosen (Vercel Blob vs S3 vs UploadThing)

## Useful queries for debugging

```sql
-- All products with producer
SELECT p.name, p.slug, pr.name AS producer, p.stock, p."isAvailable"
FROM "Product" p LEFT JOIN "Producer" pr ON pr.id = p."producerId"
ORDER BY p.name;

-- Order overview
SELECT o."orderNumber", o."orderStatus", o."paymentStatus", o.total, o."createdAt",
       u."firstName", u."lastName"
FROM "Order" o JOIN "User" u ON u.id = o."userId"
ORDER BY o."createdAt" DESC LIMIT 10;
```

## Next tasks (in order)

### Task 1 — Wire NextAuth Credentials against the DB
File: `src/lib/auth.ts`
Replace the `return null` stub with: lookup user by email, bcrypt-compare
against `hashedPassword`, return `{ id, email, role }` on success. Add
`bcryptjs` (and types) to deps.

### Task 2 — Seed the database
New file: `prisma/seed.ts` (referenced by `npm run db:seed` via tsx).
Create: ~3 producers, ~12 products across multiple `ProductCategory` values,
1-2 sample customer users, a couple of addresses. Use stable cuid()s or rely
on autogen.

### Task 3 — Replace Stripe with CinetPay
- Delete `src/lib/stripe.ts`
- New: `src/lib/cinetpay.ts` — `initiatePayment({ orderId, amount, phone, method })`
  hitting CinetPay's `/v2/payment` endpoint
- New: `src/app/api/payments/webhook/route.ts` — verify HMAC signature, update
  `Order.paymentStatus` + `Order.orderStatus`
- Wire `components/checkout/PaymentForm.tsx` to call the initiate endpoint
- Add env vars `CINETPAY_API_KEY`, `CINETPAY_SITE_ID`, `CINETPAY_SECRET_KEY`

### Task 4 — Auth pages
New routes: `src/app/auth/login/page.tsx`, `src/app/auth/register/page.tsx`,
`src/app/auth/forgot-password/page.tsx`. Use `signIn('credentials', ...)` from
NextAuth client.

### Task 5 — Verify and finish API routes
Read each `src/app/api/*/route.ts`; for any that's a placeholder, implement
GET/POST against the matching service in `src/services/*`.

### Task 6 — Vendor dashboard
New: `src/app/(dashboard)/vendor/...` route group, guarded by `role === 'VENDOR'`
middleware. Product CRUD table, order inbox, image upload.

## Naming conventions
- Routes: French slugs where user-facing makes sense; internal/admin routes can stay English
- Components: PascalCase English (`ProductCard`, `CheckoutForm`)
- Hooks: camelCase with `use` prefix (`useCart`, `useAuth`)
- DB columns: Prisma camelCase (`firstName`, `paymentMethod`, `orderNumber`)
- Services: `<noun>Service.ts` exporting functions, not classes
