import { fireEvent, render, screen, within } from "@testing-library/react";
import { ProjectLab } from "./ProjectLab";

describe("ProjectLab", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("filters projects by category without removing the active filter", () => {
    render(
      <ProjectLab
        mode="recruiter"
        onDiscover={vi.fn()}
        requestedProject={null}
        onRequestedProjectHandled={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Music tech" }));

    expect(screen.getByRole("button", { name: /Open StyleForge Lite/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Open void.chat/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Music tech" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Open StyleForge Lite/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("keeps mobile cards closed until tapped and opens details only from Inspect system", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        addEventListener: vi.fn(),
        addListener: vi.fn(),
        dispatchEvent: vi.fn(),
        matches: query === "(max-width: 900px)",
        media: query,
        onchange: null,
        removeEventListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    );

    render(
      <ProjectLab
        mode="recruiter"
        onDiscover={vi.fn()}
        requestedProject={null}
        onRequestedProjectHandled={vi.fn()}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Expand NeuraLoc-Core project card" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog", { name: /NeuraLoc-Core/ })).not.toBeInTheDocument();

    fireEvent.click(toggle);

    const expandedToggle = screen.getByRole("button", {
      name: "Collapse NeuraLoc-Core project card",
    });
    expect(expandedToggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.queryByRole("dialog", { name: /NeuraLoc-Core/ })).not.toBeInTheDocument();

    const card = expandedToggle.closest("article");
    expect(card).not.toBeNull();
    fireEvent.click(within(card as HTMLElement).getByRole("button", { name: "Inspect system" }));

    expect(screen.getByRole("dialog", { name: /NeuraLoc-Core/ })).toBeInTheDocument();
  });
});
