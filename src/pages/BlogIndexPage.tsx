import { BlogIndex } from "../blog/components/BlogIndex";
import { blogRegistry } from "../blog/registry";
import { PageMetadata } from "../components/PageMetadata";
import { blogIndexMetadata } from "../lib/pageMetadata";
import { RoutePageShell } from "./RoutePageShell";

export function BlogIndexPage() {
  const posts = blogRegistry.getPublishedPosts();

  return (
    <RoutePageShell>
      <PageMetadata metadata={blogIndexMetadata} />
      <BlogIndex
        featured={blogRegistry.getFeaturedPost()}
        posts={posts}
        tags={blogRegistry.getAllPublishedTags()}
      />
    </RoutePageShell>
  );
}
