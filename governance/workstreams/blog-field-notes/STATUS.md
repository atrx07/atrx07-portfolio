# Status — blog-field-notes

Status source: **reconstructed from versioned evidence** because the historical root `STATUS.md` was ignored and is not recoverable from Git history.

## Last confirmed blog handoff

- Governance handoff: `3096a9a` — `docs: hand off visual asset delivery`.
- Implementation baseline: `ed44e36` — `perf: isolate route-owned styles and artwork`.
- Route-owned stylesheet split was implemented.
- Shared eager CSS measured 40.14 kB (8.50 kB gzip).
- Lazy portfolio stylesheet measured 50.81 kB (10.24 kB gzip).
- Direct Field Notes and recovery routes locally avoided hero JPGs, mask sprites, portfolio JS, and portfolio CSS.
- Homepage locally requested portfolio JS/CSS and exactly one breakpoint-correct high-priority hero.
- Typecheck passed.
- 65 unit/component tests passed.
- Playwright passed 33 with one expected desktop skip.
- Desktop, 360 px, narrow reflow, keyboard, reduced-motion, overflow, request, console, privacy, and ignored-control checks passed locally.

## Unresolved checkpoint at handoff

Exact Cloudflare verification of `ed44e36` was **not claimed** because direct navigation was blocked by the browser safety gate.

The next intended phase was live closure followed by visual-asset delivery optimization.

## Current-state warning

Later project-display commits changed shared portfolio files. Before resuming optimization:

1. compare the current implementation against the recovered baseline;
2. retain current project-display behavior;
3. rerun blog/route regressions;
4. do not assume old transient bundle hashes still exist.

## Workstream state

`active / recovered`

Do not mark completed until the recovered next-step exit criteria and original Field Notes definition of done are satisfied or explicitly superseded by the user.