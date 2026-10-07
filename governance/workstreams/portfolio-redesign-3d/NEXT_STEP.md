# Next Step - portfolio-redesign-3d

> This roadmap belongs only to portfolio-redesign-3d.

## Handoff

- Baseline: 520c6054029bb33dc7c4bd40ea6153cb069c62b5, main.
- Phase: first isolated working preview, awaiting design feedback and refinement.
- Preview: experiments/redesign-3d/; run npm run dev --prefix experiments/redesign-3d; open http://127.0.0.1:4180.
- Verification/limitations: STATUS.md; reproduction/provenance: preview README / THIRD_PARTY.
- Source commit: `383729e`, verified prototype pass on main.

## Remaining sequence

1. Continue from the working preview and user's reaction to composition, models, color, interaction intensity, and identity hierarchy. Do not restart discovery or modify production for experimentation.
2. Refine models, transitions, spatial navigation, lighting, project media, and mobile composition. Maintain immediate readable identity/content and non-drag controls.
3. Measure load, frame cadence, memory, and input response on representative devices/networks. Address the lazy Three.js chunk warning where useful; verify exact 360px, zoom, keyboard/focus, system reduced motion, GPU failure, and repeated modal/history transitions.
4. Integrate local Field Notes routes/content, routing/recovery, canonical metadata/sitemap, contact behavior, and approved visitor/discovery features before release parity. Preserve published notes and project constraints.
5. Prepare a concrete replacement build with isolated preview and rollback path. Run affected regressions plus visual, accessibility, and performance checks.
6. Obtain explicit user approval for the reviewed replacement before switching production. Verify the actual live artifact and retain the prior release.

## Constraints

- Root production entry/configuration/dependencies remain intact during preview work.
- Keep ARPPITH ANDREWS at equal or slightly greater emphasis than ATRX and atrx07 across responsive/loading/still presentations.
- No external project writes or another workstream's roadmap changes.
- Source synchronization only after confirming build isolation. Push is not proof of deployment; production replacement requires explicit user approval.
- Record licenses/provenance; use original reconstruction for inspiration when source is unavailable.

## Exit criteria

See SCOPE.md. The locally verified first preview does not complete this redesign workstream.
