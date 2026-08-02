import { lazy, Suspense, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ArticleLayout } from "../blog/components/ArticleLayout";
import { ArticleLoadBoundary } from "../blog/components/ArticleLoadBoundary";
import { mdxComponents } from "../blog/mdx-components";
import { blogRegistry } from "../blog/registry";
import { resolveBlogPost } from "../blog/preview";
import type { BlogPostRecord } from "../blog/types";
import { PageMetadata } from "../components/PageMetadata";
import { articlePageMetadata } from "../lib/pageMetadata";
import { NotFoundPage } from "./NotFoundPage";
import { RoutePageShell } from "./RoutePageShell";

export function BlogPostPage() {
  const { slug = "unknown" } = useParams();
  const [searchParams] = useSearchParams();
  const previewingDraft = import.meta.env.DEV && searchParams.get("preview") === "draft";
  const record = resolveBlogPost(blogRegistry, slug, {
    development: import.meta.env.DEV,
    previewRequested: previewingDraft,
  });

  if (!record) return <NotFoundPage articleSlug={slug} />;

  return (
    <RoutePageShell>
      <ArticleRoute previewingDraft={previewingDraft && record.meta.status === "draft"} record={record} />
    </RoutePageShell>
  );
}

function ArticleRoute({ previewingDraft, record }: { previewingDraft: boolean; record: BlogPostRecord }) {
  const ArticleBody = useMemo(
    () => lazy(async () => ({ default: (await record.load()).default })),
    [record],
  );
  const metadata = useMemo(
    () => articlePageMetadata(record.meta, { previewingDraft }),
    [previewingDraft, record.meta],
  );

  return (
    <ArticleLayout meta={record.meta} previewingDraft={previewingDraft}>
      <PageMetadata metadata={metadata} />
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
