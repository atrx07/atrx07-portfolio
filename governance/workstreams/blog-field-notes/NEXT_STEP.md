# Next Step — blog-field-notes

> Latest publication baseline: `5b53f6b` — `content: publish SecureScope evidence Field Note`.
> Correction baseline: `1f7589c` — `fix: synchronize Field Notes publication metadata`.
> First publication baseline: `1f13272` — `content: publish first NeuraLoc Field Note`.
> Published system baseline: `76800e9` — `perf: defer portfolio artwork delivery`.

## Active implementation

None. Correction commit `1f7589c` is pushed and verified live. Two grounded Field Notes remain published:

- `Local AI is a systems problem`
- `A security tool should know when it is guessing`

The SecureScope note was explicitly approved by the user before publication. Its public evidence boundary is the read-only `atrx07/securescope` repository at commit `0d0b11f22ceffc84fcfb8de2e3bf2bec5ab5323e`.

## Completed correction checkpoint

- Local typecheck, all 72 unit/component tests, production build, and the full stable Playwright matrix
  passed.
- Cloudflare serves `index-Sv2LCrwa.js`; live collection metadata is dated 2026-08-25 with two notes.
- Both direct articles and the sitemap passed metadata, isolation, overflow, and console regression checks.

## Next authorized milestone

The next milestone begins only when the user authorizes another grounded Field Note or asks for maintenance on an existing article. For another note:

1. select and inspect an authorized public evidence boundary;
2. draft with explicit implemented/planned distinctions and keep status `draft` through review unless the user explicitly approves prose in-chat before the repository write;
3. obtain explicit prose approval before exposing or publishing it;
4. synchronize public metadata and sitemap truth;
5. run the complete local matrix when an execution environment is available, push, and verify the exact live archive and article routes.

## Maintenance triggers

Reopen this workstream if routing, MDX, registry validation, Field Notes metadata, shared route isolation, hero/mark encoding, mask delivery, Cloudflare SPA behavior, article accessibility, or publication indexing changes. A project display update by itself belongs to its own workstream.
