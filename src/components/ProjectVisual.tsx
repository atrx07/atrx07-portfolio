import type { Project } from "../types";
import { AgentFlow, type AgentFlowEdge, type AgentFlowNode } from "./godui/agent-flow";
import { OrbitingCircles } from "./godui/orbiting-circles";

type VoidNodeProps = {
  code: string;
  label: string;
  tone: "light" | "blue" | "red" | "green" | "neutral";
};

function VoidNode({ code, label, tone }: VoidNodeProps) {
  return (
    <span className="void-node" data-tone={tone}>
      <b>{code}</b>
      <small>{label}</small>
    </span>
  );
}

const traelyxFlowNodes: AgentFlowNode[] = [
  {
    id: "app",
    label: "Flutter app",
    sublabel: "accountless shell",
    icon: <span>UI</span>,
    status: "done",
    x: 110,
    y: 170,
  },
  {
    id: "bridge",
    label: "Native bridge",
    sublabel: "versioned contract",
    icon: <span>IPC</span>,
    status: "done",
    x: 330,
    y: 82,
  },
  {
    id: "drift",
    label: "Drift v1",
    sublabel: "local authority",
    icon: <span>DB</span>,
    status: "done",
    x: 330,
    y: 258,
  },
  {
    id: "recorder",
    label: "Recorder",
    sublabel: "M2 / disabled",
    icon: <span>GN</span>,
    status: "idle",
    x: 550,
    y: 82,
  },
  {
    id: "dna",
    label: "Drive DNA",
    sublabel: "planned evidence",
    icon: <span>DNA</span>,
    status: "idle",
    x: 550,
    y: 258,
  },
];

const traelyxLinearFlowNodes: AgentFlowNode[] = traelyxFlowNodes.map((node) => {
  if (node.id === "recorder") return { ...node, x: 550, y: 116 };
  if (node.id === "dna") return { ...node, x: 770, y: 170 };
  return node;
});

const traelyxFlowEdges: AgentFlowEdge[] = [
  { id: "app-bridge", from: "app", to: "bridge", curvature: 28, persist: true },
  { id: "app-drift", from: "app", to: "drift", curvature: -28, persist: true },
  { id: "bridge-recorder", from: "bridge", to: "recorder", animated: false },
  { id: "drift-dna", from: "drift", to: "dna", animated: false },
  { id: "recorder-dna", from: "recorder", to: "dna", animated: false, curvature: -58 },
];

const traelyxLinearFlowEdges: AgentFlowEdge[] = traelyxFlowEdges.map((edge) => {
  if (edge.id === "drift-dna") return { ...edge, curvature: -34 };
  if (edge.id === "recorder-dna") return { ...edge, curvature: 34 };
  return edge;
});

const avelineFlowNodes: AgentFlowNode[] = [
  {
    id: "message",
    label: "Message",
    sublabel: "Baileys ingress",
    icon: <span>IN</span>,
    x: 110,
    y: 160,
  },
  {
    id: "mood",
    label: "Mood",
    sublabel: "tone + group context",
    icon: <span>MD</span>,
    x: 310,
    y: 76,
  },
  {
    id: "memory",
    label: "Memory",
    sublabel: "Upstash Redis",
    icon: <span>DB</span>,
    x: 310,
    y: 244,
  },
  {
    id: "inference",
    label: "Inference",
    sublabel: "Groq fallback",
    icon: <span>AI</span>,
    x: 520,
    y: 160,
  },
  {
    id: "reply",
    label: "Reply",
    sublabel: "state-aware output",
    icon: <span>OUT</span>,
    x: 520,
    y: 328,
  },
];

const avelineLinearFlowNodes: AgentFlowNode[] = avelineFlowNodes.map((node) =>
  node.id === "reply" ? { ...node, x: 730, y: 160 } : node,
);

const avelineFlowEdges: AgentFlowEdge[] = [
  { id: "message-mood", from: "message", to: "mood", curvature: 24, persist: true },
  { id: "message-memory", from: "message", to: "memory", curvature: -24, persist: true },
  { id: "mood-inference", from: "mood", to: "inference", curvature: -24, persist: true },
  { id: "memory-inference", from: "memory", to: "inference", curvature: 24, persist: true },
  { id: "inference-reply", from: "inference", to: "reply", curvature: -104, persist: true },
];

const avelineLinearFlowEdges: AgentFlowEdge[] = avelineFlowEdges.map((edge) =>
  edge.id === "inference-reply" ? { ...edge, curvature: 0 } : edge,
);

type ProjectVisualProps = {
  project: Project;
  compact?: boolean;
  avelineLayout?: "stacked" | "linear";
  traelyxLayout?: "stacked" | "linear";
};

