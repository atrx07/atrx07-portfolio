import { projects } from '../../../../src/data/projects';

/**
 * Planet ↔ project binding. The single source of truth for which real project
 * each planet represents. Textures: Solar System Scope 2K family (CC BY 4.0 —
 * see THIRD_PARTY.md) + the three.js Earth texture stack via jsDelivr.
 * The lava world has no good free texture, so it is fully procedural in-shader.
 */

const SSS = 'https://www.solarsystemscope.com/textures/download';
const JSD = 'https://cdn.jsdelivr.net/npm/three@0.184.0/examples/textures/planets';

export type PlanetKind = 'earth' | 'lava' | 'ice' | 'desert' | 'ringed' | 'moon' | 'gas';

export interface PlanetConfig {
  slug: string;
  name: string;
  kind: PlanetKind;
  radius: number;
  position: [number, number, number];
  /** Null for fully-procedural bodies (lava). */
  dayUrl: string | null;
  nightUrl?: string;
  cloudUrl?: string;
  /** Fresnel atmosphere rim color. */
  atmosphere: string;
  atmosphereIntensity: number;
  /** Extra cloud-layer angular speed on top of surface rotation (rad/s). */
  cloudSpeed: number;
  rotationSpeed: number;
  ring?: { inner: number; outer: number; url: string; tilt: number };
  accent: string;
  /** Fallback palette if the texture CDN is unreachable — nothing is ever black. */
  fallback: [string, string];
}

function cfg(
  slug: string,
  rest: Omit<PlanetConfig, 'slug' | 'name'>,
): PlanetConfig {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`planets.ts: no project with slug "${slug}"`);
  return { slug, name: project.name, ...rest };
}

export const PLANETS: PlanetConfig[] = [
  cfg('traelyx', {
    kind: 'earth',
    radius: 2.2,
    position: [0, 0.4, 0],
    dayUrl: `${JSD}/earth_atmos_2048.jpg`,
    nightUrl: `${JSD}/earth_lights_2048.png`,
    cloudUrl: `${JSD}/earth_clouds_1024.png`,
    atmosphere: '#3f8cff',
    atmosphereIntensity: 1.0,
    cloudSpeed: 0.012,
    rotationSpeed: 0.02,
    accent: '#6ea8ff',
    fallback: ['#1b3a5c', '#0a1626'],
  }),
  cfg('neuraloc', {
    kind: 'lava',
    radius: 1.5,
    position: [-7, -0.6, -10],
    dayUrl: null,
    atmosphere: '#ff5a1e',
    atmosphereIntensity: 1.15,
    cloudSpeed: 0,
    rotationSpeed: 0.014,
    accent: '#ff7a3c',
    fallback: ['#2a0f08', '#120604'],
  }),
  cfg('voidchat', {
    kind: 'ice',
    radius: 1.6,
    position: [6.5, 1.0, -18],
    dayUrl: `${SSS}/2k_neptune.jpg`,
    atmosphere: '#7fd8ff',
    atmosphereIntensity: 0.9,
    cloudSpeed: 0.008,
    rotationSpeed: 0.018,
    accent: '#8fe3ff',
    fallback: ['#274b63', '#0e1e2c'],
  }),
  cfg('aveline', {
    kind: 'desert',
    radius: 1.4,
    position: [-6, 0, -27],
    dayUrl: `${SSS}/2k_mars.jpg`,
    atmosphere: '#ff9a5c',
    atmosphereIntensity: 0.8,
    cloudSpeed: 0.006,
    rotationSpeed: 0.016,
    accent: '#ffb27a',
    fallback: ['#6b3d22', '#2a160c'],
  }),
  cfg('styleforge', {
    kind: 'ringed',
    radius: 2.0,
    position: [7, -1, -36],
    dayUrl: `${SSS}/2k_saturn.jpg`,
    atmosphere: '#ffd98a',
    atmosphereIntensity: 0.85,
    cloudSpeed: 0.005,
    rotationSpeed: 0.022,
    ring: { inner: 2.55, outer: 4.3, url: `${SSS}/2k_saturn_ring_alpha.png`, tilt: 0.42 },
    accent: '#ffdf9e',
    fallback: ['#6b5636', '#241c0e'],
  }),
  cfg('securescope', {
    kind: 'moon',
    radius: 1.2,
    position: [-5.5, 1.6, -45],
    dayUrl: `${SSS}/2k_moon.jpg`,
    atmosphere: '#9aa7b8',
    atmosphereIntensity: 0.55,
    cloudSpeed: 0,
    rotationSpeed: 0.01,
    accent: '#b9c6d8',
    fallback: ['#3a3f45', '#14161a'],
  }),
  cfg('atrxinstadown', {
    kind: 'gas',
    radius: 1.9,
    position: [5, 0, -54],
    dayUrl: `${SSS}/2k_jupiter.jpg`,
    atmosphere: '#ffc98f',
    atmosphereIntensity: 0.85,
    cloudSpeed: 0.007,
    rotationSpeed: 0.026,
    accent: '#ffd2a0',
    fallback: ['#6b4f30', '#221606'],
  }),
];

export function planetBySlug(slug: string): PlanetConfig | undefined {
  return PLANETS.find((p) => p.slug === slug);
}
