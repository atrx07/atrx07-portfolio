import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogTag, formatPostDate } from "../format";
import type { BlogPostRecord } from "../types";

type Props = {
  index: number;
  record: BlogPostRecord;
};

export function NoteArchiveRow({ index, record }: Props) {
  const { meta } = record;

  return (
    <article className="note-archive-row" aria-labelledby={`note-${meta.slug}`}>
      <div className="note-archive-row__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="note-archive-row__copy">
        <div className="note-archive-row__meta">
          <time dateTime={meta.publishedAt}>{formatPostDate(meta.publishedAt)}</time>
          <span>{meta.status}</span>
        </div>
        <h3 id={`note-${meta.slug}`}>{meta.title}</h3>
        <p>{meta.description}</p>
        <ul className="notes-tag-list" aria-label={`${meta.title} tags`}>
          {meta.tags.map((tag) => (
            <li key={tag}>{formatBlogTag(tag)}</li>
          ))}
        </ul>
      </div>
      <Link className="note-archive-row__link" to={`/blog/${meta.slug}`} aria-label={`Read ${meta.title}`}>
        OPEN <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </article>
  );
}
