# Next Step — blog-field-notes

> Draft baseline: `b007669` — `content: draft first NeuraLoc Field Note`.
> Published system baseline: `76800e9` — `perf: defer portfolio artwork delivery`.

## Active implementation

Review and revise the NeuraLoc-Core draft `Local AI is a systems problem`. The article remains `draft`,
is absent from the production registry and sitemap, and is available only through the development preview
query.

## Next authorized milestone

The topic and public source boundary are authorized. Publication is not. Next:

1. obtain the user's review of the drafted prose and make requested revisions while status stays `draft`;
2. push the local draft commits only if the user explicitly approves exposing the review draft in the
   public source repository; otherwise keep them local until publication approval;
3. switch to `published` only after explicit approval of the content;
4. on approval, set the final publication date, synchronize sitemap truth and publication-specific tests,
   and keep the existing authoring contract unchanged unless implementation reality requires otherwise;
5. run lint, all unit/component tests, build, the full Playwright matrix, and privacy checks;
6. commit and push the publication change, then verify the exact Cloudflare `/blog` listing and direct
   article deep link before reporting publication complete;
7. if approval is withheld, retain the draft and leave public routes unchanged.

## Maintenance triggers

Reopen this workstream if routing, MDX, registry validation, Field Notes metadata, shared route isolation,
hero/mark encoding, mask delivery, Cloudflare SPA behavior, or article accessibility changes. A project
display update by itself belongs to its own workstream.
