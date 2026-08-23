# Workstream Scope — blog-field-notes

## Goal

Continue and complete the ATRX **Field Notes** / blog workstream without losing its original roadmap, including route, content, metadata, accessibility, testing, deployment verification, and post-implementation asset-delivery work.

## Recovery identity

- Original durable Blog/Field Notes directive: current `AGENTS.md`, sections 24–25.
- Last known blog-specific governance handoff: `3096a9a` (`docs: hand off visual asset delivery`).
- Implementation baseline at that handoff: `ed44e36` (`perf: isolate route-owned styles and artwork`).

The historical root `STATUS.md` was ignored and is not available from Git history. This workstream status is therefore reconstructed only from versioned handoff and commit evidence.

## In scope

- `/blog`
- `/blog/:slug`
- blog index/article behavior
- route shell behavior required by Field Notes
- MDX system and registry
- metadata / canonical / JSON-LD / sitemap behavior for Field Notes
- route-specific CSS/JS isolation
- blog/recovery request boundaries
- responsive and reduced-motion article behavior
- accessibility and keyboard behavior
- Field Notes test coverage
- Cloudflare verification for the Field Notes route graph
- visual-asset optimizations inherited from the last blog handoff where they protect or complete shared route-performance work

## Shared portfolio files

This workstream may modify shared routing, shell, styles, metadata, tests, and assets only when needed for its goal. It must preserve current project-display truth and run affected regressions.

## Out of scope

- adding/updating a featured project merely because its repository changed;
- implementing Traelyx or any other represented external project;
- replacing another project-display workstream;
- turning an external project roadmap into the blog roadmap;
- deleting another workstream's status or continuation.

If a separate project-display request appears in another Codex thread, that work belongs to another workstream and must not replace this one.

## Durable acceptance criteria

The original Field Notes Stage A–E plan and "Blog-expanded definition of done" in `AGENTS.md` remain fully in force.

This recovered continuation begins after the locally validated route-asset-isolation milestone and must not be interpreted as proof that every live/deployment checkpoint was completed.