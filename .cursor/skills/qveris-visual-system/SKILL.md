---
name: qveris-visual-system
description: >-
  QVeris dark visual system for public pages and overlays. Tokens, surfaces, typography, motion, responsive, SEO-by-page-type, and dark-mode adaptations for qveris.ai / qveris.cn.
---

# QVeris Visual System

Exact CSS values and copy-paste recipes → [references/tokens.md](references/tokens.md).

## Scope

**Apply to**: homepage, pricing, about, security, ecosystem, docs landing, campaign pages, for-agents, playground (`/playground/*`), etc.

**Do not blindly apply to**: dashboards, settings, admin, forms-heavy flows, legal pages. Reuse tokens selectively.

## Core Principles

1. Depth through layered gradients + tinted borders — no flat fills
2. Brand gradient (aqua → indigo) marks interactive surfaces only
3. Protocol colors: Discover `#38D39F`, Inspect `#FFC24B`, Call `#2AA8FF`
4. Dark-only public palette unless explicitly changed
5. Motion explains the product — no decorative blobs/particles

## Implementation Rules

- **Stack**: Next.js 15 + React 19 + Tailwind 4. Prefer Tailwind utilities + CSS vars
- Server Components by default; `"use client"` only for hooks/events/browser APIs
- All user-facing text via `t()` — no hardcoded English
- `next/image` for images, `Metadata` / `generateMetadata` for SEO
- Changes to auth/payment/pricing/SEO/i18n → also read `multi-region` skill

## Token Summary

Full `:root` block in [tokens.md](references/tokens.md). Key values:

| Category | Values |
|----------|--------|
| Backgrounds | `--qv-bg: #05070B`, `--qv-bg-2: #08111C`, `--qv-panel: rgba(10,14,22,0.88)` |
| Text | `--qv-text-1` 0.97, `--qv-text-2` 0.74, `--qv-text-3` 0.48, `--qv-text-4` 0.36 (all `rgba(255,255,255,N)`) |
| Brand | aqua `#34E3F4`, sky `#25B8FF`, blue `#1E6BFF`, indigo `#2F43FF` |
| Border | `--qv-line: rgba(255,255,255,0.08)` min; active `rgba(42,168,255,0.32)` |
| Fonts | sans: Plus Jakarta Sans, mono: JetBrains Mono. **Banned**: Inter, Roboto, Arial, Open Sans |
| Weights | Headlines 350, section titles 400, content titles 550, mono stats 600 |
| Spacing | Section: 92 / 76 / 64 px (desktop / ≤960 / ≤700). Cards: 22 / 18 px. Grid gap: 16 px |

## Reusable Patterns

Full CSS in [tokens.md](references/tokens.md):

- **Surface** — glass card: gradient over `#0A0F18`, `0.08` border, hover lift + aqua glow, active/ghost states
- **Buttons** — pill, hover `translateY(-1px)`; primary = dark-on-gradient; secondary = glass + aqua border
- **Section shell** — eyebrow (mono uppercase + aqua `::before`) → title → desc → content → divider
- **Shadows** — 3 layers: depth (offset black) + brand glow + glass edge (inset)
- **Nav** — sticky `z-100`, blur backdrop. Active: `font-550` + aqua underline (desktop) / vertical bar (mobile)
- **Footer** — titles: `12px / 650 / --qv-text-1`. Links: `13.5px / 400 / --qv-text-3`
- **Accent text** — aqua→indigo `background-clip: text`
- **Avatar** — `getUserAvatarInitials()` + `getAvatarGradientStyle()` from `@/lib/user-avatar`. No silhouette placeholders
- **Clipboard** — `navigator.clipboard.writeText()` + `execCommand("copy")` fallback + 1.8s visual feedback
- **Mono font** — only for stats, code, eyebrows, badges. Never for labels or body

## Playground Pages

Dark tokens, **not** marketing section shells:

- Background `--qv-bg` / `--qv-font-sans`. Input: glass container. Chat: `variant="dark"`
- Shared `MarketingNav`. No eyebrows, dividers, or scroll-reveal

## Homepage-Only Patterns

Do **not** use on other pages: interactive routing canvas, orbital rings, route-dash animation, halo pulse, provider node viz, staggered hero reveal.

## Dark-Mode Adaptations

### Icons & Logos

- **Model icons**: `isModelIconMono(modelId)` → mono: `brightness(0) invert(1)`, colored: no filter. Never blanket-invert
- **Third-party logos**: colored/branded → as-is. Black-on-transparent → invert. White-bg PNGs → `_transparent.png`. Multi-color SVGs with black text → edit `fill` to `#FFFFFF` (not CSS filter)

### Floating UI

- **Menus/dropdowns**: opaque `#0A0E16` — no translucent `rgba` + `backdrop-filter`
- **Auth modal**: `z-[110]` (above nav `z-100`), `max-h-[calc(100dvh_-_32px)]` + `overflow-y-auto`. Class: `qv-auth-modal-panel`
- **Welcome modal**: `rgba(10,14,22,0.96)` + blur — acceptable (overlay darkens page)
- **`<select>`**: explicit `background: #1a1f2e; color: #e0e0e0` on `<select>` and `<option>`
- **Toast (Sonner)**: `theme="dark"` + explicit dark styles. No `useTheme()`

### Browser Autofill Override

