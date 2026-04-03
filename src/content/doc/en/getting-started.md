---
title: 'Getting started'
description: 'Embed this documentation site and route by language.'
pubDate: 'Apr 01 2026'
heroImage: '../../../assets/qveris-brand.png'
---

Welcome to the QVeris documentation area. This site is designed to be embedded in an iframe on [qveris.ai](https://qveris.ai/) without a global header or footer.

## Language routing

- Path: `/doc/en/` for English, `/doc/cn/` for Chinese; blog uses `/blog/en/` and `/blog/cn/`.
- Query override: append `?lang=cn` or `?lang=en` to any URL; the middleware redirects to the canonical localized path.

## Parent page integration

Point your iframe `src` at a localized URL, for example:

`https://your-site.example/doc/cn/getting-started/`

To switch language from the parent shell without rebuilding the URL, use either:

1. **`?lang=`** on the iframe URL (handled server-side).
2. **`postMessage`** to the iframe: `{ type: 'qveris:set-locale', locale: 'cn' }` (handled by the embed toolbar script).
