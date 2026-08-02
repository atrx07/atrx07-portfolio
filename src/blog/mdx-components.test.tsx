import { render, screen } from "@testing-library/react";
import RegistryFixture, { meta } from "./posts/registry-fixture.mdx";
import { mdxComponents } from "./mdx-components";
import { validateBlogPostMeta } from "./validation";

describe("Field Notes MDX component boundary", () => {
  it("renders the local fixture with semantic headings, code, tables, and links", () => {
    render(<RegistryFixture components={mdxComponents} />);

    expect(screen.getByRole("heading", { level: 2, name: "Pipeline proof" })).toBeInTheDocument();
    expect(screen.getByText("pnpm build")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Scrollable technical table" })).toContainElement(
      screen.getByRole("table"),
    );
    expect(screen.getByRole("link", { name: "Return to projects" })).toHaveAttribute(
      "href",
      "/#projects",
    );
  });

  it("exports valid draft metadata without entering the public registry", () => {
    expect(validateBlogPostMeta(meta, { today: "2026-08-02" }).status).toBe("draft");
  });
});
