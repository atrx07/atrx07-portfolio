import { render, screen } from "@testing-library/react";
import SecurityGuessingNote from "./a-security-tool-should-know-when-it-is-guessing.mdx";
import { meta } from "./a-security-tool-should-know-when-it-is-guessing.meta";
import { mdxComponents } from "../mdx-components";

describe("SecureScope evidence-boundary Field Note", () => {
  it("renders the public evidence boundary and scanner-vs-review argument", () => {
    render(<SecurityGuessingNote components={mdxComponents} />);

    expect(meta.status).toBe("published");
    expect(meta.publishedAt).toBe("2026-08-25");
    expect(meta.projectSlug).toBe("securescope");
    expect(
      screen.getByRole("heading", { level: 2, name: "Structured output is not structured evidence" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "The honesty label is a feature" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Scrollable technical table" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "SecureScope repository" })).toHaveAttribute(
      "href",
      "https://github.com/atrx07/securescope",
    );
  });
});
