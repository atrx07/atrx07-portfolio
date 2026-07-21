import { ArrowUpRight, Expand } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { projectCategories, projects } from "../data/projects";
import type { Project, VisitorMode } from "../types";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectVisual } from "./ProjectVisual";

const mobileProjectLayoutQuery = "(max-width: 900px)";

const isMobileProjectLayout = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(mobileProjectLayoutQuery).matches;

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
  const [mobileLayout, setMobileLayout] = useState(isMobileProjectLayout);
  const [expandedSlug, setExpandedSlug] = useState(() => (isMobileProjectLayout() ? "" : "neuraloc"));

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
      setExpandedSlug(mobileLayout ? "" : (visibleProjects[0]?.slug ?? ""));
    }
  }, [expandedSlug, mobileLayout, visibleProjects]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const media = window.matchMedia(mobileProjectLayoutQuery);
    const syncLayout = (matches: boolean) => {
      setMobileLayout(matches);
      setExpandedSlug((current) => (matches ? "" : current || "neuraloc"));
    };

    syncLayout(media.matches);
    const handleChange = (event: MediaQueryListEvent) => syncLayout(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

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
          const expanded =
            (!mobileLayout && visibleProjects.length === 1) || expandedSlug === project.slug;
          const bodyId = `${project.slug}-project-body`;
          return (
            <article
              key={project.slug}
              className={expanded ? "project-slice is-expanded" : "project-slice"}
              data-project-slug={project.slug}
              onMouseEnter={() => {
                if (!mobileLayout) setExpandedSlug(project.slug);
              }}
              onFocus={() => {
                if (!mobileLayout) setExpandedSlug(project.slug);
              }}
            >
              <button
                className="project-slice-hit"
                type="button"
                onClick={() => {
                  if (mobileLayout) {
                    setExpandedSlug((current) => (current === project.slug ? "" : project.slug));
                    return;
                  }
                  setExpandedSlug(project.slug);
                  openProject(project);
                }}
                aria-label={
                  mobileLayout
                    ? `${expanded ? "Collapse" : "Expand"} ${project.name} project card`
                    : `Open ${project.name} project details`
                }
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
