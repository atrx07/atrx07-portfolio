import { profile } from "../data/profile";
import { Link, useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();
  const isPortfolio = location.pathname === "/";
  const projectsHref = isPortfolio ? "#projects" : "/#projects";
  const architectureHref = isPortfolio ? "#architecture" : "/#architecture";

  return (
    <footer className="site-footer">
      <div className="signal-stripe" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="footer-inner">
        {isPortfolio ? (
          <a className="wordmark" href="#top" aria-label="Back to top">
            <FooterMark />
          </a>
        ) : (
          <Link className="wordmark" to="/" aria-label="ATRX home">
            <FooterMark />
          </Link>
        )}
        <p>Useful systems at the edge of practical and unusual.</p>
        <div>
          {isPortfolio ? <a href={projectsHref}>Projects</a> : <Link to={projectsHref}>Projects</Link>}
          {isPortfolio ? <a href={architectureHref}>Architecture</a> : <Link to={architectureHref}>Architecture</Link>}
          <Link to="/blog">Field Notes</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
        <small>Built from scratch. Shipped from chaos. Kerala, India.</small>
      </div>
    </footer>
  );
}

function FooterMark() {
  return (
    <>
      <img src="/atrx-mark.png" alt="" width="1396" height="1127" />
      <span className="sr-only">ATRX</span>
    </>
  );
}
