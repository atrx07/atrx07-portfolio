import type { BlogRegistry } from "./registry";

type PreviewOptions = {
  development: boolean;
  previewRequested: boolean;
};

export function resolveBlogPost(
  registry: BlogRegistry,
  slug: string,
  { development, previewRequested }: PreviewOptions,
) {
  return registry.getPostBySlug(slug, {
    includeDrafts: development && previewRequested,
  });
}
