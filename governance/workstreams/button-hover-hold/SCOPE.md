# Workstream Scope — button-hover-hold

## Goal

Restore the portfolio mask buttons' desktop hover animation and retain touch hold animation.

## In scope

- Mask action CSS and pointer/keyboard behavior in portfolio buttons and links.
- Desktop, mobile, reduced-motion, and existing shared-route regressions.

## Out of scope

- Project content, Field Notes publication, external repositories, and unrelated visuals.

## Writable target

`atrx07/atrx07-portfolio` only. No external repository is an implementation target.

## Durable baseline

- Source: `fa3d24d` on `main`, clean at task start, 2026-10-07.
- Keep native actions, lazy sprite loading, keyboard focus, and reduced-motion behavior.

## Exit criteria

- Mouse hover plays the reveal without clicking and mouse leave reverses it.
- Touch hold plays the reveal; release/cancellation reverses it without sticky hover.
- Required checks pass and the deployed portfolio is verified.
