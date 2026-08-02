import {
  BLOG_POST_STATUSES,
  BLOG_TAGS,
  type BlogPostMeta,
  type BlogPostStatus,
  type BlogTag,
} from "./types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const tagSet = new Set<string>(BLOG_TAGS);
const statusSet = new Set<string>(BLOG_POST_STATUSES);

type ValidationOptions = {
  source?: string;
  today?: string;
};

export class BlogValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[], source = "Field Note metadata") {
    super(`${source} is invalid: ${issues.join("; ")}`);
    this.name = "BlogValidationError";
    this.issues = issues;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRequiredString(
  input: Record<string, unknown>,
  key: string,
  issues: string[],
): string {
  const value = input[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    issues.push(`${key} must be a nonempty string`);
    return "";
  }
  return value.trim();
}

function readOptionalString(
  input: Record<string, unknown>,
  key: string,
  issues: string[],
): string | undefined {
  const value = input[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim().length === 0) {
    issues.push(`${key} must be a nonempty string when supplied`);
    return undefined;
  }
  return value.trim();
}

function isValidIsoDate(value: string) {
  if (!isoDatePattern.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function validateHttpsUrl(value: string | undefined, key: string, issues: string[]) {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") issues.push(`${key} must use https`);
  } catch {
    issues.push(`${key} must be a valid URL`);
  }
}

export function normalizeBlogTag(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

export function validateBlogPostMeta(
  value: unknown,
  { source = "Field Note metadata", today = new Date().toISOString().slice(0, 10) }: ValidationOptions = {},
): BlogPostMeta {
  if (!isRecord(value)) throw new BlogValidationError(["metadata must be an object"], source);

  const issues: string[] = [];
  const slug = readRequiredString(value, "slug", issues);
  const title = readRequiredString(value, "title", issues);
  const description = readRequiredString(value, "description", issues);
  const publishedAt = readRequiredString(value, "publishedAt", issues);
  const updatedAt = readOptionalString(value, "updatedAt", issues);
  const series = readOptionalString(value, "series", issues);
  const repositoryUrl = readOptionalString(value, "repositoryUrl", issues);
  const projectSlug = readOptionalString(value, "projectSlug", issues);
  const canonicalUrl = readOptionalString(value, "canonicalUrl", issues);

  if (slug && !slugPattern.test(slug)) issues.push("slug must use lowercase kebab-case");
  if (projectSlug && !slugPattern.test(projectSlug)) issues.push("projectSlug must use lowercase kebab-case");

  if (publishedAt && !isValidIsoDate(publishedAt)) issues.push("publishedAt must be a valid YYYY-MM-DD date");
  if (updatedAt && !isValidIsoDate(updatedAt)) issues.push("updatedAt must be a valid YYYY-MM-DD date");
  if (isValidIsoDate(publishedAt) && publishedAt > today) issues.push("publishedAt cannot be in the future");
  if (updatedAt && isValidIsoDate(updatedAt) && updatedAt > today) issues.push("updatedAt cannot be in the future");
  if (updatedAt && isValidIsoDate(updatedAt) && isValidIsoDate(publishedAt) && updatedAt < publishedAt) {
    issues.push("updatedAt cannot be earlier than publishedAt");
  }

  const rawStatus = value.status;
  if (typeof rawStatus !== "string" || !statusSet.has(rawStatus)) {
    issues.push(`status must be one of ${BLOG_POST_STATUSES.join(", ")}`);
  }
  const status = (statusSet.has(String(rawStatus)) ? rawStatus : "draft") as BlogPostStatus;

  const rawTags = value.tags;
  const tags: BlogTag[] = [];
  if (!Array.isArray(rawTags) || rawTags.length === 0) {
    issues.push("tags must be a nonempty array");
  } else {
    const seenTags = new Set<string>();
    rawTags.forEach((rawTag, index) => {
      if (typeof rawTag !== "string" || rawTag.trim().length === 0) {
        issues.push(`tags[${index}] must be a nonempty string`);
        return;
      }
      const tag = normalizeBlogTag(rawTag);
      if (!tagSet.has(tag)) {
        issues.push(`tags[${index}] must be one of ${BLOG_TAGS.join(", ")}`);
        return;
      }
      if (seenTags.has(tag)) {
        issues.push(`tags contains duplicate normalized value ${tag}`);
        return;
      }
      seenTags.add(tag);
      tags.push(tag as BlogTag);
    });
  }

  const featured = value.featured;
  if (featured !== undefined && typeof featured !== "boolean") {
    issues.push("featured must be a boolean when supplied");
  }

  let cover: BlogPostMeta["cover"];
  if (value.cover !== undefined) {
    if (!isRecord(value.cover)) {
      issues.push("cover must be an object when supplied");
    } else {
      const src = readRequiredString(value.cover, "src", issues);
      const altValue = value.cover.alt;
      if (typeof altValue !== "string") issues.push("cover.alt must be a string");
      if (src && (!src.startsWith("/") || src.startsWith("//"))) {
        issues.push("cover.src must be a root-relative local path");
      }
      cover = { src, alt: typeof altValue === "string" ? altValue.trim() : "" };
    }
  }

  validateHttpsUrl(repositoryUrl, "repositoryUrl", issues);
  validateHttpsUrl(canonicalUrl, "canonicalUrl", issues);

  if (issues.length > 0) throw new BlogValidationError(issues, source);

  return {
    slug,
    title,
    description,
    publishedAt,
    status,
    tags,
    ...(updatedAt ? { updatedAt } : {}),
    ...(series ? { series } : {}),
    ...(typeof featured === "boolean" ? { featured } : {}),
    ...(cover ? { cover } : {}),
    ...(repositoryUrl ? { repositoryUrl } : {}),
    ...(projectSlug ? { projectSlug } : {}),
    ...(canonicalUrl ? { canonicalUrl } : {}),
  };
}
