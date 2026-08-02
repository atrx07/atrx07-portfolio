import type { BlogPostMeta, BlogPostModule } from "./types";
import { BlogPostLoadError, BlogRegistryError, createBlogRegistry } from "./registry";

function makeMeta(slug: string, overrides: Partial<BlogPostMeta> = {}): BlogPostMeta {
  return {
    slug,
    title: `Note ${slug}`,
    description: `Description for ${slug}.`,
    publishedAt: "2026-07-01",
    status: "published",
    tags: ["testing"],
    ...overrides,
  };
}

function articleModule(meta: BlogPostMeta): BlogPostModule {
  return { default: () => null, meta };
}

function registryFor(
  entries: Array<{ meta: BlogPostMeta; directory?: string; loader?: () => Promise<BlogPostModule> }>,
  production = false,
) {
  const metadataModules: Record<string, unknown> = {};
  const postModules: Record<string, () => Promise<BlogPostModule>> = {};

  entries.forEach(({ meta, directory = "", loader }) => {
    const prefix = directory ? `./posts/${directory}/` : "./posts/";
    metadataModules[`${prefix}${meta.slug}.meta.ts`] = meta;
    postModules[`${prefix}${meta.slug}.mdx`] = loader ?? (async () => articleModule(meta));
  });

  return createBlogRegistry({ metadataModules, postModules, production, today: "2026-08-02" });
}

describe("Field Notes registry", () => {
  it("sorts public notes newest-first, retains archives, and excludes drafts", () => {
    const draft = makeMeta("draft-note", { status: "draft", publishedAt: "2026-08-02" });
    const archived = makeMeta("archived-note", { status: "archived", publishedAt: "2026-07-20" });
    const older = makeMeta("older-note", { publishedAt: "2026-06-12" });
    const registry = registryFor([{ meta: older }, { meta: draft }, { meta: archived }]);

    expect(registry.getPublishedPosts().map(({ meta }) => meta.slug)).toEqual([
      "archived-note",
      "older-note",
    ]);
    expect(registry.getPostBySlug("draft-note")).toBeUndefined();
    expect(registry.getPostBySlug("draft-note", { includeDrafts: true })?.meta.status).toBe("draft");
    expect(registry.getAllPostsForDevelopment()).toHaveLength(3);
  });

  it("keeps draft lookup disabled when the registry is in production mode", () => {
    const draft = makeMeta("draft-note", { status: "draft" });
    const registry = registryFor([{ meta: draft }], true);

    expect(registry.getPostBySlug("draft-note", { includeDrafts: true })).toBeUndefined();
    expect(registry.getAllPostsForDevelopment()).toEqual([]);
  });

  it("normalizes tag queries and exposes a deterministic public vocabulary", () => {
    const local = makeMeta("local-note", { tags: ["local-ai", "architecture"] });
    const web = makeMeta("web-note", { tags: ["web"] });
    const registry = registryFor([{ meta: web }, { meta: local }]);

    expect(registry.getPostsByTag(" Local AI ").map(({ meta }) => meta.slug)).toEqual(["local-note"]);
    expect(registry.getAllPublishedTags()).toEqual(["architecture", "local-ai", "web"]);
  });

  it("rejects duplicate explicit slugs and filename/metadata disagreement", () => {
    const duplicate = makeMeta("duplicate-note");
    expect(() =>
      registryFor([
        { meta: duplicate, directory: "one" },
        { meta: duplicate, directory: "two" },
      ]),
    ).toThrow(/duplicate Field Note slug/);

    expect(() =>
      createBlogRegistry({
        metadataModules: { "./posts/file-name.meta.ts": makeMeta("different-slug") },
        postModules: {
          "./posts/file-name.mdx": async () => articleModule(makeMeta("different-slug")),
        },
        today: "2026-08-02",
      }),
    ).toThrow(/filename requires file-name/);
  });

  it("rejects missing metadata or article companions", () => {
    expect(() =>
      createBlogRegistry({
        metadataModules: { "./posts/orphan.meta.ts": makeMeta("orphan") },
        postModules: {},
        today: "2026-08-02",
      }),
    ).toThrow(BlogRegistryError);

    expect(() =>
      createBlogRegistry({
        metadataModules: {},
        postModules: {
          "./posts/orphan.mdx": async () => articleModule(makeMeta("orphan")),
        },
        today: "2026-08-02",
      }),
    ).toThrow(/missing article metadata/);
  });

  it("returns the single public featured note and rejects multiple featured notes", () => {
    const featured = makeMeta("featured-note", { featured: true });
    expect(registryFor([{ meta: featured }]).getFeaturedPost()?.meta.slug).toBe("featured-note");

    expect(() =>
      registryFor([
        { meta: featured },
        { meta: makeMeta("another-featured", { featured: true }) },
      ]),
    ).toThrow(/multiple published Field Notes/);
  });

  it("wraps lazy import failures without exposing their raw message", async () => {
    const meta = makeMeta("broken-note");
    const registry = registryFor([
      { meta, loader: async () => Promise.reject(new Error("private filesystem detail")) },
    ]);

    const error = await registry.getPostBySlug("broken-note")?.load().catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(BlogPostLoadError);
    expect((error as Error).message).not.toContain("private filesystem detail");
  });

  it("rejects lazy modules whose exported metadata diverges from the registry", async () => {
    const meta = makeMeta("changed-note");
    const registry = registryFor([
      {
        meta,
        loader: async () => articleModule({ ...meta, title: "A different title" }),
      },
    ]);

    await expect(registry.getPostBySlug("changed-note")?.load()).rejects.toBeInstanceOf(
      BlogPostLoadError,
    );
  });
});
