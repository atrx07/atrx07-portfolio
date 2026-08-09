# ATRX Portfolio

Interactive portfolio for Arppith Andrews (`atrx07`), built as a compact software control room for local AI, real-time systems, automation, and unusual browser tools.

## Current build

[Traelyx](https://github.com/atrx07/Traelyx) is the active project: an open-source, local-first Android
driving-telemetry platform built around explainable evidence and data ownership. The portfolio reports
its current boundary directly: the Flutter/Android M0 foundation is validated, while the native drive
recorder remains disabled until the reliability milestones are implemented and tested.

## Stack

- Vite, React, and strict TypeScript
- React Router with browser-history routes and a lazy interactive-portfolio boundary
- Build-time MDX with GFM tables and lazy article chunks
- Tailwind CSS plus eager shared-route and lazy portfolio-owned visual layers
- GSAP and ScrollTrigger for restrained scroll motion
- Framer Motion for reduced-motion-aware orbital system visuals
- Lucide React icons
- Vitest, React Testing Library, and Playwright

## Local development

Requirements: Node.js 22 or newer and pnpm.

```powershell
pnpm.cmd install
pnpm.cmd dev
```

Open `http://127.0.0.1:4173`.

## Verification

```powershell
pnpm.cmd lint
pnpm.cmd test
pnpm.cmd build
pnpm.cmd exec playwright install chromium
pnpm.cmd test:e2e
```

## Content editing

Public profile content is centralized in:

- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/commands.ts`

Project claims should remain grounded in the linked public repositories. Do not add private repository details, college information, personal contact details beyond the public email, or unverified metrics.
The Traelyx current-build copy must continue to distinguish its validated M0 foundation from planned
recording, Drive DNA, scoring, replay, cloud, social, Guardian, ML, and commentary capabilities.

Field Notes content lives in paired files under `src/blog/posts/`:

- `<stable-slug>.meta.ts` exports metadata satisfying `BlogPostMeta`.
- `<stable-slug>.mdx` re-exports that metadata and owns the article body.

Keep new notes in `draft` while editing. The filename, metadata slug, and companion MDX filename must
agree; metadata validation rejects invalid dates, statuses, tags, URLs, duplicate slugs, or missing
companions. Drafts do not enter public lists or direct public route resolution. The local
`registry-fixture` pair is intentionally non-public and exists only to verify the compiler, registry,
semantic component mapping, and lazy-chunk boundary.

To inspect a draft article locally, start the development server and use the explicit preview query:

```text
http://127.0.0.1:4173/blog/<stable-slug>?preview=draft
```

That query is admitted only in development. Production builds and production-mode registry tests reject
the same draft slug even if the query is present.

## Routes and Field Notes

- `/` resolves the complete interactive portfolio through a route-level lazy boundary and preserves its
  section fragments. Homepage metadata is applied outside that boundary so it does not wait for the
  interaction chunk.
- `/blog` renders the editorial archive from the validated public registry and currently reports zero
  published notes truthfully. Featured notes, tag controls, and chronological rows appear only when
  real published or archived metadata exists.
- `/blog/:slug` resolves published or archived notes through a lazy MDX module and rejects drafts or
  unknown slugs through the intentional recovery page.
- Unknown routes render the shared ATRX not-found experience.

The typed MDX content boundary, editorial index, accessible tag filtering, article header/footer, code
copy feedback, and contained long-form primitives are implemented. Do not add invented posts to populate the archive. Cross-route
homepage links use route-plus-fragment destinations such as `/#projects`, and route focus/scroll
behavior respects reduced motion and browser Back/Forward history.

Direct Field Notes and recovery visits do not download portfolio-only GSAP, Framer Motion, or project
interaction modules. A stable one-main loading shell covers the short portfolio chunk transition, and
route focus waits for the real destination heading or fragment rather than focusing that temporary shell.
They also avoid the portfolio stylesheet, responsive hero JPGs, and mask sprites. The raw document adds
one high-priority responsive hero preload only for `/`; `PortfolioPage` loads the matching portfolio CSS
alongside its existing lazy interaction chunk.

Route metadata is applied from `src/lib/pageMetadata.ts`. The home route restores profile metadata;
`/blog` uses collection metadata; published or archived notes use technical-article metadata; draft
previews and recovery pages remove stale canonical/social/JSON-LD state and use `noindex, nofollow`.
`public/sitemap.xml` must be updated when a real note becomes published or archived. The sitemap unit
test compares its exact indexable routes and `lastmod` values with the validated registry and fails on
drift or draft exposure.

## Interaction model

- Visitor modes persist in `localStorage`.
- Project discovery is session-only through `sessionStorage`.
- The terminal is a fixed parser; it never evaluates arbitrary input.
- Sound is muted by default, user-triggered, and remembered locally.
- `Ctrl/Cmd + K` opens the command palette.
- Typing `atrx` outside an input activates a five-second signal mode.

## Deployment

The build is static and works on Cloudflare Pages, Vercel, or GitHub Pages.

```powershell
pnpm.cmd build
```

Deploy the generated `dist/` directory. `wrangler.jsonc` declares that directory as
the Cloudflare Pages artifact.

For the Git-connected Cloudflare Pages project, use:

```text
Framework preset: React (Vite)
Build command: pnpm build
Build output directory: dist
Root directory: /
Production branch: main
```

Publishing the repository root instead of `dist` returns `index.html` with a
`/src/main.tsx` entry. That response can still have status `200`, but browsers
cannot run the uncompiled TypeScript/JSX module and the page stays blank.

The canonical, Open Graph, sitemap, and robots metadata use
`https://atrx07.pages.dev/` as the production origin.

This deployment is currently a client-rendered BrowserRouter SPA. Raw deep-route responses such as
`/blog` receive the homepage metadata shell from `index.html`; route-specific title, canonical, social
tags, and JSON-LD replace that fallback after hydration. Do not describe those deep routes as
prerendered. If crawler-independent deep-route HTML becomes necessary, add a documented static
generation/prerender step using the same registry and metadata builders.
