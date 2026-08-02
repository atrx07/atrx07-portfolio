# Next Step — Field Notes route foundation

## Handoff

- Governance baseline: `208ca04` — versioned Field Notes direction and next-step protocol.
- Product direction: extend the ATRX portfolio with a first-class Field Notes surface while preserving
  the existing homepage’s visual and interaction contract.
- Immediate goal: establish the route foundation for `/`, `/blog`, `/blog/:slug`, and `*` before adding
  MDX content, article components, or publication metadata.

## Implementation sequence

1. Inspect the existing `App.tsx`, `main.tsx`, `Header.tsx`, `Footer.tsx`, command palette actions,
   metadata setup, and Playwright assumptions before moving code.
2. Add `react-router-dom` using the existing pnpm lockfile and document the dependency and route
   ownership in `ARCHITECTURE.md`.
3. Extract the current portfolio composition into `PortfolioPage` (or an equally clear route component)
   without changing its anchors, visitor-mode behavior, terminal, project requests, discovery, sound, or
   command-palette interaction contracts.
4. Add `src/router.tsx` with browser-history routes for `/`, `/blog`, `/blog/:slug`, and a deliberate
   `NotFoundPage`. The blog index and article routes may be honest route-foundation placeholders only;
   do not fabricate notes or article history.
5. Refactor shared navigation only as needed for route awareness. From blog routes, homepage sections
   must use route-plus-fragment links such as `/#projects`; the wordmark must return to `/`; Back and
   Forward must remain predictable.
6. Implement a small, testable route-scroll/focus helper so route changes start at the correct reading
   position and homepage fragments resolve after the homepage mounts. Respect reduced motion and avoid
   overriding browser restoration without coverage.
7. Keep base homepage metadata intact. Do not add MDX, blog registry, sitemap entries, article JSON-LD,
   or a static-host redirect rule until the route foundation has passing tests.

## Constraints

- Follow the Field Notes product requirements in `PROJECT.md`, design contract in `DESIGN.md`, and
  planned architecture in `ARCHITECTURE.md`.
- Do not rewrite the current portfolio or duplicate separate header/footer implementations.
- Do not add a server, CMS, database, analytics, untrusted content evaluation, fake posts, metrics, or
  unsupported SEO claims.
- Preserve privacy restrictions and the existing static Cloudflare Pages deployment model.
- Do not add a top-level `404.html` or `_redirects` rule without testing Cloudflare SPA fallback impact.

## Required validation and exit criteria

- Existing lint, unit/component tests, build, and Playwright desktop/mobile suite continue to pass.
- New tests cover the route tree, homepage preservation, cross-route section links, deliberate not-found
  behavior, and route scroll/focus behavior.
- Browser checks cover `/`, `/blog`, an unknown article slug, direct refresh/deep navigation where the
  local server supports it, Back/Forward, reduced motion, and 360 px containment.
- `ARCHITECTURE.md`, `STATUS.md`, README where applicable, and this file are updated with actual facts
  before handoff.
- The next `NEXT_STEP.md` replaces this route-foundation brief with the MDX registry/content-system plan
  only after this stage is implemented, validated, committed, and pushed.
