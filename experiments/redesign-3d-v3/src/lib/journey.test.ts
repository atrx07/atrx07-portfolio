import { describe, expect, it } from 'vitest';
import { JOURNEY, clamp01, sampleJourney } from './journey';

describe('sampleJourney', () => {
  it('starts exactly at the first waypoint', () => {
    const s = sampleJourney(0);
    expect(s.pos).toEqual(JOURNEY[0].pos);
    expect(s.look).toEqual(JOURNEY[0].look);
  });

  it('ends exactly at the last waypoint', () => {
    const s = sampleJourney(1);
    const last = JOURNEY[JOURNEY.length - 1];
    expect(s.pos).toEqual(last.pos);
    expect(s.look).toEqual(last.look);
  });

  it('clamps out-of-range progress', () => {
    expect(sampleJourney(-2).pos).toEqual(sampleJourney(0).pos);
    expect(sampleJourney(99).pos).toEqual(sampleJourney(1).pos);
  });

  it('moves monotonically along the journey (no jumps)', () => {
    let prev: number | null = null;
    for (let i = 0; i <= 40; i++) {
      const s = sampleJourney(i / 40);
      // camera z travels from near (9.5) to far (-72): strictly decreasing
      if (prev !== null) expect(s.pos[2]).toBeLessThanOrEqual(prev + 1e-9);
      prev = s.pos[2];
    }
  });

  it('interpolates smoothly between waypoints', () => {
    const a = sampleJourney(0.1);
    const b = sampleJourney(0.1001);
    const dist = Math.hypot(a.pos[0] - b.pos[0], a.pos[1] - b.pos[1], a.pos[2] - b.pos[2]);
    expect(dist).toBeLessThan(0.05);
  });
});

describe('clamp01', () => {
  it('clamps', () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2)).toBe(1);
    expect(clamp01(0.4)).toBe(0.4);
  });
});
