import { BlogValidationError, normalizeBlogTag, validateBlogPostMeta } from "./validation";

const validMeta = {
  slug: "local-ai-boundaries",
  title: "Local AI boundaries",
  description: "A grounded note about native process ownership.",
  publishedAt: "2026-07-20",
  status: "published",
  tags: ["Local AI", "Architecture"],
  repositoryUrl: "https://github.com/atrx07/NeuraLoc-Core",
};

describe("Field Notes metadata validation", () => {
  it("normalizes accepted tags and returns the canonical metadata shape", () => {
    expect(normalizeBlogTag("  Local AI  ")).toBe("local-ai");
    expect(validateBlogPostMeta(validMeta, { today: "2026-08-02" })).toEqual({
      ...validMeta,
      tags: ["local-ai", "architecture"],
    });
  });

  it("rejects invalid slugs, statuses, empty tags, and non-https repository links", () => {
    expect(() =>
      validateBlogPostMeta(
        {
          ...validMeta,
          slug: "Local AI",
          status: "live",
          tags: [],
          repositoryUrl: "http://example.com/repository",
        },
        { today: "2026-08-02" },
      ),
    ).toThrow(BlogValidationError);
  });

  it("rejects impossible, future, and reversed publication dates", () => {
    expect(() =>
      validateBlogPostMeta(
        { ...validMeta, publishedAt: "2026-02-30", updatedAt: "2026-01-10" },
        { today: "2026-08-02" },
      ),
    ).toThrow(/publishedAt must be a valid/);

    expect(() =>
      validateBlogPostMeta(
        { ...validMeta, publishedAt: "2026-08-03" },
        { today: "2026-08-02" },
      ),
    ).toThrow(/cannot be in the future/);

    expect(() =>
      validateBlogPostMeta(
        { ...validMeta, updatedAt: "2026-07-01" },
        { today: "2026-08-02" },
      ),
    ).toThrow(/cannot be earlier/);
  });

  it("rejects duplicate normalized tags and invalid local cover paths", () => {
    expect(() =>
      validateBlogPostMeta(
        {
          ...validMeta,
          tags: ["Local AI", "local-ai"],
          cover: { src: "//example.com/cover.png", alt: "A diagram" },
        },
        { today: "2026-08-02" },
      ),
    ).toThrow(/duplicate normalized value local-ai/);
  });
});
