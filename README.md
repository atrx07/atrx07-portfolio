# ATRX Portfolio

Interactive portfolio for Arppith Andrews (`atrx07`), built as a compact software control room for local AI, real-time systems, automation, and unusual browser tools.

## Stack

- Vite, React, and strict TypeScript
- Tailwind CSS plus a custom token-driven visual system
- GSAP and ScrollTrigger for restrained scroll motion
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
