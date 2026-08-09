import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header route awareness", () => {
  it("uses route-plus-fragment links and hides portfolio-only telemetry on blog routes", () => {
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "ATRX07 home" })).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("link", { name: "Projects" })[0]).toHaveAttribute("href", "/#projects");
    expect(screen.getAllByRole("link", { name: "Field Notes" })[0]).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.queryByText("0/7 found")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Open command palette" })).not.toBeInTheDocument();
  });

  it("preserves local anchors and portfolio controls on the home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header
          mode="recruiter"
          onModeChange={vi.fn()}
          onOpenPalette={vi.fn()}
          muted
          onToggleMuted={vi.fn()}
          discoveredCount={3}
          showPortfolioControls
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "ATRX07 home" })).toHaveAttribute("href", "#top");
    expect(screen.getAllByRole("link", { name: "Projects" })[0]).toHaveAttribute("href", "#projects");
    expect(screen.getByText("3/7 found")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open command palette" })).toBeInTheDocument();
  });
});
