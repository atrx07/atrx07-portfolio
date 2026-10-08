# Third-party sources — redesign-3d-v3

No third-party code is copied into this experiment. The techniques below were
studied from public sources and re-implemented from scratch in this project's
own style.

## Planet textures (loaded at runtime from CDN)

- **Solar System Scope texture set** — Mars, Neptune, Saturn (+ ring alpha),
  Moon, Jupiter 2K day maps.
  © Solar System Scope (https://www.solarsystemscope.com/textures/),
  licensed **CC BY 4.0** (https://creativecommons.org/licenses/by/4.0/).
  Retrieved 2026-10-08. Attribution is required and is also shown in the
  page footer.
- **three.js example Earth textures** (day, night lights, clouds) via jsDelivr
  (`three@0.184.0/examples/textures/planets/`).
  MIT licensed via three.js; source imagery is NASA public domain.

## Technique inspiration (no copied code)

- Realistic-planet shader architecture (terminator blend, fresnel atmosphere
  shells, independent cloud layers): nikdev345/neurospace,
  mohnasr137/earth-3d, lowjieseng1810/openatlas-globe, jokr02/cosmosexplorer.
- Click → fly-in → DOM dossier interaction model: aryangoel24/portfolio,
  mgaralc/portfolio, dhruvmalviya0/portfolio.
- Damped scroll-journey camera rigs: maath easing docs, xtra-stack/my-portfolio.
- RingGeometry UV remap recipe: three.js forum ("Applying a texture to a
  RingGeometry").
- Procedural volcanic planet recipe: godotshaders.com "Universal Planet
  Shader" (CC0) crack-via-noise-gradient technique, re-implemented in GLSL ES.

## Libraries (npm, see package.json for pinned versions)

three, @react-three/fiber, @react-three/drei, gsap, lenis, zustand, maath,
lucide-react, react, react-dom.
