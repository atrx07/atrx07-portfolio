import { fireEvent, render, screen } from "@testing-library/react";
import { SableVisual } from "./SableVisual";

describe("Sable's portfolio explanation", () => {
  it("withholds a verified verdict for missing and blocked required checks", () => {
    render(<SableVisual interactive />);
    expect(screen.getByText("VERIFIED")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Tool missing" }));
    expect(screen.getByText("INCOMPLETE")).toBeInTheDocument();
    expect(screen.queryByText("VERIFIED")).not.toBeInTheDocument();
    expect(screen.getByText(/Missing tools do not trigger model repair/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Policy blocks" }));
    expect(screen.getByText("BLOCKED")).toBeInTheDocument();
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

  it("keeps the accordion receipt decorative and leaves controls to the detail view", () => {
    const { container } = render(<SableVisual compact />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container).toHaveTextContent("DOCUMENTED FIXTURE / EXPECTED BEHAVIOR");
  });
});
