import { ArrowUpRight, Expand } from "lucide-react";
import { useMemo, useState } from "react";
import { projectCategories, projects } from "../data/projects";
import type { Project, VisitorMode } from "../types";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectVisual } from "./ProjectVisual";

type Props = {
  mode: VisitorMode;
  onDiscover: (slug: string) => void;
  requestedProject: Project | null;
  onRequestedProjectHandled: () => void;
};

export function ProjectLab({
  mode,
  onDiscover,
  requestedProject,
  onRequestedProjectHandled,
}: Props) {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedSlug, setExpandedSlug] = useState("neuraloc");

  const visibleProjects = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(category)),
    [category],
  );

  const activeProject = requestedProject ?? selectedProject;

  const openProject = (project: Project) => {
    setSelectedProject(project);
    onDiscover(project.slug);
  };

  const closeProject = () => {
    setSelectedProject(null);
    onRequestedProjectHandled();
  };

  return (
    <section id="projects" className="project-lab section-shell" aria-labelledby="projects-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Selected systems</p>
        <h2 id="projects-title">
          BUILT TO MOVE <span className="inline-system-image" aria-hidden="true">LIVE</span> BEYOND THE DEMO.
        </h2>
        <p>
          Six projects, each with a different failure surface. Select one to inspect what is real, what is
          experimental, and what still needs work.
        </p>
      </div>

      <div className="project-filters" aria-label="Filter projects">
        {projectCategories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? "is-active" : ""}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="project-accordions" data-count={visibleProjects.length}>
        {visibleProjects.map((project) => {
          const expanded = expandedSlug === project.slug;
          return (
            <article
              key={project.slug}
              className={expanded ? "project-slice is-expanded" : "project-slice"}
              onMouseEnter={() => setExpandedSlug(project.slug)}
              onFocus={() => setExpandedSlug(project.slug)}
            >
              <button
                className="project-slice-hit"
                type="button"
                onClick={() => {
                  setExpandedSlug(project.slug);
                  openProject(project);
                }}
                aria-label={`Open ${project.name} project details`}
              >
                <span className={`status status--${project.status}`}>{project.status}</span>
                <span className="project-index">
                  {String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, "0")}
                </span>
                <strong>{project.name}</strong>
                <Expand size={18} />
              </button>

              <div className="project-slice-body">
                <div className="project-slice-visual">
                  <ProjectVisual project={project} />
                </div>
                <div className="project-slice-copy">
                  <h3>{project.tagline}</h3>
                  <p>{project.summary}</p>
                  {mode !== "recruiter" && <small>{project.proofPoints[0]}</small>}
                  <div className="slice-footer">
                    <button type="button" className="text-link" onClick={() => openProject(project)}>
                      Inspect system <ArrowUpRight size={16} />
                    </button>
                    <span>{project.technologies.slice(0, 3).join(" / ")}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProjectDetail project={activeProject} mode={mode} onClose={closeProject} />
    </section>
  );
}
