# Next Step — project-display-traelyx

> This roadmap applies only to **how Traelyx is represented on atrx07-portfolio**. It is not a Traelyx implementation roadmap.

## Portfolio handoff

- Portfolio source baseline: `3cde4fc` — the portfolio was updated to represent verified Traelyx M3.7 local telemetry processing.
- External evidence baseline recorded by the prior handoff: `d9fcda6458701f58a63e145c6cde5eed726cb16f` on public Traelyx `main` (2026-08-16).
- Portfolio truth boundary:
  - M0–M2 complete;
  - M3.1–M3.7 implemented/validated in the external public source;
  - M3.8 regression corpus pending explicit authorization;
  - M4+ capabilities remain unimplemented.
- Portfolio verification baseline from the prior handoff:
  - typecheck passed;
  - 67 unit/component tests passed;
  - production build passed;
  - Playwright passed 35 with one expected desktop-only skip;
  - 1280, 768, 640, and 360 px browser QA passed without overflow or console warnings/errors.
- Exact live Cloudflare verification of the portfolio baseline remained a separate checkpoint.

## Implementation sequence — portfolio only

Live checkpoint update — 2026-10-07: the documentation audit observed the deployed portfolio's expected
M3.7 representation, developer constraints, terminal checkpoint, responsive dialog, repository CTA,
reduced motion, console, overflow, canonical/structured metadata, and sitemap. The deployment
verification sequence below is retained for the next portfolio representation change; the old pending
checkpoint is resolved by direct observation. A future content advancement still begins with step 4's
read-only public-evidence audit, not external development.

1. After the relevant portfolio source commit is deployed, inspect `https://atrx07.pages.dev/` on fresh desktop and mobile visits.
2. Verify that the **portfolio** hero, flagship, Traelyx accordion, detail sheet, architecture, terminal output, repository CTA, JSON-LD, sitemap date, reduced-motion behavior, console, and overflow all agree on the M3.7/M3.8 truth boundary.
3. Record only observed **portfolio deployment** facts in this workstream's `STATUS.md`.
4. Before a future Traelyx representation refresh, inspect the public Traelyx repository as **read-only evidence**. Re-read its public README/status/plans/completed milestones and validation records only to determine what the portfolio is allowed to claim.
5. If public evidence later verifies M3.8, update `atrx07-portfolio` beginning with `src/data/projects.ts`, then synchronize the portfolio hero, flagship, visual, terminal, metadata, tests, README, and durable governance.
6. Do not implement, authorize, test, or advance M3.8/M4 in Traelyx from this workstream.
7. After any portfolio truth/layout change, rerun typecheck, unit/component tests, production build, complete Playwright desktop/mobile coverage, and responsive visual QA.

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

- The deployed **portfolio** is observed serving the intended Traelyx representation, or the precise portfolio live-verification blocker remains documented.
- All portfolio surfaces agree on the same verified Traelyx boundary.
- No portfolio surface implies M3.8/M4 implementation before public evidence supports it.
- Desktop, tablet, 640 px reflow, 360 px mobile, reduced motion, keyboard focus, overflow, metadata, and console checks pass.
- Typecheck, unit/component tests, production build, and Playwright pass after any follow-up change.
- No unsupported claim, fake telemetry, private data, local path, college detail, or ignored control file enters source or emitted artifacts.
