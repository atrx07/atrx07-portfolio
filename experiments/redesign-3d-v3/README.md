# ATRX Planetary Portfolio — experiment preview

A second-iteration 3D portfolio experiment ("real planets" remake). This is an
**isolated local preview** — not the production entry point, not a
release-approved replacement.

## What it is

A real portfolio page (hero, projects, skills, about, contact — all real DOM
content from the main portfolio's data files) with a fixed full-viewport 3D
stage behind it: a planetary system where **each of the 7 featured projects is
a realistic planet** — textured surface, day/night terminator, night-side city
lights, ocean sun-glint, fresnel atmosphere shell, independent cloud layer, and
a ring system on the gas giant. The lava world is fully procedural in-shader.

Scroll drives a damped camera journey through the system. Clicking a planet
(its surface, its floating label, or its project card) flies the camera in and
opens a rich dossier panel with the real project data: proof points, honest
constraints, stack, and repo link.

## Run from this directory

```powershell
npm install
npm run dev      # http://127.0.0.1:4182
npm run build
npm test
```

Output: this directory's `dist/`. The root portfolio build uses its unchanged
entry and dependencies. Do not deploy this preview to production until the user
approves a tested replacement. No production hosting configuration is included.

## Notes

- Project/profile records are imported live from the portfolio source via
  relative imports (`../../../../src/data/...`) — nothing is copied or edited.
- Planet textures load at runtime from CDN (see THIRD_PARTY.md for
  attribution); if a fetch fails, a procedural canvas fallback keeps the planet
  visible — nothing is ever black.
- Reduced motion and the pause control remove ambient motion. WebGL failure
  (or `prefers-reduced-motion`) falls back to a readable static page with the
  same content.
- Easter egg: type `atrx` or enter the Konami code for signal mode.
- Systematic mobile QA was not performed from the agent side; the mobile path
  (touch nav, DPR cap, dropped shells on low tier) is implemented but untested
  on a real device.
