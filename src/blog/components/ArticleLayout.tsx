import type { ReactNode } from "react";
import type { BlogPostMeta } from "../types";
import { ArticleFooter } from "./ArticleFooter";
import { ArticleHeader } from "./ArticleHeader";

type Props = {
  children: ReactNode;
  meta: BlogPostMeta;
  previewingDraft?: boolean;
};

export function ArticleLayout({ children, meta, previewingDraft = false }: Props) {
  return (
    <article className="article-foundation" aria-labelledby="article-title">
      <ArticleHeader meta={meta} previewingDraft={previewingDraft} />
      <div className="article-body">{children}</div>
      <ArticleFooter meta={meta} />
    </article>
  );
}
