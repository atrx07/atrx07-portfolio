import { fireEvent, render, screen } from "@testing-library/react";
import { ArchitecturePlayground } from "./ArchitecturePlayground";

describe("ArchitecturePlayground", () => {
  it("updates the explanation when a node is selected", () => {
    render(<ArchitecturePlayground onDiscover={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Analysis timeline" }));

    expect(screen.getByRole("heading", { name: "Analysis timeline" })).toBeInTheDocument();
    expect(screen.getByText(/deterministic monotonic analysis timebase/)).toBeInTheDocument();
  });

  it("moves between nodes with arrow keys", () => {
    render(<ArchitecturePlayground onDiscover={vi.fn()} />);

    const firstNode = screen.getByRole("button", { name: "Native evidence" });
    firstNode.focus();
    fireEvent.keyDown(firstNode, { key: "ArrowRight" });

    expect(screen.getByRole("button", { name: "Analysis timeline" })).toHaveFocus();
  });
});
