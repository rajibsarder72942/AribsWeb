# AribsWeb

Company profile website for **ARIBS** (Oman). Bilingual: English + Arabic (RTL).

**Stack:** Astro 7 · Tailwind CSS 4 · TypeScript · ESLint · Prettier · Cloudflare Pages

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
public/              static files (favicon, robots.txt, _redirects)
src/config/site.ts   site-wide settings (name, WhatsApp number from env)
src/i18n/            en.json, ar.json, translation helpers
src/layouts/         BaseLayout (sets lang + dir=rtl for Arabic)
src/pages/en/        English pages  -> /en/...
src/pages/ar/        Arabic pages   -> /ar/...
src/styles/          Tailwind entry + placeholder theme colors
```

## Environment variables

All keys are listed in `.env.example`. Domain, WhatsApp number, recipient email and API keys
live only in env — never in code. On Cloudflare Pages, set them under
**Settings → Environment variables**.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22`
