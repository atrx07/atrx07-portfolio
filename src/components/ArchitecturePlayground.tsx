import { useMemo, useState } from "react";
import { architectureProjects } from "../data/projects";

type Props = {
  onDiscover: (slug: string) => void;
};

export function ArchitecturePlayground({ onDiscover }: Props) {
  const [projectSlug, setProjectSlug] = useState(architectureProjects[0].slug);
  const project = useMemo(
    () => architectureProjects.find((item) => item.slug === projectSlug) ?? architectureProjects[0],
    [projectSlug],
  );
  const [nodeId, setNodeId] = useState(project.architecture?.[0].id ?? "");

  const activeNode =
    project.architecture?.find((node) => node.id === nodeId) ?? project.architecture?.[0];

  const selectProject = (slug: string) => {
    const nextProject = architectureProjects.find((item) => item.slug === slug);
    setProjectSlug(slug);
    setNodeId(nextProject?.architecture?.[0].id ?? "");
    onDiscover(slug);
  };

  const onNodeKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!project.architecture || !["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + direction + project.architecture.length) % project.architecture.length;
    const nextNode = project.architecture[nextIndex];
    setNodeId(nextNode.id);
    document.getElementById(`architecture-node-${nextNode.id}`)?.focus();
  };

  return (
    <section
      id="architecture"
      className="architecture-playground section-shell"
      aria-labelledby="architecture-title"
    >
      <div className="section-heading section-heading--wide" data-reveal>
        <p className="eyebrow">Architecture playground</p>
        <h2 id="architecture-title">FOLLOW THE STATE. FIND THE RESPONSIBILITY.</h2>
        <p>
          Four systems, reduced to the boundaries that matter. Focus, hover, or select a node to inspect its
          job.
        </p>
      </div>

      <div className="architecture-project-tabs" role="tablist" aria-label="Architecture project">
        {architectureProjects.map((item) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={project.slug === item.slug}
            className={project.slug === item.slug ? "is-active" : ""}
            onClick={() => selectProject(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="architecture-stage">
        <div className="architecture-flow" role="list" aria-label={`${project.name} architecture nodes`}>
          {project.architecture?.map((node, index) => (
            <div className="architecture-node-wrap" key={node.id} role="listitem">
              <button
                id={`architecture-node-${node.id}`}
                type="button"
                aria-label={node.label}
                className={`architecture-node signal-${node.signal} ${
                  activeNode?.id === node.id ? "is-active" : ""
                }`}
                aria-pressed={activeNode?.id === node.id}
                onMouseEnter={() => setNodeId(node.id)}
                onFocus={() => setNodeId(node.id)}
                onClick={() => setNodeId(node.id)}
                onKeyDown={(event) => onNodeKeyDown(event, index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{node.label}</strong>
              </button>
              {index < (project.architecture?.length ?? 0) - 1 && (
                <div className="flow-line" aria-hidden="true">
                  <i />
                </div>
              )}
            </div>
          ))}
        </div>

        <aside className="architecture-detail" aria-live="polite">
          <span>Responsibility / {project.name}</span>
          <h3>{activeNode?.label}</h3>
          <p>{activeNode?.detail}</p>
          <div className="architecture-stack">
            {project.technologies.slice(0, 5).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
