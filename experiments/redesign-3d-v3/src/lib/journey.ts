/** Scroll-progress → camera waypoint journey. Pure math, no three.js dependency. */

export interface Waypoint {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
}

/**
 * Keyframed camera path through the planetary system.
 * p=0 hero (Earth framing) → p≈0.2–0.55 projects (fly through the planet field)
 * → p≈0.7 wide system view → p=1 grand pull-back for contact.
 */
export const JOURNEY: Waypoint[] = [
  { p: 0.0, pos: [0, 1.4, 9.5], look: [0, 0.4, 0] },
  { p: 0.16, pos: [-2.6, 1.0, 1.5], look: [-4.6, -0.2, -8] },
  { p: 0.34, pos: [3.2, 1.2, -12.5], look: [2.0, 0.4, -22] },
  { p: 0.52, pos: [-3.0, 0.8, -30.0], look: [1.5, -0.2, -38] },
  { p: 0.7, pos: [2.8, 2.2, -42.0], look: [-1.0, 0.6, -50] },
  { p: 0.86, pos: [0, 4.5, -58.0], look: [0, 0, -28] },
  { p: 1.0, pos: [0, 8.0, -72.0], look: [0, 0, -26] },
];

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function smooth01(t: number): number {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
}

type V3 = [number, number, number];

function lerp3(a: V3, b: V3, t: number): V3 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** Sample the journey at scroll progress 0..1 (clamped). Returns camera pos + look target. */
export function sampleJourney(progress: number): { pos: V3; look: V3 } {
  const p = clamp01(progress);
  let i = 0;
  while (i < JOURNEY.length - 2 && p > JOURNEY[i + 1].p) i++;
  const a = JOURNEY[i];
  const b = JOURNEY[i + 1];
  const t = smooth01((p - a.p) / (b.p - a.p));
  return { pos: lerp3(a.pos, b.pos, t), look: lerp3(a.look, b.look, t) };
}
