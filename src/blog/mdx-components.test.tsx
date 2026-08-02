import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegistryFixture, { meta } from "./posts/registry-fixture.mdx";
import { mdxComponents } from "./mdx-components";
import { validateBlogPostMeta } from "./validation";

describe("Field Notes MDX component boundary", () => {
  it("renders the local fixture with semantic headings, code, tables, and links", () => {
    render(<RegistryFixture components={mdxComponents} />);

    expect(screen.getByRole("heading", { level: 2, name: "Pipeline proof" })).toBeInTheDocument();
    expect(screen.getByText("pnpm build")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy code sample" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Scrollable technical table" })).toContainElement(
      screen.getByRole("table"),
    );
    expect(screen.getByRole("link", { name: "Return to projects" })).toHaveAttribute(
      "href",
      "/#projects",
    );
    expect(screen.getByRole("blockquote")).toHaveTextContent("Draft content must never leak");
    expect(screen.getByRole("link", { name: "public ATRX repositories" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("exports valid draft metadata without entering the public registry", () => {
    expect(validateBlogPostMeta(meta, { today: "2026-08-02" }).status).toBe("draft");
  });

  it("copies a fenced code sample with live feedback", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<RegistryFixture components={mdxComponents} />);

    await user.click(screen.getByRole("button", { name: "Copy code sample" }));

    expect(writeText).toHaveBeenCalledWith("metadata -> eager registry\narticle body -> lazy module");
    expect(screen.getByText("Code copied to clipboard")).toBeInTheDocument();
  });
});
