import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { RouteEffects } from "./RouteEffects";

function DelayedDestination({ fragment = false }: { fragment?: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 10);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!ready) {
    return (
      <main>
        <h1>Loading route</h1>
      </main>
    );
  }

  return (
    <main>
      {fragment ? (
        <section id="projects">Project destination</section>
      ) : (
        <h1 data-route-heading tabIndex={-1}>
          Portfolio destination
        </h1>
      )}
    </main>
  );
}

describe("RouteEffects", () => {
  it("resolves a homepage fragment after the destination route mounts", async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as typeof window.matchMedia;

    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <RouteEffects />
        <Routes>
          <Route path="/blog" element={<Link to="/#projects">Projects</Link>} />
          <Route path="/" element={<DelayedDestination fragment />} />
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

  it("waits for the real route heading instead of focusing a temporary loading shell", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <RouteEffects />
        <Routes>
          <Route path="/blog" element={<Link to="/">Portfolio</Link>} />
          <Route path="/" element={<DelayedDestination />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Portfolio" }));
    expect(screen.getByRole("heading", { name: "Loading route" })).not.toHaveFocus();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Portfolio destination" })).toHaveFocus();
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
    });

    scrollTo.mockRestore();
  });
});
