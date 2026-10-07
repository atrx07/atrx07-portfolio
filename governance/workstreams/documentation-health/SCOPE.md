# Workstream Scope — documentation-health

## Goal

Correct stale portfolio documentation and related issues found by the 2026-10-06 health audit.

## In scope

- Reconcile durable documentation with checked-out portfolio behavior and current public content.
- Correct workflow references to isolated workstream handoffs.
- Add dated verification/dependency notes to existing workstreams without replacing their history,
  roadmap ownership, or project evidence baseline.
- Fix reproducible portfolio issues discovered during the audit, validate, commit, push, and verify the
  portfolio deployment.

## Out of scope

- Developing external featured projects or advancing their claimed milestones.
- Publishing new Field Notes, redesigning working surfaces, or adding unrelated features.
- Replacing, deleting, or silently completing another workstream.

## Writable target

`atrx07/atrx07-portfolio`; external project repositories are read-only evidence.

## Durable baseline

- Source: clean `main` at `de59801`, independently matching GitHub on 2026-10-06.
- The portfolio has seven projects, two public Field Notes, and a development-only draft fixture.
- Existing Field Notes and Traelyx display scopes and product/privacy requirements remain intact.

## Exit criteria

- Current-state documentation agrees with source and observed live behavior; historical records are
  explicitly historical.
- Workstream handoffs remain isolated and router/index files contain only routing/index information.
- Related fixes pass appropriate checks; delivery and live observations are recorded separately.
- No external product, unsupported claim, private artifact, or unrelated roadmap is changed.
