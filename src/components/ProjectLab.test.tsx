import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectLab } from "./ProjectLab";

describe("ProjectLab", () => {
  it("filters projects by category without removing the active filter", () => {
    render(
      <ProjectLab
        mode="recruiter"
        onDiscover={vi.fn()}
        requestedProject={null}
        onRequestedProjectHandled={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Music tech" }));

    expect(screen.getByRole("button", { name: /Open StyleForge Lite/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Open void.chat/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Music tech" })).toHaveAttribute("aria-pressed", "true");
  });
});
