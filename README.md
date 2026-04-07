# QVeris Tech Blog

The tech blog and documentation site for [QVeris AI](https://qveris.ai), built with [Astro](https://astro.build/). Designed to be embedded as an iframe within qveris.ai and qveris.cn, while also working as a standalone site.

## Tech Stack

- **Framework**: Astro 6 + MDX
- **Language**: TypeScript
- **Styling**: CSS custom properties ([QVeris Visual System](/.cursor/skills/qveris-visual-system/))
- **Fonts**: Plus Jakarta Sans + JetBrains Mono
- **Package Manager**: pnpm

## Project Structure

```
src/
├── assets/            # Images (optimized via Sharp at build time)
├── components/        # Astro components
│   ├── Nav.astro            # Sticky nav with backdrop blur & lang switcher
│   ├── BlogHero.astro       # Landing page hero section
│   ├── PostCard.astro       # Blog post card with hover effects
│   ├── TableOfContents.astro # Sticky sidebar TOC
│   ├── PostMeta.astro       # Date + reading time + category
│   ├── Breadcrumb.astro     # Path breadcrumb
│   ├── Callout.astro        # Tip/warning/info boxes for MDX
│   ├── Eyebrow.astro        # Mono uppercase label
│   ├── Divider.astro        # Gradient divider
│   ├── ScrollReveal.astro   # Scroll-triggered animation wrapper
│   └── ...
├── content/
│   ├── blog/
│   │   ├── en/              # English blog posts
│   │   └── cn/              # Chinese blog posts
│   └── doc/
│       ├── en/              # English docs
│       └── cn/              # Chinese docs
├── i18n/              # Locale config, labels, and utilities
├── layouts/
│   ├── BaseLayout.astro     # Root layout (nav + scripts)
│   ├── BlogPost.astro       # 2-column: content + TOC sidebar
│   └── DocPage.astro        # Doc layout with optional TOC
├── pages/             # File-based routing
├── scripts/           # Client-side JS (scroll-reveal, TOC highlight, code copy)
├── styles/
│   ├── global.css           # QVeris Visual System tokens + base styles
│   └── prose.css            # Rich article content styling
└── utils/             # Reading time calculator, etc.
```

## Features

### Visual Design
- Full [QVeris Visual System](/.cursor/skills/qveris-visual-system/) implementation (dark theme, design tokens, 3-layer shadow system)
- Blog landing with hero section, featured post, and responsive card grid
- Blog posts with 2-column layout (prose content + sticky Table of Contents sidebar)
- Scroll-reveal animations with `prefers-reduced-motion` support
- Code blocks with copy-to-clipboard buttons

### Multi-Region Support
- **Global** (qveris.ai): English default, Chinese available, language switcher visible
- **China** (qveris.cn): Chinese only, language switcher hidden
- Region set via `?region=cn|global` query parameter

### Embeddable
- Designed for iframe embedding within qveris.ai / qveris.cn
- `?embed=true` activates compact nav mode
- `postMessage` API for parent-frame communication:
  - `{ type: 'qveris:set-locale', locale: 'en' | 'cn' }`
  - `{ type: 'qveris:set-region', region: 'cn' | 'global' }`
- `window.__QVERIS_EMBED__` JS API: `setLocale()`, `setRegion()`, `getRegion()`

### Content
- MDX support with custom components (Callout, etc.)
- Content schema: `title`, `description`, `pubDate`, `heroImage`, `category`, `author`, `tags`, `featured`, `draft`, `translationKey`
- Bilingual content linked via `translationKey`
- Draft filtering in production builds and RSS feed

## Development

| Command        | Description                          |
| :------------- | :----------------------------------- |
| `pnpm install` | Install dependencies                 |
| `pnpm dev`     | Local dev server (default port 4321) |
| `pnpm build`   | Production build to `./dist/`        |
| `pnpm preview` | Preview the production build locally |

### Adding a Blog Post

1. Create `src/content/blog/en/your-post-slug.md` (and optionally `cn/` for Chinese)
2. Add frontmatter:
   ```yaml
   ---
   title: 'Post Title'
   description: 'Brief description'
   pubDate: 'Apr 07 2026'
   heroImage: '../../../assets/your-hero.png'
   category: 'Engineering'
   author: 'QVeris Team'
   tags: ['agents', 'infrastructure']
   featured: false
   draft: false
   translationKey: 'your-post-slug'
   ---
   ```
3. Write content in Markdown/MDX
4. Run `pnpm build` to verify

## Deployment

Deployed to GitHub Pages via GitHub Actions on push to `main`. See `.github/workflows/deploy.yml`.

## License

See [LICENSE](LICENSE).
