/** Scroll-driven camera rig math — pure functions, tested. */

export interface Waypoint {
  /** Global scroll progress at this keyframe, 0..1. */
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

/**
 * One persistent camera flight through the five worlds.
 * z decreases as you scroll: hero (0) -> projects (-22) -> skills (-44)
 * -> principles (-66) -> contact (-88).
 */
export const WAYPOINTS: Waypoint[] = [
  { p: 0.0, pos: [0, 2.8, 16], look: [0, 0.6, 0], fov: 55 },
  { p: 0.2, pos: [0, 3.6, -4], look: [0, 1.0, -22], fov: 62 },
  { p: 0.4, pos: [0, 3.6, -26], look: [0, 1.0, -44], fov: 62 },
  { p: 0.6, pos: [0, 3.6, -48], look: [0, 1.0, -66], fov: 62 },
  { p: 0.8, pos: [0, 3.8, -68], look: [0, 1.2, -88], fov: 58 },
  { p: 1.0, pos: [0, 4.4, -72], look: [0, 1.2, -88], fov: 55 },
];

export interface Pose {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

export function smootherstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * c * (c * (c * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function poseOf(w: Waypoint): Pose {
  return { pos: [...w.pos] as [number, number, number], look: [...w.look] as [number, number, number], fov: w.fov };
}

/** Sample the camera pose for a global scroll progress value. */
export function sampleWaypoints(p: number, wps: Waypoint[] = WAYPOINTS): Pose {
  const c = Math.min(1, Math.max(0, p));
  if (c <= wps[0].p) return poseOf(wps[0]);
  for (let i = 0; i < wps.length - 1; i++) {
    const a = wps[i];
    const b = wps[i + 1];
    if (c <= b.p) {
      const t = smootherstep((c - a.p) / (b.p - a.p));
      return {
        pos: [lerp(a.pos[0], b.pos[0], t), lerp(a.pos[1], b.pos[1], t), lerp(a.pos[2], b.pos[2], t)],
        look: [lerp(a.look[0], b.look[0], t), lerp(a.look[1], b.look[1], t), lerp(a.look[2], b.look[2], t)],
        fov: lerp(a.fov, b.fov, t),
      };
    }
  }
  return poseOf(wps[wps.length - 1]);
}

/** Which world index (0..4) owns a given scroll progress. */
export function worldIndexForProgress(p: number): number {
  const c = Math.min(1, Math.max(0, p));
  return Math.min(4, Math.floor(c * 5));
}
