# Portfolio Theme Specification

Visual identity for **imanina.vercel.app**: a futuristic, operations-console look that fits work on dashboards for traffic, transit and maintenance teams.
Dark is the default theme. Light is opt-in through the header toggle, and the choice is saved in `localStorage` under the key `theme`.

All values below match `src/app/globals.css`. Tokens are CSS custom properties on `:root`, and the light theme overrides them under `:root[data-theme="light"]`. Section styles live in CSS Modules beside each component in `src/components/portfolio/`; they use these tokens and never hard-code a theme colour.

**Theme mechanics.** An inline script in `<head>` (`THEME_INIT_SCRIPT` in `src/lib/theme.ts`) reads `localStorage.theme` and sets `data-theme` before first paint, so a saved light theme never flashes dark. The toggle updates the attribute, storage and `<meta name="theme-color">`, and crossfades the page with the View Transitions API where supported (skipped for reduced motion).

---

## 1. Brand principles

| Principle | In practice |
|---|---|
| **Signal, not noise** | One primary accent (volt lime) marks action and focus. Ice blue is for data. Everything else is neutral. |
| **Operational clarity** | Dense information sits in glass panels with clear hierarchy, status dots and tabular numbers. |
| **Motion with purpose** | Animation shows state: traffic moving, live data, items coming into view. Nothing loops just for decoration. |
| **No orange, no AI gradients** | No orange as the primary colour and no purple-to-blue hero gradients. |

---

## 2. Typography

| Role | Family | Weights | Token |
|---|---|---|---|
| Display / headings / numbers / labels | **Oxanium** | 500, 600, 700, 800 | `--font-display` |
| Body / UI text | **Outfit** | 300, 400, 500, 600 | `--font-body` |
| Icons | **Lucide** (`lucide-react`), 1.75 stroke | — | — |

Fonts are self-hosted with `next/font/google` as variable fonts (`display: swap`) and exposed as `--font-oxanium` / `--font-outfit`, which feed `--font-display` / `--font-body`. The stroke width is set once, in CSS, on `.lucide`. Lucide 1.x has no brand logos, so the GitHub and LinkedIn marks are inline SVG (`components/portfolio/icon.tsx`).

| Style | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero (`--fs-hero`) | `clamp(2.9rem, 1.2rem + 7.2vw, 7rem)` | 700 | 0.95 | −0.035em |
| Section title (`--fs-h2`) | `clamp(2rem, 1.2rem + 3.2vw, 3.75rem)` | 700 | 1.05 | −0.03em |
| Card title (`--fs-h3`) | `clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)` | 700 | 1.05 | −0.025em |
| Lead text (`--fs-lg`) | `clamp(1.0625rem, 1rem + .3vw, 1.25rem)` | 300 | 1.6 | 0 |
| Body | 16px | 400 | 1.6 | 0 |
| Kicker / label | 12–13px, uppercase | 600 | — | +0.12–0.14em |

Numbers (stats, metrics, counters, clock, years) use `font-variant-numeric: tabular-nums` so they do not jitter while counting. Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`.

---

## 3. Colour tokens

### Brand accents (shared)

| Token | Value | Use |
|---|---|---|
| `--volt` | `#C8FF3D` | Primary buttons, active nav, focus rings, highlights, progress bar |
| `--volt-ink` | `#0A0D03` | Text on volt backgrounds (16.6:1) |
| `--ice` | `#7CE7FF` | Data, secondary highlights, completed status |
| `--violet` | `#B6A4FF` (dark) / `#6D55E0` (light) | "In progress" status, third data series |
| `--mute` | `#8C94A3` (dark) / `#8A919C` (light) | "Concept" status, inactive markers |

Use `--volt` and `--ice` as **backgrounds and fills**. For **text and icons**, use `--volt-fg` and `--ice-fg`, which switch to darker shades in the light theme.

### Surfaces and text