export function ProjectVisual({
  project,
  compact = false,
  avelineLayout = "stacked",
  traelyxLayout = "stacked",
}: ProjectVisualProps) {
  if (project.visual === "telemetry") {
    const flowNodes = traelyxLayout === "linear" ? traelyxLinearFlowNodes : traelyxFlowNodes;
    const flowEdges = traelyxLayout === "linear" ? traelyxLinearFlowEdges : traelyxFlowEdges;

    return (
      <div className="project-visual telemetry-visual" aria-hidden="true">
        <div className="traelyx-flow-shell">
          <div className="traelyx-flow-header">
            <span className="traelyx-flow-brand">
              <img src="/traelyx-mark.png" alt="" width="192" height="192" />
              <b>TRAELYX / TRUST PATH</b>
            </span>
            <i>
              <b /> M0 VALIDATED
            </i>
          </div>

          <img
            className="traelyx-flow-mark"
            src="/traelyx-mark.png"
            alt=""
            width="192"
            height="192"
          />

          <AgentFlow
            key={`${compact ? "compact" : "full"}-${traelyxLayout}`}
            className="traelyx-agent-flow"
            data-layout={traelyxLayout}
            nodes={flowNodes}
            edges={flowEdges}
            draggable={false}
            pannable={false}
            fitView
            fitViewMaxScale={traelyxLayout === "linear" ? 1.16 : 1}
            flowDuration={2.8}
            aria-label="Traelyx validated Flutter, native bridge, and local database foundation with planned recorder and Drive DNA stages"
          />

          <div className="traelyx-flow-footer">
            <span>LOCAL FIRST</span>
            <strong>FOUNDATION LIVE / RECORDER DISABLED</strong>
            <span>NEXT / M1</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "runtime") {
    return (
      <div className={`project-visual runtime-visual ${compact ? "is-compact" : ""}`} aria-hidden="true">
        <div className="visual-topline">
          <span>NEURALOC / RUNTIME</span>
          <i>LOCAL</i>
        </div>
        <div className="runtime-center">
          <div className="runtime-ring">
            <span>Q3</span>
          </div>
          <div className="runtime-bars">
            {[88, 62, 74, 43, 91].map((height, index) => (
              <i key={height} style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }} />
            ))}
          </div>
        </div>
        <div className="visual-footer">
          <span>GGUF VERIFIED</span>
          <span>NETWORK OFF</span>
        </div>
      </div>
    );
  }

  if (project.visual === "chat") {
    return (
      <div className="project-visual chat-visual" aria-hidden="true">
        <div className="void-visual__header">
          <span>VOID.CHAT / GLOBAL ROOM</span>
          <i>
            <b /> EDGE ONLINE
          </i>
        </div>

        <div className="void-orbit-frame">
          <div className="void-orbit-stage">
            <OrbitingCircles
              className="void-orbit-ring void-orbit-ring--outer"
              data-orbit="outer"
              radius={126}
              duration={34}
              reverse
              iconSize={54}
            >
              <VoidNode code="ID" label="Firebase" tone="light" />
              <VoidNode code="CF" label="Worker" tone="neutral" />
              <VoidNode code="D1" label="Persist" tone="red" />
            </OrbitingCircles>

            <OrbitingCircles
              className="void-orbit-ring void-orbit-ring--inner"
              data-orbit="inner"
              radius={76}
              duration={21}
              iconSize={46}
            >
              <VoidNode code="DO" label="Room" tone="blue" />
              <VoidNode code="WS" label="Live" tone="green" />
            </OrbitingCircles>

            <div className="void-core">
              <i />
              <strong>
                void<span>.chat</span>
              </strong>
              <small>ONE ROOM / LIVE</small>
            </div>
          </div>
        </div>

        <div className="void-visual__telemetry">
          <span>
            <i data-tone="light" /> VERIFIED ID
          </span>
          <strong>EDGE STATE / DURABLE LOG</strong>
          <span>
            <i data-tone="green" /> SOCKET LIVE
          </span>
        </div>
      </div>
    );
  }

  if (project.visual === "memory") {
    const flowNodes = avelineLayout === "linear" ? avelineLinearFlowNodes : avelineFlowNodes;
    const flowEdges = avelineLayout === "linear" ? avelineLinearFlowEdges : avelineFlowEdges;

    return (
      <div className="project-visual memory-visual" aria-hidden="true">
        <div className="aveline-flow-shell">
          <div className="aveline-flow-header">
            <span>AVELINE / MEMORY ROUTE</span>
            <i>
              <b /> STATE PERSISTENT
            </i>
          </div>

          <AgentFlow
            key={`${compact ? "compact" : "full"}-${avelineLayout}`}
            className="aveline-agent-flow"
            data-layout={avelineLayout}
            nodes={flowNodes}
            edges={flowEdges}
            draggable={false}
            pannable={false}
            fitView
            fitViewMaxScale={avelineLayout === "linear" ? 1.28 : 1}
            autoPlay={!compact}
            continuous
            flowSpeed={250}
            aria-label="Aveline message, mood, memory, inference, and reply flow"
          />

          <div className="aveline-flow-footer">
            <span>PER-USER STATE</span>
            <strong>MOOD + MEMORY / RESILIENT INFERENCE</strong>
            <span>FALLBACK READY</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "sequencer") {
    return (
      <div className="project-visual sequencer-visual" aria-hidden="true">
        {Array.from({ length: 32 }, (_, index) => (
          <i key={index} className={[2, 7, 12, 18, 21, 27, 30].includes(index) ? "is-hit" : ""} />
        ))}
      </div>
    );
  }

  if (project.visual === "security") {
    return (
      <div className="project-visual security-visual" aria-hidden="true">
        <span>AI REVIEW / HUMAN VERIFY</span>
        <div>
          <i />
          <i />
          <i />
          <i />
        </div>
        <strong>NOT A SCANNER ENGINE</strong>
      </div>
    );
  }

  return (
    <div className="project-visual mobile-visual" aria-hidden="true">
      <div className="phone-shell">
        <i />
        <span className="phone-input">PASTE LINK</span>
        <span className="phone-action">DOWNLOAD</span>
      </div>
    </div>
  );
}
