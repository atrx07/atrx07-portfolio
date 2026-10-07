import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Command, Cpu, Expand, Mail, Pause, Play, RotateCcw, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../../src/data/projects';
import { capabilityGroups, profile } from '../../../src/data/profile';
import type { Project } from '../../../src/types';
import { MagicTab } from '../../../src/components/godui/magic-tab';

const Scene = lazy(() => import('./Scene'));
gsap.registerPlugin(ScrollTrigger);
const primary = projects[0], localAI = projects[1];
const noteModules = import.meta.glob('../../../src/blog/posts/*.meta.ts', { eager: true }) as Record<string, { meta: { status: string; title: string; slug: string; description: string; publishedAt: string } }>;
const notes = Object.values(noteModules).map(m => m.meta).filter(m => m.status === 'published').sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return reduced;
}

function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`raised-button ${className}`} {...props}><span>{children}</span></button>;
}

function ProjectGlyph({ kind }: { kind: Project['visual'] }) {
  return <div className={`project-glyph glyph--${kind}`} aria-hidden="true">{kind === 'chat' ? <><i /><i /><i /></> : kind === 'sequencer' ? Array.from({ length: 16 }, (_, i) => <i key={i} />) : kind === 'security' ? <><i /><b /></> : kind === 'memory' ? <><i /><i /><i /><b /></> : <><i /><b /></>}</div>;
}

