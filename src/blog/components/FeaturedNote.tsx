import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogTag, formatPostDate } from "../format";
import type { BlogPostRecord } from "../types";

type Props = {
  record: BlogPostRecord;
};

export function FeaturedNote({ record }: Props) {
  const { meta } = record;

  return (
    <article className="featured-note" aria-labelledby={`featured-${meta.slug}`}>
      <div className="featured-note__rail" aria-hidden="true">
        FEATURED / {meta.status.toUpperCase()}
      </div>
      <div className="featured-note__content">
        <p className="notes-label">PRIMARY TRANSMISSION</p>
        <h2 id={`featured-${meta.slug}`}>{meta.title}</h2>
        <p className="featured-note__description">{meta.description}</p>
        <ul className="notes-tag-list" aria-label="Featured note tags">
          {meta.tags.map((tag) => (
            <li key={tag}>{formatBlogTag(tag)}</li>
          ))}
        </ul>
      </div>
      <div className="featured-note__action">
        <time dateTime={meta.publishedAt}>{formatPostDate(meta.publishedAt)}</time>
        <Link to={`/blog/${meta.slug}`}>
          Read field note <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
