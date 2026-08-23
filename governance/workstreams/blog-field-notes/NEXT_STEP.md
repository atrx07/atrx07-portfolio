# Next Step — blog-field-notes

> Completed source baseline: `76800e9` — `perf: defer portfolio artwork delivery`.

## Active implementation

None. The recovered Field Notes release and its route-performance / visual-asset continuation are
complete and verified live.

## Next authorized milestone

Publish the first real Field Note only when the user supplies or explicitly authorizes a grounded topic
and source material. Do not invent filler content to populate the archive.

When that request arrives:

1. create the paired `<stable-slug>.meta.ts` and `<stable-slug>.mdx` files;
2. keep the note in `draft` while editing and use the development-only preview query;
3. validate claims, links, dates, code, tables, figures, overflow, keyboard behavior, and reduced motion;
4. switch to `published` only with explicit content approval;
5. synchronize sitemap `lastmod`, metadata tests, README only if the authoring contract changes, and
   this workstream handoff;
6. run lint, all unit/component tests, build, the full Playwright matrix, and exact Cloudflare deep-link
   verification before reporting publication complete.

## Maintenance triggers

Reopen this workstream if routing, MDX, registry validation, Field Notes metadata, shared route isolation,
hero/mark encoding, mask delivery, Cloudflare SPA behavior, or article accessibility changes. A project
display update by itself belongs to its own workstream.
