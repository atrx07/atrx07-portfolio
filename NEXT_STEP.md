# Next Step - Route asset and stylesheet isolation

## Handoff

- Source baseline: `6f2171c` - implemented and validated a lazy interactive-portfolio boundary,
  immediate homepage metadata, stable loading/recovery states, and mount-aware route focus.
- Production baseline: Cloudflare serves `index-BhCkPfjZ.js` at 233.14 kB (75.81 kB gzip),
  `PortfolioPage-DWVyJibe.js` at 309.86 kB (109.22 kB gzip), `index-txv1Pmfb.css` at 90.81 kB
  (17.87 kB gzip), and the isolated 1.96 kB draft article chunk.
- Remaining route cost: direct `/blog` correctly avoids the portfolio script, but the shared HTML still
  discovers both homepage artwork preloads and every route still receives the complete global stylesheet.
- Immediate goal: isolate route-owned CSS and homepage image requests while preserving the portfolio's
  first paint, stable route-loading shell, Field Notes typography, and static SPA deployment model.

## Implementation sequence

1. Capture a request-and-transfer baseline for `/`, `/blog`, an unknown route, and the development draft
   preview at desktop and 360 px. Distinguish actual resource requests from markup candidates and record
   stylesheet, font, hero artwork, mark, and mask-sprite costs.
2. Replace unconditional homepage artwork preloads with a route-aware static-safe strategy. Direct Field
   Notes and recovery requests must not fetch `atrx-wide.jpg` or `atrx-portrait.jpg`; the home hero must
   retain an early high-priority image request without a blank or delayed first screen.
3. Split `src/styles/globals.css` by real ownership: keep reset, tokens, shared header/footer, route shell,
   loading/recovery, Field Notes, accessibility, and shared responsive rules in the eager stylesheet;
   load portfolio-only section, interaction, and project-visual rules with `PortfolioPage`.
4. Keep asset references beside the route/component that owns them so mask sprites and other portfolio
   imagery cannot be pulled into direct Field Notes or recovery visits by eager CSS.
5. Preserve one deterministic typography strategy. Do not introduce another font package or leave routes
   unstyled while a lazy stylesheet resolves; system fallbacks must remain intentional.
6. Add focused build/request assertions that detect accidental eager portfolio CSS or hero-image loading
   without hard-coding transient Vite hashes. Retain all route focus, metadata, article isolation, and
   homepage interaction coverage.
7. Re-measure minified/gzip CSS, actual route requests, and representative first-paint behavior. Inspect
   desktop, 360 px, 200-percent zoom, reduced motion, keyboard focus, and console state before shipping.
8. Synchronize architecture, README, status, and this handoff with measured results; commit, push, and
   verify the exact Cloudflare request graph rather than accepting an old cached deployment.

## Constraints

- Do not remove or visually flatten portfolio sections, GodUI adaptations, responsive hero artwork,
  Field Notes editorial styling, project-specific visuals, or accessibility behavior to reduce bytes.
- Do not move shared loading-shell styles into the lazy portfolio stylesheet; the fallback must remain
  complete before the portfolio chunk resolves.
- Do not add a CSS-in-JS runtime, server, prerenderer, analytics, runtime token, remote asset service, or
  dependency solely to perform the split.
- Do not rely on filename-only bundle inspection. Confirm actual requests on fresh direct-route tabs and
  verify their resource source/initiator where available.
- Preserve the Stage E script graph, immediate route metadata, raw Cloudflare SPA-shell disclosure,
  article-body isolation, draft privacy, canonical origin, sitemap truth, and all public URLs.
- Treat home first paint and mobile containment as product requirements. A smaller Field Notes route does
  not justify a late hero image, flash of unstyled content, focus loss, or layout shift on `/`.

## Required validation and exit criteria

- Typecheck, all unit/component tests, production build, and the full Playwright desktop/mobile matrix
  pass.
- Direct `/blog` and recovery visits request neither homepage hero artwork nor portfolio mask sprites;
  `atrx-mark.png` may remain because the shared footer genuinely renders it.
- The eager stylesheet is materially smaller and contains no portfolio-only section or project-visual
  sources; `/` loads the additional portfolio stylesheet exactly once.
- The homepage still requests the correct responsive hero artwork early, renders the complete first
  screen without layout shift, and preserves command palette, modes, project details, architecture,
  terminal, signal, sound, contact, and route-fragment behavior.
- Field Notes index, development draft, article recovery, general 404, and loading/failure shells remain
  fully styled before any portfolio asset is present.
- Desktop, 360 px, 200-percent zoom, reduced-motion, keyboard, metadata, one-main, overflow, and console
  checks pass on fresh route visits and client navigation.
- Draft prose remains isolated; no private data, token, local path, college detail, unsupported claim, or
  ignored control file enters the public commit or emitted artifacts.
- Cloudflare serves the exact validated stylesheet/image request graph before the stage is marked complete.
