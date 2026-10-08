import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useWorlds } from '../store';

/** Percentage preloader — quick choreography (~1.4s), not a loading screen. */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const booted = useWorlds((s) => s.booted);
  const setBooted = useWorlds((s) => s.setBooted);
  const reduced = useWorlds((s) => s.reducedMotion);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      setBooted();
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const el = (now - start) / 1300;
      if (el >= 1) {
        setPct(100);
        window.setTimeout(() => setBooted(), 200);
        return;
      }
      setPct(Math.min(96, Math.floor(el * 100)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setBooted, reduced]);

  useEffect(() => {
    if (booted && root.current && !gone) {
      gsap.to(root.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => setGone(true),
      });
    }
  }, [booted, gone]);

  if (gone) return null;

  return (
    <div ref={root} className="preloader" role="status" aria-label="Loading ATRX Worlds">
      <div className="preloader-inner">
        <p className="preloader-brand">ATRX&nbsp;WORLDS</p>
        <p className="preloader-pct">{pct}%</p>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <p className="preloader-tip">scroll to fly · click the planets · the konami code works here</p>
      </div>
    </div>
  );
}
