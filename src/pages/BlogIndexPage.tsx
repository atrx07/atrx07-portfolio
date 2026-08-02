import { BlogIndex } from "../blog/components/BlogIndex";
import { blogRegistry } from "../blog/registry";
import { RoutePageShell } from "./RoutePageShell";

export function BlogIndexPage() {
  const posts = blogRegistry.getPublishedPosts();

  return (
    <RoutePageShell>
      <BlogIndex
        featured={blogRegistry.getFeaturedPost()}
        posts={posts}
        tags={blogRegistry.getAllPublishedTags()}
      />
    </RoutePageShell>
  );
}
