import type { Quality } from '../store';

/** True when the browser can create a WebGL context at all. */
export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * One-shot device tier used to gate texture sizes, atmosphere/cloud shells,
 * star counts and DPR. Transparent overdraw (cloud + fresnel shells) is the
 * mobile killer, so the low tier drops those layers entirely.
 */
export function detectQuality(): Quality {
  if (typeof window === 'undefined') return 'high';
  const coarse =
    typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
  const small = Math.min(window.innerWidth || 1280, window.innerHeight || 800) < 700;
  const dpr = window.devicePixelRatio || 1;
  if (coarse && (small || dpr > 2.5)) return 'low';
  if (coarse || small) return 'medium';
  return 'high';
}
