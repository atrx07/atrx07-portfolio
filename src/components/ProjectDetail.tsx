import { ArrowUpRight, Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project, VisitorMode } from "../types";
import { MaskLink } from "./godui/mask-button";
import { ProjectVisual } from "./ProjectVisual";

type Props = {
  project: Project | null;
  mode: VisitorMode;
  onClose: () => void;
};

export function ProjectDetail({ project, mode, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={project ? `${project.slug}-dialog-title` : undefined}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {project && (
        <div className="project-dialog-inner">
          <button
            type="button"
            className="dialog-close icon-button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close project details"
          >
            <X size={20} />
          </button>

          <div className="project-dialog-visual">
            <ProjectVisual project={project} />
          </div>

          <div className="project-dialog-copy">
            <div className="dialog-heading">
              <span className={`status status--${project.status}`}>{project.status}</span>
              <h2
                id={`${project.slug}-dialog-title`}
                className={project.name.length > 12 ? "dialog-title dialog-title--long" : "dialog-title"}
              >
                {project.name}
              </h2>
              <p>{project.summary}</p>
            </div>

            <div className="dialog-columns">
              <div>
                <h3>Proof points</h3>
                <ul className="proof-list">
                  {project.proofPoints.map((point) => (
                    <li key={point}>
                      <Check size={16} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Stack</h3>
                <div className="tech-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
            </div>

            {project.next && (
              <div className="next-block">
                <h3>Next checkpoint</h3>
                <p>{project.next}</p>
              </div>
            )}

            {mode !== "recruiter" && project.constraints && (
              <div className="constraint-block">
                <h3>Known constraints</h3>
                {project.constraints.map((constraint) => (
                  <p key={constraint}>{constraint}</p>
                ))}
              </div>
            )}

            {project.repoUrl && (
              <MaskLink
                className="button"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                mask="urban"
                variant="primary"
              >
                Open repository <ArrowUpRight size={18} />
              </MaskLink>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
