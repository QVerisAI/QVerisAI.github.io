---
name: add-new-api-endpoint
description: >-
  Step-by-step workflow for adding a complete new API endpoint to the FastAPI
  backend. Use when the user asks to create a new API, endpoint, route, or
  backend feature.
---

# Add New API Endpoint — Complete Workflow

Follow these steps in order when adding a new API endpoint.

Before starting, check whether the endpoint is region-specific, payment-related, or part of an existing passthrough contract. If so, follow the matching project skill/rule as well.

## Step 1: Define the Schema

In `backend/schemas.py`, add Pydantic request/response models:

```python
class MyFeatureRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr

class MyFeatureResponse(BaseModel):
    id: str
    name: str
    created_at: datetime
```

Checklist:
- [ ] All fields have type annotations and `Field()` constraints
- [ ] Email fields use `EmailStr`
- [ ] String fields have `min_length` / `max_length`
- [ ] Response model only includes fields the client needs

## Step 2: Add Database Model (if needed)

In `backend/models/`, create or update the model:

- UUID v7 primary key
- `created_at` / `updated_at` with server defaults
- `index=True` on columns used in queries
- For new relationships, prefer `back_populates`. Existing models still use `backref` — do not partially convert unless updating both sides together.
- Register in `backend/models/__init__.py`

## Step 3: Write CRUD Functions

In `backend/crud/`, create the data-access functions:

```python
async def create_my_feature(db: AsyncSession, data: MyFeatureRequest) -> MyModel:
    instance = MyModel(**data.model_dump())
    db.add(instance)
    await db.flush()
    await db.refresh(instance)
    return instance
```

Checklist:
- [ ] Accept `db: AsyncSession` as first param
- [ ] Use `select()` 2.0 query style
- [ ] Add `selectinload` for any relationships you'll access
- [ ] Follow the surrounding module's transaction pattern. This repo still has many CRUD functions that call `db.commit()` internally, so do not mix styles inside one call chain unless you are refactoring it intentionally.
- [ ] Do not recreate subscription-era shapes or hidden commits when extending credits/accounting flows

## Step 4: Create the Router Endpoint

In `backend/routers/`, add the endpoint:

```python
@router.post("/my-feature", response_model=APIResponse[MyFeatureResponse])
async def create_feature(
    request: MyFeatureRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        result = await create_my_feature(db, request)
        return APIResponse(
            status="success",
            message="Feature created",
            status_code=StatusCode.SUCCESS,
            data=MyFeatureResponse.model_validate(result)
        )
    except SomeSpecificError as e:
        app_logger.error(f"Failed to create feature: {e}", exc_info=True)
        return APIResponse(
            status="failure",
            message="Creation failed",
            status_code=StatusCode.RELEVANT_ERROR,
            data=None
        )
```

Checklist:
- [ ] New business endpoint returns `APIResponse`
- [ ] Auth dependency injected
- [ ] Specific exception handling (not bare `except`)
- [ ] Logging with context

Compatibility exception:

- If you are extending a legacy passthrough/proxy endpoint, preserve its existing external contract unless the task explicitly includes a coordinated migration of backend, frontend, and tests.
- If the endpoint touches payment, pricing, auth providers, or region selection, verify both `cn` and `global` behavior rather than implementing only one deployment path.

## Step 5: Register the Router

If it's a new router file, add it to `backend/main.py`.

Follow the import style already used in that file instead of rewriting unrelated imports. The current repo uses:

```python
from routers import auth, payment, search, admin, openai, agent, my_feature
app.include_router(my_feature.router, prefix="/my-feature", tags=["my-feature"])
```

## Step 6: Add RPC Proxy Route (if frontend needs it)

Create `app/rpc/v1/my-feature/route.ts`:

```typescript
import { NextRequest } from 'next/server'
import { RpcClient } from '@/app/lib/rpc-client'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  return RpcClient.authenticatedRequest(request, '/my-feature', {
    method: 'POST',
    body: await request.text(),
    headers: { 'Content-Type': 'application/json' },
  })
}
```

## Step 7: Write Tests

In `backend/tests/test_my_feature.py`:

- [ ] Happy-path test (valid input → success response)
- [ ] Auth test (no token → 401)
- [ ] Validation test (invalid input → proper error)
- [ ] Edge case test (duplicate, not found, etc.)

## Step 8: Migration (if new table/column)

- Add SQL migration in `backend/migrations/`.
- Only add a startup `ensure_*` function in `database.py` if the project needs backward-compatible auto-repair across mixed deployment versions. For normal schema evolution, the migration file is sufficient.
- Migration must be idempotent (check before ALTER).

## Verification

Before considering the endpoint complete:

- [ ] Schema validates input with constraints
- [ ] CRUD uses eager loading where needed
- [ ] Router returns APIResponse consistently
- [ ] Auth is properly enforced
- [ ] Tests pass for happy path and error cases
- [ ] RPC proxy created if frontend needs access
- [ ] Migration is idempotent
- [ ] Region, billing model, and external contract remain consistent with the rest of the product
