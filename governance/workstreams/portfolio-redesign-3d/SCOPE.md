# Workstream Scope - portfolio-redesign-3d

## Goal

Explore and develop a completely different, extremely interactive 3D portfolio experience for Arppith Andrews. Keep the current portfolio running until the user is satisfied with the replacement and explicitly approves the production switch.

## In scope

- Current authorization (2026-10-07): implement the isolated redesign following completed reference research, using gpt-taste and reusable UI source where available. User authorized visual study of gated demos and will handle any required login.
- Preserve this goal independently from all existing workstreams.
- A future isolated preview may redesign portfolio presentation, navigation, project exhibits, and the visual integration of Field Notes while preserving published content and route behavior.
- Define scene, asset, interaction, mobile, accessibility, and performance requirements before implementation.

## Identity hierarchy

- User requirement (2026-10-07): **ARPPITH ANDREWS** must have equal or slightly greater visual emphasis than **ATRX** and **atrx07**.
- Treat the full name as the personal identity, ATRX as the creative identity, and atrx07 as the username. Keep all three prominent; the aliases must not overshadow the full name.
- Show the full name in the initial viewport on desktop and mobile, with equal or slightly stronger overall visual weight through scale, contrast, and placement. Preserve this hierarchy in loading, reduced-motion, and static presentations, without requiring interaction to reveal the name.

## Out of scope

- Replacing the production site or introducing redesign code into production before explicit user approval.
- Purchases, paid subscriptions, new accounts, or accepting new licenses on the user's behalf.
- Copying gated source or treating unclear asset/component licenses as permission to ship them.
- Modifying featured project repositories or continuing their implementation roadmaps.
- Replacing another workstream's scope, status, or next-step history.

## Writable target

`atrx07/atrx07-portfolio`

Public project repositories are read-only evidence. Authorized implementation is isolated under `experiments/redesign-3d/`, with its own manifest, Vite entry, local server, and output directory. Existing production entry, dependencies, routes, and deployment settings remain untouched. Portfolio data and existing components may be imported read-only. Production-connected pushes remain deferred until deployment isolation is verified. Follow the repository's branch rule: create a branch only after explicit user authorization for that workflow.

## Durable baseline

- Source: `520c6054029bb33dc7c4bd40ea6153cb069c62b5`, `main`, clean checkout observed on 2026-10-07.
- Existing stack: React 18, Vite 6, TypeScript, Tailwind 3, GSAP, Framer Motion, React Router, and local MDX.
- Existing `/`, `/blog`, `/blog/:slug`, published-note visibility, verified project claims, contact behavior, privacy, accessibility, and metadata contracts remain product requirements.
- Current design documents describe the existing release. Proposed art direction is recorded here until it is approved and implemented; research does not silently rewrite durable design truth.

## Exit criteria

- Research produces a sourced shortlist, an original portfolio-specific concept, an interaction map, and a feasible isolated-preview plan.
- Later implementation, when authorized, is reviewable without changing production.
- The first prototype and final replacement visibly satisfy the identity hierarchy on desktop and mobile, including reduced-motion/static presentations.
- Replacement preserves public content and URLs, passes relevant regressions and visual/mobile/accessibility/performance checks, and is explicitly approved by the user before release.
- Production replacement is verified live and has a recoverable prior release.
