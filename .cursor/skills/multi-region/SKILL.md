---
name: multi-region
description: >-
  Architecture guide for China/global deployment boundaries. Use when changing auth,
  payment, pricing, i18n, SEO, CORS, or any feature that differs between qveris.cn
  and qveris.ai.
---

# Multi-Region Support

This repo serves two independently deployed sites from one codebase:

| | China (`qveris.cn`) | Global (`qveris.ai`) |
|---|---|---|
| Auth | Phone / WeChat / Email | Google / GitHub / Email |
| Payment | CN-local providers such as Alipay | Stripe-backed checkout and supported local methods |
| Language | Chinese only | English default, Chinese available |
| Currency | CNY | USD |

## Core Rules

- Region is selected at build/deploy time with `SITE_REGION` and `NEXT_PUBLIC_SITE_REGION`.
- Do not infer region from request host unless the user explicitly asks for host-based multi-tenancy.
- Keep branching at boundaries: region helpers, provider registries, config maps, router registration, or dedicated provider files.
- Do not scatter `if region == ...` / `region === ...` through shared business logic or JSX trees.

## Current Project Reality

- Frontend region helpers live in `src/lib/region.ts` and pricing helpers in `src/lib/pricing.ts`.
- Backend region helpers live in `backend/region.py`.
- Auth provider selection should stay data-driven through `src/lib/auth/providers.ts` and backend route gating.
- Payment code is split across `backend/routers/payment.py`, `payment_alipay.py`, `payment_invoices.py`, `payment_backfill.py`, and `backend/services/payment/`.
- Billing is **credits-only** in both regions. Region differences are about provider availability, pricing/currency, copy, and deployment config, not about one site using subscriptions and the other not.

## What To Check When Editing Region-Specific Features

When touching auth, payment, pricing, i18n, SEO, or deployment config, verify all of these:

- frontend region helpers and backend region helpers agree
- auth provider availability and OAuth callback URLs are correct
- payment routes, webhook endpoints, and allowed origins match the target deployment
- pricing copy, currency, locale, and legal text match the active region
- metadata, JSON-LD, canonical URL, and analytics settings are correct for both sites

## Preferred Patterns

### Region helper

```typescript
import { getSiteRegion, isCN } from "@/src/lib/region"
```

```python
from region import get_site_region, is_cn
```

### Data-driven auth UI

```typescript
import { getAuthProviders } from "@/src/lib/auth/providers"

const providers = getAuthProviders()
```

### Region-aware pricing

```typescript
import { formatPrice, getPricingConfig } from "@/src/lib/pricing"
```

## Anti-Patterns

- Duplicating whole pages such as `pricing-cn` and `pricing-global` unless the user explicitly asks for separate surfaces.
- Adding CN branches into Stripe-specific modules or Stripe branches into CN-local modules.
- Updating frontend region behavior without checking backend CORS, callback URLs, or webhooks.
- Reusing one region's product IDs, currency, or legal copy in the other deployment by accident.

## Testing Checklist

- Parametrize backend tests across `cn` and `global` when the logic is region-aware.
- Mock `src/lib/region.ts` in frontend tests instead of hardcoding region assumptions into components.
- For auth/payment changes, make sure at least one test covers the disallowed region path.
