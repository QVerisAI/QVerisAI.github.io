# QVeris Design Tokens — Full Reference

Exact values for the QVeris dark visual system. Use in layers:
- **Core tokens** — global variables
- **Reusable patterns** — most marketing pages
- **Homepage-only patterns** — flagship hero and routing canvas

---

## Core Tokens

### CSS custom properties

```css
:root {
  --qv-bg:           #05070B;
  --qv-bg-2:         #08111C;
  --qv-panel:        rgba(10,14,22,0.88);

  --qv-text-1:       rgba(255,255,255,0.97);
  --qv-text-2:       rgba(255,255,255,0.74);
  --qv-text-3:       rgba(255,255,255,0.48);
  --qv-text-4:       rgba(255,255,255,0.36);

  --qv-line:         rgba(255,255,255,0.08);

  --qv-brand-aqua:   #34E3F4;
  --qv-brand-sky:    #25B8FF;
  --qv-brand-blue:   #1E6BFF;
  --qv-brand-indigo: #2F43FF;

  --qv-discover:     #38D39F;
  --qv-inspect:      #FFC24B;
  --qv-call:         #2AA8FF;

  --qv-radius-md:    18px;
  --qv-radius-lg:    22px;
  --qv-radius-xl:    30px;
  --qv-radius-full:  999px;

  --qv-ease:         cubic-bezier(0.16, 1, 0.3, 1);
  --qv-section-space: 92px;

  --qv-font-sans:    'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --qv-font-mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

### Font import

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Text selection (global)

```css
::selection {
  background: rgba(37,184,255,0.24);
  color: #fff;
}
```

### Type scale

| Element | Font | Size | Weight | Letter-spacing | Line-height |
|---------|------|------|--------|----------------|-------------|
| Hero h1 | sans | `clamp(52px, 8vw, 92px)` | 350 | -0.07em | 0.96 |
| Hero h1 (mobile) | sans | 42px | 350 | — | 1.02 |
| Hero subtitle | sans | 19px | 350 | -0.02em | 1.82 |
| Section title | sans | `clamp(30px, 4vw, 42px)` | 400 | -0.045em | 1.12 |
| Section desc | sans | 16px (15px mobile) | 350 | -0.015em | 1.75 |
| Final CTA h2 | sans | `clamp(36px, 5vw, 64px)` | 350 | -0.055em | 1.02 |
| Card h3 | sans | 18px | 550 | — | — |
| Body / card p | sans | 14–16px | 350 | -0.015em | 1.72 |
| Nav links | sans | 13.5px | 400 | — | — |
| Footer h4 | sans | 12px | 650 | 0.08em | uppercase |
| Footer link | sans | 13.5px | 400 | — | — |
| Stat value | mono | 22px | 600 | -0.03em | — |
| Eyebrow | mono | 11px | 500 | 0.10em | uppercase |
| Badge | mono | 10.5px | 600 | 0.08em | uppercase |
| Terminal | mono | 12.5px | 400 | — | 1.9 |
| Code block | mono | 11.5px | 400 | — | 1.8 |

### Spacing scale

| Context | Desktop | ≤960px | ≤700px |
|---------|---------|--------|--------|
| Container max-width | 1180px | — | — |
| Container padding | 24px | — | 18px |
| Section padding | 92px | 76px | 64px |
| Section header mb | 42px | — | 28px |
| Card padding | 22px | — | 18px |
| Grid gap | 16px | — | — |
| Nav height | 76px | — | 70px |

### Background composition

```css
html {
  background:
    radial-gradient(circle at 14% 0%, rgba(52,227,244,0.08), transparent 26%),
    radial-gradient(circle at 82% 10%, rgba(47,67,255,0.12), transparent 30%),
    linear-gradient(180deg, #05070B 0%, #08111A 42%, #05070B 100%);
}
```

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.022;
  pointer-events: none;
  z-index: 9999;
}
```

### Shadow patterns

3-layer formula:

| Layer | Purpose | Example |
|-------|---------|---------|
| Depth | vertical offset, black | `0 30px 80px rgba(0,0,0,0.38)` |
| Brand glow | no offset, brand color | `0 0 26px rgba(52,227,244,0.10)` |
| Glass edge | inset top highlight | `inset 0 1px 0 rgba(255,255,255,0.08)` |

Hero panel:
```css
box-shadow:
  0 30px 80px rgba(0,0,0,0.38),
  0 0 0 1px rgba(255,255,255,0.02) inset,
  inset 0 1px 0 rgba(255,255,255,0.08);
```

Primary CTA:
```css
box-shadow:
  0 14px 34px rgba(30,107,255,0.22),
  0 0 26px rgba(52,227,244,0.10),
  inset 0 1px 0 rgba(255,255,255,0.38);
```

Card hover:
```css
box-shadow:
  0 14px 36px rgba(0,0,0,0.30),
  0 0 26px rgba(52,227,244,0.07);
```

---

## Reusable Patterns

### Sidebar + Content (Nav-Aligned) Layout

Content edges align with `MarketingNav` (`qv-container`: 1180px, padding 24px). `<SW>` = sidebar width (e.g. `260px`). Styles live in `globals.css` (not inline `<style>` tags).

```css
/* globals.css */
@media (min-width: <BP>) {           /* 1024px for /providers, 768px for /account */
  .qv-<page>-content {
    padding-left:  max(24px, calc((100vw - 1180px) / 2 + 24px - <SW>));
    padding-right: max(24px, calc((100vw - 1180px) / 2 + 24px));
  }
}
```

```html
<aside class="hidden md:block w-[<SW>] flex-shrink-0"><div class="p-5">…</div></aside>
<div class="qv-<page>-content flex-1 min-w-0 px-4 sm:px-6">…</div>
```

Mobile: sidebar hidden, `max()` falls back to 24px. Subpage components must not add `max-w-*` / `mx-auto`.

### Universal surface

All glass cards must share these values — no weaker borders or flatter backgrounds on sub-pages.

```css
.surface {
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03)),
    #0A0F18;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  transition: transform 0.25s var(--qv-ease),
              border-color 0.25s var(--qv-ease),
              box-shadow 0.25s var(--qv-ease),
              opacity 0.25s var(--qv-ease),
              background 0.25s var(--qv-ease);
}
.surface:hover {
  transform: translateY(-3px);
  border-color: rgba(52,227,244,0.22);
  box-shadow: 0 14px 36px rgba(0,0,0,0.35), 0 0 26px rgba(52,227,244,0.08);
}
.surface.active {
  border-color: rgba(42,168,255,0.32);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)),
    linear-gradient(135deg, rgba(52,227,244,0.06), rgba(47,67,255,0.07)),
    #0C1018;
  box-shadow: 0 0 0 1px rgba(42,168,255,0.14), 0 22px 44px rgba(0,0,0,0.30), 0 0 34px rgba(42,168,255,0.14);
}
.surface.ghost {
  opacity: 0.54;
  border-color: rgba(255,255,255,0.05);
}
```

### Sticky marketing nav

```css
.nav {
  position: sticky; top: 0; z-index: 100;
  height: 76px; /* 70px mobile */
  backdrop-filter: blur(18px) saturate(1.15);
  background: rgba(5,7,11,0.68);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
```

Active nav link (desktop):
```css
.nav-link.active { font-weight: 550; color: rgba(255,255,255,0.97); border-bottom: 2px solid var(--qv-brand-aqua); }
.nav-link:not(.active) { opacity: 0.55; }
```

Active nav link (mobile):
```css
.nav-link.active { font-weight: 550; color: rgba(255,255,255,0.97); border-left: 3px solid var(--qv-brand-aqua); }
```

### Eyebrow

```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px; margin-bottom: 14px;
  font-family: var(--qv-font-mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.10em; text-transform: uppercase; color: var(--qv-text-3);
}
.eyebrow::before {
  content: ""; width: 18px; height: 1px;
  background: linear-gradient(90deg, var(--qv-brand-aqua), transparent);
}
```

### Section shell

```html
<section class="section" id="...">
  <div class="container">
    <div class="section-header">
      <div class="eyebrow">LABEL</div>
      <h2 class="section-title">...</h2>
      <p class="section-desc">...</p>
    </div>
    <!-- content -->
  </div>
</section>
<div class="divider"></div>
```

### Divider

```css
.divider { height: 1px; background: linear-gradient(90deg, transparent, var(--qv-line), transparent); }
```

### Buttons

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: 999px; padding: 11px 18px; font-size: 13.5px; font-weight: 600;
  letter-spacing: -0.015em; transition: all .2s var(--qv-ease); cursor: pointer;
  white-space: nowrap; border: none;
}
.btn:hover { transform: translateY(-1px); }

