# Agami by Haritha

A catalogue + brand story + WhatsApp-enquiry website for an Indian fancy jewellery brand. There is
no cart, checkout or online payment anywhere in this app — every product ends in **Enquire on
WhatsApp**.

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4, PostgreSQL via Drizzle ORM, and a
custom JWT-based admin auth.

## Project structure

```
/app
  /(public)          marketing site: home, /collection, /collection/[slug], /story, /contact
  /admin
    /login           public admin sign-in page
    /(dashboard)     protected: overview, products list, add/edit product
  sitemap.ts, robots.ts, not-found.tsx, error.tsx
/components
  brand/             Logo, Monogram, GoldDivider, BotanicalDecoration
  layout/             Header, Footer
  ui/                 Button, SectionHeading, Breadcrumbs, Badge
  product/            ProductCard, ProductGrid, ProductGallery, ProductMeta, CategoryFilter, SearchSort
  whatsapp/           WhatsAppButton, EnquiryButton
  story/              StorySection, PullQuote
  admin/              AdminSidebar, AdminHeader, AdminProductForm, ProductsTable, StatCard
/lib
  config/site.ts      brand name, nav, socials, WhatsApp number — single source of truth
  db/                 Drizzle schema, connection, query helpers
  auth/               session (JWT), password hashing, middleware guard
  whatsapp/           generateWhatsAppUrl()
  products/           form validation + server actions (create/update/delete/duplicate/toggle)
  storage/            image storage abstraction (URL entry today, Vercel Blob-ready)
/drizzle              generated SQL migrations
/scripts
  seed.ts                    seeds categories, one admin user, and 12 demo products
  generate-placeholders.mjs  regenerates the on-brand SVG placeholder imagery
/public/brand          logo, monogram, botanical & divider SVGs
/public/images         placeholder photography (see "Replacing demo images" below)
```

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Postgres

