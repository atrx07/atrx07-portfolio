import { ArrowDownRight, Github, Radio } from "lucide-react";
import { profile } from "../data/profile";
import type { VisitorMode } from "../types";
import { MaskLink } from "./godui/mask-button";
import { VisitorModeSwitch } from "./VisitorModeSwitch";

type Props = {
  mode: VisitorMode;
  onModeChange: (mode: VisitorMode) => void;
};

const supportByMode: Record<VisitorMode, string> = {
  recruiter:
    "Engineering student, AI and automation builder, and software developer turning ambitious web and native ideas into dependable systems.",
  developer:
    "Working across Rust orchestration, local inference, durable state, edge real-time infrastructure, and interfaces that expose the truth.",
  chaos:
    "Built from scratch. Shipped from chaos. Repeatedly tested until the unusual part becomes useful.",
};

export function Hero({ mode, onModeChange }: Props) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy" data-reveal>
          <p className="hero-kicker">
            <Radio size={15} aria-hidden="true" />
            ATRX / Arppith Andrews
          </p>
          <h1 id="hero-title">
            <span className="hero-title-desktop">
              <span>USEFUL SYSTEMS</span>
              <span>AT THE EDGE OF</span>
              <strong>PRACTICAL AND UNUSUAL.</strong>
            </span>
            <span className="hero-title-mobile">
              USEFUL SYSTEMS
              <strong>AT THE EDGE OF</strong>
              <em>PRACTICAL AND UNUSUAL.</em>
            </span>
          </h1>
          <p className="hero-support">{supportByMode[mode]}</p>
          <div className="hero-actions">
            <MaskLink className="button" href="#projects" mask="urban" variant="primary">
              Explore systems <ArrowDownRight size={18} />
            </MaskLink>
            <MaskLink
              className="button"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              mask="forest"
              variant="secondary"
            >
              GitHub <Github size={18} />
            </MaskLink>
          </div>
        </div>

        <div className="hero-identity" aria-hidden="true">
          <picture>
            <source media="(max-width: 640px)" srcSet="/atrx-wide.jpg" />
            <img
              src="/atrx-portrait.jpg"
              alt=""
              width="1080"
              height="1080"
              decoding="async"
              loading="eager"
            />
          </picture>
        </div>

        <div className="hero-bottom">
          <VisitorModeSwitch mode={mode} onChange={onModeChange} />
          <div className="boot-copy" aria-label="Portfolio system status">
            <span>initializing portfolio shell...</span>
            <span>loading local-first systems...</span>
            <strong>status: operational</strong>
          </div>
          <a className="current-build" href="#now">
            <span>Currently building</span>
            <strong>NeuraLoc-Core</strong>
            <i>Active development</i>
          </a>
        </div>
      </div>

      <div className="signal-stripe signal-stripe--hero" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </section>
  );
}
