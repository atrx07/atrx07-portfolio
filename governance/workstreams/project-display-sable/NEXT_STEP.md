# Next Step — project-display-sable

> This roadmap belongs only to `project-display-sable`.

## Handoff

- Portfolio baseline `871f69d`; read-only Sable evidence `5a727c9`.
- Scope: project-list addition; keep Traelyx current.
- Implementation and local verification complete; source delivery and live verification pending.

## Implementation sequence

1. Commit and push the validated portfolio source to `origin/main`, excluding unrelated experiment
   lockfiles and ignored QA artifacts.
2. Observe Cloudflare's published HTML/assets and compare the homepage and portfolio bundle with the
   local build. A push alone does not establish deployment.
3. Verify Sable's card/dialog, explanatory controls, terminal, architecture/palette access, repository
   link, structured data, sitemap date, console, overflow, and the unchanged Traelyx current-build slot
   on the deployed portfolio. Record a precise blocker if the deployed surface cannot be observed.
4. Update only this workstream's status/continuation and registry row, then commit/push the handoff.

## Constraints

- No external repository mutations, hosted inference calls, fake live output, or unsupported metrics.
- Do not change other workstream handoffs, the root router, or legacy scratch status.
- Preserve Traelyx, existing projects, Field Notes, and isolated preview work.

## Exit criteria

- SCOPE.md criteria are satisfied with observed validation evidence.
- Remaining deployment or maintenance work is recorded only here.
