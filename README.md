# My Business Journal — Personal Business Blog CMS

Ultra-premium, editorial personal business blog with a separate VIP Admin Panel.
Warm ivory layout, deep-green + muted gold palette, Newsreader serif headlines,
Manrope UI, gold `$` logo, lightning storm only inside the hero panel.

## Features

- **Public site (no admin trace):** Home, About, Contact, post pages, categories,
  search, comments, Copy Link with absolute URL, share to Facebook / WhatsApp / X / LinkedIn.
  Category post counts are **never** shown publicly.
- **VIP Admin Panel — `/admin` only:** Dashboard, Posts, Write, Visitors,
  Categories, Comments, Settings, Env Variables. Dark deep-green sidebar with
  VIP badge, stat cards, 7-day traffic chart, category counts (admin-only),
  post publish / edit / delete, comment approve / delete, visitor tracking.
- **Design:** gold gradient top rule, frosted white sticky header, deep-green
  hero panel with gold hairline frame, gold Start Reading button, welcome
  headline, premium pill category chips, Latest Posts with gold eyebrow,
  deep premium shadows, solid deep-green footer with gold top border.

## Run locally

```bash
npm install
cp .env.example .env
# edit .env — set CONTACT_EMAIL, SITE_URL, ADMIN_EMAIL, and SESSION_SECRET
npm run dev
# open http://localhost:3000  — admin at http://localhost:3000/admin
```

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel (from GitHub)

1. Push this repo to GitHub (see below).
2. Go to https://vercel.com → **Add New → Project → Import** → choose
   `personal-business-blog-cms` from GitHub.
3. Framework preset: **Next.js**. Build command: `npm run build`.
4. Add environment variables in **Project → Settings → Environment Variables**
   (Production + Preview). See `.env.example` for the full list of 10:
   `NEXT_PUBLIC_SITE_NAME`, `AUTHOR_NAME`, `CONTACT_EMAIL`, `SITE_URL`,
   `ANALYTICS_ENABLED`, `COMMENTS_ENABLED`, `ADMIN_ROUTE`, `DATABASE_URL`,
   `ADMIN_EMAIL`, `SESSION_SECRET`.
   - Generate a secret with: `openssl rand -hex 32`
   - Never commit a real `.env` — it is gitignored.
5. Click **Deploy**. Vercel shows the live URL on the deployment page.

## Environment variables

| Variable | Scope | Notes |
|---|---|---|
| NEXT_PUBLIC_SITE_NAME | Public | My Business Journal |
| AUTHOR_NAME | Public | Farhan Islam |
| CONTACT_EMAIL | Public | Leave empty until set |
| SITE_URL | Public | Set to the Vercel URL after deploy |
| ANALYTICS_ENABLED | Public | true |
| COMMENTS_ENABLED | Public | true |
| ADMIN_ROUTE | Public | /admin |
| DATABASE_URL | Secret | file:./app.db (local) |
| ADMIN_EMAIL | Secret | Leave empty until set |
| SESSION_SECRET | Secret | Random 64-char hex, generated locally |

## Notes

- This is a GitHub-ready rebuild of the original Muse-hosted blog. Data is
  seeded in `lib/data.js` and admin edits are held in the browser session
  in this version; connect a real database for persistent multi-device data.
- The public site contains no link, button, or mention of the admin panel.
