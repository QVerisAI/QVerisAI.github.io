---
name: payment-refactor-or-extension
description: >-
  Refactor or extend the existing payment system across Stripe, Alipay, recharge,
  webhook, refund, pricing, and credits accounting. Use when changing payment routers,
  provider integrations, recharge flows, webhook handling, billing copy, or payment-related
  architecture.
---

# Payment Refactor Or Extension

Use this skill when the task is not "add one endpoint", but "change how payment works".

## Quick Triage

Before editing, classify the change:

1. Is it shared payment behavior or provider-specific behavior?
2. Is it global-only, CN-only, or both?
3. Does it affect credits accounting, pricing copy, or webhook semantics?
4. Does it change an external contract used by frontend RPC routes?

## Current Project Rules

- Billing is **credits-only**. Do not reintroduce subscriptions, portal flows, or recurring-plan concepts unless the user explicitly changes the product model.
- Shared payment behavior belongs in shared files such as `backend/routers/payment.py`, `backend/crud/payment.py`, and `backend/services/payment/`.
- Provider-specific behavior belongs in dedicated files such as `backend/routers/payment_alipay.py` or Stripe-specific helpers/handlers.
- Region-specific behavior must not leak all over the shared codepath.

## Workflow

### 1. Map the blast radius

Check all affected layers before editing:

- backend router or service
- webhook / refund / reconciliation flow
- pricing or recharge UI
- RPC proxy route
- SEO / metadata / JSON-LD if public billing claims change
- tests

### 2. Keep provider logic separated

- Do not add more CN branches into Stripe-dominant files.
- Do not make Alipay files depend on Stripe-only assumptions such as subscription lifecycle or customer portal behavior.
- If a shared file becomes mostly provider-specific, extract the provider path to a dedicated module first.

### 3. Preserve credits accounting invariants

- Validate product IDs and amounts server-side.
- Use shared credit helpers for balance and deduction semantics.
- Keep recharge success, usage deduction, and history writing auditable and idempotent.
- If money is involved, use smallest currency unit integers for provider amounts.

### 4. Treat webhooks and callbacks as retryable systems

- Verify provider signatures when the provider supports it.
- Deduplicate by provider event ID or stable business key before applying credits.
- Only acknowledge success after side effects are safely applied or intentionally treated as no-op.

### 5. Keep frontend and product copy aligned

When billing behavior changes, review:

- `app/pricing/**`
- `app/recharge/**`
- `app/payment/**`
- `src/lib/api/payments.ts`
- `src/components/JsonLd.tsx`
- any account/billing settings pages

Remove stale monthly/subscription wording if the model is credits-only.

### 6. Verify both deployment paths when relevant

If the payment change is region-aware:

- check `SITE_REGION` / `NEXT_PUBLIC_SITE_REGION`
- verify currency and provider availability
- confirm the unsupported region path fails clearly rather than silently

## Minimum Test Expectations

- happy path
- duplicate or replayed callback path
- provider error path
- region gating path if applicable
- frontend contract test if the response shape changed

## Final Review Checklist

- [ ] Shared vs provider-specific logic is separated
- [ ] Credits-only product model remains consistent
- [ ] Amount validation stays server-side
- [ ] Webhook/callback flow is idempotent
- [ ] Frontend/RPC/test layers were updated together
- [ ] Region-specific behavior was checked explicitly