Autofill applies light `!important` background. Override with **opaque** `box-shadow: 0 0 0 1000px #0f1420 inset !important` (not `rgba`). Class: `qv-auth-field`. Full CSS in [tokens.md](references/tokens.md).

### Social Platforms

`getSocialPlatforms(i18n.language)` in `useMemo([i18n.language])` — **never** module-level. ZH: WeChat, 小红书, 抖音, B站. EN: Xiaohongshu, X, WeChat, YouTube, TikTok.

## Motion

Allowed: hero fade-slide, scroll reveal, protocol animation, hover lift. Forbidden: decorative blobs, particles.

**Reduced motion**: always `prefers-reduced-motion: reduce` → disable all animation/transition; reveals appear immediately. See [tokens.md](references/tokens.md).

## Sidebar + Content Layout (Nav-Aligned)

Pages with a left sidebar (`/providers`, `/account`) align the content area's edges with `MarketingNav` (`qv-container` 1180px). See [tokens.md](references/tokens.md) for the full CSS recipe.

- Sidebar: `w-[260px]`, flush left, `p-5`, no borders. `hidden md:block` or `hidden lg:block`
- Content: `flex-1 min-w-0`, dynamic `padding-left/right` via `calc()` — no `max-width`, no `mx-auto`
- Subpage components must not add their own `max-w-*` / `mx-auto` (width is controlled by the layout)
- Mobile: sidebar hidden; padding falls back to `px-4 sm:px-6`

## Responsive

| Breakpoint | Intent |
|------------|--------|
| `<=1100px` | tighten layout |
| `<=960px` | hamburger nav, collapse grids |
| `<=700px` | compact spacing, single column |

### Mobile Rules

- **Nav credits**: always visible — never `hidden min-[700px]:block`
- **Language toggle**: `header.switchToOtherLang` i18n key — never hardcode
- **Tables**: scrollable wide-table for all regions — no `isCnRegion` gate
- **Grid hover clipping**: `px-1 -mx-1 pt-1 -mt-1` for `translateY(-3px)` hover space
- **Grid overflow**: `min-w-0` on grid + children. No `overflow-hidden` on cards (clips shadows)
- **Hero canvas**: `transform: scale()` on ≤700px + outer `overflow: hidden` (see tokens.md)
- **Auth modal**: `max-h` + `overflow-y-auto` for short screens; close button inside scrollable area

## Global CSS

- `h1`–`h6`: `color: inherit` in `globals.css` (not `var(--text-primary)`)
- `::selection`: `background: rgba(37,184,255,0.24); color: #fff`
- Post-login: `router.refresh()` (stay on page) when no auth-intent

## SEO By Page Type

| Page type | Schema |
|-----------|--------|
| Homepage | `SoftwareApplication`, opt. `Organization` |
| Pricing | `SoftwareApplication`, opt. offer metadata |
| Docs / article | `TechArticle` or none |
| About | `Organization` |
| Security | `WebPage` or `Organization` |
| Privacy / Terms | none |

All pages: title, description, canonical, OG, Twitter card, `theme-color: #05070B`. Region-aware → `multi-region` skill.

## Accessibility

- `:focus-visible`: 2px solid `--qv-brand-aqua`, offset 3px
- Semantic HTML, `aria-label` on interactive elements, `aria-hidden` on decorative
- Content as selectable HTML, not SVG text
- `--qv-text-3` / `--qv-text-4` within accessible contrast
- Reduced-motion fallback mandatory if motion exists
- Guest clicks on gated items → `openAuthModal()`, never silent no-op

## Verification Checklist

- [ ] Page archetype correct (marketing vs playground)
- [ ] Region impact checked; `multi-region` skill if needed
- [ ] All colors/surfaces from this system — no light-theme hex
- [ ] Homepage-only patterns used only when justified
- [ ] Tailwind + Server Components + `t()` + `Metadata` APIs
- [ ] Responsive at 1100 / 960 / 700
- [ ] Reduced-motion fallback if motion exists
- [ ] Focus ring, contrast, semantics, labels
- [ ] SEO schema matches page type; canonical correct for region
- [ ] Playground: `variant="dark"`, no `isReady` gates on inputs
- [ ] `::selection` readable on dark bg
- [ ] Icons: per-icon `monoIcon` filter — no blanket inversion
- [ ] Logos: brand identity preserved — no blanket inversion on colored
- [ ] Cards: consistent surface borders / bg / shadows across pages
- [ ] Nav active: aqua underline (desktop) / vertical bar (mobile)
- [ ] Footer: titles visually distinct from links
- [ ] Clipboard: fallback + visual feedback
- [ ] Floating UI: opaque dark backgrounds — no content bleed
- [ ] Toast: `theme="dark"` with explicit styles
- [ ] `<select>`: dark bg/color on element and `<option>`
- [ ] Guest clicks → auth modal (not silent)
- [ ] Post-login stays on page when no auth-intent
- [ ] Social platforms reactive to `i18n.language` (not module-level)
- [ ] Mobile nav: credits visible, language toggle via i18n key
- [ ] Autofill: opaque `box-shadow: inset` — not `rgba`
- [ ] Auth modal: `z-[110]` > nav; scrolls on short mobile screens
- [ ] Hero canvas: `transform: scale()` + `overflow: hidden` on mobile
- [ ] Grids: `min-w-0` on container + children
- [ ] Sidebar pages: content aligned with nav edges via `calc()` pattern; sidebar flush left; no border lines
