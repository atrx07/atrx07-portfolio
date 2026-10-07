# ATRX Portfolio Workstream Registry

> Registry only. This file does not define the active workstream for every chat. A chat selects its workstream from the user's request and its own conversation context.

## Invariants

- Independent goals have independent handoff files.
- Newer work does not supersede older unfinished work.
- Do not remove a workstream row unless the user explicitly archives/deletes that goal.
- Do not store task-specific implementation sequences in this file.
- Do not create a global active-workstream pointer.

| Workstream ID | State | Purpose | Durable/source baseline | Status | Versioned next step |
| --- | --- | --- | --- | --- | --- |
| `blog-field-notes` | complete / maintenance-ready | Maintain the delivered Field Notes/blog system and publish only grounded real notes | correction baseline `1f7589c`; latest publication `5b53f6b`; first publication `1f13272`; release baseline `76800e9`; recovered from blog handoff `3096a9a` | `governance/workstreams/blog-field-notes/STATUS.md` | `governance/workstreams/blog-field-notes/NEXT_STEP.md` |
| `project-display-traelyx` | maintenance / verified-live representation | Keep the **portfolio's display of Traelyx** aligned with verified public Traelyx truth | portfolio refresh `f5c68f9`; public evidence `9508af2`; verified-live 2026-10-07; historical display `3cde4fc` | `governance/workstreams/project-display-traelyx/STATUS.md` | `governance/workstreams/project-display-traelyx/NEXT_STEP.md` |
| `documentation-health` | completed | Correct stale portfolio documentation and related audit findings | correction `4af556a`; audit baseline `de59801` (2026-10-06) | `governance/workstreams/documentation-health/STATUS.md` | `governance/workstreams/documentation-health/NEXT_STEP.md` |
| `button-hover-hold` | verified-local | Restore desktop hover and mobile hold animation for portfolio mask actions | baseline `fa3d24d` (2026-10-07) | `governance/workstreams/button-hover-hold/STATUS.md` | `governance/workstreams/button-hover-hold/NEXT_STEP.md` |

## Selecting a workstream

- A Blog/Field Notes conversation uses `blog-field-notes`.
- A request to add/update how Traelyx appears on the portfolio uses `project-display-traelyx`.
- A request to develop Traelyx itself does **not** use this portfolio workstream and requires an explicit switch to the Traelyx repository.
- A new unrelated portfolio goal gets a new workstream ID.

## Shared implementation note

Both current workstreams can touch shared portfolio routes, metadata, styles, tests, or deployment. Shared files do not imply shared roadmap ownership.
