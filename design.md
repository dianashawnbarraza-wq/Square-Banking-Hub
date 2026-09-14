# Square Banking Hub — design.md

Working guide for product UI in this sandbox (Checking, Banking Overview, Cash Desk tax).
It is **not** official Square Market Design System documentation. Where this file and
Figma disagree, **Figma wins**.

Written for whoever builds next — human or agent.

## Source of truth

| What | Where |
| --- | --- |
| **Monochrome UI System** (canonical) | [Square-Monochrome-UI-System](https://www.figma.com/design/h8cTguFsJdZqirJUR2cBVm/Square-Monochrome-UI-System?node-id=0-1) |
| **Components catalog** (start here) | Same file · frame [`components`](https://www.figma.com/design/h8cTguFsJdZqirJUR2cBVm/Square-Monochrome-UI-System?node-id=9-1361) `9:1361` |
| Checking product flows | Same file · frames Welcome, Banking home, Deposit, Transfer, Tracker, Card numbers |
| Portfolio Banking reference | [Portfolio · Banking](https://www.figma.com/design/1dSTyZctUteozMk19tEPid/Portfolio?node-id=1672-6534) |

Hub landing (`/`) uses its own paper chrome. Do **not** apply Monochrome to the hub index.

## Priority order

When two goals conflict, the higher one wins.

1. **Compose from Monochrome components** named in Figma (Button, Row, Mobile Native Header, …).
2. **Tokens from Figma variables** — semantic/primitive CSS vars only; no new hex in screens.
3. **Match product frames** for layout and copy (Checking / Portfolio).
4. **Then polish** spacing and motion.

Never invent parallel patterns (location pills, black balance cards, emoji icons, one-off CTA styles) when a catalog component exists.

## What “using Monochrome” means here

This repo does **not** yet import an npm Square DS package. Until it does:

1. Implement shared React components under `components/monochrome/` with the **same names** as Figma.
2. Screens (`app/checking/**`, `app/cash-desk/**`) **compose** those components — they must not redefine Button/Row/Header styles locally.
3. Tokens live in one CSS file consumed by those components (`components/monochrome/tokens.css` or equivalent).
4. Icons come from Figma exports / catalog symbols — never Lucide/emoji stand-ins when a Monochrome glyph exists.

Honest state: `/checking` was first built as flattened markup. Treat that as debt; new work and refactors must go through the component layer.

## Catalog inventory (`components` · `9:1361`)

Use these names in code and in prompts.

### Layout / navigation

| Figma name | Role | Catalog node |
| --- | --- | --- |
| **Mobile Native Header** | Balance card: account · last4, display $, subtitle, Deposit/Transfer/Pay | `86:3473` |
| **Paging tabs** | Underline account/product tabs | `85:2756` |
| **Selectors** | Segmented / chip selectors | `85:2755` |

### Actions

| Figma name | Role | Notes |
| --- | --- | --- |
| **Button** (`Deposit` instances in catalog) | Primary / secondary / tertiary CTAs | Primary uses `emphasis/fill` `#101010` + inverse text; secondary on cards uses `fill/40` `#f0f0f0`. Min-height 48 (md) / 40 (sm). Pill radius ~62. Notion: Button docs linked from Figma. |
| Icon **Button** (header) | Settings / trailing header actions | 48×48 |

### Lists & forms

| Figma name | Role | Catalog node |
| --- | --- | --- |
| **Row** | List rows (leading accessory, primary/secondary text, trailing chevron) | `86:8197`, `86:8214` |
| **Text field** | Inputs | `86:8171`, `86:8192`, `86:8173` |
| **Select** | Selects | `86:8172` |
| **Toast** | Transient success/info | `73:1428` |

### Accessories & icons (non-exhaustive)

Trailing accessory, Leading accessory, Chevron down/right, Settings, Plus, Copy, Search, Bank, Scan, Bill-Pay, Transfer, Savings, Debit Card, Checkmark circle, Square Logo, Cash app, Zelle, Trend Up/Down, download/upload, Card swipe, …

## Tokens (from catalog / Mobile Native Header)

Map Figma → CSS custom properties. Components consume **only** these vars (or aliases).

### Color

| Token | Value | Use |
| --- | --- | --- |
| `text/10` | `#000000e5` | Primary text |
| `text/black` | `#000000e5` | Body on light |
| `text/inverse` | `#ffffff` | On emphasis fill |
| `fill/40` | `#f0f0f0` | Secondary CTA, icon boxes, card chrome |
| `fill/10` | `#000000e5` | Strong fill |
| `emphasis/fill` | `#101010` | Primary button |
| `emphasis/text` | `#101010` | Emphasis ink |
| `surface/10` | `#ffffff` | Card / sheet surface |
| `divider/20` | `#f0f0f0` | Row dividers |
| `Success/Fill` | `#00B23B` | Success (toast/icon) |

Muted secondary text in UI is ~`rgba(0,0,0,0.55)` (Text/20 family) — prefer a semantic alias `--mono-text-secondary` rather than scattering raw rgba.

### Spacing (required)

**Unit = 8px. Between page items = 16px.**

| Token | CSS | Value | Use |
| --- | --- | --- | --- |
| unit / `spacing-100` | `--mono-space-unit` / `--mono-space-100` | **8px** | Related elements inside a component or card (icon↔label, CTA row gap, tight stacks) |
| page / `spacing-200` | `--mono-space-page` / `--mono-space-200` | **16px** | Space **between** top-level page items (header → tabs → balance card → tracker → activity → …) |
| `spacing-25` | `--mono-space-25` | 2px | Title↔subtitle inside a Row only |
| `spacing-300` | `--mono-space-300` | 24px | Sheet chrome / large insets only (3× unit) |

Rules:

1. Put `.mono-page-stack` on the main scroll column so children get **16px** gap automatically.
2. Inside cards/components use **8px** (`--mono-space-unit`) or `.mono-cluster`.
3. Do **not** invent 12px / 20px / arbitrary gaps for page rhythm. Prefer 8 or 16 (or 24 as 3×8 for sheets).
4. Page horizontal inset stays **16px** (`--mono-space-page`).

| Also | Value |
| --- | --- |
| wide-md horizontal / vertical (button padding) | 20 / 12 |
| `radius-100` | 6px |
| `Monochrome updates/radius-cards` | 12px |
| Button pill | ~62px (full pill) |
| Min-height md / sm | 48 / 40 |

### Type

| Role | Family | Spec |
| --- | --- | --- |
| Display balance | Square Sans Display Bold | 32 / 40 (`Display/10`) |
| Heading / tabs | Square Sans Display Bold | 19 / 26 (`Heading/20`) |
| Paragraph 30 | Square Sans Display Medium | 16 / 24 |
| Paragraph 20 | Square Sans Text / Cash Sans Medium | 14 / 22 |
| Paragraph 10 | Square Sans Text Regular | 12 / 18 |

If Square/Cash Sans are not licensed in this sandbox, use the closest already-loaded geometric sans and document the substitution — do not switch to Inter for product chrome without noting it here.

## Screen composition rules

### Banking home / Checking

Top → bottom:

1. Status bar (prototype chrome only)
2. Page title **Banking** + header icon Button(s)
3. **Paging tabs** (Checking / Savings / …)
4. **Mobile Native Header** (white card, not black)
5. Card tracker / insight as **Row**(s) or catalog patterns
6. Activity list as **Row**(s)
7. Tab bar (product chrome)

Sheets (Deposit, Transfer, Welcome): compose **Button**, **Row**, **Text field** / **Select** — do not invent sheet chrome that fights Monochrome radius and fills.

### Tax / Cash Desk

Reuse the same Banking shell (Paging tabs + Mobile Native Header + Rows). Slot tax insight into an existing Row / CTA pattern. Do not invent location segmented controls unless they appear in the Monochrome catalog or the target Figma frame.

## Agent workflow (required)

1. Open the **components** frame (`9:1361`) or the specific product frame node.
2. `search_design_system` / `get_design_context` on the **component instance**, not only the whole screen.
3. Reuse or extend `components/monochrome/*` before writing new CSS.
4. After UI changes, check the running route in the browser against the Figma screenshot.
5. Update this file when you discover a new catalog component or token — keep the inventory honest.

## Anti-patterns

- Hardcoding hex in page components
- Recreating Button/Row as anonymous `div`s with one-off classes
- Black balance cards or location pills not in the target frame
- Material / iOS kit visuals leaking into Square product UI
- Emoji or generic icon packs when a catalog icon exists
- Applying Monochrome tokens to the hub landing page

## Code Connect

Figma Code Connect requires an Org/Enterprise Dev or Full seat. Until that is available, this `design.md` + `components/monochrome` naming is the mapping layer. When Code Connect works, map published components to those React modules — do not invent a second naming scheme.
