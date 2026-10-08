import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Radio } from 'lucide-react';
import { PLANETS } from '../data/planets';
import { SECTION_LABELS, SECTION_ORDER, scrollToSection, usePlanets } from '../store';

/** Percentage preloader driven by the texture LoadingManager. */
export function Preloader() {
  const loadProgress = usePlanets((s) => s.loadProgress);
  const booted = usePlanets((s) => s.booted);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => setGone(true), 650);
    return () => clearTimeout(t);
  }, [booted]);

  if (gone) return null;
  return (
    <div className={`preloader ${booted ? 'done' : ''}`} aria-hidden={booted}>
      <div className="pre-num">{loadProgress}%</div>
      <div className="pre-bar">
        <i style={{ width: `${loadProgress}%` }} />
      </div>
      <p>Charting the {PLANETS.length} worlds…</p>
    </div>
  );
}

/** Custom cursor — fine pointers only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setFine(mq.matches);
    if (!mq.matches) return;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!fine) return null;
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

/** Section nav dots + explored-planets counter. */
export function NavDots() {
  const active = usePlanets((s) => s.activeSection);
  const opened = usePlanets((s) => s.openedPlanets.length);
  return (
    <nav className="navdots pe" aria-label="Page sections">
      {SECTION_ORDER.map((id) => (
        <button
          key={id}
          className={active === id ? 'on' : ''}
          onClick={() => scrollToSection(id)}
          aria-label={`Go to ${SECTION_LABELS[id]}`}
        >
          <i aria-hidden="true" />
          <span>{SECTION_LABELS[id]}</span>
        </button>
      ))}
      <div className="explored" aria-live="polite">
        {opened}/{PLANETS.length} explored
      </div>
    </nav>
  );
}

/** Thin scroll-progress bar (rAF-driven, no React re-renders). */
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (ref.current)
        ref.current.style.transform = `scaleX(${usePlanets.getState().progress.current})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="progressbar" aria-hidden="true">
      <div ref={ref} />
    </div>
  );
}

export function PauseButton() {
  const paused = usePlanets((s) => s.paused);
  const togglePaused = usePlanets((s) => s.togglePaused);
  return (
    <button
      className="pause-btn pe"
      onClick={togglePaused}
      aria-label={paused ? 'Resume motion' : 'Pause motion'}
      title={paused ? 'Resume motion' : 'Pause motion'}
    >
      {paused ? <Play size={15} /> : <Pause size={15} />}
    </button>
  );
}

/** Easter-egg toast: konami code or typing "atrx" → signal mode. */
export function SignalToast() {
  const signalMode = usePlanets((s) => s.signalMode);
  if (!signalMode) return null;
  return (
    <div className="signal-toast pe" role="status">
      <Radio size={14} /> Signal mode — the system is listening
    </div>
  );
}
