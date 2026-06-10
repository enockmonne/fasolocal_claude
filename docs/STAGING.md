# Staging — Vercel + Neon setup

Goal: a stable public URL on `develop` branch that you can share with testers,
deploying automatically on every push.

## Final state

| Branch | Purpose | URL pattern | Database |
| --- | --- | --- | --- |
| `develop` | Staging — for testers and stakeholders | `fasolocal-staging.vercel.app` (custom alias) | Neon Postgres — `staging` branch |
| `master` | Production | `fasolocal.vercel.app` (or custom domain) | Neon Postgres — `main` branch |

PR previews also get unique URLs automatically (`fasolocal-git-<branch>-<team>.vercel.app`).

## One-time setup (you, in the dashboard)

I can't click through dashboards from here — these steps are yours.

### 1. Provision the database (Neon — recommended)

Neon's free tier includes branching, which is perfect for staging/prod isolation.

1. Sign up at https://neon.tech → create project `fasolocal` (region: Frankfurt / closest to BF)
2. The default branch is `main` → this becomes your **production DB**
3. Create a second branch from `main` named `staging` → this becomes your **staging DB**
4. From each branch's dashboard, copy the **pooled** connection string (looks like `postgresql://...neon.tech/neondb?sslmode=require`)
   - Save these — you'll paste them into Vercel below

Alternative: Supabase (Postgres only — we won't use Auth/Storage), Railway, or RDS. Neon is fastest to set up.

### 2. Connect the repo to Vercel

1. https://vercel.com → New Project → import `enockmonne/fasolocal_claude`
2. **Framework preset:** Next.js (auto-detected)
3. **Root directory:** leave as `.` (repo root — NOT `FasoLocalUpdate/`)
4. **Production branch:** `master`
5. Click Deploy — first build will fail (no env vars yet); that's fine

### 3. Set environment variables in Vercel

Project → Settings → Environment Variables. For each variable, choose which
environments it applies to (Production / Preview / Development).

| Variable | Production value | Preview value (staging) | Scope |
| --- | --- | --- | --- |
| `DATABASE_URL` | Neon `main` connection string | Neon `staging` connection string | both |
| `NEXTAUTH_SECRET` | generate with `openssl rand -base64 32` | different value, same way | both |
| `NEXTAUTH_URL` | `https://fasolocal.vercel.app` (or custom domain) | `https://fasolocal-staging.vercel.app` | both |
| `NEXT_PUBLIC_APP_URL` | same as NEXTAUTH_URL | same as NEXTAUTH_URL | both |
| `GOOGLE_CLIENT_ID` | from Google Cloud Console | from Google Cloud Console | both |
| `GOOGLE_CLIENT_SECRET` | from Google Cloud Console | from Google Cloud Console | both |
| `CINETPAY_API_KEY` | live key | sandbox key | both |
| `CINETPAY_SITE_ID` | live | sandbox | both |
| `CINETPAY_SECRET_KEY` | live | sandbox | both |

**Important:** in Vercel, "Preview" covers every non-production branch including
`develop`. To target `develop` specifically with a stable URL, use a Git Branch
filter on each variable: set Scope = Preview, then click "Configure Git Branch"
and pick `develop`.

### 4. Pin a stable staging URL

By default `develop` gets a URL like `fasolocal-git-develop-<team>.vercel.app`
which is stable but ugly. To get a nicer alias:

1. Project → Settings → Domains
2. Add `fasolocal-staging.vercel.app` (Vercel-owned subdomain, free)
3. Configure it to point at the `develop` branch
4. This is the URL you share with testers.

(Later, when you have a custom domain, do the same for `staging.fasolocal.bf` →
develop and `fasolocal.bf` → master.)

### 5. Push the schema to both DBs

```bash
# Staging
DATABASE_URL="<neon staging url>" npx prisma db push
DATABASE_URL="<neon staging url>" npm run db:seed   # once seed.ts exists

# Production
DATABASE_URL="<neon main url>" npx prisma db push
```

## Branching workflow

```
feature/* → PR → develop  (auto-deploys to staging URL)
develop   → PR → master   (auto-deploys to prod URL)
```

Never push directly to `master`. Tester feedback round-trip:
1. You push to `develop`
2. Vercel deploys to `fasolocal-staging.vercel.app` within ~60s
3. You share the URL
4. They give feedback
5. You iterate on `develop`, merge to `master` when stable

## What's wired today vs what's needed

- [x] `develop` branch exists on origin
- [ ] `.github/workflows/deploy.yml` rewritten for Next.js (in progress — see [HANDOFF.md](../HANDOFF.md))
- [ ] Vercel project connected to repo
- [ ] Neon project + branches created
- [ ] Env vars set in Vercel
- [ ] `prisma db push` run against both DBs
- [ ] Staging domain alias configured
- [ ] First successful `develop` deploy

## Cost note

- Neon free tier: 0.5 GB storage, 1 compute unit — sufficient for staging + a small prod
- Vercel Hobby: free for personal projects, 100 GB bandwidth/month — enough for early testing
- Upgrade to Vercel Pro ($20/mo) when you need team seats, analytics, or higher limits

Total: **$0/mo** to get a shareable staging URL up.
