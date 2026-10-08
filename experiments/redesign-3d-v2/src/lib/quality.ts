/** Device-tier detection for quality scaling — pure-ish, safe in SSR/tests. */
import type { Quality } from '../store';

export function detectQuality(): Quality {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'high';
  const mm = typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: coarse)') : null;
  const coarse = mm?.matches ?? false;
  const small = Math.min(window.innerWidth || 1024, window.innerHeight || 768) < 500;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 8;
  if (coarse || small || cores <= 4) return 'low';
  if (cores <= 6) return 'medium';
  return 'high';
}

export function dprFor(q: Quality): number {
  if (typeof window === 'undefined') return 1;
  const dpr = window.devicePixelRatio || 1;
  if (q === 'high') return Math.min(dpr, 2);
  if (q === 'medium') return Math.min(dpr, 1.5);
  return 1.25;
}

export function starCountFor(q: Quality): number {
  if (q === 'high') return 3200;
  if (q === 'medium') return 1600;
  return 700;
}

export function hasWebGL(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}
