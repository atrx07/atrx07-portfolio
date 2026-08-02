import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { RouteEffects } from "./RouteEffects";

describe("RouteEffects", () => {
  it("resolves a homepage fragment after the destination route mounts", async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as typeof window.matchMedia;

    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <RouteEffects />
        <Routes>
          <Route path="/blog" element={<Link to="/#projects">Projects</Link>} />
          <Route
            path="/"
            element={
              <main>
                <section id="projects">Project destination</section>
              </main>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Projects" }));

    await waitFor(() => {
      expect(screen.getByText("Project destination")).toHaveFocus();
      expect(screen.getByText("Project destination").scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      });
    });

    window.matchMedia = originalMatchMedia;
  });
});