export default function App() {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const reduced = systemReduced || paused;
  const [exploded, setExploded] = useState(false);
  const [scrollSpread, setScrollSpread] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [detailTab, setDetailTab] = useState('overview');
  const [utility, setUtility] = useState<'command' | 'terminal' | null>(null);
  const [search, setSearch] = useState('');
  const [commandInput, setCommandInput] = useState('');
  const [transcript, setTranscript] = useState(['ATRX / public interface', 'Try: help, projects, about, contact, clear']);
  const [notice, setNotice] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [coreLayer, setCoreLayer] = useState(0);
  const [ready, setReady] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const modalOpen = Boolean(activeProject || utility);

  useEffect(() => {
    const sync = () => {
      const match = window.location.hash.match(/^#project\/([a-z0-9-]+)$/);
      setActiveProject(match ? projects.find(p => p.slug === match[1]) ?? null : null);
      setDetailTab('overview');
    };
    sync(); window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    const modal = modalRef.current!;
    if (modalOpen) document.body.style.overflow = 'hidden';
    if (modalOpen && !modal.open) {
      if (!previousFocus.current?.isConnected || document.activeElement !== document.body && !activeProject) previousFocus.current = document.activeElement as HTMLElement;
      modal.showModal(); document.body.style.overflow = 'hidden';
      if (!reduced) gsap.fromTo(modal, { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
    } else if (!modalOpen && modal.open) {
      modal.close(); document.body.style.overflow = '';
      window.requestAnimationFrame(() => previousFocus.current?.focus({ preventScroll: true }));
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen, reduced]);

  useEffect(() => {
    if (activeProject) modalRef.current?.querySelector<HTMLButtonElement>('.dialog-close')?.focus();
    else if (utility) modalRef.current?.querySelector<HTMLInputElement>('input')?.focus();
  }, [activeProject, utility]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); if (!modalOpen) { setUtility('command'); setSearch(''); }
      }
    };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, [modalOpen]);

  useEffect(() => {
    if (reduced) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.fromTo('.hero-visual', { scale: 0.88 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom 40%', scrub: 0.6, onUpdate: self => setScrollSpread(self.progress > 0.35) } });
        gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
          gsap.fromTo(el, { y: 38 }, { y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
        });
      }, root);
      return () => context.revert();
    });
    media.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.feature-copy').forEach(el => {
          ScrollTrigger.create({ trigger: el.parentElement!, start: 'top 115px', end: 'bottom bottom', pin: el, pinSpacing: false });
        });
        gsap.utils.toArray<HTMLElement>('.feature-art').forEach(el => {
          gsap.fromTo(el, { scale: 0.86 }, { scale: 1, scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: 0.6 } });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, [reduced]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 3500); return () => window.clearTimeout(timer);
  }, [notice]);

  const openProject = (p: Project, opener?: HTMLElement) => {
    if (opener && !modalOpen) previousFocus.current = opener;
    else if (!modalOpen) previousFocus.current = root.current?.querySelector<HTMLElement>(`[data-project="${p.slug}"]`) ?? null;
    setUtility(null); setActiveProject(p); setDetailTab('overview');
    window.history.pushState({ exhibitionProject: true }, '', `#project/${p.slug}`);
  };
  const closeModal = () => {
    if (activeProject) {
      if (window.history.state?.exhibitionProject) window.history.back();
      else { window.history.replaceState(null, '', window.location.pathname); setActiveProject(null); }
    }
    setUtility(null);
  };
  const resetScene = () => { setExploded(false); root.current?.querySelectorAll('.scene').forEach(el => el.dispatchEvent(new Event('scene-reset'))); };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setNotice('Email copied. Let’s build something.'); }
    catch { setNotice(`Email: ${profile.email}`); }
  };
  const execute = (event: React.FormEvent) => {
    event.preventDefault(); const value = commandInput.trim().toLowerCase(); setCommandInput('');
    if (value === 'clear') { setTranscript([]); return; }
    const response = value === 'help' ? 'help · projects · about · contact · clear' : value === 'projects' ? projects.map(p => `${p.name} — ${p.status}`).join('\n') : value === 'about' ? `${profile.name} / ${profile.handle}\n${profile.headline}\n${profile.location}` : value === 'contact' ? profile.email : 'Unknown command. Type help for the public commands.';
    setTranscript(lines => [...lines.slice(-30), `> ${commandInput}`, response]);
  };
  const filteredProjects = projects.filter(p => activeCategory === 'All' || (activeCategory === 'Local AI' ? p.categories.includes('Local AI') : activeCategory === 'Mobile' ? p.categories.some(c => /Mobile|PWA/.test(c)) : p.status === 'experimental' || p.status === 'prototype'));

  return <div ref={root} className="exhibition" data-reduced={reduced}>
    <a className="skip-link" href="#work">Skip to projects</a>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Arppith Andrews home"><span className="mark">A<span>↗</span></span><strong>ATRX<span>/ atrx07</span></strong></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#notes">Field Notes</a></nav>
      <div className="header-actions"><button className="command-toggle icon-button" aria-label="Open command palette" onClick={() => { setUtility('command'); setSearch(''); }}><Command size={17} /><span>K</span></button><a href="#contact" className="contact-link">Let’s talk <ArrowUpRight size={17} /></a></div>
    </header>
    <main>
      <section className="hero" id="top" ref={hero}>
        <div className="hero-heading"><div className="hero-overline"><span>Independent builder · Kerala, India</span><span>Local AI / Software / Experiments</span></div><h1>ARPPITH ANDREWS<span className="identity-line"><b>ATRX</b><b>atrx07</b><span>Ideas into systems.<br />Systems into experiences.</span></span></h1></div>
        <div className="hero-visual"><Suspense fallback={<div className="scene-loading"><div className="poster-orbit"><div className="poster-core" /></div></div>}><Scene reduced={reduced} paused={paused} exploded={exploded || scrollSpread} onReady={() => setReady(true)} onSelect={slug => { const project = projects.find(p => p.slug === slug); if (project) openProject(project); }} /></Suspense></div>
        <div className="hero-bottom"><div className="hero-statement"><p>I build software with a life<br />beyond the screen.</p><span>Local intelligence. Real-time connections.<br />A little engineering curiosity.</span></div><div className="hero-controls"><div className="control-caption"><i className={ready ? 'status-ready' : ''} />{reduced ? 'Still composition' : ready ? 'Drag to turn · select a project object' : 'Preparing the assembly'}</div><div className="control-buttons"><Button onClick={() => setExploded(v => !v)} aria-pressed={exploded}><Expand size={15} />{exploded ? 'Reassemble' : 'Pull it apart'}</Button><button className="icon-button" onClick={resetScene} aria-label="Reset assembly"><RotateCcw size={17} /></button><button className="icon-button" onClick={() => setPaused(v => !v)} aria-label={systemReduced ? 'Motion reduced by your preference' : paused ? 'Resume motion' : 'Use still view'} aria-pressed={reduced} disabled={systemReduced}>{paused ? <Play size={17} /> : <Pause size={17} />}</button></div></div><a className="explore-link" href="#work">Explore the work <ArrowDown size={20} /></a></div>
        <span className="hero-side-note" aria-hidden="true">An exhibition of useful things</span>
      </section>

      <section className="approach" id="about"><div className="section-top"><span>Built with intent</span><span>Software, at the edge of practical & unusual</span></div><h2 className="reveal">Curiosity is the starting point.<br />Making it work is the <span className="inline-chip" aria-hidden="true"><Cpu /></span> interesting part.</h2><div className="principle-grid"><article><span className="principle-symbol">↙</span><h3>Keep intelligence close.</h3><p>Local AI, native runtimes, and data that stays under your control.</p></article><article><span className="principle-symbol">↔</span><h3>Make state survive.</h3><p>Memory, history, retries, and recovery. The details that make software dependable.</p></article><article><span className="principle-symbol">↗</span><h3>Test beyond the mockup.</h3><p>Actual hardware, honest constraints, and interfaces worth touching.</p></article></div></section>

      <section id="work" className="work-section"><div className="section-top"><span>Selected work</span><span>Open the object. Inspect the system.</span></div>
        <article className="feature feature--traelyx"><div className="feature-copy"><div className="project-kicker"><span className="small-dot" />Mobile & telemetry <span>Active build</span></div><h2>Traelyx<span>.</span></h2><p className="feature-deck">The drive<br />stays yours.</p><p className="feature-description">Record locally. Understand the evidence. Replay offline. Connect only by choice.</p><div className="tech-line">Flutter / Kotlin / SQLite</div><Button className="button-blue" onClick={event => openProject(primary, event.currentTarget)}>Explore Traelyx <ArrowUpRight size={18} /></Button><span className="feature-footnote">Illustrated device · synthetic route schematic</span></div><div className="feature-art"><div className="art-orbits" aria-hidden="true" /><Suspense fallback={<div className="art-placeholder">Traelyx</div>}><Scene variant="phone" reduced={reduced} paused={paused} /></Suspense><div className="object-caption"><span>Evidence → intelligence → replay</span><span>Local first.</span></div></div></article>
        <article className="feature feature--neuraloc"><div className="feature-copy"><div className="project-kicker"><span className="small-dot" />Local AI <span>Active build</span></div><h2>NeuraLoc<span>.</span></h2><p className="feature-deck">Intelligence.<br />On your terms.</p><p className="feature-description">A dependable control center for local models. Verified runtimes, bounded context, and conversations that survive.</p><div className="tech-line">Rust / Tauri / llama.cpp</div><Button onClick={event => openProject(localAI, event.currentTarget)}>Inspect NeuraLoc-Core <ArrowUpRight size={18} /></Button></div><div className="feature-art"><Suspense fallback={<div className="art-placeholder">NeuraLoc-Core</div>}><Scene variant="core" reduced={reduced} paused={paused} exploded={coreLayer > 1} /></Suspense><div className="layer-selector" aria-label="Architecture layers">{localAI.architecture?.map((layer, i) => <button key={layer.id} onClick={() => setCoreLayer(i)} aria-pressed={coreLayer === i}><span />{layer.label}</button>)}</div><div className="layer-description" aria-live="polite">{localAI.architecture?.[coreLayer].detail}</div></div></article>
      </section>

      <section className="archive" id="archive"><div className="archive-heading"><h2 className="reveal">More things<br />I’ve made<span>.</span></h2><p>Different problems.<br />The same instinct to build.</p></div><div className="tab-scroll"><MagicTab items={['All', 'Local AI', 'Mobile', 'Experiments'].map(value => ({ value, label: value }))} value={activeCategory} onValueChange={setActiveCategory} panelId="project-archive" rainbow={false} aria-label="Project category" /></div><div id="project-archive" role="tabpanel" aria-label={`${activeCategory} projects`} className="project-rows">{filteredProjects.map(project => <button className="project-row" key={project.slug} data-project={project.slug} onClick={event => openProject(project, event.currentTarget)}><ProjectGlyph kind={project.visual} /><span className="row-title"><strong>{project.name}</strong><span>{project.tagline}</span></span><span className="row-category">{project.categories[0]}</span><span className="row-status">{project.status}</span><ArrowUpRight className="row-arrow" size={28} /></button>)}</div></section>

      <section className="toolkit"><div className="section-top"><span>A few tools in the workshop</span><button onClick={() => setUtility('terminal')} className="text-button">Open the terminal <ArrowUpRight size={16} /></button></div><div className="marquee" aria-label="Selected technologies"><div className="marquee-track" aria-hidden="true">{[0, 1].map(copy => <span key={copy}>{['React', 'Rust', 'Flutter', 'Python', 'llama.cpp', 'TypeScript', 'WebSockets'].map(tool => <b key={tool}>{tool}<span> / </span></b>)}</span>)}</div></div><div className="toolkit-list">{capabilityGroups.map(group => <div key={group.title}><h3>{group.title}</h3><p>{group.items.join(' / ')}</p></div>)}</div></section>

      <section className="notes" id="notes"><div className="notes-heading"><h2 className="reveal">Behind<br />the build<span>.</span></h2><p>Field Notes on architecture,<br />experiments, and what broke.</p><a href="https://atrx07.pages.dev/blog" className="text-button">All Field Notes <ArrowUpRight size={17} /></a></div><div className="note-list">{notes.map(note => <a key={note.slug} href={`https://atrx07.pages.dev/blog/${note.slug}`}><span className="note-date">{new Date(`${note.publishedAt}T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span><h3>{note.title}</h3><p>{note.description}</p><ArrowUpRight size={24} /></a>)}</div></section>

      <section className="contact" id="contact"><div className="section-top"><span><i className="small-dot" />Open to internships & collaborations</span><span>Kerala, India</span></div><h2>Have something<br />in <em>mind?</em></h2><div className="contact-bottom"><a className="email-link" href={`mailto:${profile.email}`}>Let’s make it happen <ArrowUpRight size={36} /></a><Button onClick={copyEmail}><Mail size={16} />Copy email</Button></div><footer><div className="footer-identity"><strong>ARPPITH ANDREWS</strong><span>ATRX / atrx07</span></div><div><a href={profile.github}>GitHub <ArrowUpRight size={14} /></a><a href={profile.instagram}>Instagram <ArrowUpRight size={14} /></a><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><span>Made with curiosity.</span></footer></section>
    </main>

    <dialog ref={modalRef} className={`detail-dialog ${utility ? 'utility-dialog' : ''}`} aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); closeModal(); }} onClick={event => { if (event.target === event.currentTarget) closeModal(); }}>
      <div className="dialog-shell"><button className="dialog-close icon-button" onClick={closeModal} aria-label="Close panel"><X size={23} /></button>
        {activeProject && <><div className="dialog-head"><span>{activeProject.categories.join(' / ')} · {activeProject.status}</span><h2 id="dialog-title">{activeProject.name}<span>.</span></h2><p>{activeProject.tagline}</p></div><div className="tab-scroll"><MagicTab items={[{ value: 'overview', label: 'Overview' }, { value: 'architecture', label: 'Architecture' }, { value: 'constraints', label: 'Reality check' }]} value={detailTab} onValueChange={setDetailTab} panelId="project-detail" rainbow={false} aria-label="Project information" /></div><div id="project-detail" role="tabpanel" aria-label={detailTab} className="detail-content">{detailTab === 'overview' ? <><p className="detail-summary">{activeProject.summary}</p><h3>Built & verified</h3><ul className="proof-list">{activeProject.proofPoints.map(proof => <li key={proof}><Check size={18} /><span>{proof}</span></li>)}</ul><div className="detail-technologies">{activeProject.technologies.join(' / ')}</div></> : detailTab === 'architecture' ? <div className="architecture-list">{activeProject.architecture?.length ? activeProject.architecture.map(node => <article key={node.id}><span className="architecture-node" /><div><h3>{node.label}</h3><p>{node.detail}</p></div></article>) : <p>{activeProject.summary}<br />Stack: {activeProject.technologies.join(', ')}.</p>}</div> : <><h3>The honest boundaries</h3>{activeProject.constraints?.map(text => <p className="constraint" key={text}>{text}</p>)}{activeProject.next && <><h3>Still ahead</h3><p>{activeProject.next}</p></>}</>}</div><div className="dialog-footer">{activeProject.repoUrl && <a href={activeProject.repoUrl} className="raised-button button-blue"><span>Inspect the source <ArrowUpRight size={18} /></span></a>}<button className="text-button" onClick={closeModal}>Back to the exhibition <ArrowRight size={17} /></button></div></>}
        {utility === 'command' && <><h2 id="dialog-title">Where to?</h2><label className="search-label">Find a project or section<input autoFocus placeholder="Search the exhibition…" value={search} onChange={event => setSearch(event.target.value)} /></label><div className="command-list">{[{ name: 'Selected work', hash: 'work' }, { name: 'About Arppith', hash: 'about' }, { name: 'Field Notes', hash: 'notes' }, { name: 'Contact', hash: 'contact' }].filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => <button key={item.hash} onClick={() => { setUtility(null); document.getElementById(item.hash)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }); }}>{item.name}<ArrowRight size={18} /></button>)}{projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => <button key={p.slug} onClick={() => openProject(p)}>{p.name}<span>{p.status}</span><ArrowUpRight size={18} /></button>)}</div></>}
        {utility === 'terminal' && <><h2 id="dialog-title">A small public terminal.</h2><p className="terminal-intro">Portfolio commands only. Type help to start.</p><div className="terminal-output" role="log" aria-label="Terminal output">{transcript.map((line, i) => <pre key={i}>{line}</pre>)}</div><form onSubmit={execute}><label className="terminal-prompt"><span>atrx07 &gt;</span><input autoFocus aria-label="Terminal command" value={commandInput} onChange={event => setCommandInput(event.target.value)} autoComplete="off" spellCheck={false} /><button className="icon-button" type="submit" aria-label="Run portfolio command"><ArrowRight size={20} /></button></label></form></>}
      </div>
    </dialog>
    <div className={`toast ${notice ? 'toast--visible' : ''}`} role="status">{notice && <><Check size={18} />{notice}</>}</div>
  </div>;
}