| Token | Dark (default) | Light |
|---|---|---|
| `--bg` | `#06070A` | `#F3F4EF` |
| `--bg-2` | `#0B0D12` | `#EBECE6` |
| `--surface` (dialogs) | `#0A0C11` | `#FAFBF7` |
| `--card-1` → `--card-2` (card gradient) | `#10131A` → `#0A0C11` | `#FFFFFF` → `#F6F7F2` |
| `--cell` (metric cells) | `#0D1016` | `#FAFBF7` |
| `--glass` (panels) | `rgba(255,255,255,.035)` | `rgba(255,255,255,.6)` |
| `--line` / `--line-2` (borders) | `rgba(255,255,255,.08 / .15)` | `rgba(12,14,18,.09 / .16)` |
| `--text` | `#EEF1F5` | `#0E1014` |
| `--text-2` (secondary) | `#A5ABB8` | `#4A505B` |
| `--text-3` (muted) | `#7C8392` | `#646A75` |
| `--volt-fg` (accent text) | `#C8FF3D` | `#4C7A00` |
| `--ice-fg` (data text) | `#7CE7FF` | `#0A6E8F` |
| `--header-bg` (scrolled header) | `rgba(6,7,10,.72)` + blur 16px | `rgba(243,244,239,.78)` + blur 16px |
| `--backdrop` (dialog scrim) | `rgba(3,4,6,.75)` + blur 8px | `rgba(30,34,40,.4)` + blur 8px |

### Effects

| Token | Dark | Light |
|---|---|---|
| `--spot` (cursor spotlight) | `rgba(200,255,61,.07)` | `rgba(124,180,0,.08)` |
| `--glow-1` / `--glow-2` (contact glow) | volt .28 / ice .10 | lime .45 / ice .25 |
| `--volt-glow` (hero accent word) | `0 0 40px rgba(200,255,61,.35)` | none |
| `--grain` (noise overlay) | .05 | .035 |
| `--shadow-card` | `0 -24px 60px -24px rgba(0,0,0,.95)` | `0 -18px 50px -24px rgba(20,24,30,.22)` |
| `--shadow-dialog` | `0 40px 140px -20px rgba(0,0,0,.9)` | `0 40px 120px -30px rgba(20,24,30,.4)` |
| Background grid dots (`--field-dot`, `--field-dot-a`) | white at .07 | ink at .09 |

**Screens always stay dark.** Project visuals and interface sketches use dark "device screen" colours in both themes, so they read as screens on a desk. They are tokens: `--screen` (`#0C0F15`) and `--screen-ink` (`#090B10`).

**The portrait follows the theme.** In dark it is a night scene (moon, lit windows, screen glow). In light it is a day scene: blue sky with sun and clouds, a sunbeam across the room, warm walls, a light desk, no window lights and a softer screen glow. The scene colours are `--pt-*` variables in `hero-portrait.module.css`, overridden under `:root[data-theme="light"]`, and cross-fade in 0.5s. Only the scene changes; the subject and the volt laptop mark stay the same.

### Contrast (WCAG 2.1)

| Pair | Dark | Light |
|---|---|---|
| `--text` on `--bg` | 17.8:1 | 17.2:1 |
| `--text-2` on `--bg` | 8.7:1 | 7.3:1 |
| `--text-3` on `--bg` | 5.3:1 | 4.9:1 |
| `--volt-fg` on `--bg` | 17.1:1 | 4.6:1 |
| `--ice-fg` on `--bg` | 14.1:1 | 5.2:1 |
| `--volt-ink` on `--volt` | 16.6:1 | 16.6:1 |

All body-text pairs meet **AA (4.5:1)**. In the light theme, avoid putting `--volt-fg` text on `--bg-2` (4.3:1). Use it on `--bg`, `--surface` or white.

### Status colours

| Status | Dot colour |
|---|---|
| Prototype / live | `--volt` |
| Completed | `--ice` |
| In progress | `--violet` |
| Concept | `--mute` |

