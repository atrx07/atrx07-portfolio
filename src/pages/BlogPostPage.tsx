import { lazy, Suspense, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ArticleLayout } from "../blog/components/ArticleLayout";
import { ArticleLoadBoundary } from "../blog/components/ArticleLoadBoundary";
import { mdxComponents } from "../blog/mdx-components";
import { blogRegistry } from "../blog/registry";
import type { BlogPostRecord } from "../blog/types";
import { NotFoundPage } from "./NotFoundPage";
import { RoutePageShell } from "./RoutePageShell";

export function BlogPostPage() {
  const { slug = "unknown" } = useParams();
  const record = blogRegistry.getPostBySlug(slug);

  if (!record) return <NotFoundPage articleSlug={slug} />;

  return (
    <RoutePageShell>
      <ArticleRoute record={record} />
    </RoutePageShell>
  );
}

function ArticleRoute({ record }: { record: BlogPostRecord }) {
  const ArticleBody = useMemo(
    () => lazy(async () => ({ default: (await record.load()).default })),
    [record],
  );

  return (
    <ArticleLayout meta={record.meta}>
      <ArticleLoadBoundary resetKey={record.meta.slug}>
        <Suspense
          fallback={
            <div className="article-load-state" role="status">
              Loading article body...
            </div>
          }
        >
          <ArticleBody components={mdxComponents} />
        </Suspense>
      </ArticleLoadBoundary>
    </ArticleLayout>
  );
}
