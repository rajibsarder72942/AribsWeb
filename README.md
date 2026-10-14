# AribsWeb

Company profile website for **ARIBS** (Oman). Bilingual: English + Arabic (RTL).

**Stack:** Astro 7 · Tailwind CSS 4 · TypeScript · ESLint · Prettier · Node.js (`@astrojs/node`, standalone) on Hostinger

## Requirements

- Node.js `>=22.12` (see `.nvmrc`)

## Getting started

```bash
npm install
cp .env.example .env   # fill in values locally; never commit .env
npm run dev            # http://localhost:4321  (redirects to /en/)
```

## Scripts

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the local dev server                      |
| `npm run build`        | Type-check (`astro check`) and build to `dist/` |
| `npm run preview`      | Serve the built `dist/` locally                 |
| `npm run lint`         | Run ESLint                                      |
| `npm run format`       | Format all files with Prettier                  |
| `npm run format:check` | Check formatting (CI-friendly)                  |

## Project structure

```text
public/                    static files (favicon)
src/config/site.ts         site settings (name, CR number, nav, env-driven WhatsApp/noindex)
src/i18n/                  en.json, ar.json, translation + locale path helpers
src/styles/global.css      Tailwind entry, design tokens, self-hosted fonts (@fontsource)
src/layouts/BaseLayout     <html lang/dir>, SEO head (canonical, hreflang, Open Graph)
src/components/            Header (nav, mobile menu, language switcher), Footer,
                           WhatsAppButton, PlaceholderPage
src/pages/[locale]/        one file per page, built for both /en/... and /ar/...
src/pages/robots.txt.ts    robots.txt (Disallow all when PUBLIC_NOINDEX=true)
```

### Design notes

- Colours and fonts are tokens in `src/styles/global.css` (`surface`, `ink`, `primary`, `accent`…).
  Replace the values there when brand assets are ready.
- Use logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`) instead
  of left/right so Arabic (RTL) works without duplicate styles.
- Fonts: Inter (Latin) and IBM Plex Sans Arabic, self-hosted via `@fontsource` (no Google Fonts CDN).

## Environment variables

| Key                                                                                   | Purpose                                                                 |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `PUBLIC_SITE_URL`                                                                     | Full site URL, used for canonical/hreflang/Open Graph URLs              |
| `PUBLIC_WHATSAPP_NUMBER`                                                              | Digits only, e.g. `9689XXXXXXX`; empty hides the WhatsApp button        |
| `PUBLIC_NOINDEX`                                                                      | `true` on staging → `noindex, nofollow` meta + robots.txt `Disallow: /` |
| `PUBLIC_TURNSTILE_*`, `TURNSTILE_SECRET_KEY`, `SMTP_*`, `CONTACT_*`, `RESEND_API_KEY` | Contact form (later phase)                                              |

All keys are listed in `.env.example`. Domain, WhatsApp number, recipient email and API keys
live only in env — never in code. On Hostinger, set them in the Node.js app's
**Environment variables** section.

## Deploy (Hostinger Business Web Hosting — Node.js app)

Pages are prerendered to static HTML; the Node server (`@astrojs/node`, standalone mode) serves
them and will run on-demand routes such as the contact form API. `/` redirects to `/en/`.

1. In hPanel, open **Websites → Add website → Node.js Apps** (or the site's **Node.js** section) and
   connect this GitHub repository (or upload the project files).
2. Set **Node.js version** to **22.x** (22.12 or newer).
3. **Build command:** `npm ci && npm run build`
4. **Start command:** `npm start` (runs `node ./dist/server/entry.mjs`)
5. **Environment variables:** add every key from `.env.example` with real values
   (`PUBLIC_SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`, Turnstile keys, `SMTP_*`, `CONTACT_TO_EMAIL`,
   `CONTACT_FROM_EMAIL`). `PUBLIC_*` values are baked in at build time, so rebuild after changing them.
   On staging (e.g. `staging.aribs.net`) set `PUBLIC_NOINDEX=true`; leave it unset in production.
   Hostinger normally provides `PORT`; the server also reads `HOST` (use `0.0.0.0`).
6. Deploy, then check that `/`, `/en/` and `/ar/` load on your domain.

Test the production build locally:

```bash
npm run build
npm start              # http://localhost:4321
```
