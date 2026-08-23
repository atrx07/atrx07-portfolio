# Status — blog-field-notes

## Pending source commit — 2026-08-23

- Pulled and recovered current `main` at `ce3302a`; no pre-existing worktree edits were present.
- Confirmed live Cloudflare serves the current pre-optimization graph: `/blog` and recovery request only
  the shared `index-C4c_lvj9.js` / `index-FoufsvxV.css` graph plus the font stylesheet and footer mark;
  `/` requests the matching portfolio JS/CSS, one portrait hero, the Traelyx mark, and all three mask
  sprites. No inspected route emitted a warning/error or desktop page overflow.
- Added responsive WebP hero sources with JPEG fallbacks, an optimized lossless WebP footer mark with a
  PNG fallback, and interaction-aware mask attachment with reduced-motion and unsupported-mask static
  fallbacks.
- Measured source assets: portrait 274,649 B JPEG -> 161,506 B WebP; wide 332,350 B JPEG -> 203,542 B
  WebP; footer 166,919 B PNG -> 42,660 B WebP. The three masks total 1,363,518 B and are now absent from
  initial homepage delivery.
- Measured initial visual request reduction: 1,600,920 B desktop and 1,616,585 B mobile, before transfer
  compression or cache effects. First keyboard focus fetched only the selected forest sprite.
- Production output: shared CSS `index-CAEqsc4T.css` at 40.18 kB / 8.51 kB gzip; portfolio CSS
  `PortfolioPage-C4IXnPUw.css` at 59.70 kB / 11.76 kB gzip; shared JS `index-B4WWZioB.js` at
  243.77 kB / 79.64 kB gzip; portfolio JS `PortfolioPage-BXmGPYdi.js` at 308.07 kB / 108.10 kB gzip;
  draft body `registry-fixture-PKSplol0.js` at 1.96 kB / 0.83 kB gzip.
- Verification complete: typecheck passed; 70 unit/component tests passed; production build passed;
  Playwright passed 35 with one expected desktop skip; focused hero and deferred-mask request checks
  passed in both desktop and mobile projects; local browser request/visual/console inspection passed.
- Awaiting the source commit hash, push, and exact post-deployment Cloudflare verification.

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
