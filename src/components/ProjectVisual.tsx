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
};

export function ProjectVisual({
  project,
  compact = false,
  avelineLayout = "stacked",
}: ProjectVisualProps) {
  if (project.visual === "telemetry") {
    return (
      <div
        className={`project-visual telemetry-visual ${compact ? "is-compact" : ""}`}
        data-visual="traelyx-telemetry-pipeline"
        aria-hidden="true"
      >
        <div className="traelyx-recorder-shell">
          <div className="traelyx-recorder-header">
            <span className="traelyx-recorder-brand">
              <img src="/traelyx-mark.png" alt="" width="192" height="192" />
              <b>TRAELYX / LOCAL TELEMETRY PIPELINE</b>
            </span>
            <i>
              <b /> M3.7 VERIFIED
            </i>
          </div>

          <div className="traelyx-recorder-body">
            <div className="traelyx-signal-bank">
              <div className="traelyx-signal-meta">
                <span>SCHEMATIC / NOT LIVE</span>
                <strong>DETERMINISTIC / FAIL-CLOSED</strong>
              </div>

              <div className="traelyx-channel" data-channel="gnss">
                <span><b>GNSS</b><small>sanity filtered</small></span>
                <svg viewBox="0 0 620 54" preserveAspectRatio="none">
                  <path className="traelyx-channel-grid" d="M0 27H620" />
                  <path className="traelyx-channel-trace" d="M0 30 L48 30 L70 18 L92 34 L126 30 L180 30 L205 12 L228 42 L252 29 L310 29 L334 20 L356 36 L402 29 L458 29 L482 16 L510 39 L538 28 L620 28" />
                </svg>
              </div>

              <div className="traelyx-channel" data-channel="accelerometer">
                <span><b>ACC</b><small>calibrated / framed</small></span>
                <svg viewBox="0 0 620 54" preserveAspectRatio="none">
                  <path className="traelyx-channel-grid" d="M0 27H620" />
                  <path className="traelyx-channel-trace" d="M0 28 L20 24 L38 32 L58 18 L76 39 L96 22 L116 31 L138 26 L160 29 L184 16 L204 41 L226 24 L248 30 L270 21 L292 36 L316 25 L338 30 L360 19 L382 38 L406 24 L430 30 L454 20 L478 36 L502 25 L526 31 L550 18 L574 38 L598 25 L620 28" />
                </svg>
              </div>

              <div className="traelyx-channel" data-channel="gyroscope">
                <span><b>GYRO</b><small>derived / corroborated</small></span>
                <svg viewBox="0 0 620 54" preserveAspectRatio="none">
                  <path className="traelyx-channel-grid" d="M0 27H620" />
                  <path className="traelyx-channel-trace" d="M0 29 C24 8 44 46 68 27 S112 10 138 29 S184 44 208 27 S252 8 278 29 S324 45 348 27 S392 11 418 29 S462 43 488 27 S534 9 558 29 S598 42 620 27" />
                </svg>
              </div>

              <div className="traelyx-chunk-strip">
                <span>M2 FIELD FIXTURE</span>
                <div>
                  {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
                </div>
                <strong>39:17 / 3,689 CHUNKS</strong>
              </div>
            </div>

            <aside className="traelyx-proof-ledger">
              <span>ACCEPTED PRIVATE FIXTURE</span>
              <strong>39:17</strong>
              <small>locked ride / exact archive verification</small>
              <dl>
                <div><dt>RAW RECORD</dt><dd>3,689 CHUNKS</dd></div>
                <div><dt>GNSS</dt><dd>2,322 FIXES</dd></div>
                <div><dt>DUAL IMU</dt><dd>939,895 SAMPLES</dd></div>
              </dl>
              <em>ONE ANDROID 14 DEVICE</em>
            </aside>
          </div>

          <div className="traelyx-lifecycle" aria-label="Verified local telemetry processing stages">
            {[
              ["01", "DECODE"],
              ["02", "FILTER"],
              ["03", "CALIBRATE"],
              ["04", "TRANSFORM"],
              ["05", "DERIVE"],
              ["06", "CONFIDENCE"],
              ["07", "REDUCE"],
            ].map(([step, label]) => (
              <span key={step} data-state="verified"><b>{step}</b>{label}</span>
            ))}
          </div>

          <div className="traelyx-recorder-footer">
            <span>LOCAL ONLY</span>
            <strong>NO GLOBAL SCORE / EVIDENCE STAYS EXPLAINABLE</strong>
            <span>NEXT / M3.8 FIXTURES</span>
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
