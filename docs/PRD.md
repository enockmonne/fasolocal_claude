



FasoLocal
Product Requirements Document
Marketplace des Produits Locaux du Burkina Faso



| Document Version | v1.0 |
| --- | --- |
| Status | Draft — Pending Review |
| Date | May 2025 |
| Owner | FasoLocal Product Team |
| Tech Lead | TBD |
| Backend | PostgreSQL + Prisma ORM (self-hosted or Neon/Supabase Postgres) |
| Frontend | Next.js 16 (App Router) + React 18 + TypeScript + Tailwind CSS |
| Auth | NextAuth.js v5 (JWT, Credentials + Google) |
| Payments | CinetPay (Orange Money + Moov Money + Coris Money) |

> **Stack update — 2026-06-10:** The original v1.0 draft specified Vite +
> Supabase + Zustand. The implementation was built on Next.js + Prisma + NextAuth.
> All functional requirements (FR-01→FR-35) remain valid; only the technical
> realization changed. See `docs/TDD.md` and `CLAUDE.md` for the current stack
> details. The payment provider is **CinetPay**, not Stripe — Stripe does not
> support Burkina Faso mobile money.


# 1. Executive Summary
FasoLocal is Burkina Faso's first dedicated e-commerce marketplace for locally produced goods — honey, artisan crafts, cereals, cosmetics, and health products. It connects verified local producers and artisans directly with consumers across the country and the diaspora, eliminating intermediaries and supporting the national economy.

This document defines the functional and non-functional requirements for FasoLocal Version 1.0. It serves as the foundational reference for the engineering team, product designers, stakeholders, and QA throughout the development lifecycle.

| Vision Statement "To become the leading digital marketplace for authentic Burkinabe products — making local goods accessible to every citizen, while empowering producers with fair, direct commerce." |
| --- |



# 2. Stakeholders & User Personas
## 2.1 Key Stakeholders
| Stakeholder | Role | Primary Interest |
| --- | --- | --- |
| Product Owner | FasoLocal Core Team | Define vision, prioritize features, ensure market fit |
| Buyers / Consumers | End Users | Browse, discover and purchase authentic local products |
| Sellers / Producers | End Users | List products, manage inventory, receive orders and payments |
| Delivery Partners | External | Receive delivery requests, track and complete deliveries |
| Payment Providers | External | CinetPay (Orange Money, Moov Money) API integration |
| Admin Team | Internal | Manage users, moderate listings, handle disputes |
| Government / MICA | Regulatory | "Made in Burkina" label certification compliance |


## 2.2 User Personas
### Persona 1 — Aissata, the Urban Buyer
- Age 28, works in Ouagadougou, health-conscious and values local products
- Shops primarily on mobile (Android), uses Orange Money for payments
- Needs: easy product discovery, trusted quality indicators, fast delivery confirmation
- Pain points: inability to verify product authenticity, unclear delivery timelines

### Persona 2 — Moussa, the Artisan Seller
- Age 44, tisserand (weaver) from Koudougou, sells Faso Dan Fani fabric
- Low digital literacy, uses WhatsApp primarily, basic smartphone
- Needs: simple product upload, clear order notifications (SMS/WhatsApp), fast payment
- Pain points: middlemen taking margins, no visibility into online buyers

### Persona 3 — Yves, the Diaspora Buyer
- Age 35, lives in Paris, wants to gift authentic Burkinabe products to family
- Comfortable with web on desktop, uses credit card or international transfer
- Needs: international shipping options, French language support, trustworthy platform


# 3. Project Scope
## 3.1 In Scope — Version 1.0
- Public storefront with product catalog, search, and category filtering
- Seller registration, product management, and order fulfillment dashboard
- Buyer registration, cart management, checkout, and order tracking
- Payment integration: Orange Money and Moov Money via CinetPay API
- Cash on delivery option for Ouagadougou metro area
- Product photo upload and storage (Supabase Storage / CDN)
- Admin panel: user management, product moderation, order oversight
- Responsive web app — mobile-first, works on low-bandwidth connections
- French language interface (primary)

## 3.2 Out of Scope — Version 1.0
- Native mobile application (iOS / Android) — planned for v2.0
- Mooré and Dioula language support — planned for v1.5
- International payment methods (Visa, PayPal, Western Union)
- Real-time GPS delivery tracking
- Automated "Made in Burkina" certification verification
- AI-powered product recommendations


