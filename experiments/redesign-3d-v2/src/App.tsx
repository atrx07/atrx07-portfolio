import { Component, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Scene from './three/Scene';
import { WORLD_ORDER, useWorlds } from './store';
import { worldIndexForProgress } from './lib/camera';
import { createEggDetector } from './lib/easterEgg';
import { detectQuality, hasWebGL } from './lib/quality';
import { Preloader } from './dom/Preloader';
import { Cursor } from './dom/Cursor';
import { Chrome, SignalToast } from './dom/Chrome';
import { Chapters } from './dom/Chapters';
import { ProjectPanel, SkillPanel } from './dom/Panels';
import { Fallback } from './dom/Fallback';
import './style.css';

/** If the WebGL scene throws, fall back to the readable static page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    useWorlds.getState().failWebgl();
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export default function App() {
  const webglFailed = useWorlds((s) => s.webglFailed);
  const failWebgl = useWorlds((s) => s.failWebgl);
  const setQuality = useWorlds((s) => s.setQuality);
  const setReducedMotion = useWorlds((s) => s.setReducedMotion);
  const setLenis = useWorlds((s) => s.setLenis);
  const triggerSignalMode = useWorlds((s) => s.triggerSignalMode);

  // Device tier, reduced-motion, and the WebGL probe.
  useEffect(() => {
    setQuality(detectQuality());
    const mq = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const apply = () => setReducedMotion(!!mq?.matches);
    apply();
    mq?.addEventListener?.('change', apply);
    if (!hasWebGL()) failWebgl();
    return () => mq?.removeEventListener?.('change', apply);
  }, [setQuality, setReducedMotion, failWebgl]);

  // Easter egg: konami code or typing "atrx".
  useEffect(() => {
    const egg = createEggDetector(triggerSignalMode);
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      egg.key(e.key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [triggerSignalMode]);

  // Lenis smooth scroll piped into GSAP's ticker; one normalized progress
  // value drives the camera rig, chapters, and progress bar.
  useEffect(() => {
    if (webglFailed) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    const onScroll = (e: Lenis) => {
      const p = e.limit > 0 ? Math.min(1, Math.max(0, e.scroll / e.limit)) : 0;
      const st = useWorlds.getState();
      st.progress.current = p;
      st.setActiveWorld(WORLD_ORDER[worldIndexForProgress(p)]);
    };
    lenis.on('scroll', onScroll);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [webglFailed, setLenis]);

  return (
    <div className="app">
      <Preloader />
      <Cursor />
      {webglFailed ? (
        <Fallback />
      ) : (
        <>
          <div className="canvas-wrap" aria-hidden="true">
            <SceneBoundary>
              <Scene />
            </SceneBoundary>
          </div>
          <Chrome />
          <Chapters />
          <ProjectPanel />
          <SkillPanel />
          <SignalToast />
          <div className="vignette" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
        </>
      )}
    </div>
  );
}
