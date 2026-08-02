import type {
  BlogPostLoader,
  BlogPostMeta,
  BlogPostModule,
  BlogPostRecord,
  BlogTag,
  ValidatedBlogPostModule,
} from "./types";
import { normalizeBlogTag, validateBlogPostMeta } from "./validation";

type RegistryOptions = {
  metadataModules: Record<string, unknown>;
  postModules: Record<string, BlogPostLoader>;
  production?: boolean;
  today?: string;
};

export type BlogRegistry = {
  getAllPostsForDevelopment: () => BlogPostRecord[];
  getAllPublishedTags: () => BlogTag[];
  getFeaturedPost: () => BlogPostRecord | undefined;
  getPostBySlug: (slug: string, options?: { includeDrafts?: boolean }) => BlogPostRecord | undefined;
  getPostsByTag: (tag: string) => BlogPostRecord[];
  getPublishedPosts: () => BlogPostRecord[];
};

export class BlogRegistryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlogRegistryError";
  }
}

export class BlogPostLoadError extends Error {
  readonly slug: string;

  constructor(slug: string, options?: ErrorOptions) {
    super(`The Field Note body for ${slug} could not be loaded.`, options);
    this.name = "BlogPostLoadError";
    this.slug = slug;
  }
}

function sourceSlug(sourcePath: string) {
  const filename = sourcePath.replace(/\\/g, "/").split("/").pop() ?? "";
  return filename.replace(/(?:\.meta\.ts|\.mdx)$/i, "");
}

function articlePathForMetadata(sourcePath: string) {
  return sourcePath.replace(/\.meta\.ts$/i, ".mdx");
}

function metadataPathForArticle(sourcePath: string) {
  return sourcePath.replace(/\.mdx$/i, ".meta.ts");
}

function sortPosts(records: BlogPostRecord[]) {
  return [...records].sort((left, right) => {
    const dateOrder = right.meta.publishedAt.localeCompare(left.meta.publishedAt);
    return dateOrder || left.meta.slug.localeCompare(right.meta.slug);
  });
}

function comparableMeta(meta: BlogPostMeta) {
  return JSON.stringify(meta);
}

export function createBlogRegistry({
  metadataModules,
  postModules,
  production = false,
  today,
}: RegistryOptions): BlogRegistry {
  const metadataPaths = Object.keys(metadataModules).sort();
  const modulePaths = Object.keys(postModules).sort();
  const missingLoaders = metadataPaths.filter((path) => !postModules[articlePathForMetadata(path)]);
  const missingMetadata = modulePaths.filter((path) => !(metadataPathForArticle(path) in metadataModules));

  if (missingLoaders.length > 0 || missingMetadata.length > 0) {
    throw new BlogRegistryError(
      [
        missingLoaders.length > 0 ? `missing article loaders for ${missingLoaders.join(", ")}` : "",
        missingMetadata.length > 0 ? `missing article metadata for ${missingMetadata.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("; "),
    );
  }

  const seenSlugs = new Set<string>();
  const records = metadataPaths.map<BlogPostRecord>((sourcePath) => {
    const meta = validateBlogPostMeta(metadataModules[sourcePath], { source: sourcePath, today });
    const filenameSlug = sourceSlug(sourcePath);

    if (meta.slug !== filenameSlug) {
      throw new BlogRegistryError(
        `${sourcePath} exports slug ${meta.slug}, but its filename requires ${filenameSlug}`,
      );
    }
    if (seenSlugs.has(meta.slug)) {
      throw new BlogRegistryError(`duplicate Field Note slug ${meta.slug}`);
    }
    seenSlugs.add(meta.slug);

    const articlePath = articlePathForMetadata(sourcePath);
    const loader = postModules[articlePath];
    return {
      meta,
      sourcePath: articlePath,
      load: async (): Promise<ValidatedBlogPostModule> => {
        try {
          const module = await loader();
          if (!module || typeof module.default !== "function") {
            throw new BlogRegistryError(`${articlePath} does not export a renderable default MDX component`);
          }
          const loadedMeta = validateBlogPostMeta(module.meta, { source: `${articlePath} lazy module`, today });
          if (comparableMeta(loadedMeta) !== comparableMeta(meta)) {
            throw new BlogRegistryError(`${articlePath} lazy metadata does not match the canonical registry`);
          }
          return { default: module.default, meta: loadedMeta };
        } catch (error) {
          if (error instanceof BlogPostLoadError) throw error;
          throw new BlogPostLoadError(meta.slug, { cause: error });
        }
      },
    };
  });

  const published = sortPosts(
    records.filter((record) => record.meta.status === "published" || record.meta.status === "archived"),
  );
  const featured = published.filter((record) => record.meta.featured);
  if (featured.length > 1) {
    throw new BlogRegistryError(`multiple published Field Notes are marked featured: ${featured.map((record) => record.meta.slug).join(", ")}`);
  }

  return {
    getPublishedPosts: () => [...published],
    getFeaturedPost: () => featured[0],
    getPostsByTag: (tag) => {
      const normalizedTag = normalizeBlogTag(tag);
      return published.filter((record) => record.meta.tags.includes(normalizedTag as BlogTag));
    },
    getAllPublishedTags: () =>
      [...new Set(published.flatMap((record) => record.meta.tags))].sort((left, right) =>
        left.localeCompare(right),
      ),
    getPostBySlug: (slug, options) => {
      const includeDrafts = options?.includeDrafts === true && !production;
      return (includeDrafts ? records : published).find((record) => record.meta.slug === slug);
    },
    getAllPostsForDevelopment: () => (production ? [...published] : sortPosts(records)),
  };
}

const metadataModules = import.meta.glob("./posts/*.meta.ts", {
  eager: true,
  import: "meta",
}) as Record<string, unknown>;

const postModules = import.meta.glob<BlogPostModule>("./posts/*.mdx");

export const blogRegistry = createBlogRegistry({
  metadataModules,
  postModules,
  production: import.meta.env.PROD,
});
