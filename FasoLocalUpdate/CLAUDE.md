# FasoLocal — Claude Code Context

## Project
Burkina Faso's first local-products e-commerce marketplace. Buyers purchase honey,
crafts, cereals, cosmetics from verified local producers.
Language: French. Currency: FCFA (integers only, formatted with Intl.NumberFormat('fr-FR')).

## Stack
- **Frontend**: React 18 + Vite 5 + Tailwind CSS 3 + React Router v6
- **State**: Zustand — useCartStore (persisted to localStorage) + useSearchStore (ephemeral)
- **Backend**: Supabase — PostgreSQL 15, RLS, Storage, Auth, Edge Functions
- **Hosting**: Vercel (frontend) + Supabase Cloud (backend)
- **Payments**: CinetPay API (Orange Money + Moov Money) — NOT YET CODED
- **CI/CD**: GitHub Actions → Vercel auto-deploy on push to `main`

## Key commands
```bash
npm run dev        # Dev server at http://localhost:3000
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint
```

## Path aliases
`@/` maps to `src/` — always use `@/components/...` not `../../components/...`

## Complete file structure (all files that exist)
```
src/
  pages/
    Home.jsx            ✅ Hero, featured products, category strip, trust strip
    Shop.jsx            ✅ Full catalog, category pills + search via Zustand
    ProductDetail.jsx   ✅ Image, desc, qty picker, add-to-cart, seller info
    Cart.jsx            ✅ Item list, qty controls, order summary → /commande
    Checkout.jsx        ✅ Address, phone, payment method, order submit
    Sellers.jsx         ✅ Seller directory, join CTA
    Connexion.jsx       ✅ Login — supabase.auth.signInWithPassword
    Inscription.jsx     ✅ Signup — supabase.auth.signUp + email confirm state
    MotDePasseOublie.jsx ✅ Password reset — supabase.auth.resetPasswordForEmail
    NotFound.jsx        ✅ 404 with return link
  components/
    layout/
      Navbar.jsx        ✅ Sticky, search, cart badge, user dropdown, mobile menu
      Footer.jsx        ✅ Multi-column, responsive
      ProtectedRoute.jsx ✅ Redirects to /connexion if no session
    product/
      ProductCard.jsx   ✅ Tailwind, Badge, ProductImage, add-to-cart animation
      ProductImage.jsx  ✅ <img> with skeleton loader + emoji fallback on error
    ui/
      Button.jsx        ✅ variant (primary/secondary/ghost/danger) + size + loading
      Badge.jsx         ✅ Reads BADGE_STYLES from data.js
      Spinner.jsx       ✅ fullPage mode used by Suspense fallback
  hooks/
    useSession.js       ✅ supabase.auth.getSession + onAuthStateChange subscription
  lib/
    store.js            ✅ useCartStore (persist) + useSearchStore
    data.js             ✅ PRODUCTS(12), CATEGORIES(6), SELLERS(12), BADGE_STYLES
                           Each product has: id, name, slug, priceRaw, category,
                           seller, badge, emoji, imageUrl, weight, stock, rating,
                           reviews, description
    supabase.js         ✅ Client + signUp/signIn/signOut/resetPassword +
                           getProducts/getProductBySlug/createOrder helpers
  App.jsx               ✅ React.lazy + Suspense for all 10 routes
  main.jsx              ✅ BrowserRouter wrapper
  index.css             ✅ Tailwind base + text-gradient-faso utility
supabase/
  schema.sql            ✅ Full DDL: 6 tables, indexes, RLS, triggers
                           Tables: sellers, categories, products, user_profiles,
                           orders, order_items, reviews
  seed.sql              ✅ 12 sellers + 12 products with fixed UUIDs
  add-images.sql        ✅ Migration: adds image_url column, updates all 12 products
.github/
  workflows/
    deploy.yml          ✅ Build once → upload artifact → deploy to Vercel (main only)
CLAUDE.md               ✅ This file
SETUP.md                ✅ Full 11-step setup guide (Supabase + GitHub + Vercel)
vercel.json             ✅ SPA rewrites + asset cache headers
```

## Architecture decisions (don't change without discussion)
- All data currently served from `src/lib/data.js` (static seed) — Phase 2 will swap
  to live Supabase queries via the helpers already in supabase.js
