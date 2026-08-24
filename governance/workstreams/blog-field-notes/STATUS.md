# Status — blog-field-notes

## First Field Note publication

- Draft commit: `b007669` — `content: draft first NeuraLoc Field Note`.
- Publication commit: `1f13272` — `content: publish first NeuraLoc Field Note`.
- Published source state: `Local AI is a systems problem` at slug
  `local-ai-is-a-systems-problem`, dated 2026-08-24 and marked `featured`.
- Source boundary: public `atrx07/NeuraLoc-Core` repository at commit
  `c85e9ebb8debd9b4bfe174f77d28d256e6323478`, inspected read-only.
- Publication approval: explicitly received from the user after reviewing the local page.
- Portfolio source behavior: the article is in the public registry, appears as the single featured note,
  has indexable article metadata and a canonical URL, and is included in the sitemap. The separate
  `registry-fixture` draft remains development-only.
- Repository delivery: commits through `766f028` pushed to `origin/main`; exact Cloudflare publication
  graph observed live on 2026-08-24.

## Publication verification

- Typecheck: passed.
- Unit/component: 71 passed across 25 files.
- Production build: passed; the article body remains an isolated lazy chunk at 13.92 kB / 5.26 kB gzip.
- Playwright: stable serialized run passed 37 with one expected desktop skip across desktop and mobile
  projects. An earlier 12-worker run had one unrelated mobile-navigation animation timeout; that exact
  test passed in isolation and in the stable full run.
- Local in-app browser QA: the ordinary article route has one H1, indexable robots metadata, the exact
  production canonical URL, no draft notice, and no page-level horizontal overflow. Earlier desktop and
  360 px visual QA passed with one main landmark, one article, and two labeled scrollable tables.
- Privacy scan: no local path, secret, API key, private repository detail, college detail, or new personal
  data entered the draft or its tests.

## Publication live verification

- Exact shared production script: `index--52D3sEc.js`; shared stylesheet:
  `index-CAEqsc4T.css`.
- Live `/blog`: one public note, featured article links resolve to the stable slug, canonical URL is exact,
  no homepage-only visual assets were present, no horizontal overflow, and no console warnings/errors.
- Live article: one main landmark, one article, one H1, two labeled technical tables, correct repository
  and public status evidence links, indexable robots metadata, exact canonical URL, `article` Open Graph
  type, `TechArticle` structured data, publication date `2026-08-24`, no draft notice, no horizontal
  overflow, and no console warnings/errors.
- Live sitemap: `/blog` and `/blog/local-ai-is-a-systems-problem` both carry `2026-08-24`; the
  development-only `registry-fixture` remains absent.

## Current release

- Source commit: `76800e9` — `perf: defer portfolio artwork delivery`.
- Branch: `main`.
- Push: confirmed on `origin/main`.
- Cloudflare: exact optimized production graph observed on 2026-08-23.

## Delivered Field Notes system

- `/blog`, `/blog/:slug`, development-only draft preview, unpublished-note recovery, and global 404
  behavior are implemented through the validated typed registry and lazy MDX boundary.
- Route metadata, canonical/JSON-LD cleanup, sitemap truth, keyboard/focus behavior, reduced motion,
  responsive long-form primitives, and raw-SPA disclosure are implemented and tested.
- Direct Field Notes and recovery routes retain the shared route boundary and do not acquire the lazy
  portfolio stylesheet, portfolio script, hero artwork, Traelyx mark, or mask sprites.
- The homepage retains the current seven-project presentation and Traelyx M3.7 truth introduced after
  the recovered Blog baseline.

## Asset-delivery result

- Responsive first-paint hero sources now prefer local WebP with explicit JPEG fallbacks.
- The shared footer mark prefers a 320 x 258 lossless WebP with the original PNG fallback and lazy
  decoding/loading.
- Mask controls attach only the selected sprite on first fine-pointer, focus, keyboard, or touch
  interaction. Reduced-motion and unsupported-mask environments keep a complete static native action.
- Source measurements:
  - portrait: 274,649 B JPEG -> 161,506 B WebP;
  - wide: 332,350 B JPEG -> 203,542 B WebP;
  - footer mark: 166,919 B PNG -> 42,660 B WebP;
  - deferred mask set: 1,363,518 B total.
- Initial visual-request reduction: 1,600,920 B desktop and 1,616,585 B mobile before transfer
  compression or cache effects.

## Production output

- Shared CSS: `index-CAEqsc4T.css` — 40.18 kB / 8.51 kB gzip.
- Portfolio CSS: `PortfolioPage-C4IXnPUw.css` — 59.70 kB / 11.76 kB gzip.
- Shared JS: `index-B4WWZioB.js` — 243.77 kB / 79.64 kB gzip.
- Portfolio JS: `PortfolioPage-BXmGPYdi.js` — 308.07 kB / 108.10 kB gzip.
- Draft body: `registry-fixture-PKSplol0.js` — 1.96 kB / 0.83 kB gzip.

## Live verification

- Fresh `/`: exact bundles above, `atrx-portrait.webp`, `atrx-mark.webp`, and `traelyx-mark.png`; no
  initial mask requests. First keyboard focus on GitHub requested only
  `mask-forest-CHaMJ_cx.png`.
- Fresh `/blog`: exact shared JS/CSS, font resources, and `atrx-mark.webp`; no homepage visual or lazy
  portfolio assets.
- Fresh recovery route: exact shared JS/CSS and font resources; the below-fold lazy footer mark was not
  requested in the observed initial viewport.
- All inspected live routes had one main landmark, no desktop horizontal overflow, and no console
  warnings/errors.

## Verification

- Typecheck: passed.
- Unit/component: 70 passed across 24 files.
- Production build: passed.
- Playwright: 35 passed with one expected desktop skip across desktop and mobile projects.
- Focused responsive-hero and deferred-mask request matrix: 4 passed.
- Local production request graph, visual render, first keyboard interaction, overflow, and console: passed.
- Privacy scan: no local path, secret, token, private repository detail, college detail, or new personal
  data entered public source or emitted assets.

## Workstream state

`complete / maintenance-ready`

The first grounded real Field Note is published, pushed, and verified live. Preserve the workstream for
future note maintenance or the next explicitly authorized grounded article.
