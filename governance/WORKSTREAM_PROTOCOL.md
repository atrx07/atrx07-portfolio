# Workstream Protocol

## Why this exists

The previous repository governance used root `STATUS.md` and root `NEXT_STEP.md` as singleton handoffs. That model cannot safely support multiple Codex threads working on independent goals.

A later project-display task replaced the earlier Field Notes continuation even though both goals were valid and the blog roadmap still existed in durable specification files.

This protocol makes task state namespaced and persistent.

## File classes

### Durable specification

- `PROJECT.md`
- `ARCHITECTURE.md`
- `DESIGN.md`
- `AGENTS.md`
- README

These describe product truth and long-lived constraints. They are not "what should this chat do next?" files.

### Root orchestration

- `AGENTS.override.md`
- `WORKSTREAMS.md`
- `governance/STATUS.md`
- root `NEXT_STEP.md`

These define scope isolation and route a chat to the correct workstream. They must not be captured by one task.

### Workstream state

- `governance/workstreams/<id>/SCOPE.md`
- `governance/workstreams/<id>/STATUS.md`
- `governance/workstreams/<id>/NEXT_STEP.md`

Only these files carry task-specific continuation state.

## Create-vs-reuse test

Reuse a workstream only if all are true:

1. Same user goal.
2. Same exit criteria.
3. Same target product surface.
4. New work naturally advances the existing roadmap.

Otherwise create a new workstream.

Examples:

- "Improve Field Notes asset delivery" → `blog-field-notes`.
- "Add/update Traelyx on the portfolio" → `project-display-traelyx`.
- "Implement M3.8 in Traelyx" → NOT a portfolio workstream; switch repository.
- "Add another unrelated portfolio project" → create a new project-display workstream unless the user explicitly folds it into an existing catalog goal.

## Cross-workstream dependency

A workstream may note that another task changed a shared file, but cannot replace the other task's continuation.

A dependency note is informational, for example:

```text
Shared dependency: src/styles/portfolio.css changed in project-display-traelyx.
Blog regression suite must be rerun before its next release.
```

It does not transfer ownership.

## Handoff write rules

At the end of work:

- write observed facts to the active workstream status;
- write remaining plan to that active workstream next-step;
- update one row in `WORKSTREAMS.md`;
- do not touch another workstream unless a real dependency changed;
- do not put active roadmap content in root `NEXT_STEP.md` or `governance/STATUS.md`.

## External-project rule

External repositories are source-of-truth datasets for the portfolio. Their roadmaps cannot become the portfolio agent's roadmap. A portfolio agent may only alter the public representation of verified external state.