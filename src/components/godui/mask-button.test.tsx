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

  it("loads only the requested mask on first pointer or focus interaction", () => {
    const originalCss = globalThis.CSS;
    Object.defineProperty(globalThis, "CSS", {
      configurable: true,
      value: { supports: vi.fn().mockReturnValue(true) },
    });

    render(
      <>
        <MaskLink href="#projects" mask="urban">
          Explore systems
        </MaskLink>
        <MaskButton mask="forest">Copy</MaskButton>
      </>,
    );

    const link = screen.getByRole("link", { name: "Explore systems" });
    const button = screen.getByRole("button", { name: "Copy" });
    const linkFill = link.querySelector<HTMLElement>(".mask-action__fill");
    const buttonFill = button.querySelector<HTMLElement>(".mask-action__fill");

    expect(link).not.toHaveAttribute("data-mask-ready");
    expect(button).not.toHaveAttribute("data-mask-ready");
    expect(linkFill).not.toHaveAttribute("style");
    expect(buttonFill).not.toHaveAttribute("style");

    fireEvent.pointerEnter(link, { pointerType: "mouse" });
    expect(link).toHaveAttribute("data-mask-ready", "true");
    expect(linkFill?.getAttribute("style")).toContain("mask-urban.png");
    expect(button).not.toHaveAttribute("data-mask-ready");

    fireEvent.focus(button);
    expect(button).toHaveAttribute("data-mask-ready", "true");
    expect(buttonFill?.getAttribute("style")).toContain("mask-forest.png");

    Object.defineProperty(globalThis, "CSS", { configurable: true, value: originalCss });
  });

  it("keeps a complete static action when motion is reduced", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as typeof window.matchMedia;

    render(<MaskButton mask="nature">Static action</MaskButton>);
    const button = screen.getByRole("button", { name: "Static action" });
    fireEvent.focus(button);
    fireEvent.pointerDown(button, { pointerType: "touch" });

    expect(button).not.toHaveAttribute("data-mask-ready");
    expect(button.querySelector(".mask-action__content")).toHaveTextContent("Static action");
    expect(button.querySelector(".mask-action__fill")).not.toHaveAttribute("style");

    window.matchMedia = originalMatchMedia;
  });

  it("keeps the native action usable when CSS masks are unsupported", () => {
    const originalCss = globalThis.CSS;
    Object.defineProperty(globalThis, "CSS", {
      configurable: true,
      value: { supports: vi.fn().mockReturnValue(false) },
    });

    render(<MaskLink href="#projects">Fallback action</MaskLink>);
    const link = screen.getByRole("link", { name: "Fallback action" });
    fireEvent.pointerEnter(link, { pointerType: "mouse" });

    expect(link).not.toHaveAttribute("data-mask-ready");
    expect(link.querySelector(".mask-action__content")).toHaveTextContent("Fallback action");
    expect(link.querySelector(".mask-action__fill")).not.toHaveAttribute("style");

    Object.defineProperty(globalThis, "CSS", { configurable: true, value: originalCss });
  });
});
