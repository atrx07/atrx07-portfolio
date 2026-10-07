# Arppith Andrews / ATRX exhibition preview

An isolated local redesign app. This is not the production entry point or a release-approved replacement.

Run from this directory:

```powershell
npm install
npm run dev
npm run build
npm test
```

Local preview: `http://127.0.0.1:4180`. Output: this directory's `dist/`.

The root portfolio build uses its unchanged entry and dependencies. Do not deploy this preview to production until the user approves a tested replacement. No production hosting configuration is included.

Project/profile records and published Field Notes metadata are imported from the portfolio source without changing them. Field Notes links open the current published site; local article-route integration remains future work. Magic Tab directly reuses the existing GodUI-derived component with new isolated styling. Source provenance is recorded in `THIRD_PARTY.md`.

The procedural Three.js objects are original portfolio illustrations, not product screenshots or manufactured hardware claims. Traelyx uses an explicitly labeled synthetic route schematic. Pointer drag rotates the assembly; the pull-apart button provides a non-drag alternative. Reduced motion and the pause control remove ambient motion. WebGL failure keeps a designed CSS still and readable DOM content.