Each status shows a 7px dot with a matching 10px glow next to a text label. Colour is never the only signal.

---

## 4. Shape, spacing and layout

| Token | Value |
|---|---|
| `--r` (small radius) | 14px |
| `--r-lg` (panel radius) | 22px |
| Project cards / contact card | 28px / 32px |
| Buttons, chips, nav pills | 999px (full pill) |
| `--wrap` (max content width) | 1240px |
| `--gutter` | `clamp(16px, 4vw, 40px)` |
| `--header-h` | 72px |
| Section spacing | `clamp(80px, 11vw, 150px)` top and bottom |

The logo mark is a hexagon (`clip-path` polygon) in volt with the `IM` monogram in Oxanium 700. The same hexagon appears on the portrait's laptop.

**Breakpoints:** 1080px (hero and cards stack to one column), 900px (bottom tab bar replaces the header links; stacked-card effect off), 560px (compact cards; full-screen dialog). The layout holds down to **320px** with no horizontal scroll.

**Touch targets.** On coarse pointers, icon buttons, small buttons and filter chips grow to 44px.

**Scroll.** `scrollbar-gutter: stable` on `<html>` stops the page shifting when the case dialog locks scroll.

---

## 5. Components

| Component | Dark | Light |
|---|---|---|
| **Primary button** | volt background, volt-ink text, 48px tall, glow on hover | Same |
| **Ghost button** | glass background, `--line-2` border; volt border and text on hover | Same tokens |
| **Glass panel** | glass background, 1px line border, volt glow on the border that follows the cursor | White glass panel with the same glow |
| **Header** | Flush at the top; after 10px of scroll the bar floats as a frosted capsule (8px inset, `--header-bg`, `--line` border, `--shadow-chip`) and the logo mark shrinks to 34px. Right side: "Let's talk", then one glass tools pill holding the MYT clock (hidden below 1120px), the Résumé PDF and the theme toggle. Below 1080px the wordmark hides and links tighten so the bar stays on one line | Same |
| **Nav** | Glass pill; each link has its section icon (15px, the same icons as the mobile tab bar, from `section-icons.ts`) before its label; a volt indicator slides to the active section (0.45s `--ease`) and clears on the hero and contact. Active section is position-based: the last section whose top has passed 45% of the viewport, or the last section at the page bottom | Same |
| **Mobile tab bar** (≤900px) | Replaces the header links. Fixed frosted capsule 8px above the safe area, five tabs (Roles, Projects, Archive, Experience, Contact) with a 20px icon over an 11px label; the active tab gets a volt pill behind its icon and a `--volt-fg` label. Always visible (sticky); it never hides on scroll. `body` gets matching bottom padding so it never covers content. Header keeps the logo plus the Résumé/theme tools pill | Same |
| **Project card** | Sticky stack (top offset `72 + 16 + i×14px`); earlier cards shrink to 95% and dim to 65%. Stacking only turns on when every card fits the viewport below its offset, so no card's lower half is ever trapped under the next; otherwise the cards scroll normally | Same, with a softer shadow |
| **Role card** | Rows share tracks via CSS subgrid, so icon, title, description, skill pills and the "See it in" footer align across cards. The title stays on one line: it sizes to the card with container units (`clamp(1.1rem, 7.2cqi, 1.6rem)`), and a qualifier such as "(Software)" is set at 0.68em in `--text-3`. The footer sits on a solid `--line-2` rule | Same |
| **Skill radar** | One axis per skill group, plotted at the group's average (1–5). Five recessive level rings, `--line` spokes, a `--volt-fg` 2px outline over a 16% volt fill, 9px points with a 2px `--surface` ring. Every axis label shows name and value in text tokens; points have a native tooltip. Single series, so no legend. The meters below are its table view. Scales in from the centre on scroll | Fill drops to 14% of `--volt-fg` |
| **Skill meter** | Five 6px pill segments with a 3px gap; filled segments use `--volt-fg`, empty ones `--line-2`. Name left, level word (Learning → Expert) right, so colour is never the only signal. `role="meter"` with `aria-valuetext`. Fills in left to right on scroll | Same; `--volt-fg` keeps 3:1 against the light surface |
| **Footer** | Four columns (brand + bio + availability, Navigate, Elsewhere, Based in + live MYT clock) over a bottom bar (© and Back to top). Volt hairline fading from the top-left edge | Same |
| **Metric cell** | Oxanium 700 number with a muted 12.5px label | Same |
| **Dialog** | `--surface`, 26px radius, blurred backdrop | Same |
| **Theme toggle** | 40px icon button: moon in dark, sun in light (icon chosen by CSS, so it is right before hydration) | — |
| **Archive row** | Year, title and summary, stack, status, arrow. Rows with a case study are links to `#case/<id>`. On tablet and phone the stack is dropped but the status stays under the title | Same |
| **Case dialog** | Native `<dialog>`; deep link `#case/<id>`; arrow keys step between cases; copy-link button; Back closes it | Same |

