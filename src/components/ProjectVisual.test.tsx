import { render, screen } from "@testing-library/react";
import { projects } from "../data/projects";
import { ProjectVisual } from "./ProjectVisual";

describe("ProjectVisual", () => {
  it("renders void.chat as a layered architecture orbit", () => {
    const project = projects.find((item) => item.slug === "voidchat");
    expect(project).toBeDefined();

    const { container } = render(<ProjectVisual project={project!} />);

    expect(container.querySelectorAll('[data-slot="orbiting-circles"]')).toHaveLength(2);
    expect(container.querySelector('[data-orbit="outer"]')).toHaveStyle({ width: "306px", height: "306px" });
    expect(screen.getByText("Firebase")).toBeInTheDocument();
    expect(screen.getByText("Worker")).toBeInTheDocument();
    expect(screen.getByText("Persist")).toBeInTheDocument();
    expect(screen.getByText("Room")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("ONE ROOM / LIVE")).toBeInTheDocument();
  });
});
