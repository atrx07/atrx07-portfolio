import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./router";

describe("application route tree", () => {
  it("loads the interactive portfolio through the route boundary", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    const heading = await screen.findByRole(
      "heading",
      {
        level: 1,
        name: /USEFUL SYSTEMS AT THE EDGE OF PRACTICAL AND UNUSUAL/i,
      },
      { timeout: 5_000 },
    );
    expect(heading).toHaveAttribute("data-route-heading");
    expect(screen.getAllByRole("main")).toHaveLength(1);
  });

  it("renders the honest Field Notes foundation at /blog", () => {
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "FIELD NOTES" })).toBeInTheDocument();
    expect(screen.getByText(/No filler posts/)).toBeInTheDocument();
    expect(screen.getByText("00 / PUBLIC NOTES")).toBeInTheDocument();
  });

  it("loads the local draft only through the explicit development preview route", async () => {
    render(
      <MemoryRouter initialEntries={["/blog/registry-fixture?preview=draft"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { level: 1, name: "Registry fixture" })).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent("Local draft preview");
    expect(await screen.findByRole("heading", { level: 2, name: "Pipeline proof" })).toBeInTheDocument();
  });

  it("keeps the local draft fixture out of direct public route resolution", () => {
    render(
      <MemoryRouter initialEntries={["/blog/registry-fixture"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "FIELD NOTE NOT FOUND" })).toBeInTheDocument();
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