---

## 6. Motion

| Token / effect | Value |
|---|---|
| `--ease` | `cubic-bezier(.16, 1, .3, 1)` (expo-out) |
| Fade-up on scroll | 20px rise, 0.7s, stagger 0.04–0.1s. Checked every scroll frame by position (not IntersectionObserver), so anything passed by a fast scroll or nav jump is revealed immediately. Content is visible by default; only elements below the fold on load are hidden (`data-reveal="hidden"`), then revealed, so there is no flash and no dependence on JS |
| Hero headline | line-by-line rise, 1.1s, 0.1s stagger |
| Role text | scrambles to the next role every 2.8s |
| Background canvas | dot grid plus light streaks moving along grid lanes (like traffic); dots react to the cursor. The static grid is cached offscreen; only near-cursor dots and streaks redraw. Pauses while the page is actively scrolling and when the tab is hidden |
| Portrait | blinks, screen-glow flicker, twinkling city lights, rising steam, 3D tilt on hover |
| Buttons | slight pull toward the cursor (desktop only) |
| Counters | count up once when scrolled into view; the final value is in the server HTML |
| Project sketches | draw in when scrolled into view (`data-inview`), then run live-data loops (blink, ping, flow) |
| Archive filter | newly shown rows rise in; the "Showing X of Y" line is a polite live region |
| Theme switch | page crossfade (View Transitions) |

When `prefers-reduced-motion: reduce` is set, all loops stop, scroll reveals show immediately, the background draws once, the stacked-card effect is off, the role text stops cycling, and the portrait's SVG animations pause. Pointer effects only run on fine-pointer (mouse) devices.

---

## 7. Do and don't

**Do**
- Keep one volt element as the focal point per view.
- Use `--volt-fg` and `--ice-fg` for coloured text so it stays readable in both themes.
- Write short, plain copy.
- Keep project visuals dark in both themes.

- Keep every interactive element reachable by keyboard, with the volt focus ring.
- Show state with a label as well as colour (status dots always carry text).

**Don't**
- Don't use orange, or purple-to-blue gradients.
- Don't put volt text on light backgrounds; use `--volt-fg`.
- Don't add new accent colours; extend with opacity variations of the existing tokens.
- Don't animate anything that doesn't communicate state.

---

## 8. Accessibility

- Skip link to `#main`; one `<h1>`; each section labelled by its heading.
- Case links in work cards have one tab stop (the "Case study" button); the image link is a mouse shortcut and hidden from assistive tech.
- The animated role line is `aria-hidden`; the full list of roles is available to screen readers.
- The case dialog uses the native modal `<dialog>`: focus is trapped, Esc closes, focus returns to the opener, and the tab title changes to the open case.
- The theme button label always names the action ("Switch to light mode" / "Switch to dark mode").
- The mobile tab bar is a labelled `<nav aria-label="Sections">`; the current tab carries `aria-current="location"`, and every tab is at least 52px tall.
