# Square Money Hub

Design sandbox landing page for Square Money explorations — Checking/debit adoption → Banking overview → agentic Cash Desk.

Modeled on the appointments workstream hub IA (header eyebrows, display hero, numbered exploration/reference rows). Content is Square Money only.

## Local demo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (`/` route).

Production check:

```bash
npm run build
npm start
```

## Stack

- Next.js App Router + TypeScript
- Inter via `next/font`
- `robots: noindex, nofollow` in `app/layout.tsx`

## Ready for Vercel

1. Push this repo to GitHub (or connect the existing remote).
2. Import the project in [Vercel](https://vercel.com/new) — Framework Preset: **Next.js**.
3. Leave Build Command `npm run build` and Output as default (`.next`).
4. No env vars required for the static hub page.
5. Deploy; confirm `/` loads and exploration/reference links open in a new tab.
6. Optional: set a custom domain later; keep the deployment private/unlisted if preferred (page is already noindex/nofollow).

## Updating links

Exploration and reference URLs live in `app/page.tsx`. Paste newer Vercel (or other) URLs there when prototypes move.
