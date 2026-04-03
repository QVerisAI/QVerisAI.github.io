---
name: add-new-page
description: >-
  Step-by-step workflow for adding a new frontend page to the Next.js app.
  Use when the user asks to create a new page, route, view, or frontend feature.
---

# Add New Page — Complete Workflow

Follow these steps when adding a new page to the Next.js 15 app.

## Step 1: Create the Route

Create `app/my-page/page.tsx`:

```tsx
export default function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">...</h1>
    </div>
  )
}
```

Decision: Does this page need client interactivity?
- **No** (static content, server-fetched data, metadata) → Keep as Server Component by default
- **Yes** (forms, local state, effects, browser APIs) → Add `"use client"` only where needed

Decision: Is this a public/marketing page or a playground/chat page?
- **Public/marketing** → Apply the `qveris-visual-system` skill (dark tokens, section shells)
- **Playground/chat** → Use dark tokens + glass input containers, `variant="dark"` on components. See `playground-chat.mdc` rule.
- **Authenticated app surface** → Can use a different theme, but all public routes use dark.

## Step 2: Add i18n Keys

Add translation keys in all locale files. Keys use dot-notation:

```json
{
  "myPage": {
    "title": "My Page",
    "description": "Page description"
  }
}
```

All user-facing text must go through `t()`.

If the page differs by deployment (`cn` vs `global`), do not fork the whole page first. Prefer region config, provider registries, or the `multi-region` skill guidance.
If the page touches pricing, recharge, auth providers, or SEO-sensitive copy, check the credits-only billing model and region-specific metadata before shipping.

## Step 2b: I18nProvider Awareness

All pages render inside `I18nProvider`, which briefly hides children during async language initialization (using `display: contents` once ready). Key implications:

- Component `useState` and `useRef` values are preserved across the visibility toggle (no unmount/remount) because the JSX structure stays identical.
- If you need to read `sessionStorage` keys on mount (e.g., `initialQuery`), use a single `useEffect([], [])` and consume (read + remove) keys in one pass.
- For auth state on initial mount, read from `localStorage` directly (`auth-storage` key) rather than depending on Zustand's `_hasHydrated` flag, which can race with provider timing.

## Step 3: Data Fetching

If the page needs backend data:

```tsx
import { request } from "@/src/lib/request"

// In your component or hook:
const [data, setData] = useState<MyType | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  request.get<MyType>("/rpc/v1/my-endpoint")
    .then(res => {
      if (res.status === "success") setData(res.data)
      else setError(res.message)
    })
    .catch(() => setError(t('common.networkError')))
    .finally(() => setLoading(false))
}, [])
```

Checklist:
- [ ] Handle loading, success, and error states
- [ ] Type the response (`ApiResponse<MyType>` not `any`)
- [ ] Show error to user (toast or inline)
- [ ] Add loading skeleton/spinner

## Step 4: Auth Protection (if needed)

`AuthGuard` already wraps all pages in the root layout. For page-level auth checks:

- If an action requires login but the page is accessible to guests, call `openAuthModal()` at the point of interaction.
- To preserve context across auth redirects, use `saveAuthIntent({ destination, query, ... })` from `src/lib/auth-intent.ts` before opening the modal. After login, `GlobalAuthModal` auto-navigates via `resumeIntentOrDefault()`.
- Always call `clearAuthIntent()` if the user dismisses the modal without completing login.

For pages that should block all access without login, configure the page in the permission system and `AuthGuard` will handle the rest:

```tsx
// No manual wrapping needed — AuthGuard is in the root layout.
// Permission config controls which pages require auth.
```
```

## Step 5: Navigation

Add link in the appropriate navigation component (header, sidebar, or parent page).

Use Next.js `Link`:
```tsx
import Link from "next/link"
<Link href="/my-page">{t('nav.myPage')}</Link>
```

## Step 6: Responsive Design

- Mobile-first: base styles for mobile, `sm:` / `md:` / `lg:` for larger screens
- Test at 375px (mobile), 768px (tablet), 1280px (desktop)
- Use `container mx-auto` for content width
- Touch targets: minimum 44x44px for buttons/links on mobile

## Step 7: Error Boundary

Wrap complex page content with `ErrorBoundary`:

```tsx
import { ErrorBoundary } from "@/src/components/ErrorBoundary"

<ErrorBoundary>
  <ComplexContent />
</ErrorBoundary>
```

## Step 8: SEO & Metadata

Add metadata export for the page:

```tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Page — QVeris",
  description: "Page description for SEO",
}
```

Note: `metadata` export only works in Server Components. If the page is `"use client"`, use `generateMetadata` in a parent layout or a separate `layout.tsx`.

If the page is public-facing or region-aware:

- verify metadata matches the active region
- update `JsonLd` or other structured data if the page changes pricing or billing claims
- do not leave stale subscription/monthly wording in SEO copy when the product model is credits-only

## Verification

- [ ] Page renders without errors
- [ ] All text uses `t()` for i18n
- [ ] API responses are typed (no `any`)
- [ ] Loading, error, and empty states handled
- [ ] Auth checks use `openAuthModal()` + `saveAuthIntent()` where needed
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Navigation link added
- [ ] Error boundary wraps complex content
- [ ] Dark visual system applied (no light-themed pages on public routes)
- [ ] `sessionStorage` keys consumed in `useEffect([], [])` if cross-page state is needed
- [ ] Region, pricing, and metadata behavior reviewed if the page is deployment-specific
