# Next Step - Field Notes MDX content system

## Handoff

- Source baseline: `6d2775d` - implemented and validated the BrowserRouter route foundation.
- Product direction: turn the truthful `/blog` foundation into a typed local-content system without
  publishing invented notes or changing the homepage presentation.
- Immediate goal: configure MDX, establish the canonical article contract and registry, and prove draft,
  publication, lookup, sorting, and module-loading behavior before building the final editorial index.

## Implementation sequence

1. Add `@mdx-js/rollup` with the existing pnpm lockfile and configure it before the React plugin in Vite.
2. Add `src/blog/types.ts`, `validation.ts`, and `registry.ts` using the metadata contract in
   `AGENTS.md` and `ARCHITECTURE.md`.
3. Discover metadata eagerly and article bodies lazily with `import.meta.glob`; keep the portfolio route
   independent from article-body chunks.
4. Enforce lowercase kebab-case slugs, unique routes, valid ISO dates, normalized nonempty tags, valid
   status values, module/slug agreement, and deterministic publication-date ordering.
5. Add one clearly marked local fixture note for tests only, or keep the public registry empty. Do not
   publish fabricated project history merely to make `/blog` appear populated.
6. Replace `BlogPostPage`'s unconditional recovery state with registry lookup, draft rejection, a bounded
   lazy-loading state, and an error boundary that never exposes raw module errors.
7. Add the minimal approved MDX semantic map needed for fixture rendering. Defer the complete visual
   component library and final index composition to the following design stage.
8. Preserve the current route-aware header/footer, cross-route hash behavior, homepage interactions,
   base homepage metadata, sitemap, and Cloudflare fallback behavior.

## Constraints

- Local committed MDX is trusted build input; never fetch or evaluate remote or user-authored MDX.
- Draft notes must be absent from production lists and direct public route resolution.
- Archived notes remain readable and explicitly marked when the presentation stage lands.
- The registry is the single source for index discovery, article lookup, and later metadata/sitemap work.
- Do not add route-specific SEO, sitemap entries, tag filtering UI, or polished article visuals in this
  stage unless required to validate the content boundary.
- Keep article bodies out of the initial homepage bundle and measure the existing 514.29 kB build
  advisory after adding MDX.
- Preserve privacy, factual grounding, static deployment, reduced motion, and browser-history behavior.

## Required validation and exit criteria

- Existing lint, unit/component, build, and Playwright desktop/mobile suites continue to pass.
- New tests cover metadata validation, duplicate rejection, slug/module agreement, draft exclusion,
  archived inclusion, published ordering, tag normalization, article lookup, lazy module failure, and
  unknown-slug recovery.
- A test fixture can render through the approved MDX mapping without entering the public production
  index unless explicitly approved.
- The production build emits separate lazy article chunks or otherwise demonstrates that article bodies
  are not bundled into the homepage entry.
- `ARCHITECTURE.md`, `STATUS.md`, README where applicable, and this file report delivered facts.
- After this stage is committed and pushed, replace this brief with the ATRX Field Notes index and
  long-form article visual-integration plan.