# 4. Functional Requirements
## 4.1 Authentication & User Management
| ID | Priority | Requirement | Source |
| --- | --- | --- | --- |
| FR-01 | Must Have | Users can register with email address and password | Persona 1, 2 |
| FR-02 | Must Have | Users can log in and log out securely | All users |
| FR-03 | Must Have | Password reset via email link | All users |
| FR-04 | Should Have | Social login via Google or Facebook OAuth | Persona 1, 3 |
| FR-05 | Must Have | Sellers must complete a profile with name, location, phone number | Persona 2 |
| FR-06 | Must Have | Admin can activate, suspend, or permanently delete accounts | Admin |
| FR-07 | Should Have | Seller verification badge upon document review by admin | Trust & Safety |


## 4.2 Product Catalog
| ID | Priority | Requirement | Source |
| --- | --- | --- | --- |
| FR-10 | Must Have | Sellers can create product listings with name, description, price, weight, category, and up to 5 photos | Persona 2 |
| FR-11 | Must Have | Products are organized in 5 categories: Agroalimentaire, Artisanat, Cereales, Cosmetique, Sante | All buyers |
| FR-12 | Must Have | Buyers can search products by keyword and filter by category | Persona 1 |
| FR-13 | Must Have | Product detail page shows name, price, description, seller info, stock, rating, and reviews | Persona 1, 3 |
| FR-14 | Must Have | Sellers can update stock levels; products show 'Stock limite' badge when below 20 units | Persona 2 |
| FR-15 | Should Have | Products can carry quality badges: Bestseller, Bio, Certifie, Local, Export | Trust & Safety |
| FR-16 | Should Have | Buyers can leave a star rating (1-5) and written review after confirmed purchase | Persona 1 |
| FR-17 | Must Have | Seller dashboard shows all listed products with edit, pause, and delete options | Persona 2 |


## 4.3 Cart & Checkout
| ID | Priority | Requirement | Source |
| --- | --- | --- | --- |
| FR-20 | Must Have | Buyers can add items to a persistent cart that survives browser refresh | Persona 1 |
| FR-21 | Must Have | Cart shows item quantity, unit price, line total, and grand total in FCFA | Persona 1 |
| FR-22 | Must Have | Buyers can update item quantities or remove items from cart | Persona 1 |
| FR-23 | Must Have | Checkout collects delivery address, contact phone, and payment method selection | Persona 1 |
| FR-24 | Must Have | Supported payment methods at launch: Orange Money, Moov Money, Cash on Delivery | Persona 1, 2 |
| FR-25 | Must Have | Buyer receives order confirmation with order number via on-screen message and email | Persona 1 |
| FR-26 | Should Have | Buyers can view past orders with current status and item details | Persona 1, 3 |


## 4.4 Order Management
| ID | Priority | Requirement | Source |
| --- | --- | --- | --- |
| FR-30 | Must Have | Order lifecycle: Pending > Confirmed > Preparing > Shipped > Delivered / Cancelled | All users |
| FR-31 | Must Have | Sellers receive new order notifications (email + dashboard alert) | Persona 2 |
| FR-32 | Must Have | Sellers can confirm, mark as preparing, and mark as shipped with optional tracking note | Persona 2 |
| FR-33 | Must Have | Buyers can cancel orders with Pending or Confirmed status | Persona 1 |
| FR-34 | Should Have | Admin can override order status and add internal notes | Admin |
| FR-35 | Could Have | Automated SMS notification to buyer when order status changes | Persona 1 |



# 5. Non-Functional Requirements
| Category | Metric / Target | Details |
| --- | --- | --- |
| Performance | < 3s first load | Initial page load under 3 seconds on 3G mobile. Core Web Vitals LCP < 2.5s, CLS < 0.1 |
| Availability | 99.5% uptime | Measured monthly. Planned maintenance window: Sundays 2:00–4:00 AM WAT |
| Mobile-First | 100% responsive | All pages fully functional on screens from 320px. Tested on Chrome Android and Safari iOS |
| Security | OWASP Top 10 | HTTPS enforced, SQL injection prevention via RLS, JWT auth, rate limiting on auth endpoints |
| Scalability | 10,000+ products | Database indexed for < 100ms query on catalog with 10,000+ products |
| Accessibility | WCAG 2.1 AA | Minimum contrast ratios, keyboard navigable, screen reader labels on all interactive elements |
| Offline | Cart persistence | Cart state persists via localStorage even without network. Graceful error states for API failures |
| Image CDN | < 500KB per image | Product photos compressed to WebP, served via Supabase CDN, max 500KB per image upload |
| Data Privacy | GDPR-aligned | User data stored in EU region. Opt-in analytics. Privacy policy and cookie consent on launch |



