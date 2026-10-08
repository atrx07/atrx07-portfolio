import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Mail,
  MousePointerClick,
  Rocket,
} from 'lucide-react';
import { projects } from '../../../../src/data/projects';
import { capabilityGroups, experiments, profile } from '../../../../src/data/profile';
import { planetBySlug } from '../data/planets';
import { scrollToSection, usePlanets } from '../store';

gsap.registerPlugin(ScrollTrigger);

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  shipped: 'Shipped',
  experimental: 'Experimental',
  prototype: 'Prototype',
};

/** Gentle magnetic pull toward the cursor for CTA buttons. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="magnetic"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.16}px, ${(e.clientY - (r.top + r.height / 2)) * 0.16}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section id="sec-hero" className="section hero">
      <div className="pe hero-inner reveal">
        <p className="kicker">
          <span className="pulse-dot" aria-hidden="true" />
          {profile.name} · {profile.brand} · {profile.location}
        </p>
        <h1 className="hero-title">{profile.headline}</h1>
        <p className="lede">{profile.supporting}</p>
        <div className="cta-row">
          <Magnetic>
            <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
              <Rocket size={16} /> Explore the planets
            </button>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" onClick={() => scrollToSection('contact')}>
              <Mail size={16} /> Get in touch
            </button>
          </Magnetic>
        </div>
        <p className="availability">{profile.availability}</p>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <ArrowDown size={15} />
        <span>Scroll — the camera is already moving</span>
      </div>
    </section>
  );
}

function Projects() {
  const setSelected = usePlanets((s) => s.setSelected);
  const markOpened = usePlanets((s) => s.markOpened);
  const open = (slug: string) => {
    markOpened(slug);
    setSelected(slug);
  };
  return (
    <section id="sec-projects" className="section">
      <div className="pe section-head reveal">
        <p className="kicker">01 — Projects</p>
        <h2>Seven worlds. Seven systems that shipped.</h2>
        <p className="lede-sm">
          Every project below is a planet in the system behind this page.{' '}
          <MousePointerClick size={14} className="inline-ic" /> Click a planet, its label, or a card
          to open the dossier.
        </p>
      </div>
      <div className="cards">
        {projects.map((p) => {
          const cfg = planetBySlug(p.slug);
          return (
            <article
              key={p.slug}
              className="card pe reveal"
              style={{ ['--accent' as string]: cfg?.accent ?? '#6ea8ff' }}
            >
              <div className="card-top">
                <span className="planet-dot" aria-hidden="true" />
                <span className={`status status-${p.status}`}>{STATUS_LABEL[p.status]}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="card-tag">{p.tagline}</p>
              <div className="chips">
                {p.technologies.slice(0, 5).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <button className="card-open" onClick={() => open(p.slug)}>
                Open dossier <ArrowUpRight size={14} />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="sec-skills" className="section">
      <div className="pe section-head reveal">
        <p className="kicker">02 — Capabilities</p>
        <h2>The toolbox.</h2>
        <p className="lede-sm">
          The stacks these worlds were built with — from native runtimes to edge infrastructure.
        </p>
      </div>
      <div className="skill-groups">
        {capabilityGroups.map((g) => (
          <div key={g.title} className="skill-group pe reveal">
            <h3>{g.title}</h3>
            <div className="chips chips-lg">
              {g.items.map((item) => (
                <span key={item} className="chip chip-skill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sec-about" className="section">
      <div className="pe section-head reveal">
        <p className="kicker">03 — Principles</p>
        <h2>How I work.</h2>
      </div>
      <ol className="principles">
        {profile.principles.map((pr, i) => (
          <li key={pr.title} className="pe reveal">
            <span className="pnum" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3>{pr.title}</h3>
              <p>{pr.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="pe reveal">
        <h3 className="sub-h">Lab notes &amp; experiments</h3>
        <ul className="exp-list">
          {experiments.map((e) => (
            <li key={e.name}>
              <span className="exp-kind">{e.kind}</span>
              <div>
                <strong>{e.name}</strong>
                <p>{e.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section id="sec-contact" className="section">
      <div className="pe section-head reveal">
        <p className="kicker">04 — Contact</p>
        <h2>Open a channel.</h2>
        <p className="lede-sm">No forms, no funnels — just email.</p>
      </div>
      <div className="pe contact-card reveal">
        <Magnetic>
          <button className="btn btn-primary btn-lg" onClick={copy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to clipboard' : profile.email}
          </button>
        </Magnetic>
        <div className="cta-row">
          <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
            <Mail size={16} /> Write directly
          </a>
          <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
          <a className="btn btn-ghost" href={profile.instagram} target="_blank" rel="noreferrer">
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>
      <footer className="pe foot reveal">
        A planetary-portfolio experiment · Built with React Three Fiber · Planet textures: Solar
        System Scope (CC BY 4.0) · Earth imagery: NASA
      </footer>
    </section>
  );
}

/** The real portfolio page — sections of DOM content over the 3D stage. */
export function Page() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="page">
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
