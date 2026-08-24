import { render, screen } from "@testing-library/react";
import LocalAiSystemsNote from "./local-ai-is-a-systems-problem.mdx";
import { meta } from "./local-ai-is-a-systems-problem.meta";
import { mdxComponents } from "../mdx-components";

describe("Local AI systems Field Note", () => {
  it("renders the grounded engineering argument and public evidence links", () => {
    render(<LocalAiSystemsNote components={mdxComponents} />);

    expect(meta.status).toBe("published");
    expect(meta.publishedAt).toBe("2026-08-24");
    expect(meta.projectSlug).toBe("neuraloc");
    expect(
      screen.getByRole("heading", { level: 2, name: "The product starts at the native boundary" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "The roadmap is a dependency graph" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("region", { name: "Scrollable technical table" })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "status" })).toHaveAttribute(
      "href",
      "https://github.com/atrx07/NeuraLoc-Core/blob/main/STATUS.md",
    );
  });
});
