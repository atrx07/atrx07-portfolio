import { ArrowUpRight, Expand } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const sliceNodes = useRef(new Map<string, HTMLElement>());
  const activationTimer = useRef<number | null>(null);
  const pendingSlug = useRef<string | null>(null);

  const visibleProjects = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(category)),
    [category],
  );

  const activeProject = requestedProject ?? selectedProject;

  useEffect(() => {
    if (!visibleProjects.some((project) => project.slug === expandedSlug)) {
      setExpandedSlug(visibleProjects[0]?.slug ?? "");
    }
  }, [expandedSlug, visibleProjects]);

  useEffect(() => {
    if (!window.matchMedia || !window.IntersectionObserver) return;

    const mobileQuery = window.matchMedia("(max-width: 900px)");
    if (!mobileQuery.matches) return;

    const clearPendingActivation = () => {
      if (activationTimer.current !== null) {
        window.clearTimeout(activationTimer.current);
      }
      activationTimer.current = null;
      pendingSlug.current = null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.6,
        );
        if (visibleEntries.length === 0) {
          clearPendingActivation();
          return;
        }

        const viewportCenter = window.innerHeight / 2;
        const closest = visibleEntries.sort((left, right) => {
          const leftCenter = left.boundingClientRect.top + left.boundingClientRect.height / 2;
          const rightCenter = right.boundingClientRect.top + right.boundingClientRect.height / 2;
          return Math.abs(leftCenter - viewportCenter) - Math.abs(rightCenter - viewportCenter);
        })[0];

        const slug = (closest.target as HTMLElement).closest<HTMLElement>("[data-project-slug]")?.dataset
          .projectSlug;
        if (!slug || pendingSlug.current === slug) return;

        clearPendingActivation();
        pendingSlug.current = slug;
        activationTimer.current = window.setTimeout(() => {
          setExpandedSlug(slug);
          activationTimer.current = null;
          pendingSlug.current = null;
        }, 280);
      },
      {
        rootMargin: "-39% 0px -39% 0px",
        threshold: [0, 0.6, 1],
      },
    );

    visibleProjects.forEach((project) => {
      const node = sliceNodes.current.get(project.slug);
      const trigger = node?.querySelector<HTMLElement>(".project-slice-hit");
      if (trigger) observer.observe(trigger);
    });

    return () => {
      clearPendingActivation();
      observer.disconnect();
    };
  }, [visibleProjects]);

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
          const expanded = visibleProjects.length === 1 || expandedSlug === project.slug;
          const bodyId = `${project.slug}-project-body`;
          return (
            <article
              key={project.slug}
              className={expanded ? "project-slice is-expanded" : "project-slice"}
              data-project-slug={project.slug}
              ref={(node) => {
                if (node) sliceNodes.current.set(project.slug, node);
                else sliceNodes.current.delete(project.slug);
              }}
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
                aria-expanded={expanded}
                aria-controls={bodyId}
              >
                <span className={`status status--${project.status}`}>{project.status}</span>
                <span className="project-index">
                  {String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, "0")}
                </span>
                <strong>{project.name}</strong>
                <Expand size={18} />
              </button>

              <div id={bodyId} className="project-slice-body">
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
