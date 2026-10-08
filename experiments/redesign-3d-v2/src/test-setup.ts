import '@testing-library/jest-dom/vitest';

// jsdom lacks these browser APIs used by the app shell.
if (typeof window !== 'undefined') {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = ((cb: FrameRequestCallback) =>
      window.setTimeout(() => cb(performance.now()), 16) as unknown as number) as typeof window.requestAnimationFrame;
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id: number) => clearTimeout(id);
  }
  if (!window.matchMedia) {
    window.matchMedia = (() => ({
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    })) as unknown as typeof window.matchMedia;
  }
  if (!window.ResizeObserver) {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof window.ResizeObserver;
  }
}
