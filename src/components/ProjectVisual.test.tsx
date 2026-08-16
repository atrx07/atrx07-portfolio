import { render, screen } from "@testing-library/react";
import { projects } from "../data/projects";
import { ProjectVisual } from "./ProjectVisual";

describe("ProjectVisual", () => {
  it("renders Traelyx as a verified local telemetry pipeline instead of an agent flow", () => {
    const project = projects.find((item) => item.slug === "traelyx");
    expect(project).toBeDefined();

    const { container } = render(<ProjectVisual project={project!} />);
    const visual = container.querySelector('[data-visual="traelyx-telemetry-pipeline"]');

    expect(visual).toBeInTheDocument();
    expect(container.querySelector('[data-slot="agent-flow"]')).not.toBeInTheDocument();
    expect(container.querySelectorAll("[data-channel]")).toHaveLength(3);
    expect(container.querySelector('[data-channel="gnss"]')).toHaveTextContent("sanity filtered");
    expect(container.querySelector('[data-channel="accelerometer"]')).toHaveTextContent(
      "calibrated / framed",
    );
    expect(container.querySelectorAll(".traelyx-chunk-strip i")).toHaveLength(12);
    expect(screen.getByText("39:17")).toBeInTheDocument();
    expect(screen.getByText("locked ride / exact archive verification")).toBeInTheDocument();
    expect(container.querySelectorAll('[data-state="verified"]')).toHaveLength(7);
    expect(screen.getByText("CONFIDENCE")).toBeInTheDocument();
    expect(screen.getByText("REDUCE")).toBeInTheDocument();
    expect(container.querySelector('.traelyx-recorder-brand img')).toHaveAttribute(
      "src",
      "/traelyx-mark.png",
    );
  });

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

  it("renders Aveline as a fixed agent flow with grounded architecture nodes", () => {
    const project = projects.find((item) => item.slug === "aveline");
    expect(project).toBeDefined();

    const { container, rerender } = render(<ProjectVisual project={project!} />);
    const flow = container.querySelector('[data-slot="agent-flow"]');

    expect(flow).toHaveAttribute("data-draggable", "false");
    expect(flow).toHaveAttribute("data-pannable", "false");
    expect(flow).toHaveAttribute("data-layout", "stacked");
    expect(flow).toHaveAttribute("data-fit-view-max-scale", "1");
    expect(container.querySelectorAll("[data-node-id]")).toHaveLength(5);
    expect(container.querySelector('[data-node-id="memory"]')).toHaveTextContent("Upstash Redis");
    expect(container.querySelector('[data-node-id="inference"]')).toHaveTextContent("Groq fallback");
    expect(container.querySelector('[data-node-id="reply"]')).toHaveStyle({ left: "520px", top: "328px" });
    expect(screen.getByText("MOOD + MEMORY / RESILIENT INFERENCE")).toBeInTheDocument();

    rerender(<ProjectVisual project={project!} avelineLayout="linear" />);

    expect(container.querySelector('[data-slot="agent-flow"]')).toHaveAttribute("data-layout", "linear");
    expect(container.querySelector('[data-slot="agent-flow"]')).toHaveAttribute(
      "data-fit-view-max-scale",
      "1.28",
    );
    expect(container.querySelector('[data-node-id="reply"]')).toHaveStyle({ left: "730px", top: "160px" });
  });
});
