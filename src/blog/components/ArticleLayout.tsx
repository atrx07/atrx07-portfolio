import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { BlogPostMeta } from "../types";

type Props = {
  children: ReactNode;
  meta: BlogPostMeta;
};

export function ArticleLayout({ children, meta }: Props) {
  return (
    <article className="article-foundation" aria-labelledby="article-title">
      <header className="article-foundation__header">
        <Link className="article-back-link" to="/blog">
          Field Notes / Archive
        </Link>
        {meta.status === "archived" && (
          <p className="article-archive-notice" role="note">
            Archived note. This article remains available for historical context.
          </p>
        )}
        <h1 id="article-title" data-route-heading tabIndex={-1}>
          {meta.title}
        </h1>
        <p className="article-deck">{meta.description}</p>
        <div className="article-meta">
          <time dateTime={meta.publishedAt}>{meta.publishedAt}</time>
          {meta.updatedAt && <span>Updated {meta.updatedAt}</span>}
          <ul aria-label="Article tags">
            {meta.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </header>
      <div className="article-body">{children}</div>
    </article>
  );
}
