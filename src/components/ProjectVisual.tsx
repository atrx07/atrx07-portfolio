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

const avelineFlowEdges: AgentFlowEdge[] = [
  { id: "message-mood", from: "message", to: "mood", curvature: 24, persist: true },
  { id: "message-memory", from: "message", to: "memory", curvature: -24, persist: true },
  { id: "mood-inference", from: "mood", to: "inference", curvature: -24, persist: true },
  { id: "memory-inference", from: "memory", to: "inference", curvature: 24, persist: true },
  { id: "inference-reply", from: "inference", to: "reply", curvature: -104, persist: true },
];

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
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
            key={compact ? "aveline-flow-compact" : "aveline-flow-full"}
            className="aveline-agent-flow"
            nodes={avelineFlowNodes}
            edges={avelineFlowEdges}
            draggable={false}
            pannable={false}
            fitView
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
