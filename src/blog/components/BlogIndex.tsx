import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPostRecord, BlogTag } from "../types";
import { BlogIndexHeader } from "./BlogIndexHeader";
import { FeaturedNote } from "./FeaturedNote";
import { NoteArchiveRow } from "./NoteArchiveRow";
import { TagFilter, type BlogFilter } from "./TagFilter";

type Props = {
  featured?: BlogPostRecord;
  posts: BlogPostRecord[];
  tags: BlogTag[];
};

export function BlogIndex({ featured, posts, tags }: Props) {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("all");
  const counts = useMemo(() => {
    const next = new Map<BlogFilter, number>([["all", posts.length]]);
    for (const tag of tags) next.set(tag, posts.filter((post) => post.meta.tags.includes(tag)).length);
    return next;
  }, [posts, tags]);
  const filteredPosts =
    activeFilter === "all" ? posts : posts.filter((post) => post.meta.tags.includes(activeFilter));

  return (
    <section className="notes-index" aria-labelledby="field-notes-title">
      <BlogIndexHeader publishedCount={posts.length} />
      {featured && <FeaturedNote record={featured} />}

      {posts.length > 0 ? (
        <>
          <TagFilter activeFilter={activeFilter} counts={counts} onChange={setActiveFilter} tags={tags} />
          <div
            id="field-notes-results"
            className="notes-archive"
            role="tabpanel"
            aria-live="polite"
            aria-label={`Field Notes filtered by ${activeFilter}`}
          >
            <div className="notes-archive__heading">
              <p className="notes-label">CHRONOLOGICAL ARCHIVE</p>
              <p>{filteredPosts.length} visible</p>
            </div>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((record, index) => (
                <NoteArchiveRow index={index} key={record.meta.slug} record={record} />
              ))
            ) : (
              <div className="notes-empty notes-empty--filtered" role="status">
                <p className="notes-label">NO MATCHING SIGNAL</p>
                <h2>No notes carry this tag yet.</h2>
                <button type="button" onClick={() => setActiveFilter("all")}>
                  Reset filter
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="notes-empty">
          <p className="notes-label">ARCHIVE STATUS / ZERO PUBLIC NOTES</p>
          <h2>The workbench is active. The archive opens when the first note is ready.</h2>
          <p>
            Drafts remain local until their technical claims, metadata, and direct routes have been
            checked. No filler posts are standing in for real work.
          </p>
          <div className="route-actions">
            <Link className="button button--light" to="/#projects">
              Explore verified projects
            </Link>
            <Link className="button button--outline" to="/">
              Return home
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
