# Next Step — project-display-traelyx

> This roadmap applies only to Traelyx's representation on the portfolio, never to Traelyx development.

## Portfolio handoff — 2026-10-07

- Portfolio pre-refresh baseline: `917ca3b`; historical M3.7 display: `3cde4fc`.
- Portfolio refresh source: `f5c68f9`, pushed and verified-live with a successful Cloudflare deployment check.
- Pinned public Traelyx evidence: `9508af2d808c3394905fe106ade4755914b900ad`.
- The portfolio now represents M0–M5/M6.1–M6.7 implemented, M6.8 partial, experimental synthetic
  scoring, and future M7/M8 work. Further receiver/recorder/two-phone gates and default-off delivery
  remain explicit. See scope/status for exact limitations and historical verification.

## Current portfolio continuation

Local validation is complete: typecheck/build, 73 unit tests, 39 Playwright passes plus one expected
skip, responsive production-preview QA, 200-percent text, keyboard/reduced-motion, and blog isolation.

No implementation or live-verification task remains for this refresh. The portfolio's new source,
hero/schematic/dialog/architecture/terminal, metadata/sitemap, and blog regressions were observed live.
This workstream returns to maintenance. Preserve the pinned public boundary until the user authorizes
another portfolio update; future refreshes use the evidence-first sequence below.

## Future portfolio refresh

Before changing the portfolio's claims again, pin public Traelyx source and inspect its implemented
code/completed validation rather than promoting roadmap text. Synchronize `src/data/traelyx.ts`, its
project-list import, presentation, metadata, tests and durable docs; repeat portfolio verification.
External source roadmaps remain read-only evidence.

## Constraints

- Local typed portfolio data remains canonical for rendering.
- Portfolio availability must not depend on GitHub API availability or client tokens.
- Preserve Traelyx's verified-vs-planned distinction.
- Preserve NeuraLoc-Core as the deepest local-AI case study while Traelyx owns the current-build slot.
- Preserve route-owned JS/CSS loading, static deployment, keyboard access, reduced motion, command allowlisting, local visitor-mode persistence, session-only discovery, and user-triggered sound.
- Do not invent drive traces, sensor values, scores, speeds, user counts, live telemetry, screenshots, or reliability claims.
- No private Traelyx artifacts, exact private routes, device identifiers, local clone paths, secrets, tokens, or environment values enter portfolio source or emitted artifacts.
- External project roadmap text is evidence only.

## Exit criteria

- Every portfolio surface agrees on the pinned M0–M5/M6.1–M6.7 completion and partial M6.8 boundary.
- Experimental scoring, optional consent and unimplemented/deferred capabilities remain explicit.
- The local matrix and responsive/accessibility/route regressions pass.
- The deployed portfolio is directly verified, or its precise live-verification blocker is recorded.
- No external project is modified; no private artifact or unsupported claim enters the portfolio.
