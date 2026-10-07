# Status — button-hover-hold

## State

`completed` / `verified-live` — 2026-10-07; source correction `6dfb950` on `main`.

## Verified facts

- At baseline, the hover rule preceded equally specific sprite animation shorthands, which reset its
  animation name. The later press rule still worked.
- Desktop hover activation now follows sprite defaults and remains gated by hover/fine-pointer media.
- Browser regressions verify hover/leave, mobile hover inactivity, touch hold/release/cancellation,
  lazy sprite loading, keyboard interaction, and reduced motion.
- Typecheck, 73 unit/component tests, and production build passed. Full Playwright: 39 passed,
  one expected desktop skip. Existing Field Notes and project-display behavior passed.
- Visual QA at 1280 px desktop and 360 px mobile showed the mask mid-animation. Native Chromium
  touch injection also verified hold and cancellation without persistent activation.

## Blockers

- None identified.

## Shared-file dependencies

- Portfolio CSS and shared mask components serve existing project and contact actions.
- Preserve Field Notes route isolation and project-display behavior; their handoffs remain independent.

## Notes

Source correction `6dfb950` (`fix: restore desktop mask button hover animation`) was pushed to main.
Cloudflare was verified after deployment, not inferred from that push. Its JavaScript hashes differ
from the Windows local build, but the live route loads the exact corrected
`PortfolioPage-BAloPNYZ.css` stylesheet. Observed live entry: `index-B6VB5mKS.js`; portfolio chunk:
`PortfolioPage-c3GLyas1.js`.

Live Chromium checks passed at 1280 px desktop and 360 px mobile: mouse hover/leave and native touch
hold/cancel resolved to the expected animation states. Local regressions additionally covered release,
mobile hover inactivity, keyboard, and reduced motion. Live screenshots were captured and inspected.
No remaining work or blockers for this request.
