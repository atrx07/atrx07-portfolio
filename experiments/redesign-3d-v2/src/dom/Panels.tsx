import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, X } from 'lucide-react';
import { projects } from '../../../../src/data/projects';
import { capabilityGroups } from '../../../../src/data/profile';
import { useWorlds } from '../store';

const STATUS_LABEL: Record<string, string> = {
  active: 'active build',
  shipped: 'shipped',
  experimental: 'experiment',
  prototype: 'prototype',
};

/** Slide-in dossier for the selected project planet. */
export function ProjectPanel() {
  const slug = useWorlds((s) => s.selectedProject);
  const setSelectedProject = useWorlds((s) => s.setSelectedProject);
  const project = slug ? projects.find((p) => p.slug === slug) : undefined;
  const panel = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    const { lenis } = useWorlds.getState();
    lenis?.stop();
    if (panel.current) {
      gsap.fromTo(
        panel.current,
        { x: 64, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      useWorlds.getState().lenis?.start();
    };
  }, [project, setSelectedProject]);

  if (!project) return null;

  return (
    <div className="panel-scrim" onClick={() => setSelectedProject(null)}>
      <aside
        ref={panel}
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} dossier`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtn}
          type="button"
          className="icon-btn panel-close"
          data-hover
          aria-label="Close dossier"
          onClick={() => setSelectedProject(null)}
        >
          <X size={18} />
        </button>
        <p className="kicker">
          dossier · <span className={`status status-${project.status}`}>{STATUS_LABEL[project.status]}</span>
        </p>
        <h2 className="panel-title">{project.name}</h2>
        <p className="panel-tagline">{project.tagline}</p>
        <p className="panel-summary">{project.summary}</p>

        <h3 className="panel-h">Proof, not promises</h3>
        <ul className="panel-list">
          {project.proofPoints.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>

        <h3 className="panel-h">Stack</h3>
        <div className="chip-row">
          {project.technologies.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        {project.constraints && project.constraints.length > 0 && (
          <>
            <h3 className="panel-h">Honest constraints</h3>
            <ul className="panel-list panel-constraints">
              {project.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </>
        )}

        {project.next && (
          <>
            <h3 className="panel-h">Next</h3>
            <p className="panel-summary">{project.next}</p>
          </>
        )}

        {project.repoUrl && (
          <a
            className="btn-primary panel-cta"
            data-hover
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open repository <ExternalLink size={16} />
          </a>
        )}
      </aside>
    </div>
  );
}

/** Bottom card for the selected skill orb. */
export function SkillPanel() {
  const idx = useWorlds((s) => s.selectedSkill);
  const setSelectedSkill = useWorlds((s) => s.setSelectedSkill);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSkill(null);
    };
    window.addEventListener('keydown', onKey);
    if (card.current) {
      gsap.fromTo(
        card.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
      );
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, setSelectedSkill]);

  if (idx === null) return null;
  const group = capabilityGroups[idx];
  if (!group) return null;

  return (
    <div ref={card} className="skill-card" role="dialog" aria-label={`${group.title} capabilities`}>
      <button
        type="button"
        className="icon-btn skill-close"
        data-hover
        aria-label="Close capabilities"
        onClick={() => setSelectedSkill(null)}
      >
        <X size={16} />
      </button>
      <h3>{group.title}</h3>
      <div className="chip-row">
        {group.items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
