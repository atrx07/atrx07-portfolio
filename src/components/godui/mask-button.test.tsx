import { fireEvent, render, screen } from "@testing-library/react";
import { MaskButton, MaskLink } from "./mask-button";

describe("MaskButton", () => {
  it("preserves native button attributes and keyboard press feedback", () => {
    render(
      <MaskButton type="submit" name="intent" value="copy" aria-label="Copy address">
        Copy
      </MaskButton>,
    );

    const button = screen.getByRole("button", { name: "Copy address" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("name", "intent");
    expect(button).toHaveAttribute("value", "copy");

    fireEvent.keyDown(button, { key: "Enter" });
    expect(button).toHaveAttribute("data-pressed", "true");
    fireEvent.keyUp(button, { key: "Enter" });
    expect(button).not.toHaveAttribute("data-pressed");
  });

  it("keeps navigation actions as links", () => {
    render(
      <MaskLink href="#projects" mask="urban" variant="primary">
        Explore systems
      </MaskLink>,
    );

    expect(screen.getByRole("link", { name: "Explore systems" })).toHaveAttribute("href", "#projects");
  });
});