# 6. User Stories — Priority Backlog
## Epic 1: Discovery & Browsing
US-01  As a buyer, I want to browse products by category so I can quickly find what I am looking for without searching.
Acceptance: Category filter pill updates product grid in < 300ms. URL updates to reflect active filter.
US-02  As a buyer, I want to search for products by name or seller so I can find specific items.
Acceptance: Search input triggers real-time filtering client-side. Results update within 150ms of keystroke.
US-03  As a buyer, I want to see product details including photos, price per unit, seller name, and stock availability.
Acceptance: Product detail page loads from URL slug. All specified fields render. Low-stock badge shows when stock < 20.

## Epic 2: Cart & Checkout
US-10  As a buyer, I want to add items to my cart so I can purchase multiple products in a single order.
Acceptance: Cart icon badge updates immediately. Cart state persists after page refresh via Zustand persist middleware.
US-11  As a buyer, I want to pay with Orange Money so I can complete my purchase without a bank account.
Acceptance: CinetPay checkout widget launches. Payment confirmation updates order status to Confirmed within 60 seconds.

## Epic 3: Seller Operations
US-20  As a seller, I want to add a new product listing with photos so buyers can see what I am offering.
Acceptance: Product form validates all required fields. Photos upload to Supabase Storage. Listing appears in catalog within 30 seconds.
US-21  As a seller, I want to be notified when I receive a new order so I can prepare it promptly.
Acceptance: Email notification sent within 2 minutes of order placement. Dashboard order count badge updates in real time.


# 7. Constraints & Assumptions
## 7.1 Technical Constraints
- Backend exclusively on Supabase (PostgreSQL). No custom server infrastructure for v1.0.
- Frontend deployed on Vercel. CI/CD via GitHub Actions on push to main branch.
- Payment processing exclusively through CinetPay API for mobile money integration.
- Product images hosted on Supabase Storage with CDN delivery. Max 5 images per product, 5MB per image.
- No native app for v1.0. Progressive Web App (PWA) capabilities optional.

## 7.2 Business Constraints
- Launch budget limits third-party service costs to under $200/month in Year 1.
- All seller payouts processed manually in v1.0. Automated payout system in v2.0.
- Product moderation by admin team required before new seller listings go live.

## 7.3 Assumptions
- Target users have access to a smartphone and a data connection (2G minimum).
- Sellers have an existing Orange Money or Moov Money account to receive payouts.
- CinetPay provides reliable API access for Burkina Faso mobile money transactions.
- Delivery logistics are handled by third-party partners; FasoLocal only coordinates.


# 8. Launch Acceptance Criteria
The product is considered ready for public launch when ALL of the following are verified:

| # | Acceptance Criterion | Status |
| --- | --- | --- |
| 1 | All Must Have functional requirements (FR-01 through FR-35) pass QA testing | Pending |
| 2 | Orange Money payment flow completes end-to-end in the CinetPay test environment | Pending |
| 3 | Product catalog loads in under 3 seconds on a simulated 3G Android device | Pending |
| 4 | Seller can register, list a product, and receive an order without admin assistance | Pending |
| 5 | Buyer can complete full purchase flow from homepage to order confirmation | Pending |
| 6 | No P0/P1 security vulnerabilities found in OWASP checklist review | Pending |
| 7 | Admin panel allows user and listing moderation | Pending |
| 8 | All pages render correctly on Chrome Android, Safari iOS, and Chrome Desktop | Pending |
| 9 | Data backup configured on Supabase Pro with point-in-time recovery enabled | Pending |
| 10 | Privacy policy and terms of service pages published | Pending |



# 9. Document Revision History
| Version | Date | Changes | Author |
| --- | --- | --- | --- |
| v1.0 | May 2025 | Initial draft — all sections | Product Team |
| v1.1 | TBD | Stakeholder review revisions | TBD |
| v1.2 | TBD | Final sign-off, engineering handoff | TBD |