- Cart state is client-side only — no server round-trip on add-to-cart
- RLS enforces multi-tenant isolation at DB layer — never bypass in app code
- Supabase anon key is safe to expose in browser; service role key must NEVER appear
  in frontend code
- Product slugs are the canonical URL identifier (not numeric IDs)
- All prices are integer FCFA — format with Intl.NumberFormat('fr-FR')
- Tailwind for all layout/style — no new inline styles unless truly one-off
- faso-* colour tokens (defined in tailwind.config.js) for brand colours

## Code conventions
- Functional components only — no class components
- State co-located with the component that owns it; lift to Zustand only if 2+ components need it
- French language throughout — all UI text and user-facing copy
- Error messages in French, inline in the component (no toast library yet)
- Page components use Tailwind; shared components use Tailwind + shared UI primitives

## Current status: what's live vs what's stubbed

### ✅ Working (Phase 1 complete)
- All pages render with real static data from data.js
- Cart persists across page refreshes
- Category + search filtering works
- Product images load from Unsplash URLs with emoji fallback
- Auth pages (Connexion, Inscription, MotDePasseOublie) are wired to Supabase Auth
- ProtectedRoute guards /panier and /commande
- Navbar shows login/signup or user avatar+dropdown based on session
- Checkout page collects address, phone, payment method (submit is stubbed)
- CI/CD pipeline exists and deploys on push to main
- Supabase schema + seed SQL ready to run

### ⚠️  Stubbed / not yet wired (Phase 2 priorities in order)

1. **Shop.jsx + ProductDetail.jsx still use data.js** — supabase.js helpers exist
   (getProducts, getProductBySlug) but pages don't call them yet. Need loading
   and error states when swapping.

2. **Checkout.jsx submit is simulated** — calls clearCart() after a 1s delay.
   Needs: createOrder() → CinetPay Edge Function → payment_url redirect.

3. **SellerDashboard page missing** — route /tableau-de-bord renders NotFound.
   Needs: product CRUD table, Supabase Storage image upload, order management.

4. **CinetPay not coded** — needs two Supabase Edge Functions:
   - /functions/v1/create-payment  (calls CinetPay /payment API)
   - /functions/v1/payment-webhook (verifies signature, updates orders)

5. **Order history page missing** — /commandes renders NotFound.

6. **No tests** — plan: Vitest for unit, Playwright for E2E in Phase 2.

## Environment variables needed
```
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
```
Copy `.env.example` → `.env` and fill from Supabase dashboard > Settings > API.

## Supabase setup (if not done yet)
1. Create project at supabase.com (region: EU West / Paris)
2. SQL Editor → run supabase/schema.sql
3. SQL Editor → run supabase/add-images.sql  ← MUST come before seed.sql (adds image_url column)
4. SQL Editor → run supabase/seed.sql
5. Storage → New bucket: product-images (public, 5MB limit)
6. Auth → Settings → Site URL: http://localhost:3000 (update after Vercel deploy)
7. Project Settings → API → copy URL + anon key to .env

## GitHub + Vercel (if not done yet)
See SETUP.md for the full 11-step guide.
Short version:
  git init && git add . && git commit -m "feat: FasoLocal v2 initial commit"
  gh repo create fasolocal --public
  git push -u origin main
Then add 5 GitHub Secrets (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY,
VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID).

## Phase roadmap
- **Phase 1** ✅ Static frontend + Supabase schema + CI/CD + Auth + Design system
- **Phase 2** 🔄 Live DB queries + seller dashboard + CinetPay integration
- **Phase 3** ⏳ Reviews, PWA, analytics, WhatsApp notifications
- **Phase 4** ⏳ i18n (Mooré + Dioula), React Native mobile app, real-time delivery

## Key product decisions made
- Backend: Supabase (chose over Convex — relational data, RLS, Storage, no lock-in)
- Payments: CinetPay (Orange Money + Moov Money unified API for Burkina Faso)
- Hosting: Vercel + Supabase Cloud
- Images: Unsplash URLs in seed data; Supabase Storage for seller-uploaded photos
- Design: mobile-first (70%+ mobile), Sora font, faso-* green palette
