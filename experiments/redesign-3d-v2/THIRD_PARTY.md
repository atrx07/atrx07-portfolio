# Third-party inspiration — ATRX Worlds

No third-party code was copied into this experiment. The effects below were
studied and **recreated from scratch** with our own art direction, per the brief.

## Studied (inspiration only)

- **Bruno Simon — bruno-simon.com / folio-2019 (MIT)**
  https://github.com/brunosimon/folio-2019
  The archetype: one persistent world you travel through instead of a page you
  scroll past. We took the *structure* (a journey, not decorations) — not the
  car, physics, or assets.

- **James Murray — jamesmurray.ca (Awwwards nominee, Jan 2026)**
  https://www.awwwards.com/sites/james-murray-3d-portfolio
  Orbiting-worlds content architecture: each portfolio section is a world you
  fly between. This is the direct template for ATRX Worlds' five-world flight.

- **Toshihito Endo — game-like-portfolio.com (FWA OTD, Mar 2025)**
  https://github.com/GentleHorse/Portfolio
  Presence and the percentage preloader as choreography. Our preloader keeps
  the ritual but stays under ~1.5s.

- **Abhishek Jha — Folio '25 (Awwwards SOTD, Sep 2025)**
  https://www.awwwards.com/sites/abhishek-jha-folio-25
  Playable easter eggs as the shareable layer. Our konami/`atrx` → signal mode
  is the equivalent low-cost virality hook.

- **pmndrs/drei examples + react-three-fiber demos**
  https://github.com/pmndrs/drei
  Component cookbook studied for `<Html>` labels, `<Float>`, and instancing
  patterns. Used as documented APIs, not copied implementations.

- **tacobuono/awwwards-3d (MIT playbook)**
  https://github.com/tacobuono/awwwards-3d
  The scroll-camera + post recipe (Lenis → lerped waypoints; ACES + subtle
  bloom + vignette + grain) and the anti-pattern list we designed against
  (no OrbitControls, no floating-shape cliché, no neon spam).

- **hananmd/space_portfolio (CLAUDE.md architecture notes)**
  Single normalized `progress` value in a store; chapters own progress ranges;
  camera/particles/lighting derive from it. Our `store.progress` + `CameraRig`
  follow this exactly.

## Dependencies (all permissive open-source licenses)

react, react-dom, three, @react-three/fiber, @react-three/drei, gsap, lenis,
zustand, lucide-react (+ dev: vite, typescript, vitest, testing-library, jsdom).
See `package.json` for pinned versions.
