import type { Project } from "../types";

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
        <div className="void-orbit">
          <i />
          <i />
          <i />
          <strong>void.chat</strong>
        </div>
        <div className="message-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (project.visual === "memory") {
    return (
      <div className="project-visual memory-visual" aria-hidden="true">
        <div className="memory-column">
          <span>MESSAGE</span>
          <i />
          <span>MOOD</span>
          <i />
          <span>MEMORY</span>
          <i />
          <span>REPLY</span>
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
        <span>PASTE LINK</span>
        <button tabIndex={-1}>DOWNLOAD</button>
      </div>
    </div>
  );
}
