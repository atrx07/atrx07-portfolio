import { fireEvent, render, screen } from "@testing-library/react";
import { ArchitecturePlayground } from "./ArchitecturePlayground";

describe("ArchitecturePlayground", () => {
  it("updates the explanation when a node is selected", () => {
    render(<ArchitecturePlayground onDiscover={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Rust orchestration" }));

    expect(screen.getByRole("heading", { name: "Rust orchestration" })).toBeInTheDocument();
    expect(screen.getByText(/Owns child processes/)).toBeInTheDocument();
  });

  it("moves between nodes with arrow keys", () => {
    render(<ArchitecturePlayground onDiscover={vi.fn()} />);

    const firstNode = screen.getByRole("button", { name: "React interface" });
    firstNode.focus();
    fireEvent.keyDown(firstNode, { key: "ArrowRight" });

    expect(screen.getByRole("button", { name: "Tauri IPC" })).toHaveFocus();
  });
});
