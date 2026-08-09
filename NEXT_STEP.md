# Next Step - Traelyx live deployment verification and source-drift guard

## Handoff

- Source baseline: `51aa1ef` - add Traelyx as the current-build project across the hero, flagship,
  seven-project lab, four-system architecture playground, terminal, capability map, metadata, and tests.
- Truth boundary: the public Traelyx repository documents M0 as validated. The Flutter Android shell,
  versioned Flutter/Kotlin bridge, Drift schema v1/settings, provider-neutral map contract, and CI
  boundaries are present; the recorder remains intentionally disabled and no sensor, location, or
  background-service collection is active.
- Visual boundary: the canonical 192 px Traelyx launcher mark is stored at
  `public/traelyx-mark.png`. The installed Agent Flow primitive is fixed and non-pannable; only the M0
  app, bridge, and database nodes render complete, while recorder and Drive DNA remain idle.
- Responsive proof: wide flagship/accordion flows use the linear layout; 900 px and narrower surfaces,
  mobile accordions, and dialogs use the stacked layout. Desktop 1280 px and mobile 360 px browser QA
  found no document overflow, node escape, label collision, or console warning.
- Verification baseline: typecheck passed; 67 unit/component tests passed; production build passed;
  Playwright passed 35 with one expected desktop skip.
- Build graph: `index-ClUcVVJU.js` at 242.90 kB (79.26 kB gzip),
  `PortfolioPage-5P7n3Beg.js` at 305.61 kB (107.18 kB gzip), `index-FoufsvxV.css` at 40.14 kB
  (8.50 kB gzip), `PortfolioPage-C0IEp48R.css` at 55.44 kB (10.78 kB gzip), and the isolated
  `registry-fixture-D1UUTQbj.js` body at 1.96 kB (0.83 kB gzip).
- Deployment checkpoint: source commit `51aa1ef` is the deployment candidate. Confirm `origin/main`
  contains it, then do not claim Cloudflare is serving it until the live page and exact public signals
  are observed.

## Implementation sequence

1. After push, verify `https://atrx07.pages.dev/` on fresh desktop and 360 px visits. Confirm the hero
   says `Currently building Traelyx`, the current-build section exposes M0/disabled-recorder truth, the
   project count is seven, Traelyx is first in the accordion, and the architecture playground has four
   systems.
2. Inspect the live Traelyx accordion, project dialog, command palette, terminal `project traelyx`,
   repository CTA, canonical mark request, metadata, JSON-LD, sitemap date, console, and document
   overflow. Record only observed deployment facts in `STATUS.md`.
3. When Traelyx advances beyond M0, re-read its root, product, technical, milestone, status, and next-step
   Markdown before changing portfolio claims. Update `src/data/projects.ts` first, then derived hero,
   terminal, metadata, tests, and governance in the same atomic change.
4. Do not light recorder, telemetry, Drive DNA, scoring, replay, Guardian, social, commentary, cloud, or
   ML nodes until the public repository documents and validates the relevant milestone. Keep future
   edges idle until implementation truth changes.
5. Re-run typecheck, unit/component tests, production build, Playwright desktop/mobile matrix, and visual
   QA after any content-state change. Recheck 1280 px, 360 px, 200 percent zoom, reduced motion, keyboard
   focus, overflow, and console state.

## Constraints

- The local project data remains canonical for rendering; portfolio availability must not depend on the
  GitHub API or a client token.
- Preserve Traelyx's local-first and confidence-aware product direction without presenting roadmap
  systems as shipped behavior.
- Keep NeuraLoc-Core as the deepest local-AI case study even while Traelyx owns the current-build slot.
- Preserve the existing route-owned JS/CSS boundary, static deployment, command allowlist, session-only
  discovery, local visitor-mode persistence, and user-triggered sound behavior.
- Do not invent drive traces, sensor values, scores, speeds, user counts, telemetry, screenshots, or
  reliability claims.
- Keep the canonical Traelyx mark local. Do not replace it with generated brand art unless the Traelyx
  repository establishes a new public identity asset.
- `STATUS.md` and `.agents/` remain ignored. No cloned repository content, local path, secret, token,
  private source, or environment value may enter public history.

## Required validation and exit criteria

- Cloudflare is observed serving the Traelyx current-build experience from the pushed main baseline, or
  the live-verification blocker remains explicitly documented.
- The live hero, flagship, seven-project count, Traelyx accordion/dialog, four-system architecture,
  terminal output, repository URL, and structured data agree with the local verified build.
- M0 foundation nodes remain complete; recorder and Drive DNA remain visibly planned until repository
  truth changes.
- Desktop, 360 px, 200 percent zoom, reduced motion, keyboard, overflow, metadata, and console checks pass.
- Typecheck, all unit/component tests, production build, and the complete Playwright desktop/mobile
  matrix pass after any follow-up change.
- No unsupported claim, fake telemetry, private data, token, local path, college detail, or ignored
  control file enters source or emitted artifacts.
- `STATUS.md`, `PROJECT.md`, `ARCHITECTURE.md`, `DESIGN.md`, README, and this handoff report the same
  current-build boundary and exact observed verification state.