Any Postgres 14+ database works (local Postgres, [Neon](https://neon.tech), Vercel Postgres, etc.)
— the app talks to it over the standard Postgres wire protocol via `pg`, so nothing here is
Neon-specific.

Local option (macOS + Homebrew):

```bash
brew install postgresql@16
brew services start postgresql@16
createdb agami_dev
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in at minimum:

- `DATABASE_URL` — e.g. `postgres://youruser@localhost:5432/agami_dev`
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used once by the seed script to create your admin login
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — digits only with country code, e.g. `919876543210`

### 4. Run migrations and seed demo data

```bash
npm run db:migrate   # applies drizzle/*.sql to your database
npm run db:seed      # creates categories, the admin user, and 12 demo products
```

`db:seed` is safe to re-run — existing rows are matched by unique key (slug/sku/email) and skipped.

### 5. Start the dev server

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) with the
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set above.

### Database scripts reference

| Script | What it does |
|---|---|
| `npm run db:generate` | Generates a new SQL migration from `lib/db/schema.ts` after you edit it |
| `npm run db:migrate` | Applies pending migrations to `DATABASE_URL` |
| `npm run db:push` | Pushes schema directly without a migration file (prototyping only) |
| `npm run db:seed` | Seeds categories, admin user, and demo products |
| `npm run placeholders:generate` | Regenerates the SVG placeholder imagery in `public/images/placeholders` |

## Deploying to Vercel

1. Push this repo to GitHub.
2. Create a Postgres database (the [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   or [Neon](https://neon.tech) integrations both work) and copy its connection string.
3. Import the repo into Vercel and set these environment variables in **Project Settings → Environment
   Variables**:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_SITE_URL` (your production domain, e.g. `https://agamibyharitha.com`)
   - `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` (optional)
   - `BLOB_READ_WRITE_TOKEN` if you enable Vercel Blob for image uploads (see below)
4. Deploy. Then run migrations and seed once against the production database:
   ```bash
   DATABASE_URL="<production-url>" npm run db:migrate
   DATABASE_URL="<production-url>" ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run db:seed
   ```
5. Log in at `/admin/login` with the admin account you seeded, and start replacing demo content.

## Replacing demo images

`public/images/photos/` holds the real product photography currently in use (compressed WebP,
see "Adding/updating photos" below). Nothing here is a generated placeholder anymore — but the
photo↔slot assignments are provisional (real photos mapped to hero/category/story/product roles
without necessarily matching product content one-to-one). To refine them:

- **Product images**: in the admin, open a product and replace each image URL with the exact
  photo you want (see "Image hosting" below). The starred image is primary.
- **Hero / category / story imagery**: edit the paths referenced in
  `app/(public)/page.tsx`, `app/(public)/story/page.tsx`, and `app/(public)/contact/page.tsx`
  (search for `/images/photos/`).
- **Logo & brand marks**: `public/brand/*.svg` were recreated from the brand's colour palette and
  described visual language, since no logo file was provided during this build. If you have the
  actual Agami logo file, replace `agami-logo.svg`, `agami-logo-dark.svg`, `agami-monogram.svg`
  and `agami-wordmark.svg`, and update `components/brand/Logo.tsx` / `Monogram.tsx` if the new
  logo's proportions differ.
- **OG / social share image**: `public/images/og-default.jpg` (1200×630 JPG) — regenerate via
  `scripts/process-photos.sh` if you want a different source photo, and update `ogImage` in
  `lib/config/site.ts` if you change the filename.

### Adding/updating photos

Drop new source photos into `public/Other images/` or `public/Cover image/` (both gitignored —
never committed as raw originals), update the file mapping at the top of
`scripts/process-photos.sh`, then run:

```bash
npm run photos:process        # resizes (longest side 1600px) + converts to WebP @ q78
npm run db:update-images      # repoints existing seeded products at the new files (local DB)
```

To apply the same product-image update against production (where `DATABASE_URL` can't be pulled
locally — see "Tech notes"), set `RUN_IMAGE_UPDATE=true` as a Production environment variable in
Vercel, push/redeploy once, then remove the variable.

## Image hosting

Product images are always stored as **URLs** in Postgres, never as binary data. `lib/storage/index.ts`
is the single abstraction point for turning an upload into a URL:

- **Today**: paste any public image URL directly into the admin product form.
- **Vercel Blob**: set `BLOB_READ_WRITE_TOKEN` (from the Vercel Blob integration) and
  `uploadProductImage()` in `lib/storage/index.ts` will use it — wire up a file input in
  `AdminProductForm` to call it via a server action when you're ready.
- **Cloudinary / S3**: implement the same `uploadProductImage(file): Promise<{ url }>` contract in
  `lib/storage/index.ts` — nothing else in the app needs to change.

## WhatsApp enquiries

Every enquiry CTA calls `generateWhatsAppUrl()` (`lib/whatsapp/index.ts`), which builds a
`https://wa.me/<NEXT_PUBLIC_WHATSAPP_NUMBER>?text=<encoded message>` link. Product pages pass the
product name, SKU and URL to pre-fill a message like:

> Hi Haritha, I'm interested in the Kundan Jhumka Earrings (Product Code: AG-ER-001). Could you
> please share more details and availability?

The number is never hard-coded — it always comes from `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## What I need to configure before production

- [ ] **`DATABASE_URL`** — a real, production Postgres connection string.
- [ ] **`AUTH_SECRET`** — a freshly generated random secret (don't reuse the local dev one).
- [ ] **`ADMIN_EMAIL` / `ADMIN_PASSWORD`** — set before running `db:seed` against production; change
      the password afterwards if you'd like a different one than what was seeded.
- [ ] **`NEXT_PUBLIC_WHATSAPP_NUMBER`** — the real WhatsApp Business number that should receive
      enquiries.
- [ ] **`NEXT_PUBLIC_SITE_URL`** — the production domain, used in metadata, OpenGraph and the sitemap.
- [ ] **Image storage** — decide whether to use Vercel Blob (`BLOB_READ_WRITE_TOKEN`) or another
      provider for product photography, and replace the demo images.
- [ ] **Social links** — `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` in the environment,
      plus the real logo files described above.

## Tech notes

- **Styling**: Tailwind CSS v4, theme tokens defined as CSS variables in `app/globals.css`
  (`@theme inline`). Fonts: Cormorant Garamond (display), Libre Baskerville (long-form copy), DM
  Sans (UI).
- **Database**: Drizzle ORM over `pg` (works identically against local Postgres, Neon, or Vercel
  Postgres — no serverless-only driver lock-in).
- **Auth**: admin sessions are signed JWTs (`jose`) in an httpOnly cookie, verified in
  `middleware.ts` for every `/admin/*` route (except `/admin/login`) and again inside each server
  action as defense-in-depth. Passwords are hashed with `bcryptjs`.
- **No cart/checkout**: intentionally absent — the catalogue exists purely to drive WhatsApp
  enquiries.
- **Production env vars are write-only**: Vercel stores env vars (including Neon's
  auto-injected `DATABASE_URL`) as "sensitive" by default — they inject fine at build/runtime but
  can't be pulled back down locally (`vercel env pull` returns empty values for them). Because of
  this, `npm run vercel-build` (see `package.json`) runs `drizzle-kit migrate` on every deploy, and
  can conditionally run the one-off `db:seed` / `db:update-images` scripts when `RUN_SEED` /
  `RUN_IMAGE_UPDATE` are set to `"true"` in Vercel — set the flag, redeploy once, then remove it.
- **Vercel project settings that matter**: Framework Preset must be **Next.js** (if a project was
  ever created/imported with it set to "Other", every route 404s — the build succeeds but Vercel
  serves it as a static site from `public/`, ignoring the Next.js server build entirely). Also
  worth knowing: Vercel's Deployment Protection (SSO wall) defaults to *on* for non-custom-domain
  URLs on new projects — disable it (`vercel project protection disable <project> --sso`) if the
  `*.vercel.app` URL should be publicly visible.
