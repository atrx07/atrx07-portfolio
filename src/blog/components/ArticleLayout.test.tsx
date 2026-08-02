import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { BlogPostMeta } from "../types";
import { ArticleLayout } from "./ArticleLayout";
import { ArticleLoadBoundary } from "./ArticleLoadBoundary";

const archivedMeta: BlogPostMeta = {
  slug: "archived-note",
  title: "Archived engineering note",
  description: "Historical context that remains publicly readable.",
  publishedAt: "2026-06-01",
  updatedAt: "2026-07-01",
  status: "archived",
  tags: ["architecture"],
};

describe("Article foundation", () => {
  it("renders one article heading, dates, tags, and an explicit archive notice", () => {
    render(
      <MemoryRouter>
        <ArticleLayout meta={archivedMeta}>
          <h2>Article section</h2>
        </ArticleLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: archivedMeta.title })).toHaveAttribute(
      "data-route-heading",
    );
    expect(screen.getByRole("note")).toHaveTextContent("Archived note");
    expect(screen.getByText("Published 01 Jun 2026 · Updated 01 Jul 2026")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Article tags" })).toHaveTextContent("architecture");
    expect(screen.getByRole("link", { name: "Field Notes / Archive" })).toHaveAttribute("href", "/blog");
  });

  it("labels an explicitly previewed draft and renders the article footer", () => {
    render(
      <MemoryRouter>
        <ArticleLayout meta={{ ...archivedMeta, status: "draft" }} previewingDraft>
          <p>Draft body</p>
        </ArticleLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole("note")).toHaveTextContent("Local draft preview");
    expect(screen.getByText("END OF TRANSMISSION")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /All Field Notes/ })).toHaveAttribute("href", "/blog");
  });

  it("shows a bounded public fallback when an article body throws", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    function BrokenArticle(): never {
      throw new Error("private module path");
    }

    render(
      <ArticleLoadBoundary resetKey="broken-note">
        <BrokenArticle />
      </ArticleLoadBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Article body unavailable");
    expect(screen.queryByText(/private module path/)).not.toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
