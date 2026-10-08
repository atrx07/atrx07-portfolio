import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Copy, Github, Mail } from 'lucide-react';
import { profile } from '../../../../src/data/profile';
import { flyTo, useWorlds } from '../store';
import { Kicker, Magnetic } from './ui';

/** Kinetic headline — word-by-word reveal once the preloader lifts. */
function KineticHeadline({ text }: { text: string }) {
  const booted = useWorlds((s) => s.booted);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!booted || !ref.current) return;
    const words = ref.current.querySelectorAll('.kw');
    gsap.fromTo(
      words,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.055, ease: 'power3.out' }
    );
  }, [booted]);

  return (
    <h1 ref={ref} className="hero-title">
      {text.split(' ').map((w, i) => (
        <span key={i} className="kw-wrap">
          <span className="kw">{w}</span>{' '}
        </span>
      ))}
    </h1>
  );
}

function ChapterShell({
  id,
  index,
  kicker,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="world-section" aria-label={kicker}>
      <div className="chapter">
        <Kicker>
          {index} · {kicker}
        </Kicker>
        {children}
      </div>
    </section>
  );
}

export function Chapters() {
  const opened = useWorlds((s) => s.openedDossiers.length);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard unavailable — the mailto link below still works */
    }
  };

  return (
    <main className="chapters">
      <ChapterShell id="world-hero" index="01" kicker="ORIGIN">
        <p className="hero-eyebrow">
          ATRX // {profile.name} · {profile.location}
        </p>
        <KineticHeadline text={profile.headline} />
        <p className="chapter-lede">{profile.supporting}</p>
        <div className="cta-row pe">
          <Magnetic className="btn-primary" onClick={() => flyTo('projects')}>
            Fly the worlds <ArrowDown size={16} />
          </Magnetic>
          <Magnetic
            className="btn-ghost"
            onClick={() => window.open(profile.github, '_blank', 'noopener')}
          >
            <Github size={16} /> github.com/atrx07
          </Magnetic>
        </div>
        <p className="hint">scroll to fly — the camera is on rails · click the planets · try the konami code</p>
      </ChapterShell>

      <ChapterShell id="world-projects" index="02" kicker="THE BUILD SHELF">
        <h2 className="chapter-title">Seven systems, seven worlds.</h2>
        <p className="chapter-lede">
          Every planet is a real project — shipped, active, or an honest experiment. Click one to
          open its dossier: proof points, stack, constraints, and the repo.
        </p>
        <p className="hint pe">
          dossiers opened <strong>{opened}/7</strong> — collectors get nothing but our respect
        </p>
      </ChapterShell>

      <ChapterShell id="world-skills" index="03" kicker="CAPABILITY MAP">
        <h2 className="chapter-title">No skill bars. Just orbs.</h2>
        <p className="chapter-lede">
          Five capability groups, floating. Tap an orb to see what&apos;s inside — grouped by
          purpose, not by logo wall. Percentages are arbitrary; this map isn&apos;t.
        </p>
      </ChapterShell>

      <ChapterShell id="world-principles" index="04" kicker="OPERATING SYSTEM">
        <h2 className="chapter-title">How the work gets built.</h2>
        <div className="principle-grid pe">
          {profile.principles.map((p) => (
            <article key={p.title} className="principle-card">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </ChapterShell>

      <ChapterShell id="world-contact" index="05" kicker="OPEN CHANNEL">
        <h2 className="chapter-title">Beam me a signal.</h2>
        <p className="chapter-lede">{profile.availability}.</p>
        <div className="cta-row pe">
          <Magnetic className="btn-primary" onClick={copyEmail}>
            <Copy size={16} /> {profile.email}
          </Magnetic>
          <Magnetic
            className="btn-ghost"
            onClick={() => (window.location.href = `mailto:${profile.email}`)}
          >
            <Mail size={16} /> write directly
          </Magnetic>
        </div>
        <p className="hint">email copies to clipboard · no forms, no black holes</p>
      </ChapterShell>
    </main>
  );
}
