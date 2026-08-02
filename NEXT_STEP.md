# Next Step - Route payload and loading boundaries

## Handoff

- Source baseline: `46a747a` - implemented and validated deterministic route metadata, JSON-LD cleanup,
  and a sitemap contract synchronized with the Field Notes publication registry.
- Production baseline: Cloudflare serves `index-BYbMJ_62.js`; the main entry is 541.28 kB minified and
  the draft article body remains isolated in `registry-fixture-C1GNJc-t.js` at 1.96 kB.
- Product direction: reduce unnecessary initial route code without making the portfolio feel delayed,
  weakening route focus, or allowing stale metadata while a lazy boundary resolves.
- Immediate goal: give direct Field Notes and recovery visits a smaller route-specific payload, retain a
  fast and complete homepage, and replace the current bundle advisory with measured chunk boundaries
  rather than cosmetic vendor splitting.

## Implementation sequence

1. Capture a module/chunk baseline for `/`, `/blog`, the development draft preview, and an unknown route.
   Record which emitted chunks each route requests and identify portfolio-only heavy modules such as
   GSAP, project visual systems, dialogs, terminal, and command palette code.
2. Introduce route-level lazy boundaries only where they avoid loading substantial unrelated code.
   Prioritize keeping portfolio-only systems out of direct `/blog` and recovery visits. Do not split a
   component merely to silence Vite's warning if it remains an eager dependency.
3. Provide a restrained route loading surface with one main landmark, a stable height, an accessible
   status, and no fake boot delay. Preserve the ATRX shell instead of flashing the homepage or a blank
   screen.
4. Reconcile `RouteEffects` with lazy mounting so direct routes, client navigation, homepage fragments,
   Back/Forward, reduced motion, and heading focus still resolve after the destination target exists.
5. Preserve metadata correctness during lazy navigation. No destination may temporarily inherit an
   indexable article/profile canonical after its route is known; the final hydrated head must remain
   identical to the Stage D contract.
6. Re-measure the build. Confirm the base entry and route chunks are meaningfully separated, article
   bodies remain lazy, and the draft prose marker remains absent from every eager shared chunk.
7. Add focused unit and Playwright coverage for loading semantics, route focus, metadata restoration,
   direct Field Notes requests, client navigation, errors, desktop/mobile containment, and the complete
   homepage command-palette/project/terminal regression.
8. Update architecture, README, status, and this handoff with measured before/after sizes and exact
   deployment behavior; then commit, push, and verify the new Cloudflare asset graph.

## Constraints

- Do not publish or invent a Field Note, cover, metric, or deployment claim as part of performance work.
- Do not remove homepage capabilities, flatten project-specific visuals, weaken the command palette, or
  make the terminal and project dialogs inaccessible to obtain a smaller number.
- Do not add a loading animation that delays already-ready content, hijack scrolling, or move focus to a
  placeholder that immediately disappears.
- Do not use `manualChunks` as the sole optimization unless network inspection proves it reduces route
  work. A renamed eager dependency is not a performance improvement.
- Do not add a server, prerenderer, analytics, runtime token, remote content source, or large analysis
  dependency. Temporary local analysis output must remain ignored and uncommitted.
- Keep the raw Cloudflare SPA-shell limitation explicit. This stage optimizes client loading; it does not
  make deep-route HTML prerendered.
- Preserve current public URLs, canonical origin, sitemap truth, article registry validation, draft
  defense, article error boundary, and homepage section fragments.

## Required validation and exit criteria

- Typecheck, all unit/component tests, production build, and the full Playwright desktop/mobile matrix
  pass.
- Before/after measurements report minified and gzip sizes for the base entry, homepage route, Field
  Notes route, and lazy article body; report route requests rather than only emitted files.
- A direct `/blog` browser visit does not fetch portfolio-only GSAP/project-visual implementation before
  the visitor navigates home.
- Homepage first load and `Ctrl/Cmd + K`, project detail, visitor mode, terminal, architecture, contact,
  signal mode, and sound contracts remain intact.
- Direct `/blog`, draft preview, unknown article, general 404, home-to-blog, blog-to-home, homepage hash,
  and Back/Forward flows retain correct focus, history, title, canonical, robots, social tags, and JSON-LD.
- Loading and failure states preserve one main landmark, an understandable status, stable layout, keyboard
  usability, reduced-motion behavior, and no page-level overflow at 360 px or desktop.
- Draft article prose remains isolated from shared/eager chunks and no private data, token, local path,
  college detail, or unsupported claim enters source or artifacts.
- Cloudflare serves the exact validated hashed asset graph before the run is marked complete.
