# ATRX Portfolio Next-Step Router

> This file routes to a workstream. It is deliberately not a task roadmap.

## Resolution algorithm

When asked to continue or answer "what's next?":

1. Determine the current conversation's workstream.
2. Read `WORKSTREAMS.md`.
3. Read that workstream's `SCOPE.md`.
4. Read that workstream's `STATUS.md`.
5. Read that workstream's `NEXT_STEP.md`.
6. Continue only that roadmap.

If the conversation does not identify a workstream and more than one goal is plausible, ask which goal. Do not select the most recently modified handoff.

## Current workstream routes

### Field Notes / Blog

Use:

```text
governance/workstreams/blog-field-notes/SCOPE.md
governance/workstreams/blog-field-notes/STATUS.md
governance/workstreams/blog-field-notes/NEXT_STEP.md
```

### Traelyx portfolio display

Use:

```text
governance/workstreams/project-display-traelyx/SCOPE.md
governance/workstreams/project-display-traelyx/STATUS.md
governance/workstreams/project-display-traelyx/NEXT_STEP.md
```

### Documentation and health audit

Use `governance/workstreams/documentation-health/SCOPE.md`, `STATUS.md`, and `NEXT_STEP.md` for the
documentation cleanup requested in this conversation. This does not transfer ownership of the blog or
Traelyx display goals.

## Invariant

Never replace this router with the detailed next steps of one workstream.
