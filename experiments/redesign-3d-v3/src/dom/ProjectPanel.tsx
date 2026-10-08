import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Rocket,
  X,
} from 'lucide-react';
import { projects } from '../../../../src/data/projects';
import { PLANETS, planetBySlug } from '../data/planets';
import { usePlanets } from '../store';

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  shipped: 'Shipped',
  experimental: 'Experimental',
  prototype: 'Prototype',
};

/**
 * Rich project dossier as a pure-DOM overlay panel (never drei <Html> for
 * heavy content). Opens from planet clicks, planet labels, or project cards.
 */
export function ProjectPanel() {
  const selected = usePlanets((s) => s.selected);
  const setSelected = usePlanets((s) => s.setSelected);
  const markOpened = usePlanets((s) => s.markOpened);

  const project = projects.find((p) => p.slug === selected);
  const cfg = selected ? planetBySlug(selected) : undefined;
  const idx = PLANETS.findIndex((p) => p.slug === selected);

  if (!project || !cfg || idx < 0) return null;

  const go = (dir: 1 | -1) => {
    const next = PLANETS[(idx + dir + PLANETS.length) % PLANETS.length];
    markOpened(next.slug);
    setSelected(next.slug);
  };

  return (
    <div className="panel-wrap" role="dialog" aria-modal="true" aria-label={`${project.name} dossier`}>
      <div className="panel-scrim" onClick={() => setSelected(null)} aria-hidden="true" />
      <aside className="panel pe" style={{ ['--accent' as string]: cfg.accent }}>
        <div className="panel-nav">
          <button onClick={() => go(-1)} aria-label="Previous planet">
            <ChevronLeft size={16} />
          </button>
          <span className="panel-count">
            {idx + 1} / {PLANETS.length}
          </span>
          <button onClick={() => go(1)} aria-label="Next planet">
            <ChevronRight size={16} />
          </button>
          <span className="panel-spacer" />
          <button className="panel-close" onClick={() => setSelected(null)} aria-label="Close dossier">
            <X size={16} />
          </button>
        </div>

        <p className="kicker">
          <span className="planet-dot" aria-hidden="true" />
          {project.categories.join(' · ')}
        </p>
        <h2>{project.name}</h2>
        <p className="panel-tag">{project.tagline}</p>
        <span className={`status status-${project.status}`}>{STATUS_LABEL[project.status]}</span>

        <p className="panel-summary">{project.summary}</p>

        <h3 className="panel-h">
          <Check size={14} /> Proof points
        </h3>
        <ul className="proof">
          {project.proofPoints.map((pp) => (
            <li key={pp}>{pp}</li>
          ))}
        </ul>

        {project.constraints && project.constraints.length > 0 && (
          <>
            <h3 className="panel-h">
              <AlertTriangle size={14} /> Honest constraints
            </h3>
            <ul className="constraints">
              {project.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </>
        )}

        <h3 className="panel-h">Stack</h3>
        <div className="chips">
          {project.technologies.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        {project.next && (
          <>
            <h3 className="panel-h">Next</h3>
            <p className="panel-next">{project.next}</p>
          </>
        )}

        {project.repoUrl && (
          <a className="btn btn-primary panel-repo" href={project.repoUrl} target="_blank" rel="noreferrer">
            <Rocket size={14} /> Repository <ExternalLink size={12} />
          </a>
        )}
      </aside>
    </div>
  );
}
