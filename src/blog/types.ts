import type { ComponentType, ElementType } from "react";

export const BLOG_POST_STATUSES = ["draft", "published", "archived"] as const;

export const BLOG_TAGS = [
  "architecture",
  "automation",
  "bots",
  "debugging",
  "deployment",
  "local-ai",
  "music-tech",
  "portfolio",
  "real-time",
  "security",
  "testing",
  "web",
] as const;

export type BlogPostStatus = (typeof BLOG_POST_STATUSES)[number];
export type BlogTag = (typeof BLOG_TAGS)[number];
export type MdxComponentMap = Record<string, ElementType>;

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  status: BlogPostStatus;
  tags: BlogTag[];
  series?: string;
  featured?: boolean;
  cover?: {
    src: string;
    alt: string;
  };
  repositoryUrl?: string;
  projectSlug?: string;
  canonicalUrl?: string;
};

export type BlogPostComponent = ComponentType<{
  components?: MdxComponentMap;
}>;

export type BlogPostModule = {
  default: BlogPostComponent;
  meta: unknown;
};

export type ValidatedBlogPostModule = Omit<BlogPostModule, "meta"> & {
  meta: BlogPostMeta;
};

export type BlogPostLoader = () => Promise<BlogPostModule>;

export type BlogPostRecord = {
  meta: BlogPostMeta;
  sourcePath: string;
  load: () => Promise<ValidatedBlogPostModule>;
};
