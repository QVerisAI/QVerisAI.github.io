---
name: database-ops
description: >-
  Guide for writing high-performance async database operations with SQLAlchemy
  and PostgreSQL. Use when writing or reviewing CRUD functions, complex queries,
  bulk operations, or when the user asks about database performance, N+1 queries,
  deadlocks, or slow queries.
---

# Database Operations — Performance & Safety Guide

This skill teaches how to write efficient, safe, and deadlock-free database code in this project's async SQLAlchemy + PostgreSQL stack.

## Pre-flight Checklist

Before writing any database operation, answer these questions:

- [ ] Will this query run in a list/loop context? (N+1 risk)
- [ ] Does this touch multiple tables in one transaction? (deadlock risk)
- [ ] Could this run concurrently from multiple requests? (race condition risk)
- [ ] Does this query return unbounded results? (memory/performance risk)

## 1. Avoid N+1 Queries

**The #1 performance killer.** If you access a relationship attribute on a list of objects without eager loading, SQLAlchemy fires one query per object.

Bad — triggers N+1:
```python
users = (await db.execute(select(User))).scalars().all()
for user in users:
    print(user.payments)  # 1 query per user!
```

Good — eager load:
```python
from sqlalchemy.orm import selectinload

stmt = select(User).options(selectinload(User.payments))
users = (await db.execute(stmt)).scalars().all()
for user in users:
    print(user.payments)  # already loaded, no extra queries
```

Choose the right strategy:
- `selectinload` — best for one-to-many (separate IN query, no row duplication)
- `joinedload` — best for many-to-one or one-to-one (single JOIN)
- `subqueryload` — for complex cases where `selectinload` generates too large an IN clause

## 2. Combine Count + Data in One Query

The codebase currently uses two separate queries for several paginated lists. On hot paths, prefer collapsing this with window functions:

Bad — two round trips:
```python
total = (await db.execute(select(func.count(Payment.id)).where(...))).scalar()
items = (await db.execute(select(Payment).where(...).offset(...).limit(...))).scalars().all()
```

Good — single query with window function:
```python
from sqlalchemy import func, over

count_col = func.count().over().label("total_count")
stmt = (
    select(Payment, count_col)
    .where(...)
    .order_by(Payment.created_at.desc())
    .offset(offset)
    .limit(page_size)
)
rows = (await db.execute(stmt)).all()

total = rows[0].total_count if rows else 0
items = [row.Payment for row in rows]
```

Use this when the endpoint is performance-sensitive or queried frequently. For low-volume admin pages, two clear queries can still be acceptable if readability wins.

## 3. Transaction Boundaries — Keep Them Tight

```
✅  DB read → DB write → commit → external API call
❌  DB read → external API call → DB write → commit  (holds lock during API call!)
```

If you need to call an external API and then update the DB, do **not** use FastAPI's `get_db()` dependency as an `async with` context manager. In this repo, use `AsyncSessionLocal()` or the explicit session manager pattern:
```python
# Step 1: Read and release
async with AsyncSessionLocal() as db:
    payment = await get_payment(db, payment_id)
    await db.commit()  # only if this read path intentionally mutated state

# Step 2: External call (no transaction held)
result = await stripe_client.confirm(payment.stripe_id)

# Step 3: New short transaction to update
async with AsyncSessionLocal() as db:
    await update_payment_status(db, payment_id, result.status)
    await db.commit()
```

If you are inside a router that already received `db: AsyncSession = Depends(get_db)`, keep the DB work short and do not hold that session across long external calls.

## 4. Prevent Deadlocks

Deadlocks happen when two transactions lock rows in different orders.

Rules:
- **Always lock tables in the same order** across all code paths (e.g. User before Payment before History).
- **Never do `SELECT ... FOR UPDATE` across multiple tables** in one transaction unless absolutely necessary.
- Use `FOR UPDATE SKIP LOCKED` for queue-like patterns (e.g. processing pending payments).
- Keep transactions as short as possible — milliseconds, not seconds.

## 5. Bulk Operations

For inserting/updating many rows, never loop with individual `add()` calls.

Bad — N round trips:
```python
for item in items:
    db.add(SearchHistory(**item))
await db.commit()
```

Good — single statement:
```python
from sqlalchemy.dialects.postgresql import insert

stmt = insert(SearchHistory).values(items)
await db.execute(stmt)
await db.commit()
```

For upserts:
```python
stmt = insert(SearchHistory).values(items)
stmt = stmt.on_conflict_do_update(
    index_elements=[SearchHistory.id],
    set_={col: stmt.excluded[col] for col in update_columns}
)
await db.execute(stmt)
```

## 6. JSONB Columns — Handle with Care

This project uses JSONB extensively (User.info, User.stats, payment_metadata, etc).

Rules:
- Always call `flag_modified(instance, "column_name")` after mutating JSONB in-place, or SQLAlchemy won't detect the change.
- Prefer atomic PostgreSQL JSONB operators for concurrent-safe updates:

```python
from sqlalchemy import text

# Atomic increment of a JSONB field
await db.execute(
    text("""
        UPDATE users
        SET stats = jsonb_set(
            stats,
            '{credits_used}',
            to_jsonb(COALESCE((stats->>'credits_used')::int, 0) + :amount)
        )
        WHERE id = :user_id
    """),
    {"amount": amount, "user_id": user_id}
)
```

Do NOT do this (race condition):
```python
user.stats["credits_used"] += amount  # read-modify-write is NOT atomic!
flag_modified(user, "stats")
await db.commit()
```

## 7. Connection Pool Awareness

The project uses `asyncpg` with these pool settings:
- `pool_pre_ping=True` — validates connections before use
- `pool_recycle=3600` — recycles after 1 hour

Guidelines:
- Avoid holding a session idle for a long time (e.g. during a sleep or external call). Return it to the pool.
- If you see `TimeoutError` or "too many clients", the pool is exhausted — check for leaked sessions, unawaited coroutines, or long-lived transactions.
- For background tasks (scheduler), create a separate session rather than sharing with request handlers.

## 8. Indexing Strategy

Before writing a new query, ensure proper indexes exist:

```python
# In the model
class SearchHistory(Base):
    user_id = Column(UUID, ForeignKey("users.id"), index=True)
    created_at = Column(DateTime, server_default=func.now(), index=True)
```

For JSONB queries:
```sql
CREATE INDEX idx_user_info_gin ON users USING GIN (info);
```

For composite lookups:
```python
__table_args__ = (
    Index("ix_history_user_date", "user_id", "created_at"),
)
```

Rule of thumb: if a query appears in a list endpoint or runs frequently, its WHERE and ORDER BY columns need indexes.

## 9. Query Performance Checklist

After writing a query, verify:

- [ ] **Eager loading**: All accessed relationships have `selectinload`/`joinedload`
- [ ] **Pagination**: Query has `.limit()` — never return unbounded results
- [ ] **Indexes**: WHERE and ORDER BY columns are indexed
- [ ] **Single round-trip**: Count and data combined where possible
- [ ] **No transaction leaks**: Session is released before any external call
- [ ] **JSONB safety**: Uses `flag_modified` or atomic operators
- [ ] **Bulk-ready**: Inserts/updates of multiple rows use bulk statements
- [ ] **Repo compatibility**: The query/session pattern matches the surrounding module unless you are intentionally refactoring the whole flow
