# FasoLocal — Setup Guide

Complete setup from zero to deployed. Estimated time: **45 minutes**.

---

## Prerequisites

- Node.js >= 20 (`node -v` to check — install via [nvm](https://github.com/nvm-sh/nvm) if needed)
- Git
- A [Supabase](https://supabase.com) account (free)
- A [Vercel](https://vercel.com) account (free)
- A [GitHub](https://github.com) account

---

## Step 1 — Clone & install

```bash
git clone https://github.com/your-org/fasolocal.git
cd fasolocal
npm install
```

---

## Step 2 — Create Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Name: `fasolocal` | Region: **EU West (Paris)** (best for GDPR + Burkina latency) | Password: save it
3. Wait ~2 minutes for the project to provision

---

## Step 3 — Initialise the database

In Supabase Dashboard → **SQL Editor** → **New query**:

**3a. Run the schema** — paste the full contents of `supabase/schema.sql` and click **Run**

**3b. Run the seed** — paste the full contents of `supabase/seed.sql` and click **Run**

**3c. Verify** — run this query to confirm:
```sql
SELECT 'sellers' as tbl, count(*) FROM sellers
UNION ALL SELECT 'products', count(*) FROM products
UNION ALL SELECT 'categories', count(*) FROM categories;
```
Expected: sellers=12, products=12, categories=5

---

## Step 4 — Create Storage bucket

In Supabase Dashboard → **Storage** → **New bucket**:
- Name: `product-images`
- Public bucket: ✅ ON
- File size limit: `5242880` (5MB)
- Allowed MIME types: `image/jpeg,image/png,image/webp`

Then in SQL Editor run the Storage policies section from `schema.sql`
(uncomment the INSERT and CREATE POLICY lines at the bottom of the file).

---

## Step 5 — Configure Auth

In Supabase Dashboard → **Authentication** → **Settings**:

- **Site URL**: `https://fasolocal.com` (or `http://localhost:3000` for local dev)
- **Redirect URLs**: add `https://fasolocal.com/**` and `http://localhost:3000/**`
- Email confirmations: ✅ ON (required for signup flow)
- **SMTP**: configure your email provider or use Supabase's built-in (limited to 3 emails/hour on free tier)

---

## Step 6 — Get your API keys

Supabase Dashboard → **Project Settings** → **API**:
- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## Step 7 — Configure local environment

```bash
cp .env.example .env
# Edit .env — fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

---

## Step 8 — Run locally

```bash
npm run dev
# Opens at http://localhost:3000
```

Test the full flow:
- Browse the catalog (should show 12 real products from Supabase)
- Sign up with an email address
- Confirm via the email link
- Add products to cart and proceed to checkout

---

## Step 9 — Push to GitHub

```bash
git init  # if not already a git repo
git add .
git commit -m "feat: FasoLocal v2 — initial commit"

# Create repo on GitHub (github.com/new), then:
git remote add origin https://github.com/your-org/fasolocal.git
git branch -M main
git push -u origin main
```

---

## Step 10 — Add GitHub Secrets

GitHub → your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret name | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API |
| `VERCEL_TOKEN` | vercel.com/account/tokens → Create Token |
| `VERCEL_ORG_ID` | Vercel Dashboard → Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel → your project → Settings → General → Project ID |

---

## Step 11 — Connect Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Framework preset: **Vite**
4. Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
5. Deploy

After the first manual deploy, all future deploys are automatic via GitHub Actions on push to `main`.

---

## Verification checklist

- [ ] `npm run dev` starts without errors
- [ ] `/boutique` shows real products from Supabase (not static data)
- [ ] Signup, email confirmation, and login all work
- [ ] Adding to cart and proceeding to `/commande` works
- [ ] GitHub push triggers the Actions workflow (check Actions tab)
- [ ] Vercel deployment URL is live and functional

---

## Next steps after setup

1. Replace static `data.js` calls in `Shop.jsx` and `ProductDetail.jsx` with live Supabase queries
2. Build the Seller Dashboard (`src/pages/SellerDashboard.jsx`)
3. Integrate CinetPay payments (Phase 2)
