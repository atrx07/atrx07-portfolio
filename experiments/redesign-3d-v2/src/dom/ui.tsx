import { useRef } from 'react';
import gsap from 'gsap';

/** Magnetic button — translates toward the cursor, elastic release. Desktop pointers only. */
export function Magnetic({
  children,
  className = '',
  onClick,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined' || !window.matchMedia?.('(pointer: fine)').matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.4, ease: 'power3.out' });
  };
  const leave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <button
      ref={ref}
      type="button"
      data-hover
      aria-label={label}
      className={`magnetic ${className}`}
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}
