import { Component, Suspense, type ErrorInfo, type ReactNode } from "react";
import { RoutePageShell } from "../pages/RoutePageShell";

type Props = {
  children: ReactNode;
};

type State = {
  failed: boolean;
};

class RouteChunkErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The public recovery state is intentionally quiet; no stack traces or user data are rendered.
  }

  render() {
    if (this.state.failed) return <RouteLoadFailure />;
    return this.props.children;
  }
}

export function RouteLoadBoundary({ children }: Props) {
  return (
    <RouteChunkErrorBoundary>
      <Suspense fallback={<RouteLoadingPage />}>{children}</Suspense>
    </RouteChunkErrorBoundary>
  );
}

export function RouteLoadingPage() {
  return (
    <RoutePageShell>
      <section className="route-foundation route-foundation--loading" aria-labelledby="route-loading-title">
        <div className="route-foundation__copy">
          <p className="route-kicker">ATRX / ROUTE LOAD</p>
          <h1 id="route-loading-title">ASSEMBLING PORTFOLIO</h1>
          <p className="route-deck">Connecting the interactive systems required by this route.</p>
        </div>

        <div className="route-foundation__status" role="status" aria-live="polite">
          <p>LOAD STATE</p>
          <h2>Portfolio systems in transit.</h2>
          <p>The route will replace this stable shell as soon as its local code is ready.</p>
        </div>
      </section>
    </RoutePageShell>
  );
}

function RouteLoadFailure() {
  return (
    <RoutePageShell>
      <section className="route-foundation route-foundation--lost" aria-labelledby="route-load-error-title">
        <div className="route-foundation__copy">
          <p className="route-kicker">ATRX / ROUTE RECOVERY</p>
          <h1 id="route-load-error-title">PORTFOLIO LOAD INTERRUPTED</h1>
          <p className="route-deck">The interactive route could not be assembled from the current asset response.</p>
        </div>

        <div className="route-foundation__status" role="alert">
          <p>RECOVERY</p>
          <h2>Reload the route once.</h2>
          <p>If the deployment changed while this tab was open, a refresh will request the current asset graph.</p>
          <div className="route-actions">
            <button className="button button--light" type="button" onClick={() => window.location.reload()}>
              Reload portfolio
            </button>
            <a className="button button--outline" href="/blog">
              Open Field Notes
            </a>
          </div>
        </div>
      </section>
    </RoutePageShell>
  );
}
