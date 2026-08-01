import { render, screen } from "@testing-library/react";
import { AgentFlow, type AgentFlowEdge, type AgentFlowNode } from "./agent-flow";

const nodes: AgentFlowNode[] = [
  { id: "input", label: "Input", x: 100, y: 100, status: "done" },
  { id: "output", label: "Output", x: 320, y: 100, status: "idle" },
];

const edges: AgentFlowEdge[] = [
  { id: "input-output", from: "input", to: "output", animated: false },
];

describe("AgentFlow", () => {
  it("exposes a fixed workflow without drag or pan affordances", () => {
    const { container } = render(
      <AgentFlow
        aria-label="Fixed agent route"
        nodes={nodes}
        edges={edges}
        draggable={false}
        pannable={false}
        fitView={false}
      />,
    );

    const flow = screen.getByRole("group", { name: "Fixed agent route" });
    expect(flow).toHaveAttribute("data-draggable", "false");
    expect(flow).toHaveAttribute("data-pannable", "false");
    expect(flow).not.toHaveClass("cursor-grab");
    expect(container.querySelectorAll("[data-node-id]")).toHaveLength(2);
    expect(container.querySelector('[data-node-id="input"]')).toHaveAttribute("data-status", "done");
  });
});
