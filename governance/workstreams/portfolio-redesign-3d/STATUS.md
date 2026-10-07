# Status - portfolio-redesign-3d

## State

`verified-local` - first interactive exhibition preview implemented and checked. User design review and production replacement remain `pending`.

## History and baseline

- 2026-10-07: User authorized reference research, then implementation using gpt-taste, reusable UI source, and original reconstruction from visual references. Sites was explicitly excluded.
- Identity requirement: ARPPITH ANDREWS receives equal or slightly greater emphasis than ATRX and atrx07; all three remain prominent.
- Source baseline: `520c6054029bb33dc7c4bd40ea6153cb069c62b5`, main, clean before this workstream.
- Research inspected the four original tabs (ThreeUI, Dribbble, 21st, GSAP), the later GodUI tab, and selected additional references. Evidence, licensing limits, alternatives, and proposed budgets remain in RESEARCH.md. Research preceded application/dependency changes.

## Source synchronization

Source commit: `383729e` on `main`. Contains the isolated prototype, research/scope/handoff, additive registry entry, and architecture note. Validation below completed before commit. Remote synchronization and live deployment observation are not inferred from this local commit.

## Verified local implementation

- Independent React 18 / Vite / TypeScript app with own manifest, npm lockfile, server on 127.0.0.1:4180, and own dist/. Production entry, sources, dependencies, routes, public assets, and hosting settings remain unchanged.
- Root build still publishes root dist/; no preview entry or imports were added. Production-file diffs are empty and experimental visual markers are absent from root output. This verifies build isolation for source synchronization; the redesign is not deployed.
- Original procedural Three.js assembly and reflective materials, pointer rotation, pull-apart/reset, project picking, Traelyx device exhibit, NeuraLoc compute layers, desktop GSAP pinning and scroll scaling.
- Full name leads desktop/mobile opening; ATRX and atrx07 remain prominent before WebGL loads and in still view.
- Portfolio data imported read-only: seven projects with existing statuses/evidence/constraints. Native dialog details include Overview, Architecture, Reality check, hash history, focus handling, and keyboard tabs.
- GodUI-derived Magic Tab directly reused/restyled with upstream MIT attribution in THIRD_PARTY.md. No paid/gated source imported. Objects are original illustrations; Traelyx route is labeled synthetic.
- Project filters, command search, bounded terminal, contact links, copy feedback, and two published Field Notes links. Draft metadata excluded; article links currently use the published portfolio.
- Non-hero renderers initialize near the viewport; offscreen rendering pauses, mobile cadence/DPR are bounded, resources dispose on cleanup. Manual/system reduced motion remove ambient scene, marquee, and scroll motion. CSS fallback implemented for WebGL failure.

## Validation - 2026-10-07

- Preview strict TypeScript / Vite build passed. Four focused tests passed: identity/publication visibility, experimental filter truth, Traelyx limitations/source, and arbitrary terminal command rejection. GSAP test teardown leaves no unhandled errors.
- Existing portfolio: lint passed; 26 test files / 73 tests passed; production build passed.
- Browser observed live WebGL, pull-apart/reset, direct central-object selection opening NeuraLoc, dialogs/tab keyboard selection, Escape/close focus restoration, filters, architecture controls, command search/input focus, terminal project output, copy feedback, and still view.
- Corrected canvas sizing under GSAP scaling and verified picking against the rendered object. No warning/error console entries observed in checked preview tab.
- Layout checked at measured 1600 x 1111 and 400 x 889 CSS pixels without horizontal overflow. Requested overrides were 1440 x 1000 and 360 x 800; this browser reported larger effective sizes. Exact 360px remains pending.
- Desktop/mobile screenshots saved in this chat's visualization directory; local preview server left running.
- Root STATUS.md and .agents remain ignored. Other workstream handoffs and external project repositories are unchanged.

## Remaining limitations

- First preview, not release parity: local Field Notes routes, SEO/canonical metadata, navigation recovery, and decisions on visitor modes/discovery/optional sound remain.
- Lazy scene chunk: 501.90 kB minified / 128.00 kB gzip; Vite's 500 kB warning remains. Main app: 304.56 / 106.72 kB; CSS: 28.41 / 7.29 kB. These are bundle sizes, not measured load/FPS claims.
- Device/network profiling, exact small-screen/zoom checks, broader keyboard/accessibility review, and explicit GPU-failure testing remain.
- Models are concept illustrations; further art direction and actual project media selection remain review work.
- No production switch or redesign live verification. Explicit user satisfaction/approval required before replacement.

## Shared-file dependencies

Only registry and an isolated architecture note change shared documents. Production code is read-only for this pass. This workstream owns the portfolio redesign, not development of represented projects.
