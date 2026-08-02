import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RoutePageShell } from "./RoutePageShell";

export function BlogIndexPage() {
  return (
    <RoutePageShell>
      <section className="route-foundation" aria-labelledby="field-notes-route-title">
        <div className="route-foundation__copy">
          <p className="route-kicker">ATRX / FIELD NOTES</p>
          <h1 id="field-notes-route-title" data-route-heading tabIndex={-1}>
            FIELD NOTES
          </h1>
          <p className="route-deck">
            Systems, experiments, failures, and engineering decisions from the ATRX workbench.
          </p>
        </div>

        <div className="route-foundation__status" aria-labelledby="field-notes-status-title">
          <p>ROUTE FOUNDATION</p>
          <h2 id="field-notes-status-title">The archive is being assembled.</h2>
          <p>
            Published notes will appear here only after their technical claims, metadata, and direct routes
            have been verified. No filler posts are standing in for real work.
          </p>
          <div className="route-actions">
            <Link className="button button--light" to="/#projects">
              Explore projects <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="button button--outline" to="/">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </RoutePageShell>
  );
}
