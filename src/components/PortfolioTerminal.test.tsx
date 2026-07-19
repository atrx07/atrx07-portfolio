import { fireEvent, render, screen } from "@testing-library/react";
import { PortfolioTerminal } from "./PortfolioTerminal";

describe("PortfolioTerminal", () => {
  it("runs commands and recalls command history", () => {
    render(
      <PortfolioTerminal
        onModeChange={vi.fn()}
        onSignal={vi.fn()}
        onPlaySignal={() => false}
        onDiscover={vi.fn()}
      />,
    );

    const input = screen.getByLabelText("Portfolio terminal command");
    fireEvent.change(input, { target: { value: "about" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByRole("log")).toHaveTextContent("Arppith Andrews");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("about");
  });

  it("supports tab completion", () => {
    render(
      <PortfolioTerminal
        onModeChange={vi.fn()}
        onSignal={vi.fn()}
        onPlaySignal={() => false}
        onDiscover={vi.fn()}
      />,
    );

    const input = screen.getByLabelText("Portfolio terminal command");
    fireEvent.change(input, { target: { value: "project neur" } });
    fireEvent.keyDown(input, { key: "Tab" });

    expect(input).toHaveValue("project neuraloc");
  });
});
