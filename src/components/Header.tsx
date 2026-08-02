import {
  Github,
  Menu,
  Search,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import type { VisitorMode } from "../types";
import { VisitorModeSwitch } from "./VisitorModeSwitch";

type Props = {
  mode?: VisitorMode;
  onModeChange?: (mode: VisitorMode) => void;
  onOpenPalette?: () => void;
  muted?: boolean;
  onToggleMuted?: () => void;
  discoveredCount?: number;
  showPortfolioControls?: boolean;
};

const links = [
  { id: "now", label: "Now building" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "about", label: "About" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
];

export function Header({
  mode,
  onModeChange,
  onOpenPalette,
  muted,
  onToggleMuted,
  discoveredCount = 0,
  showPortfolioControls = false,
}: Props) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const isPortfolio = location.pathname === "/";
  const visibleLinks = isPortfolio
    ? links
    : links.filter((link) => ["projects", "architecture", "about", "contact"].includes(link.id));

  const sectionHref = (id: string) => (isPortfolio ? `#${id}` : `/#${id}`);

  const renderSectionLink = (id: string, label: string, onClick?: () => void) => {
    const href = sectionHref(id);
    return isPortfolio ? (
      <a key={id} href={href} onClick={onClick}>
        {label}
      </a>
    ) : (
      <Link key={id} to={href} onClick={onClick}>
        {label}
      </Link>
    );
  };

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="header-inner">
        {isPortfolio ? (
          <a className="wordmark header-wordmark" href="#top" aria-label="ATRX07 home">
            <HeaderWordmark />
          </a>
        ) : (
          <Link className="wordmark header-wordmark" to="/" aria-label="ATRX07 home">
            <HeaderWordmark />
          </Link>
        )}

        <nav className="desktop-nav" aria-label="Primary navigation">
          {visibleLinks.map((link) => renderSectionLink(link.id, link.label))}
          <Link to="/blog" aria-current={location.pathname.startsWith("/blog") ? "page" : undefined}>
            Field Notes
          </Link>
        </nav>

        <div className="header-actions">
          <span className="availability">
            <i aria-hidden="true" />
            Available
          </span>
          {showPortfolioControls && (
            <>
              <span className="discovery-count" aria-live="polite">
                {discoveredCount}/6 found
              </span>
              <button
                className="icon-button"
                type="button"
                onClick={onToggleMuted}
                aria-label={muted ? "Enable signal sound" : "Mute signal sound"}
                title={muted ? "Enable signal sound" : "Mute signal sound"}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                className="palette-button"
                type="button"
                onClick={onOpenPalette}
                aria-label="Open command palette"
              >
                <Search size={17} />
                <span>Command</span>
                <kbd>Ctrl K</kbd>
              </button>
            </>
          )}
          <a
            className="icon-button desktop-only"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Open GitHub profile"
            title="GitHub"
          >
            <Github size={19} />
          </a>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="mobile-nav">
          <nav aria-label="Mobile navigation">
            {!isPortfolio && (
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            )}
            {links.map((link) => renderSectionLink(link.id, link.label, () => setMenuOpen(false)))}
            <Link
              to="/blog"
              aria-current={location.pathname.startsWith("/blog") ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Field Notes
            </Link>
          </nav>
          {showPortfolioControls && mode && onModeChange && (
            <VisitorModeSwitch mode={mode} onChange={onModeChange} />
          )}
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <Github size={18} />
          </a>
        </div>
      )}
    </header>
  );
}

function HeaderWordmark() {
  return (
    <>
      <span className="header-wordmark-label">ATRX07</span>
      <span className="header-signal" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </>
  );
}
