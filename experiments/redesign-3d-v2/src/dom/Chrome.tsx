import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { WORLD_LABELS, WORLD_ORDER, flyTo, useWorlds } from '../store';

/**
 * Fixed chrome: wordmark, scroll-progress bar, world-jump nav dots,
 * dossier counter, pause control, mobile world-stepper buttons.
 */
export function Chrome() {
  const activeWorld = useWorlds((s) => s.activeWorld);
  const paused = useWorlds((s) => s.paused);
  const togglePaused = useWorlds((s) => s.togglePaused);
  const opened = useWorlds((s) => s.openedDossiers.length);
  const reduced = useWorlds((s) => s.reducedMotion);
  const [coarse, setCoarse] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCoarse(!!window.matchMedia?.('(pointer: coarse)').matches);
  }, []);

  // Progress bar via direct DOM mutation — no React state in the scroll loop.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = useWorlds.getState().progress.current;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const idx = WORLD_ORDER.indexOf(activeWorld);
  const step = (dir: 1 | -1) => {
    const next = Math.min(WORLD_ORDER.length - 1, Math.max(0, idx + dir));
    flyTo(WORLD_ORDER[next]);
  };

  return (
    <>
      <div className="chrome-progress" aria-hidden="true">
        <div ref={bar} className="chrome-progress-fill" />
      </div>

      <header className="chrome-top">
        <button type="button" className="wordmark" data-hover onClick={() => flyTo('hero')}>
          ATRX<span className="wordmark-sub">/worlds</span>
        </button>
        <div className="chrome-top-right">
          <span className="dossier-count" title="Project dossiers opened">
            dossiers {opened}/7
          </span>
          {reduced && <span className="motion-badge">reduced motion</span>}
          <button
            type="button"
            className="icon-btn"
            data-hover
            aria-label={paused ? 'Resume motion' : 'Pause motion'}
            aria-pressed={paused}
            onClick={togglePaused}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>
      </header>

      <nav className="world-nav" aria-label="Jump to a world">
        {WORLD_ORDER.map((w) => (
          <button
            key={w}
            type="button"
            data-hover
            className={`world-nav-dot${w === activeWorld ? ' is-active' : ''}`}
            aria-label={`Fly to ${WORLD_LABELS[w]}`}
            aria-current={w === activeWorld ? 'true' : undefined}
            onClick={() => flyTo(w)}
          >
            <span className="world-nav-pip" />
            <span className="world-nav-label">{WORLD_LABELS[w]}</span>
          </button>
        ))}
      </nav>

      {coarse && (
        <div className="world-stepper">
          <button
            type="button"
            className="stepper-btn"
            disabled={idx === 0}
            onClick={() => step(-1)}
            aria-label="Previous world"
          >
            ↑ prev
          </button>
          <span className="stepper-pos">
            {idx + 1} / {WORLD_ORDER.length}
          </span>
          <button
            type="button"
            className="stepper-btn"
            disabled={idx === WORLD_ORDER.length - 1}
            onClick={() => step(1)}
            aria-label="Next world"
          >
            next ↓
          </button>
        </div>
      )}
    </>
  );
}

/** Easter-egg toast shown while signal mode is active. */
export function SignalToast() {
  const signalMode = useWorlds((s) => s.signalMode);
  if (!signalMode) return null;
  return (
    <div className="signal-toast" role="status">
      ◈ SIGNAL MODE — the lattice remembers you
    </div>
  );
}
