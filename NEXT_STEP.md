# Next Step - Field Notes metadata and discovery

## Handoff

- Source baseline: `3eceaf1` - implemented and validated the Field Notes editorial index and long-form
  article surface.
- Product direction: make every Field Notes route describe itself accurately to browsers, crawlers, and
  sharing surfaces while preserving the truthful local registry and static Cloudflare deployment.
- Immediate goal: ship deterministic route metadata, article structured data, registry-synchronized
  sitemap output, and direct-route production verification without publishing the draft fixture or
  overstating what a client-rendered SPA can provide.

## Implementation sequence

1. Define one typed route-metadata model and canonical-origin helper. Reuse the existing public profile
   configuration instead of duplicating the production URL, identity, or base description.
2. Add a route metadata controller that updates the existing title, description, canonical, robots,
   Open Graph, and Twitter elements in place and removes article-only fields when routes change.
3. Give `/blog` an accurate Field Notes title, description, canonical URL, and collection-oriented
   structured data. The zero-public-note state must not imply an active publication history.
4. Give published and archived `/blog/:slug` routes metadata derived only from validated registry
   records: title, description, canonical, publication/update dates, tags, and repository/project
   associations when present. Use article OG fields and `BlogPosting` or `TechArticle` JSON-LD only when
   the underlying metadata supports them.
5. Keep draft preview and not-found routes out of discovery. Draft preview must use `noindex` locally;
   unknown article routes must not inherit a false article canonical or stale article JSON-LD.
6. Generate or validate `public/sitemap.xml` from the same registry publication truth during the build.
   Include `/`, `/blog`, and every published or archived article; exclude drafts; use stable update dates.
7. Add tests for metadata replacement and cleanup, JSON-LD serialization, sitemap/registry agreement,
   draft exclusion, archived inclusion, route navigation, and restoration of homepage metadata.
8. Preserve the existing editorial components, homepage interactions, article-body lazy chunks, command
   palette, terminal, route focus behavior, reduced motion, and Cloudflare SPA fallback.
9. Verify both the raw direct response and the hydrated browser state in production. Record explicitly
   that client-side metadata is not equivalent to prerendered HTML; recommend prerendering only if the
   measured crawler or social-preview requirement justifies it.

## Constraints

- Do not publish the registry fixture, invent an article, add a fake cover, or create sitemap entries for
  drafts, invalid modules, tags, feeds, or routes that do not exist.
- Do not append duplicate metadata elements on navigation. Update deterministic nodes and remove stale
  article-only values when leaving an article.
- JSON-LD must serialize trusted validated metadata safely and must never include private paths, secrets,
  college details, unsupported employment claims, fabricated metrics, or private repository content.
- Keep the application static. Do not add a server, runtime token, remote MDX evaluation, analytics, or
  a deployment-specific rewrite unless a verified Cloudflare behavior requires it.
- Do not describe BrowserRouter metadata as server-rendered or guaranteed for every crawler. Raw-response
  and hydrated-state checks are separate facts.
- Preserve the main entry and article chunk boundary unless a measured change clearly improves it without
  weakening focus, error recovery, or direct navigation.

## Required validation and exit criteria

- Typecheck, unit/component tests, production build, and the full Playwright desktop/mobile matrix pass.
- Metadata tests cover `/`, `/blog`, published article, archived article, draft preview, unknown article,
  general 404, Back/Forward navigation, and cleanup of article-only tags and JSON-LD.
- Sitemap tests compare generated public article URLs with the canonical registry and prove that drafts
  are absent. Build failure is explicit if sitemap generation and registry truth diverge.
- Direct local and production checks distinguish the static shell response from hydrated route metadata.
- The production build still isolates article bodies; record entry/chunk sizes and confirm the draft prose
  marker remains absent from the entry bundle.
- Desktop and mobile browser QA finds one main/one H1, no console errors, no stale metadata after route
  changes, no page-level overflow, and unchanged homepage interaction behavior.
- `ARCHITECTURE.md`, README, `STATUS.md`, and this file report delivered facts and the SPA limitation.
- After the implementation is committed and pushed, replace this brief with the next immediate content or
  performance task grounded in the new source commit.
