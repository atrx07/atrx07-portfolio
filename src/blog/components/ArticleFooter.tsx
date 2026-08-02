import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPostMeta } from "../types";

type Props = {
  meta: BlogPostMeta;
};

export function ArticleFooter({ meta }: Props) {
  return (
    <footer className="article-footer">
      <p className="notes-label">END OF TRANSMISSION</p>
      <p>Return to the archive, or inspect the related source when one is public.</p>
      <div className="article-footer__actions">
        <Link to="/blog">
          <ArrowLeft size={17} aria-hidden="true" /> All Field Notes
        </Link>
        {meta.repositoryUrl && (
          <a href={meta.repositoryUrl} target="_blank" rel="noopener noreferrer">
            Open repository <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        )}
      </div>
    </footer>
  );
}
