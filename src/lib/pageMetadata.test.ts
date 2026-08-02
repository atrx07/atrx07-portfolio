import type { BlogPostMeta } from "../blog/types";
import {
  applyPageMetadata,
  articlePageMetadata,
  blogIndexMetadata,
  canonicalUrl,
  homePageMetadata,
  noindexPageMetadata,
  serializeStructuredData,
} from "./pageMetadata";

const publishedPost = {
  slug: "native-boundaries",
  title: "Native boundaries",
  description: "How process ownership keeps a local AI desktop runtime dependable.",
  publishedAt: "2026-08-01",
  updatedAt: "2026-08-02",
  status: "published",
  tags: ["local-ai", "architecture"],
  repositoryUrl: "https://github.com/atrx07/NeuraLoc-Core",
} satisfies BlogPostMeta;

function metaContent(selector: string) {
  return document.head.querySelector<HTMLMetaElement>(selector)?.content;
}

describe("route metadata", () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <title>Fallback</title>
      <meta name="description" content="fallback">
      <meta name="robots" content="index, follow">
      <meta property="og:type" content="profile">
      <meta property="profile:username" content="atrx07">
      <link rel="canonical" href="https://atrx07.pages.dev/">
      <script type="application/ld+json" data-route-structured-data>{}</script>
    `;
  });

  it("builds canonical route URLs from the single site origin", () => {
    expect(canonicalUrl("/blog")).toBe("https://atrx07.pages.dev/blog");
    expect(canonicalUrl("blog/native-boundaries")).toBe(
      "https://atrx07.pages.dev/blog/native-boundaries",
    );
  });

  it("describes published and archived notes as indexable technical articles", () => {
    for (const status of ["published", "archived"] as const) {
      const metadata = articlePageMetadata({ ...publishedPost, status });
      const graph = metadata.structuredData as Record<string, unknown>;

      expect(metadata.canonicalUrl).toBe("https://atrx07.pages.dev/blog/native-boundaries");
      expect(metadata.tags).toContainEqual({
        attribute: "property",
        key: "og:type",
        content: "article",
      });
      expect(metadata.tags.filter((tag) => tag.key === "article:tag").map((tag) => tag.content)).toEqual([
        "local-ai",
        "architecture",
      ]);
      expect(graph["@type"]).toBe("TechArticle");
      expect(graph.datePublished).toBe("2026-08-01");
      expect(graph.dateModified).toBe("2026-08-02");
    }
  });

  it("keeps draft previews and recovery routes out of discovery metadata", () => {
    const draft = articlePageMetadata({ ...publishedPost, status: "draft" }, { previewingDraft: true });
    applyPageMetadata(draft);

    expect(metaContent('meta[name="robots"]')).toBe("noindex, nofollow");
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('meta[property="og:type"]')).toBeNull();
    expect(document.head.querySelector('script[data-route-structured-data]')).toBeNull();
  });

  it("replaces route state without duplicate tags and restores the homepage graph", () => {
    const article = articlePageMetadata(publishedPost);
    applyPageMetadata(article);
    applyPageMetadata(article);

    expect(document.head.querySelectorAll('meta[property="article:tag"]')).toHaveLength(2);
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[property="profile:username"]')).toBeNull();

    applyPageMetadata(blogIndexMetadata);
    expect(document.title).toBe("Field Notes | Arppith Andrews (atrx07)");
    expect(document.head.querySelector('meta[property="article:published_time"]')).toBeNull();
    expect(document.head.querySelectorAll('meta[property="article:tag"]')).toHaveLength(0);

    applyPageMetadata(
      noindexPageMetadata({ title: "Signal Lost / 404 | ATRX", description: "Unknown route." }),
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('script[data-route-structured-data]')).toBeNull();

    applyPageMetadata(homePageMetadata);
    expect(document.title).toBe("Arppith Andrews | AI, Automation & Software Developer");
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://atrx07.pages.dev/",
    );
    expect(metaContent('meta[property="og:type"]')).toBe("profile");
    expect(metaContent('meta[property="profile:username"]')).toBe("atrx07");
    const graph = JSON.parse(
      document.head.querySelector('script[data-route-structured-data]')?.textContent ?? "{}",
    ) as { "@graph"?: Array<{ "@type"?: string }> };
    expect(graph["@graph"]?.some((node) => node["@type"] === "ProfilePage")).toBe(true);
  });

  it("escapes less-than characters in serialized structured data", () => {
    expect(serializeStructuredData({ headline: "</script><script>alert(1)</script>" })).not.toContain("<");
    expect(serializeStructuredData({ headline: "</script>" })).toContain("\\u003c/script>");
  });
});
