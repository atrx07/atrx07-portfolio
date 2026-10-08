import { Component, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { Scene } from './three/Scene';
import { Page } from './dom/Sections';
import { ProjectPanel } from './dom/ProjectPanel';
import {
  Cursor,
  NavDots,
  PauseButton,
  Preloader,
  ProgressBar,
  SignalToast,
} from './dom/Chrome';
import { StaticPage } from './dom/Fallback';
import { PLANETS } from './data/planets';
import { loadAll } from './three/textures';
import { SECTION_ORDER, usePlanets, type SectionId } from './store';
import { createEggDetector } from './lib/easterEgg';
import { detectQuality, hasWebGL } from './lib/quality';
import './style.css';

/** If the WebGL scene throws, fall back to the readable static page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    usePlanets.getState().failWebgl();
  }
  render() {
    return this.state.failed ? <StaticPage /> : this.props.children;
  }
}

export default function App() {
  const webglFailed = usePlanets((s) => s.webglFailed);
  const reducedMotion = usePlanets((s) => s.reducedMotion);
  const statik = webglFailed || reducedMotion;

  // Device tier, reduced-motion, and the WebGL probe.
  useEffect(() => {
    const st = usePlanets.getState();
    st.setQuality(detectQuality());
    const mq =
      typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const apply = () => st.setReducedMotion(!!mq?.matches);
    apply();
    mq?.addEventListener?.('change', apply);
    if (!hasWebGL()) st.failWebgl();
    return () => mq?.removeEventListener?.('change', apply);
  }, []);

  // Easter egg: konami code or typing "atrx".
  useEffect(() => {
    const egg = createEggDetector(() => usePlanets.getState().triggerSignalMode());
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      egg.key(e.key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lenis smooth scroll piped into GSAP's ticker; scroll progress + section spy.
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    usePlanets.getState().setLenis(lenis);
    const onScroll = (e: Lenis) => {
      const st = usePlanets.getState();
      const limit = e.limit || 1;
      st.progress.current = Math.min(1, Math.max(0, e.scroll / limit));
      const y = e.scroll + window.innerHeight * 0.45;
      let cur: SectionId = 'hero';
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(`sec-${id}`);
        if (el && el.offsetTop <= y) cur = id;
      }
      st.setActiveSection(cur);
    };
    lenis.on('scroll', onScroll);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      usePlanets.getState().setLenis(null);
    };
  }, []);

  // Escape closes the dossier panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') usePlanets.getState().setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Preload planet textures (CDN with procedural fallback), then mount the stage.
  useEffect(() => {
    if (statik) return;
    let live = true;
    loadAll(PLANETS, (f) => {
      if (live) usePlanets.getState().setLoadProgress(Math.round(f * 100));
    })
      .then(() => {
        if (live) usePlanets.getState().setTexturesReady();
      })
      .catch(() => {
        if (live) usePlanets.getState().setTexturesReady();
      });
    return () => {
      live = false;
    };
  }, [statik]);

  if (statik) return <StaticPage />;

  return (
    <>
      <SceneBoundary>
        <Scene />
      </SceneBoundary>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Page />
      <Preloader />
      <Cursor />
      <NavDots />
      <ProgressBar />
      <PauseButton />
      <SignalToast />
      <ProjectPanel />
    </>
  );
}
