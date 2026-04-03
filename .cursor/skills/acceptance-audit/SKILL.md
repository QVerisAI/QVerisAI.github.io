---
name: acceptance-audit
description: >-
  Audit implemented work against a plan, roadmap, or review checklist and produce a final
  status table. Use when the user asks for验收, final acceptance, plan comparison, remaining
  items analysis, or whether a feature can be submitted.
---

# Acceptance Audit

Use this skill when the task is "did we actually finish it?" rather than "make another edit".

## Inputs To Gather

- the plan file or checklist being audited
- current local diffs or changed files
- test results
- any explicit product decisions made later in the conversation

## Workflow

### 1. Compare against the real target

- Audit against the latest approved plan, not the oldest aspirational roadmap if scope changed later.
- Note any explicit deferrals or product decisions that changed the success criteria.

### 2. Inspect implementation, not just commit messages

For each plan item, verify the relevant code paths, not only whether a file changed.

Typical checks:

- code moved to the intended layer
- stale old paths or endpoints removed
- frontend and backend contracts still match
- tests updated with the new patch targets and response shapes

### 3. Classify each item precisely

Use one of:

- `已完成`
- `部分完成`
- `未完成`
- `有偏差`
- `已延期`

Only mark `已完成` when the exit condition is truly met.

### 4. Separate blockers from non-blockers

- A consciously deferred item is not the same as a missed item.
- A passing test suite does not automatically mean the plan item is complete.
- A product-model mismatch or stale public wording can still be a blocker even if backend tests pass.

### 5. Re-run verification when needed

If the result depends on current state, rerun the relevant tests or checks instead of relying on old output.

## Output Format

Start with findings first if there are blockers.

Then provide a concise status table with:

- item
- status
- evidence
- whether it blocks submission

End with a direct conclusion such as:

- `Phase 6 scoped close-out complete; can submit`
- `Not ready to submit; blockers remain`

## Final Checklist

- [ ] Latest scope/plan identified correctly
- [ ] Deferred items separated from failed items
- [ ] Tests or runtime checks rerun when needed
- [ ] Status table reflects actual exit criteria
- [ ] Final submission recommendation is explicit
