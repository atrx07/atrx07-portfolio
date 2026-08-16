# Next Step - Verify the Traelyx M3.7 deployment and guard M3.8

## Handoff

- Portfolio baseline: `3cde4fc` - advance the Traelyx current-build story through verified M3.7 local
  telemetry processing.
- Traelyx source baseline: `d9fcda6458701f58a63e145c6cde5eed726cb16f` - public `main` on
  2026-08-16, closing replay channel reduction.
- Field-proof boundary: M0-M2 are complete. The accepted M2.8 fixture is one 39m17.1s,
  approximately 99%-locked, pocket-carried motorcycle trip on one Android 14 Tecno device with 3,689
  ordered chunks, 2,322 GNSS fixes, 469,953 accelerometer samples, 469,942 gyroscope samples, strict
  independent inspection, and exact phone/host archive-hash equality.
- Processing boundary: M3.1-M3.7 are implemented and validated across fail-closed raw decoding,
  aligned monotonic timelines, GNSS sanity filtering, stationary calibration, explicit coordinate
  transforms, derived motion channels, categorical confidence/metric eligibility, and bounded
  evidence-preserving replay reduction.
- Honesty boundary: the field fixture does not prove mounted vehicle-frame validity, broad OEM/device
  reliability, calibrated probability, complete deep-sleep/reboot hardening, or real-drive scoring.
  Replay output is local, ephemeral, display-only processing rather than a finished replay UI.
- Next gate: M3.8 remains pending explicit authorization and owns the deterministic regression corpus
  across car, motorcycle, device-move, and GNSS-loss fixtures. M4+ events, Drive DNA, scoring, maps,
  connected/social features, Guardian, ML, and commentary remain unimplemented.
- Visual boundary: Traelyx uses a code-native local telemetry pipeline with three evidence channels, an
  accepted-fixture ledger, and seven verified processing stages. It does not use Agent Flow; Aveline
  remains the only featured project using that component.
- Verification baseline: typecheck passed; 67 unit/component tests passed; production build passed;
  Playwright passed 35 with one expected desktop-only skip; 1280, 768, 640, and 360 px browser QA
  passed without overflow or console warnings/errors.

## Implementation sequence

1. After `3cde4fc` reaches Cloudflare Pages, inspect `https://atrx07.pages.dev/` on fresh desktop and
   mobile visits. Confirm the hero, flagship, Traelyx accordion, and detail sheet all expose the M3.7
   boundary and the M3.8 fixture-corpus gate.
2. Verify the live `project traelyx` and `now` terminal output, architecture nodes, repository CTA,
   JSON-LD, sitemap date, reduced-motion state, console, and document overflow. Record only observed
   deployment facts in ignored `STATUS.md`.
3. Before any later Traelyx update, fetch the public repository and re-read its root README, status,
   active plan, completed milestones, and accepted validation records.
4. If M3.8 is publicly authorized and completed, update `src/data/projects.ts` first, then synchronize
   the hero, flagship, visual, terminal, metadata, tests, README, and governance. Do not promote M4+
   capabilities from roadmap language alone.
5. Re-run typecheck, unit/component tests, production build, the complete Playwright desktop/mobile
   matrix, and responsive visual QA after any truth-state or layout change.

## Constraints

- Local typed data remains canonical; rendering must not depend on GitHub API availability or tokens.
- Never expose private trip-debug artifacts, precise routes, archive hashes, filenames, device
  identifiers, local clone paths, secrets, tokens, or environment values.
- Never turn schematic processing into fake live telemetry, a global confidence percentage, a driver
  score, usage metrics, or broad reliability claims.
- Keep NeuraLoc-Core as the deepest local-AI case study while Traelyx owns the current-build slot.
- Preserve route-owned JS/CSS loading, static deployment, keyboard access, reduced motion, command
  allowlisting, local visitor-mode persistence, session-only discovery, and user-triggered sound.
- `STATUS.md` and `.agents/` remain ignored and outside public history.

## Required validation and exit criteria

- The live Cloudflare page is observed serving `3cde4fc`, or the precise verification blocker remains
  documented without claiming deployment success.
- Hero, flagship, project card/dialog, architecture, terminal, repository link, metadata, and sitemap
  agree on the M3.7/M3.8 boundary.
- No Traelyx surface contains Agent Flow; Aveline's existing Agent Flow remains intact.
- Desktop, tablet, 640 px reflow, 360 px mobile, reduced motion, keyboard focus, overflow, metadata,
  and console checks pass on the deployed experience.
- Typecheck, all unit/component tests, production build, and the Playwright desktop/mobile matrix pass
  after any follow-up change.
- No unsupported claim, fake telemetry, private data, local path, college detail, or ignored control
  file enters source or emitted artifacts.
