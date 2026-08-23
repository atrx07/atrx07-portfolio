# Status — blog-field-notes

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

The recovered implementation, deployment, and post-implementation asset-delivery checkpoints are
closed. Preserve this workstream for future real Field Notes content or maintenance; do not invent a
public article merely to change the empty archive state.
