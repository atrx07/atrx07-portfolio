import { describe, expect, it } from 'vitest';
import { sampleWaypoints, smootherstep, WAYPOINTS, worldIndexForProgress } from './camera';

describe('smootherstep', () => {
  it('clamps and eases 0 -> 0, 1 -> 1', () => {
    expect(smootherstep(0)).toBe(0);
    expect(smootherstep(1)).toBe(1);
    expect(smootherstep(-2)).toBe(0);
    expect(smootherstep(5)).toBe(1);
  });
  it('is symmetric around 0.5', () => {
    expect(smootherstep(0.5)).toBeCloseTo(0.5, 6);
  });
});

describe('sampleWaypoints', () => {
  it('returns the first pose at progress 0 and the last at 1', () => {
    const first = sampleWaypoints(0);
    const last = sampleWaypoints(1);
    expect(first.pos).toEqual(WAYPOINTS[0].pos);
    expect(last.pos).toEqual(WAYPOINTS[WAYPOINTS.length - 1].pos);
    expect(first.fov).toBe(WAYPOINTS[0].fov);
  });
  it('clamps out-of-range progress', () => {
    expect(sampleWaypoints(-1).pos).toEqual(sampleWaypoints(0).pos);
    expect(sampleWaypoints(2).pos).toEqual(sampleWaypoints(1).pos);
  });
  it('interpolates between keyframes at a waypoint boundary', () => {
    const at = sampleWaypoints(0.2);
    expect(at.pos[2]).toBeCloseTo(-4, 5);
    expect(at.look[2]).toBeCloseTo(-22, 5);
  });
  it('moves monotonically forward in z through the journey', () => {
    let prev = Infinity;
    for (let p = 0; p <= 1.0001; p += 0.05) {
      const z = sampleWaypoints(p).pos[2];
      expect(z).toBeLessThanOrEqual(prev + 1e-9);
      prev = z;
    }
  });
});

describe('worldIndexForProgress', () => {
  it('maps progress ranges to world indices 0..4', () => {
    expect(worldIndexForProgress(0)).toBe(0);
    expect(worldIndexForProgress(0.19)).toBe(0);
    expect(worldIndexForProgress(0.2)).toBe(1);
    expect(worldIndexForProgress(0.55)).toBe(2);
    expect(worldIndexForProgress(0.79)).toBe(3);
    expect(worldIndexForProgress(0.8)).toBe(4);
    expect(worldIndexForProgress(1)).toBe(4);
  });
});
