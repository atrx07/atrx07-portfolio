# ATRX Worlds — interactive 3D portfolio experiment

An isolated redesign experiment. **This is not the production portfolio and must not
be deployed as a replacement without the user's explicit approval.** Nothing in the
main portfolio (`src/`, `index.html`, `public/`, root configs) was touched; the
previous experiment (`experiments/redesign-3d`) was left completely alone.

## Concept

One persistent 3D scene; scrolling flies the camera through five worlds:

1. **Origin** — kinetic headline over the *memory lattice*: a neural core with
   14 orbiting memory nodes (local AI + bots with memory — the actual work, not
   generic gadgets).
2. **Build shelf** — the 7 featured projects as clickable planets, each with its
   own geometry and accent color. Click opens a dossier (proof points, stack,
   honest constraints, repo link).
3. **Capability map** — 5 interactive skill orbs (one per capability group);
   tap to expand.
4. **Operating system** — the 4 working principles as beacon pillars.
5. **Open channel** — a transmission beacon; email copy + GitHub actions.

All copy and project data is imported live from the main portfolio
(`../../../../src/data/*`, `../../../../src/types`) — no duplicated data files.

## Interactions

- Scroll-driven camera rig (single lerped waypoint rig, **no OrbitControls**)
- Percentage preloader, custom cursor (fine pointers only), magnetic buttons
- Scroll progress bar + world-jump nav dots + dossier counter ("dossiers n/7")
- Easter egg: type `atrx` or the Konami code → **signal mode** (core cycles the spectrum)
- Pause control; `prefers-reduced-motion` disables idle animation
- Mobile: touch stepper buttons between worlds, no cursor/tilt, DPR capped at 1.25
- WebGL failure → designed static fallback with the full content, readable

## Run

From this directory:

```bash
npm install
npm run dev      # http://127.0.0.1:4181
npm run build    # tsc + vite build -> dist/
npm test         # vitest
```

## Performance notes

- DPR capped (≤2 desktop, ≤1.5 medium, 1.25 low tier); device-tiered star counts
- No React state updates inside `useFrame` (zustand mutable progress ref, preallocated temps)
- Bloom only on medium/high tiers; CSS vignette + grain instead of extra passes
- Rendering pauses when the tab is hidden (rAF stops); pause control halts the composer
- Procedural geometry only — no model/texture downloads (drei `<Text>` not used;
  labels are DOM pills via `<Html>`, which also keeps them accessible)

## Known simplifications

- No audio (gated ambient drone was considered; cut for scope)
- No physics tossing for skill orbs (Rapier would add ~150kb; hover/click only)
- drei `<Html>` labels are always on top (no occlusion) — acceptable for pills
- Systematic mobile QA was not possible from this environment; the mobile path
  (stepper, DPR cap, reduced particles) is implemented but untested on device
