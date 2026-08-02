import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogTag, postDateLabel } from "../format";
import type { BlogPostMeta } from "../types";

type Props = {
  meta: BlogPostMeta;
  previewingDraft?: boolean;
};

export function ArticleHeader({ meta, previewingDraft = false }: Props) {
  return (
    <header className="article-header">
      <Link className="article-back-link" to="/blog">
        <ArrowLeft size={16} aria-hidden="true" /> Field Notes / Archive
      </Link>

      {previewingDraft && (
        <p className="article-state-notice article-state-notice--draft" role="note">
          Local draft preview. This route is unavailable in production.
        </p>
      )}
      {meta.status === "archived" && (
        <p className="article-state-notice article-state-notice--archived" role="note">
          Archived note. This article remains available for historical context.
        </p>
      )}

      <div className="article-header__eyebrow">
        <span>ATRX / FIELD NOTE</span>
        <span>{meta.status}</span>
      </div>
      <h1 id="article-title" data-route-heading tabIndex={-1}>
        {meta.title}
      </h1>
      <p className="article-deck">{meta.description}</p>
      <div className="article-meta">
        <time dateTime={meta.updatedAt ?? meta.publishedAt}>{postDateLabel(meta)}</time>
        {meta.series && <span>Series / {meta.series}</span>}
        <ul aria-label="Article tags">
          {meta.tags.map((tag) => (
            <li key={tag}>{formatBlogTag(tag)}</li>
          ))}
        </ul>
      </div>
      {(meta.repositoryUrl || meta.projectSlug) && (
        <div className="article-header__links" aria-label="Related links">
          {meta.projectSlug && <Link to="/#projects">Related project</Link>}
          {meta.repositoryUrl && (
            <a href={meta.repositoryUrl} target="_blank" rel="noopener noreferrer">
              Repository <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </header>
  );
}
