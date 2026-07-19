import {
  Github,
  Menu,
  Search,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import type { VisitorMode } from "../types";
import { VisitorModeSwitch } from "./VisitorModeSwitch";

type Props = {
  mode: VisitorMode;
  onModeChange: (mode: VisitorMode) => void;
  onOpenPalette: () => void;
  muted: boolean;
  onToggleMuted: () => void;
  discoveredCount: number;
};

const links = [
  { href: "#now", label: "Now building" },
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#terminal", label: "Terminal" },
  { href: "#contact", label: "Contact" },
];

export function Header({
  mode,
  onModeChange,
  onOpenPalette,
  muted,
  onToggleMuted,
  discoveredCount,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);

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
        <a className="wordmark" href="#top" aria-label="ATRX home">
          <img src="/atrx-mark.png" alt="" width="1396" height="1127" />
          <span className="sr-only">ATRX</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <span className="availability">
            <i aria-hidden="true" />
            Available
          </span>
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
            <kbd>⌘K</kbd>
          </button>
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
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <VisitorModeSwitch mode={mode} onChange={onModeChange} />
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <Github size={18} />
          </a>
        </div>
      )}
    </header>
  );
}
