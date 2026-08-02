import { readFileSync } from "node:fs";
import { fieldNotesMetadata, siteMetadata } from "../data/profile";
import { canonicalUrl } from "../lib/pageMetadata";
import { blogRegistry } from "./registry";

type SitemapEntry = {
  loc: string;
  lastmod: string;
};

function entriesFromXml(xml: string): SitemapEntry[] {
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)].map(
    ([, loc, lastmod]) => ({ loc, lastmod }),
  );
}

describe("public sitemap", () => {
  it("matches the validated publication registry and excludes drafts", () => {
    const posts = blogRegistry.getPublishedPosts();
    const newestPostDate = posts
      .flatMap((record) => [record.meta.publishedAt, record.meta.updatedAt].filter(Boolean) as string[])
      .sort()
      .at(-1);
    const blogLastModified = [fieldNotesMetadata.launchedAt, newestPostDate].filter(Boolean).sort().at(-1);
    const expected: SitemapEntry[] = [
      { loc: siteMetadata.canonicalUrl, lastmod: siteMetadata.lastModified },
      { loc: canonicalUrl("/blog"), lastmod: blogLastModified ?? fieldNotesMetadata.launchedAt },
      ...posts.map(({ meta }) => ({
        loc: meta.canonicalUrl ?? canonicalUrl(`/blog/${meta.slug}`),
        lastmod: meta.updatedAt ?? meta.publishedAt,
      })),
    ];
    const sitemap = readFileSync("public/sitemap.xml", "utf8");

    expect(entriesFromXml(sitemap)).toEqual(expected);
    expect(sitemap).not.toContain("registry-fixture");
    expect(sitemap).not.toContain("<changefreq>");
    expect(sitemap).not.toContain("<priority>");
  });
});
