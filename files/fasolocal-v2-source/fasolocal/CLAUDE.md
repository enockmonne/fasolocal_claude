# FasoLocal — Claude Code Context

## Project
Burkina Faso's first local-products e-commerce marketplace. Buyers purchase honey, crafts, cereals, cosmetics from verified local producers. Language: French. Currency: FCFA.

## Stack
- **Frontend**: React 18 + Vite 5 + Tailwind CSS 3 + React Router v6
- **State**: Zustand (cart persisted to localStorage, search ephemeral)
- **Backend**: Supabase (PostgreSQL 15, RLS, Storage, Auth, Edge Functions)
- **Hosting**: Vercel (frontend) + Supabase Cloud (backend)
- **Payments**: CinetPay API (Orange Money + Moov Money)
- **CI/CD**: GitHub Actions → Vercel auto-deploy on `main`

## Key commands
```bash
npm run dev        # Dev server at http://localhost:3000
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint
```

## Path aliases
`@/` maps to `src/` — always use `@/components/...` not `../../components/...`

## Architecture decisions (don't change without discussion)
- All data currently in `src/lib/data.js` as static seed — will migrate to live Supabase queries in Phase 2
- Cart state managed entirely client-side; no server round-trip on add-to-cart
- RLS policies enforce all multi-tenant data isolation at the DB layer — never bypass in application code
- Supabase anon key is safe to expose in browser; service role key must NEVER appear in frontend code
- Product slugs are the canonical URL identifier (not numeric IDs)

## Code conventions
- Functional components only — no class components
- Inline styles for one-off layouts; Tailwind for reusable patterns
- State co-located with the component that owns it; lift to Zustand only if 2+ components need it
- All prices stored and computed in integer FCFA — format with `Intl.NumberFormat('fr-FR')`
- French language throughout — all UI text, comments, and variable names for domain concepts

## File structure
```
src/
  pages/          # Route-level components (Home, Shop, ProductDetail, Cart, Sellers, NotFound)
  components/
    layout/       # Navbar, Footer
    product/      # ProductCard and future product-specific components
    ui/           # Generic reusable UI primitives (Button, Badge, etc. — to be built)
  lib/
    store.js      # Zustand stores (useCartStore, useSearchStore)
    data.js       # Static seed data (PRODUCTS, CATEGORIES, SELLERS, BADGE_STYLES)
    supabase.js   # Supabase client + query helpers
supabase/
  schema.sql      # Full PostgreSQL DDL — run in Supabase SQL Editor to initialize DB
.github/
  workflows/
    deploy.yml    # CI/CD pipeline
```

## Current technical debt (Phase 2 priorities)
1. `src/lib/data.js` static data → replace with live Supabase queries
2. Auth not wired — no user session state in Navbar, no ProtectedRoute
3. No seller dashboard page (`src/pages/SellerDashboard.jsx` missing)
4. CinetPay integration not coded — needs Edge Function + webhook
5. Product images use emoji placeholders — needs Supabase Storage upload + real URLs
6. No tests — plan: Vitest for unit, Playwright for E2E

## Environment variables needed
```
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key]
```
Copy `.env.example` → `.env` and fill in values from Supabase dashboard > Settings > API.

## Database
Schema lives in `supabase/schema.sql`. Tables: `sellers`, `categories`, `products`, `user_profiles`, `orders`, `order_items`, `reviews`. Run this SQL in Supabase SQL Editor before doing any backend work.

## Phase roadmap
- **Phase 1 (current)**: Static frontend + Supabase schema defined, CI/CD wired
- **Phase 2**: Auth + live DB queries + seller dashboard + CinetPay integration
- **Phase 3**: Reviews, PWA, analytics, WhatsApp notifications
- **Phase 4**: i18n (Mooré + Dioula), React Native mobile app, real-time delivery tracking
