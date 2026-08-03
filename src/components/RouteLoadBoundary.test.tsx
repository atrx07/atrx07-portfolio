import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RouteLoadBoundary, RouteLoadingPage } from "./RouteLoadBoundary";

function BrokenRoute(): never {
  throw new Error("route chunk failed");
}

describe("RouteLoadBoundary", () => {
  it("renders a stable, accessible loading shell without claiming route focus", () => {
    render(
      <MemoryRouter>
        <RouteLoadingPage />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "ASSEMBLING PORTFOLIO" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Portfolio systems in transit");
    expect(document.querySelector("[data-route-heading]")).not.toBeInTheDocument();
  });

  it("offers a quiet recovery surface when the route cannot load", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <MemoryRouter>
        <RouteLoadBoundary>
          <BrokenRoute />
        </RouteLoadBoundary>
      </MemoryRouter>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Reload the route once");
    expect(screen.getByRole("button", { name: "Reload portfolio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open Field Notes" })).toHaveAttribute("href", "/blog");
    consoleError.mockRestore();
  });
});
