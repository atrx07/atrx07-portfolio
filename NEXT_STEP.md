# Next Step - Field Notes visual integration

## Handoff

- Source baseline: `02bd643` - implemented and validated the Field Notes MDX content system.
- Product direction: turn the typed, truthful content boundary into the quieter ATRX reading bay defined
  in `DESIGN.md`, without publishing invented notes or weakening the existing portfolio route.
- Immediate goal: ship the final Field Notes index hierarchy and long-form article presentation on top
  of the canonical registry, including accessible filtering, deliberate empty/archive states, and a
  development-only draft preview for responsive article QA.

## Implementation sequence

1. Extract the index presentation into bounded primitives such as `BlogIndexHeader`, `FeaturedNote`,
   `TagFilter`, and `NoteArchiveRow`; keep `blogRegistry` as their only post source.
2. Replace the route-foundation composition with the editorial index grid from `DESIGN.md`: compact
   identity hero, optional registry-derived featured lead, normalized tag rail, chronological log rows,
   and distinct zero-published versus zero-filter-results states.
3. Make filtering keyboard/touch accessible, preserve focus when results change, expose selected state in
   text and `aria-pressed`, and keep narrow rails internally scrollable without page overflow.
4. Split article chrome into `ArticleHeader` and `ArticleFooter`, refine `ArticleLayout` around a readable
   68-74ch prose rail, and complete typography for headings, lists, inline code, code blocks, tables,
   blockquotes, horizontal rules, dates, tags, repository/project associations, and archive notices.
5. Add only the article primitives exercised by real or fixture content. Do not build decorative metrics,
   diagrams, covers, callouts, or a table of contents until verified content needs them.
6. Add an explicit development-only draft preview path or query state so the fixture article can be
   visually tested locally. The production build must still resolve the same draft slug to the deliberate
   not-found page and must not expose draft metadata in public lists or discovery surfaces.
7. Apply ATRX blog token aliases only where they clarify semantic roles; reuse the shipped font stack,
   square geometry, hairlines, and restrained signal colors. Keep reading surfaces quiet and free of
   continuous text-adjacent motion.
8. Evaluate lazy-loading `BlogIndexPage` and `BlogPostPage` at the route boundary. Keep the change only if
   it reduces the homepage entry without harming route focus, error recovery, tests, or navigation.
9. Preserve the existing header/footer, homepage interactions, command palette, terminal, visitor modes,
   route-plus-fragment behavior, base metadata, sitemap, and Cloudflare SPA fallback.

## Constraints

- Do not publish the registry fixture or invent article history, dates, project outcomes, covers, metrics,
  or telemetry to make the index look populated.
- Reading is the primary interaction. No scroll hijacking, forced sound, cursor effects, fake live feed,
  animated syntax, endless glow, or BMW/reference-brand leakage.
- One visible H1 per route, logical headings, visible focus, text selection, 44 px practical touch targets,
  and full meaning without color, hover, motion, or the command palette.
- Body prose stays narrow; code and tables scroll inside their own labeled regions; 360 px and 200 percent
  zoom must not create page-level horizontal overflow.
- Draft preview code must be removed by production conditions and covered by a production-mode test.
- Route-specific metadata, JSON-LD, sitemap publication entries, feeds, syntax highlighting, and real
  article publication remain Stage D or later unless a narrow dependency is required for correctness.
- Preserve privacy, factual grounding, static deployment, reduced motion, and the lazy article-body
  boundary established by `02bd643`.

## Required validation and exit criteria

- Existing lint, unit/component, build, and Playwright desktop/mobile suites continue to pass.
- Component tests exercise published/archived/featured index states, tag selection/reset, empty filtered
  results, focus preservation, article hierarchy, external-link safety, table/code containment contracts,
  and development-only preview gating.
- Playwright covers homepage-to-index navigation, keyboard tag filtering with synthetic test data where
  necessary, development draft preview, production-style draft rejection, browser Back behavior, mobile
  navigation, reduced motion, and homepage regressions.
- Desktop, tablet, 412 px, and 360 px browser QA verifies index rhythm, title wrapping, readable measure,
  archive state, mobile menu, code/table containment, 200 percent zoom, focus visibility, and zero console
  warnings/errors.
- The production build still emits article bodies separately; record the main entry delta and retain or
  reject route-level splitting based on measured output.
- `ARCHITECTURE.md`, `STATUS.md`, README where applicable, and this file report delivered facts.
- After this stage is committed and pushed, replace this brief with the route metadata, structured-data,
  sitemap synchronization, and Cloudflare deep-link verification plan.
