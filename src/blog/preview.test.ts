import { createBlogRegistry } from "./registry";
import { resolveBlogPost } from "./preview";
import type { BlogPostMeta } from "./types";

function draftRegistry(production = false) {
  const meta: BlogPostMeta = {
    slug: "local-draft",
    title: "Local draft",
    description: "A private preview fixture.",
    publishedAt: "2026-08-02",
    status: "draft",
    tags: ["testing"],
  };
  return createBlogRegistry({
    metadataModules: { "./posts/local-draft.meta.ts": meta },
    postModules: {
      "./posts/local-draft.mdx": async () => ({ default: () => null, meta }),
    },
    production,
    today: "2026-08-02",
  });
}

describe("Field Notes draft preview boundary", () => {
  it("requires development mode and an explicit preview request", () => {
    const registry = draftRegistry();

    expect(
      resolveBlogPost(registry, "local-draft", { development: true, previewRequested: false }),
    ).toBeUndefined();
    expect(
      resolveBlogPost(registry, "local-draft", { development: false, previewRequested: true }),
    ).toBeUndefined();
    expect(
      resolveBlogPost(registry, "local-draft", { development: true, previewRequested: true })?.meta
        .status,
    ).toBe("draft");
  });

  it("cannot bypass a production registry even when preview flags are true", () => {
    expect(
      resolveBlogPost(draftRegistry(true), "local-draft", {
        development: true,
        previewRequested: true,
      }),
    ).toBeUndefined();
  });
});
