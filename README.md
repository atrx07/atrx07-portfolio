# ATRX Portfolio

Interactive portfolio for Arppith Andrews (`atrx07`), built as a compact software control room for local AI, real-time systems, automation, and unusual browser tools.

## Current build

[Traelyx](https://github.com/atrx07/Traelyx) is the front-page current build: an open-source, local-first Android
driving platform built around explainable evidence and data ownership. The portfolio's
[public evidence snapshot](https://github.com/atrx07/Traelyx/blob/9508af2d808c3394905fe106ade4755914b900ad/README.md)
was checked on 2026-10-07. M0–M5 and M6.1–M6.7 are complete: verified recording, deterministic
intelligence, offline replay/commentary, reviewed storage/export controls, optional consented sync,
social comparisons, and Guardian pairing. M6.8 remains in progress despite controlled synthetic
first-phone background/cold-process push proof. Scoring remains an experimental synthetic baseline;
ML and public-release hardening remain future M7/M8 work.

## Selected work

[Sable-AI](https://github.com/atrx07/Sable-AI) is tagged active, with a completed v2 coding-agent
foundation and ongoing proposed upgrades. Its Python CLI combines bounded repository context,
capability approvals, transactional file tools, conflict-aware undo, deterministic verification,
JSON automation, and local traces. Controls and evidence are local; inference uses hosted Groq.
Source installation is supported; public package publication is not implied.

Sable's art combines the ui-assets Agent Timeline with a scoped patch and layered recovery journal.
Card expansion reveals the steps and draws their rails once; reduced motion shows them immediately.
The detail view expands contract details and explains required-check outcomes and undo conflicts.
It executes no code and labels the documented fixture as expected behavior. Traelyx remains current.

## Stack

- Vite, React, and strict TypeScript
- React Router with browser-history routes and a lazy interactive-portfolio boundary
- Build-time MDX with GFM tables and lazy article chunks
- Tailwind CSS plus eager shared-route and lazy portfolio-owned visual layers
- GSAP and ScrollTrigger for restrained scroll motion
- Framer Motion for reduced-motion-aware orbital visuals and collapsible agent timeline details
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
- `src/data/projects.ts` (Traelyx delegates to `src/data/traelyx.ts`)
- `src/data/sable.ts` (Sable claims, pinned evidence, timeline stages, and explanatory check/undo states)
- `src/data/commands.ts`

Project claims should remain grounded in the linked public repositories. Do not add private repository details, college information, personal contact details beyond the public email, or unverified metrics.
Traelyx's snapshot, presentation labels, and typed project content live in `src/data/traelyx.ts`; its
small shared-route description lives in `src/data/traelyxMetadata.ts` and is checked against raw JSON-LD.
Keep the implemented M0–M5/M6.1–M6.7 boundary distinct from partial M6.8 alert delivery. Synthetic
scores do not establish population calibration or emergency reliability. Governed personal-baseline
persistence, native replay-channel graphs, online basemaps/downloaded regions, ML, and public release
remain unavailable or deferred. Raw routes are not auto-uploaded; sync, comparisons, and Guardian
permissions require their own consent. New public claims must be re-verified before advancing them.

Sable's shared-route description lives in `src/data/sableMetadata.ts`. Keep the completed v2 foundation
distinct from proposed offline inference, other providers, task resume, and IDE/server integrations.
The 53-scenario baseline is a declared deterministic contract, not an observed live-model success rate.
Transactions cover Sable file tools; native/PRoot processes do not provide kernel isolation. Re-read
the public evidence map and roadmap before advancing claims. `project sable`, project filtering,
command-palette search, architecture selection, and discovery derive from the local catalog.

Field Notes content lives in paired files under `src/blog/posts/`:

- `<stable-slug>.meta.ts` exports metadata satisfying `BlogPostMeta`.
- `<stable-slug>.mdx` re-exports that metadata and owns the article body.

Keep new notes in `draft` while editing. The filename, metadata slug, and companion MDX filename must
agree; metadata validation rejects invalid dates, statuses, tags, URLs, duplicate slugs, or missing
companions. Drafts do not enter public lists or direct public route resolution. The local
`registry-fixture` pair is intentionally non-public and exists only to verify the compiler, registry,
semantic component mapping, and lazy-chunk boundary.

Before publication, verify the article's evidence and obtain explicit user approval of the prose.
Then mark it `published`, synchronize the collection metadata and sitemap, run the verification matrix,
and verify the deployed archive and direct article route. Record the publication in the
`blog-field-notes` handoff; preserve existing slugs and historical outcomes when maintaining an article.

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
- `/blog` renders the editorial archive from the validated public registry. Two notes are published:
  **Local AI is a systems problem** (2026-08-24, featured) and **A security tool should know when it is
  guessing** (2026-08-25). Featured selection, counts, tags, and archive rows derive from public metadata;
  the development-only `registry-fixture` is excluded.
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
They also avoid the portfolio stylesheet, responsive hero artwork, and mask sprites. The raw document
adds one high-priority responsive WebP hero preload only for `/`; `PortfolioPage` loads the matching
portfolio CSS alongside its existing lazy interaction chunk. Hero `<picture>` elements retain JPEG
fallbacks. Mask buttons request only their own sprite on first pointer, focus, keyboard, or touch
interaction; reduced-motion and unsupported-mask environments retain the complete native static action.

## Visual assets

The source JPEG/PNG artwork remains in `public/`. The browser-preferred derivatives are:

- `atrx-portrait.webp`: 1080 x 1080, WebP quality 84, method 6
- `atrx-wide.webp`: 1672 x 941, WebP quality 84, method 6
- `atrx-mark.webp`: source mark resized to 320 px wide with Lanczos resampling, then lossless WebP method 6

These files were generated locally with Pillow 11+; preserve the dimensions, encoding settings, and
JPEG/PNG fallbacks when regenerating them. Social metadata intentionally continues to use the wide JPEG
for crawler compatibility. Do not put the mask sprites in `public/`: Vite fingerprints them from
`src/components/assets/`, and the interaction component controls when each URL becomes fetchable.

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

The production configuration targets Cloudflare Pages. Other static hosts need equivalent SPA
deep-route fallback and canonical-origin configuration. GitHub Pages additionally needs an explicit
history-routing fallback and base-path strategy; this repository does not provide those adaptations.

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

## Governance and maintenance

`WORKSTREAMS.md` lists independent goals. Root `NEXT_STEP.md` routes to their scoped handoffs under
`governance/workstreams/<id>/`; `governance/STATUS.md` is an index. Root `STATUS.md` is ignored local
scratch and must not be used to select or continue a goal. Durable product, architecture, design, and
agent documents are versioned. Dated test and live-deployment evidence belongs to the owning workstream.
