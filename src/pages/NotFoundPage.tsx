import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { RoutePageShell } from "./RoutePageShell";

type Props = {
  articleSlug?: string;
};

export function NotFoundPage({ articleSlug }: Props) {
  const title = articleSlug ? "FIELD NOTE NOT FOUND" : "SIGNAL LOST / 404";
  const description = articleSlug
    ? `No published Field Note currently maps to /blog/${articleSlug}.`
    : "This route does not map to a published ATRX system or Field Note.";

  return (
    <RoutePageShell>
      <section className="route-foundation route-foundation--lost" aria-labelledby="not-found-title">
        <div className="route-foundation__copy">
          <p className="route-kicker">ATRX / ROUTE RECOVERY</p>
          <h1 id="not-found-title" data-route-heading tabIndex={-1}>
            {title}
          </h1>
          <p className="route-deck">{description}</p>
        </div>

        <div className="route-foundation__status">
          <p>RECOVERY PATHS</p>
          <h2>Choose a known system.</h2>
          <p>Use normal browser navigation or continue through one of the public routes below.</p>
          <div className="route-actions">
            <Link className="button button--light" to="/">
              <ArrowLeft size={17} aria-hidden="true" /> Return home
            </Link>
            <Link className="button button--outline" to="/blog">
              <BookOpen size={17} aria-hidden="true" /> Open Field Notes
            </Link>
          </div>
        </div>
      </section>
    </RoutePageShell>
  );
}
