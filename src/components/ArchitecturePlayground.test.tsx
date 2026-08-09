import { fireEvent, render, screen } from "@testing-library/react";
import { ArchitecturePlayground } from "./ArchitecturePlayground";

describe("ArchitecturePlayground", () => {
  it("updates the explanation when a node is selected", () => {
    render(<ArchitecturePlayground onDiscover={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Kotlin recorder boundary" }));

    expect(screen.getByRole("heading", { name: "Kotlin recorder boundary" })).toBeInTheDocument();
    expect(screen.getByText(/versioned native bridge/)).toBeInTheDocument();
  });

  it("moves between nodes with arrow keys", () => {
    render(<ArchitecturePlayground onDiscover={vi.fn()} />);

    const firstNode = screen.getByRole("button", { name: "Flutter app" });
    firstNode.focus();
    fireEvent.keyDown(firstNode, { key: "ArrowRight" });

    expect(screen.getByRole("button", { name: "Kotlin recorder boundary" })).toHaveFocus();
  });
});
