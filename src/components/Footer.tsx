import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="signal-stripe" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="footer-inner">
        <a className="wordmark" href="#top" aria-label="Back to top">
          <span>ATRX</span>
        </a>
        <p>Useful systems at the edge of practical and unusual.</p>
        <div>
          <a href="#projects">Projects</a>
          <a href="#architecture">Architecture</a>
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
