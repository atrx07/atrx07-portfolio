# Next Step — blog-field-notes

> Latest publication baseline: `5b53f6b` — `content: publish SecureScope evidence Field Note`.
> Correction baseline: `1f7589c` — `fix: synchronize Field Notes publication metadata`.
> First publication baseline: `1f13272` — `content: publish first NeuraLoc Field Note`.
> Published system baseline: `76800e9` — `perf: defer portfolio artwork delivery`.

## Active implementation

Push and verify correction commit `1f7589c`. Two grounded Field Notes remain published:

- `Local AI is a systems problem`
- `A security tool should know when it is guessing`

The SecureScope note was explicitly approved by the user before publication. Its public evidence boundary is the read-only `atrx07/securescope` repository at commit `0d0b11f22ceffc84fcfb8de2e3bf2bec5ab5323e`.

## Correction deployment checkpoint

1. push local `main` to `origin/main`;
2. wait for Cloudflare to serve the correction build rather than inferring deployment from the push;
3. verify live `/blog` `CollectionPage.dateModified` is `2026-08-25` while its count remains two;
4. verify both direct article routes, the sitemap, canonical/index metadata, route isolation, overflow, and
   console state remain correct;
5. record the exact live asset graph and return the workstream to `complete / maintenance-ready`.

## Next authorized milestone

The next milestone begins only when the user authorizes another grounded Field Note or asks for maintenance on an existing article. For another note:

1. select and inspect an authorized public evidence boundary;
2. draft with explicit implemented/planned distinctions and keep status `draft` through review unless the user explicitly approves prose in-chat before the repository write;
3. obtain explicit prose approval before exposing or publishing it;
4. synchronize public metadata and sitemap truth;
5. run the complete local matrix when an execution environment is available, push, and verify the exact live archive and article routes.

## Maintenance triggers

Reopen this workstream if routing, MDX, registry validation, Field Notes metadata, shared route isolation, hero/mark encoding, mask delivery, Cloudflare SPA behavior, article accessibility, or publication indexing changes. A project display update by itself belongs to its own workstream.
