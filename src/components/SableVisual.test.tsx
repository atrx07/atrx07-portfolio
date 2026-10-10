import { fireEvent, render, screen } from "@testing-library/react";
import { SableVisual } from "./SableVisual";

describe("Sable's portfolio explanation", () => {
  it("withholds a verified verdict for missing and blocked required checks", () => {
    render(<SableVisual interactive />);
    expect(screen.getByText("VERIFIED")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Tool missing" }));
    expect(screen.getAllByText("INCOMPLETE")).toHaveLength(2);
    expect(screen.queryByText("VERIFIED")).not.toBeInTheDocument();
    expect(screen.getByText(/Missing tools do not trigger model repair/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Policy blocks" }));
    expect(screen.getAllByText("BLOCKED")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Policy blocks" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/model output cannot override/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Checks pass" }));
    expect(screen.getByText("VERIFIED")).toBeInTheDocument();
  });

  it("preserves a later user edit independently of the verification verdict", () => {
    render(<SableVisual interactive />);
    const edit = screen.getByRole("button", { name: /Later user edit/ });
    fireEvent.click(edit);
    expect(screen.getByText("LATER EDIT PRESERVED")).toBeInTheDocument();
    expect(screen.getByText(/preserves the newer user edit/)).toBeInTheDocument();
    expect(screen.getByText("VERIFIED")).toBeInTheDocument();
    expect(edit).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(edit);
    expect(screen.getByText("RESTORE AVAILABLE")).toBeInTheDocument();
    expect(screen.getByText("Interactive explanation. No code executes.")).toBeInTheDocument();
  });

  it("keeps the accordion timeline decorative and leaves controls to the detail view", () => {
    const { container } = render(<SableVisual compact />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container).toHaveTextContent("DOCUMENTED FIXTURE / EXPECTED BEHAVIOR");
    expect(container.querySelectorAll('[data-slot="agent-step"]')).toHaveLength(5);
    expect(container.querySelector('[data-status="running"]')).toBeNull();
    expect(container.firstChild).not.toHaveClass("has-timeline-reveal");
  });

  it("restarts presentation motion on expansion without fabricating execution status", () => {
    const { container, rerender } = render(<SableVisual compact />);
    rerender(<SableVisual />);
    expect(container.firstChild).toHaveClass("has-timeline-reveal");
    const steps = container.querySelectorAll('[data-slot="agent-step"]');
    steps.forEach((step, index) => {
      expect(step).toHaveStyle({ "--sable-step-index": String(index) });
      expect(step).toHaveAttribute("data-status", "success");
    });
    rerender(<SableVisual compact />);
    expect(container.firstChild).not.toHaveClass("has-timeline-reveal");
    rerender(<SableVisual />);
    expect(container.firstChild).toHaveClass("has-timeline-reveal");
    rerender(<SableVisual interactive />);
    expect(container.firstChild).not.toHaveClass("has-timeline-reveal");
  });

  it("expands real contract details and derives check-step state from the selected outcome", () => {
    const { container } = render(<SableVisual interactive />);
    const context = screen.getByRole("button", { name: /Gather context/ });
    expect(context).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(context);
    expect(context).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Selected context is sent to hosted Groq inference/)).toBeInTheDocument();
    const checkStep = container.querySelectorAll('[data-slot="agent-step"]')[3];
    expect(checkStep).toHaveAttribute("data-status", "success");
    fireEvent.click(screen.getByRole("button", { name: "Tool missing" }));
    expect(checkStep).toHaveAttribute("data-status", "pending");
    fireEvent.click(screen.getByRole("button", { name: "Policy blocks" }));
    expect(checkStep).toHaveAttribute("data-status", "error");
    expect(container.querySelector('[data-status="running"]')).toBeNull();
  });
});
