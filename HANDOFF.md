# FasoLocal — Claude Code Handoff

This document gives Claude Code the full history of decisions and current state.
Read this once at the start of a session if context is needed beyond CLAUDE.md.

## What was built in the planning session

### Documents produced
- `fasolocal-requirements.docx` — PRD (v1.0): 35 functional requirements (FR-01→FR-35),
  3 user personas, 10-item launch checklist, user stories for 3 epics
- `fasolocal-technical.docx` — TDD (v1.0): full architecture, schema spec,
  component map, auth flow, payment flow, CI/CD pipeline, RLS policies

### Key decisions and why
| Decision | Chosen | Rejected | Reason |
|---|---|---|---|
| Backend | Supabase | Convex | Relational data model, RLS, Storage, open-source, SQL analytics |
| Payments | CinetPay | Stripe | Local mobile money (Orange Money, Moov Money) for Burkina Faso |
| Hosting | Vercel | Netlify | Better Vite support, faster CDN edge |
| State | Zustand | Redux/Context | Lightweight, persist middleware, no boilerplate |
| Font | Sora | Inter | More distinctive, used by modern African tech brands |

## Current known issues

### Must fix before going live
1. `/boutique` and `/produit/:slug` still serve from static `data.js` — not Supabase
2. Checkout submit only simulates — no real order saved, no payment initiated
3. `/tableau-de-bord` and `/commandes` both render the NotFound page (placeholders)

### Technical debt logged in TDD
- No tests anywhere (plan: Vitest unit + Playwright E2E)
- No i18n library (plan: react-i18next for Mooré + Dioula in v1.5)
- No rate limiting on auth endpoints
- CinetPay Edge Functions not written
- Product images use Unsplash CDN — seller-uploaded images via Supabase Storage not built

## Supabase schema summary

Tables: sellers, categories, products, user_profiles, orders, order_items, reviews

Key RLS rules:
- products: public SELECT (active=true only), seller INSERT/UPDATE/DELETE own products
- orders: buyer SELECT/INSERT/UPDATE own orders (cancel only when pending/confirmed)
- user_profiles: owner-only SELECT/INSERT/UPDATE
- reviews: public SELECT, buyer INSERT only after confirmed+delivered order

Triggers:
- on_auth_user_created: auto-creates user_profiles row on Supabase Auth signup
- orders_updated_at: keeps orders.updated_at current on every UPDATE

## Useful queries for debugging

```sql
-- Check all products with their seller names
SELECT p.name, p.slug, s.name as seller, p.stock, p.active
FROM products p JOIN sellers s ON s.id = p.seller_id
ORDER BY p.name;

-- Check auth users vs user_profiles (should match)
SELECT COUNT(*) FROM auth.users;
SELECT COUNT(*) FROM user_profiles;

-- Recent orders
SELECT o.id, o.status, o.payment_status, o.total, o.created_at,
       up.full_name
FROM orders o
JOIN user_profiles up ON up.id = o.user_id
ORDER BY o.created_at DESC LIMIT 10;
```

## What to build next (Phase 2)

### Task 1 — Wire live Supabase queries (start here)
Files to change: `src/pages/Shop.jsx`, `src/pages/ProductDetail.jsx`
Replace `import { PRODUCTS } from '@/lib/data'` calls with:
  - `getProducts({ category, search })` in Shop.jsx
  - `getProductBySlug(slug)` in ProductDetail.jsx
Add loading skeleton and error state to each.
Also update `src/lib/supabase.js` — the Supabase `products` table uses `price` not
`priceRaw`, and `review_count` not `reviews`.

### Task 2 — Seller Dashboard
New file: `src/pages/SellerDashboard.jsx`
Route already exists: /tableau-de-bord (ProtectedRoute)
Needs: product list table (edit/pause/delete), create product form,
Supabase Storage image upload (bucket: product-images), order inbox.

### Task 3 — CinetPay payment integration
Two new Supabase Edge Functions needed:
  - supabase/functions/create-payment/index.ts
  - supabase/functions/payment-webhook/index.ts
And wire Checkout.jsx to call create-payment instead of the setTimeout stub.

## Naming conventions across the codebase
- Routes: French slugs (/boutique, /panier, /connexion, /tableau-de-bord)
- Components: PascalCase English (ProductCard, ProtectedRoute)
- Hooks: camelCase with 'use' prefix (useSession, useCartStore)
- Database columns: snake_case French-ish (seller_id, review_count, delivery_address)
- Zustand store keys: camelCase (items, addItem, getTotal)
