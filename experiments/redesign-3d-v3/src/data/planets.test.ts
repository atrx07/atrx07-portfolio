import { describe, expect, it } from 'vitest';
import { projects } from '../../../../src/data/projects';
import { PLANETS, planetBySlug } from './planets';

describe('PLANETS data binding', () => {
  it('defines exactly 7 project-planets', () => {
    expect(PLANETS).toHaveLength(7);
  });

  it('every planet maps to a real project slug', () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const planet of PLANETS) {
      expect(slugs.has(planet.slug)).toBe(true);
    }
  });

  it('covers every featured project exactly once', () => {
    const planetSlugs = PLANETS.map((p) => p.slug).sort();
    const projectSlugs = projects
      .filter((p) => p.featured)
      .map((p) => p.slug)
      .sort();
    expect(planetSlugs).toEqual(projectSlugs);
  });

  it('has sane geometry (positive radius, finite positions)', () => {
    for (const planet of PLANETS) {
      expect(planet.radius).toBeGreaterThan(0);
      expect(planet.position.every(Number.isFinite)).toBe(true);
      expect(planet.rotationSpeed).toBeGreaterThan(0);
    }
  });

  it('gives the lava world no texture URL (fully procedural)', () => {
    const lava = PLANETS.find((p) => p.kind === 'lava')!;
    expect(lava.dayUrl).toBeNull();
  });

  it('gives the ringed world a ring config with a texture URL', () => {
    const ringed = PLANETS.find((p) => p.kind === 'ringed')!;
    expect(ringed.ring).toBeDefined();
    expect(ringed.ring!.url).toMatch(/^https:\/\//);
  });

  it('planetBySlug resolves known slugs and misses unknown ones', () => {
    expect(planetBySlug('traelyx')?.name).toBe('Traelyx');
    expect(planetBySlug('nope')).toBeUndefined();
  });
});
