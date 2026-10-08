import * as THREE from 'three';
import type { PlanetConfig } from '../data/planets';

/**
 * Runtime texture pipeline. Textures load from CDN (Solar System Scope 2K +
 * the three.js Earth stack via jsDelivr) with a TextureLoader; anything that
 * fails falls back to a procedural canvas in the planet's palette so nothing
 * is ever black. Loaded sets are cached by project slug and read
 * synchronously by the Planet components after the App-level preload.
 */

export interface LoadedSet {
  day: THREE.Texture;
  night: THREE.Texture | null;
  clouds: THREE.Texture | null;
  ring: THREE.Texture | null;
}

const loaded = new Map<string, LoadedSet>();

export function getLoaded(slug: string): LoadedSet | undefined {
  return loaded.get(slug);
}

function canvasTexture(
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

/** Never-black fallback surface in the planet's palette. */
export function fallbackSurface(colors: [string, string]): THREE.Texture {
  return canvasTexture(512, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, colors[0]);
    g.addColorStop(1, colors[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 700; i++) {
      ctx.fillStyle = `rgba(255,255,255,${(Math.random() * 0.05).toFixed(3)})`;
      const r = 1 + Math.random() * 3;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, r, 0, 7);
      ctx.fill();
    }
  });
}

let sharedClouds: THREE.Texture | null = null;

/** Soft procedural cloud wisps, shared by every non-Earth planet. */
export function proceduralClouds(): THREE.Texture {
  if (sharedClouds) return sharedClouds;
  const t = canvasTexture(512, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 130; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 8 + Math.random() * 34;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const a = 0.05 + Math.random() * 0.16;
      g.addColorStop(0, `rgba(255,255,255,${a.toFixed(3)})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 7);
      ctx.fill();
    }
  });
  // Clouds are lit by MeshLambertMaterial (built-in pipeline) — sRGB is correct here.
  t.colorSpace = THREE.SRGBColorSpace;
  sharedClouds = t;
  return t;
}

function fallbackRing(): THREE.Texture {
  const t = canvasTexture(256, 8, (ctx, w, h) => {
    for (let x = 0; x < w; x++) {
      const a = 0.25 + 0.55 * Math.abs(Math.sin(x * 0.11)) * Math.abs(Math.sin(x * 0.031 + 1.7));
      ctx.fillStyle = `rgba(214,186,140,${a.toFixed(3)})`;
      ctx.fillRect(x, 0, 1, h);
    }
  });
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export async function loadAll(
  configs: PlanetConfig[],
  onProgress: (fraction: number) => void,
): Promise<void> {
  const manager = new THREE.LoadingManager();
  manager.onProgress = (_url, done, total) => onProgress(total > 0 ? done / total : 1);
  const loader = new THREE.TextureLoader(manager);
  loader.setCrossOrigin('anonymous');

  const one = (url: string, fallback: () => THREE.Texture): Promise<THREE.Texture> =>
    loader
      .loadAsync(url)
      .then((t) => {
        // Deliberately NOT marking colorSpace: the custom surface shader has no
        // colorspace chunk, so passthrough keeps the authored look exact.
        t.wrapS = THREE.RepeatWrapping;
        t.anisotropy = 4;
        return t;
      })
      .catch(() => fallback());

  await Promise.all(
    configs.map(async (cfg) => {
      const set: LoadedSet = { day: fallbackSurface(cfg.fallback), night: null, clouds: null, ring: null };
      if (cfg.dayUrl) set.day = await one(cfg.dayUrl, () => fallbackSurface(cfg.fallback));
      if (cfg.nightUrl) set.night = await one(cfg.nightUrl, () => fallbackSurface(['#000000', '#000000']));
      if (cfg.cloudUrl) {
        const clouds = await one(cfg.cloudUrl, proceduralClouds);
        clouds.colorSpace = THREE.SRGBColorSpace;
        set.clouds = clouds;
      } else if (cfg.kind !== 'lava' && cfg.kind !== 'moon') {
        set.clouds = proceduralClouds();
      }
      if (cfg.ring) set.ring = await one(cfg.ring.url, fallbackRing);
      loaded.set(cfg.slug, set);
    }),
  );
  onProgress(1);
}
