import { Page } from './Sections';

/**
 * Readable static page for WebGL failure or prefers-reduced-motion:
 * the same real portfolio content over a CSS starfield, no canvas.
 */
export function StaticPage() {
  return (
    <div className="static-shell">
      <div className="static-stars" aria-hidden="true" />
      <Page />
    </div>
  );
}
