# Status — button-hover-hold

## State

`verified-local` — 2026-10-07; baseline `fa3d24d` on `main`.

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

Pending source commit: CSS cascade correction and browser regression assertions. Live verification
remains pending. Expected production portfolio stylesheet: `PortfolioPage-BAloPNYZ.css`.
