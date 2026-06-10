# FasoLocal — Claude Code Context

## Project
Burkina Faso's first local-products e-commerce marketplace. Buyers purchase honey,
crafts, cereals, cosmetics, Faso Dan Fani textiles from verified local producers.
Language: French. Currency: FCFA (integers only, formatted with Intl.NumberFormat('fr-FR')).

## Stack (actual code, as of 2026-06-10)
- **Framework**: Next.js 16 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS 3 (`tailwind.config.ts`)
- **Database**: PostgreSQL + Prisma ORM (`prisma/schema.prisma`)
- **Auth**: NextAuth.js v5 beta (Google OAuth + Credentials)
- **State**: React Context — `CartContext`, `AuthContext` (not Zustand)
- **Payments**: CinetPay (Orange Money + Moov Money + Coris Money) — **planned**.
  Current `src/lib/stripe.ts` is leftover Stripe scaffold to be replaced.
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions → Vercel auto-deploy on push to `master`

> **Doc/code reconciliation:** PRD/TDD v1.0 describe a Vite + Zustand + Supabase
> stack. That was the planning-phase choice; the code was built on Next.js + Prisma
> instead. The old Vite source lives under `FasoLocalUpdate/` and
> `files/fasolocal-v2-source/` for reference only — do not edit it. Source of
> truth is `src/` at the repo root.

## Key commands
```bash
npm run dev          # Next dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Run production build
npm run lint         # next lint
npm run db:generate  # prisma generate
npm run db:push      # push schema to DATABASE_URL
npm run db:seed      # tsx prisma/seed.ts (seed file not yet written)
npm run db:studio    # Prisma Studio
```

## Path aliases
`@/` maps to `src/` — always use `@/components/...` not `../../components/...`

## File structure (what exists today)
```
src/
  app/
    layout.tsx                       Root layout — wraps Auth + Cart + Toast providers
    (shop)/page.tsx                  Homepage (route group)
    (shop)/cart/page.tsx             Cart page
    (shop)/checkout/page.tsx         Checkout page
    (shop)/products/[id]/page.tsx    Product detail (dynamic route)
    (shop)/account/orders/page.tsx   Order history
    (shop)/account/settings/page.tsx Account settings
    api/auth/route.ts                NextAuth handler
    api/cart/route.ts                Cart API
    api/orders/route.ts              Orders API
    api/products/route.ts            Products API
  components/
    layout/   Header, Footer, MobileNav, Sidebar
    products/ ProductCard, ProductDetail, ProductGrid, ProductFilters, ProductSearch, ProductReviews
    cart/     CartDrawer, CartItem, CartSummary
    checkout/ CheckoutForm, ShippingForm, PaymentForm, OrderSummary
    common/   Logo, SearchBar, Newsletter, Breadcrumbs
    ui/       Button, Input, Badge, Modal, Toast, Skeleton
  context/    AuthContext.tsx, CartContext.tsx
  hooks/      useAuth, useCart, useProducts, useDebounce
  lib/
    db.ts        Prisma client singleton
    auth.ts      NextAuth config (Credentials authorize stub — TODO real check)
    stripe.ts    LEGACY — replace with CinetPay
    utils.ts
  services/   authService, cartService, orderService, productService
  config/     site.ts, navigation.ts
  styles/     globals.css (Tailwind directives; @import order fixed today)
  types/      product.ts, cart.ts, order.ts, user.ts
  utils/      cn.ts, formatCurrency.ts, validators.ts
prisma/
  schema.prisma   User, Address, Product, ProductImage, Producer, Order,
                  OrderItem, Review + Role/PaymentMethod/PaymentStatus/OrderStatus enums
postcss.config.js   Added today to unblock Tailwind processing
next.config.ts
tailwind.config.ts
docs/
  PRD.md   Product requirements
  TDD.md   Technical design
```

## Database — Prisma models
- `User` (Role: CUSTOMER | VENDOR | ADMIN), `Address`, `Producer`
- `Product` (FCFA Int price, slug unique, ProductCategory enum, tags[], stock)
- `ProductImage`, `Review`
- `Order` (orderNumber unique, PaymentMethod, PaymentStatus, OrderStatus)
- `OrderItem` (denormalized productName/productImage/price snapshot)
- `PaymentMethod` enum includes ORANGE_MONEY, MOOV_MONEY, CORIS_MONEY, VISA,
  MASTERCARD, CASH_ON_DELIVERY

## Architecture decisions
- **App Router with route groups** — `(shop)` groups public storefront routes
- **Server Components by default** — opt into `'use client'` only when needed (cart, forms, modals)
- **Prisma singleton** in `src/lib/db.ts` to avoid hot-reload connection storms
- **Service layer** (`src/services/*`) wraps Prisma queries; route handlers call services
- **All prices are integer FCFA** — format via `utils/formatCurrency.ts`
- **Auth via NextAuth JWT sessions** — no DB sessions
- **Authorization in the service layer** — no Supabase RLS; check role/ownership before mutating
- **Tailwind only** for styling — no CSS-in-JS

## Code conventions
- TypeScript strict; functional components only
- Co-locate state with owning component; Context only when 2+ trees need it
- French for all UI strings and user-facing copy
- Server errors logged + returned as `{ error: string }` with proper status
- Route handlers in `src/app/api/*/route.ts` thin — delegate to services

## Current status

### Working (today, 2026-06-10)
- Homepage renders at http://localhost:3000 after fixing globals.css @import order
  and adding `postcss.config.js`
- Prisma schema complete and migratable
- Layout providers (Auth/Cart/Toast) wired
- API route handler files exist for auth, cart, orders, products

### Stubbed / unfinished
1. **NextAuth `authorize()` returns null** — `src/lib/auth.ts:23` has the bcrypt-compare TODO
2. **`src/lib/stripe.ts` is the wrong provider** — replace with CinetPay client
3. **No prisma seed** — `npm run db:seed` fails until `prisma/seed.ts` is written
4. **API route handlers likely thin/empty** — verify before relying on them
5. **No auth pages yet** — `pages.signIn: '/auth/login'` is configured but routes don't exist
6. **No vendor/admin dashboards** — Role enum exists but no UI

## Environment variables (see `.env.example`)
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
# CinetPay (to add — replaces Stripe + Orange Money placeholders)
CINETPAY_API_KEY=...
CINETPAY_SITE_ID=...
CINETPAY_SECRET_KEY=...
```

## Phase roadmap
- **Phase 1** ✅ Next.js scaffold + Prisma schema + page shells + homepage rendering
- **Phase 2** 🔄 Wire real auth (bcrypt), seed DB, implement product/cart/order services,
  swap Stripe → CinetPay, build auth pages
- **Phase 3** ⏳ Vendor dashboard, admin moderation, reviews, image upload
- **Phase 4** ⏳ i18n (Mooré + Dioula), PWA, WhatsApp/SMS notifications, mobile app

## Key product decisions (current Next stack)
- **Framework: Next.js over Vite** — SSR for SEO on product pages, server components
  reduce client JS on low-bandwidth mobile (70%+ of users)
- **DB: Postgres + Prisma over Supabase** — full control, no vendor lock-in;
  trade-off is wiring auth/storage/authorization separately
- **Payments: CinetPay over Stripe** — Stripe does not serve Burkina Faso buyers
  paying with Orange Money / Moov Money. Stripe file is legacy and will be removed.
- **Images: TBD** — Vercel Blob or S3 (no decision yet); Prisma `ProductImage.url` is just a string