.btn-primary {
  color: #03111A;
  background: linear-gradient(135deg, #E8FDFF 0%, #BFF8FF 12%, var(--qv-brand-aqua) 32%, var(--qv-brand-sky) 58%, var(--qv-brand-blue) 82%, var(--qv-brand-indigo) 100%);
  box-shadow: 0 14px 34px rgba(30,107,255,0.22), 0 0 26px rgba(52,227,244,0.10), inset 0 1px 0 rgba(255,255,255,0.38);
}

.btn-secondary {
  color: var(--qv-text-1);
  border: 1px solid rgba(52,227,244,0.12);
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)), rgba(255,255,255,0.015);
}
```

### Accent gradient text

```css
.accent {
  background: linear-gradient(135deg, var(--qv-brand-aqua) 0%, var(--qv-brand-sky) 30%, var(--qv-brand-blue) 62%, var(--qv-brand-indigo) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; font-weight: 500;
}
```

### Icon / logo dark-mode filter

```tsx
import { isModelIconMono } from "@/lib/models"
const filter = !isLight && isModelIconMono(modelId) ? "brightness(0) invert(1)" : undefined
<img src={iconPath} style={{ filter }} />
```

- **Mono** (`monoIcon: true`): `fill="currentColor"` / single-color → invert
- **Colored** (`monoIcon: false`): embedded brand colors → never invert
- **Unknown**: default `monoIcon: true` (safe fallback)
- Third-party PNGs: white-bg → use `_transparent.png`; colored bg → as-is; never blanket-invert colored logos

### Copy-to-clipboard

```tsx
async function copyToClipboard(text: string) {
  try { await navigator.clipboard.writeText(text) }
  catch {
    const ta = document.createElement("textarea"); ta.value = text;
    document.body.appendChild(ta); ta.select(); document.execCommand("copy");
    document.body.removeChild(ta);
  }
}
const [copied, setCopied] = useState(false)
setCopied(true); setTimeout(() => setCopied(false), 1800)
```

### Opaque floating surfaces

```css
.floating-menu {
  background: #0A0E16;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--qv-radius-md);
  box-shadow: 0 14px 36px rgba(0,0,0,0.40);
}
select, select option { background: #1a1f2e; color: #e0e0e0; }
```

### Toast / Sonner

```tsx
<Sonner theme="dark" toastOptions={{ style: {
  background: "rgba(10,14,22,0.95)", border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
}}} />
```

### Browser autofill dark-mode override

Override browser's light `!important` autofill background with **opaque** inset shadow:

```css
.qv-auth-modal-panel input.qv-auth-field:-webkit-autofill,
.qv-auth-modal-panel input.qv-auth-field:-webkit-autofill:hover,
.qv-auth-modal-panel input.qv-auth-field:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px #0f1420 inset !important;
  box-shadow: 0 0 0 1000px #0f1420 inset !important;
  -webkit-text-fill-color: rgba(255,255,255,0.97) !important;
  caret-color: var(--qv-brand-aqua);
  border-color: rgba(255,255,255,0.08) !important;
}
```

Never use `rgba` for the inset shadow — it cannot cover the browser's opaque autofill bg. Set `autoComplete` on inputs (`"email"`, `"current-password"` / `"new-password"`).

### Protocol semantic pills

```css
.pill-discover { color: var(--qv-discover); background: rgba(56,211,159,0.10); }
.pill-inspect  { color: var(--qv-inspect);  background: rgba(255,194,75,0.12); }
.pill-call     { color: #8EDFFF;         background: rgba(24,183,255,0.10); }
```

---

## Motion Recipes

### Page-load reveal

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Hero delays: announce 0.05s → h1 0.18s → subtitle 0.30s → ctas 0.42s → canvas 0.60s → stats 0.80s.

### Scroll reveal

```css
.reveal {
  opacity: 0; transform: translateY(22px);
  transition: opacity 0.65s var(--qv-ease), transform 0.65s var(--qv-ease);
}
.reveal.in-view { opacity: 1; transform: translateY(0); }
```

```js
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'));
}
```

Stagger siblings with `transition-delay` in 90ms steps.

### Reduced motion fallback

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important; transition: none !important; scroll-behavior: auto !important;
  }
  .reveal, .reveal.in-view { opacity: 1 !important; transform: none !important; }
}
```

---

## Homepage-Only Patterns

These are **not** global tokens — they belong to the homepage hero system.

### Hero spacing

| Context | Desktop | Mobile |
|---------|---------|--------|
| Padding top/bottom | 82px / 76px | 50px / 56px |
| Copy → canvas gap | 82px | 56px |
| Panel min-height | 660px | 1220px (≤700px) |
| Panel radius | 32px | 24px |

### Hero panel background

```css
.hero-panel {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.022)),
    linear-gradient(135deg, rgba(52,227,244,0.045), rgba(47,67,255,0.055)),
    rgba(8,12,19,0.92);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 80px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.02) inset, inset 0 1px 0 rgba(255,255,255,0.08);
}
```

### Hero motion

Route-dash (`stroke-dasharray: 8 10`, `stroke-dashoffset` keyframes), halo pulse, provider node active/ghost, route-line illumination.

### Hero canvas mobile scaling

```css
/* Desktop */
.qv-hero-canvas-wrapper { min-height: 660px; overflow: hidden; }
.qv-hero-scaled-inner { position: relative; width: 100%; height: 660px; }

/* Mobile ≤700px: uniform scale to viewport */
@media (max-width: 700px) {
  .qv-hero-canvas-outer { overflow: hidden; }
  .qv-hero-canvas-wrapper { min-height: 0 !important; height: auto !important; overflow: visible !important; }
  .qv-hero-scaled-inner {
    width: 700px; height: 500px;
    transform-origin: top left;
    transform: scale(calc((100vw - 36px) / 700));
  }
  .qv-hero-canvas-wrapper { height: calc(500px * ((100vw - 36px) / 700)); }
}
```

Outer `overflow: hidden` clips transformed content; inner scales uniformly; wrapper height matches visual height after scaling.

### Hero responsive

≤960px: vertical node layout, hide SVG routes/orbital rings unless recalculated, min-height 1030px.
≤700px: node min-width 140px, padding 14px, canvas-wrap margin-top 32px.
