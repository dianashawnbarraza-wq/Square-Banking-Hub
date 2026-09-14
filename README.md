# Square Banking Design Hub

Cash flow design hub — Checking Adoption (SPOS), Banking overview, agentic Cash Desk, and tax set-aside.

Modeled on the appointments workstream hub IA (header eyebrows, display hero, numbered exploration/reference rows).

## Local demo

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (`/` route).

Tax Set-Aside Cash Desk variant: [http://localhost:3000/cash-desk/tax](http://localhost:3000/cash-desk/tax).

Square Checking (from Figma): [http://localhost:3000/checking](http://localhost:3000/checking) · card numbers at `/checking/card`.

Production check:

```bash
npm run build
npm start
```

## Design system

Product screens (Checking, tax, etc.) follow [`design.md`](./design.md) and the Figma [Square Monochrome UI System](https://www.figma.com/design/h8cTguFsJdZqirJUR2cBVm/Square-Monochrome-UI-System?node-id=9-1361) **components** catalog. Shared primitives live in `components/monochrome/`.

## Stack

- Next.js App Router + TypeScript
- Inter via `next/font` (hub); Monochrome product chrome prefers Square/Cash Sans when available
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
