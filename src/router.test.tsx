import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./router";

describe("application route tree", () => {
  it("renders the honest Field Notes foundation at /blog", () => {
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "FIELD NOTES" })).toBeInTheDocument();
    expect(screen.getByText(/No filler posts/)).toBeInTheDocument();
  });

  it("treats unknown article slugs as unpublished", () => {
    render(
      <MemoryRouter initialEntries={["/blog/unpublished-note"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "FIELD NOTE NOT FOUND" })).toBeInTheDocument();
    expect(screen.getByText(/\/blog\/unpublished-note/)).toBeInTheDocument();
  });

  it("renders a deliberate recovery page for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/missing-system"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "SIGNAL LOST / 404" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Return home/ })).toHaveAttribute("href", "/");
  });
});
