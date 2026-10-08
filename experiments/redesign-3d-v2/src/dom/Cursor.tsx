import { useEffect, useRef } from 'react';

/**
 * Custom cursor: instant dot + lerped ring. Desktop fine-pointers only.
 * The ring shows a label when hovering 3D objects (via the `atrx-cursor`
 * window event) and grows over interactive DOM ([data-hover], links).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia?.('(pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.('[data-hover], a, button');
      ring.current?.classList.toggle('is-hot', !!t);
    };
    const onLabel = (e: Event) => {
      const detail = (e as CustomEvent<string | null>).detail;
      if (label.current) label.current.textContent = detail ?? '';
      ring.current?.classList.toggle('has-label', !!detail);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('atrx-cursor', onLabel as EventListener);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('atrx-cursor', onLabel as EventListener);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true">
        <i />
      </div>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <i />
        <span ref={label} className="cursor-label" />
      </div>
    </>
  );
}
