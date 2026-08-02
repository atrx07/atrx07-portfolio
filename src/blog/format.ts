import type { BlogPostMeta, BlogTag } from "./types";

export function formatBlogTag(tag: BlogTag) {
  return tag.replace(/-/g, " ");
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function postDateLabel(meta: BlogPostMeta) {
  return meta.updatedAt
    ? `Published ${formatPostDate(meta.publishedAt)} · Updated ${formatPostDate(meta.updatedAt)}`
    : `Published ${formatPostDate(meta.publishedAt)}`;
}
