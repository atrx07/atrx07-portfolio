import { ExternalLink } from 'lucide-react';
import { projects } from '../../../../src/data/projects';
import { capabilityGroups, profile } from '../../../../src/data/profile';

/**
 * Designed static fallback when WebGL is unavailable: the same content,
 * readable, no 3D. Also the noscript-friendly shape of the site.
 */
export function Fallback() {
  return (
    <div className="fallback">
      <header className="fallback-head">
        <p className="wordmark">
          ATRX<span className="wordmark-sub">/worlds</span>
        </p>
        <p className="fallback-note">3D unavailable on this device — here&apos;s everything, flat.</p>
      </header>

      <section className="fallback-hero">
        <p className="hero-eyebrow">
          ATRX // {profile.name} · {profile.location}
        </p>
        <h1>{profile.headline}</h1>
        <p>{profile.supporting}</p>
        <p>{profile.availability}.</p>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{' '}
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            github.com/atrx07
          </a>
        </p>
      </section>

      <section>
        <h2>The build shelf</h2>
        <div className="fallback-grid">
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <article key={p.slug} className="fallback-card">
                <h3>{p.name}</h3>
                <p className="fallback-tagline">{p.tagline}</p>
                <p>{p.summary}</p>
                <ul>
                  {p.proofPoints.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                    Repository <ExternalLink size={14} />
                  </a>
                )}
              </article>
            ))}
        </div>
      </section>

      <section>
        <h2>Capability map</h2>
        {capabilityGroups.map((g) => (
          <div key={g.title} className="fallback-group">
            <h3>{g.title}</h3>
            <p>{g.items.join(' · ')}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Operating principles</h2>
        <div className="fallback-grid">
          {profile.principles.map((p) => (
            <article key={p.title} className="fallback-card">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
