import { ArrowDownRight, Github, Radio } from "lucide-react";
import { profile } from "../data/profile";
import type { VisitorMode } from "../types";
import { VisitorModeSwitch } from "./VisitorModeSwitch";

type Props = {
  mode: VisitorMode;
  onModeChange: (mode: VisitorMode) => void;
};

const supportByMode: Record<VisitorMode, string> = {
  recruiter:
    "Engineering student turning ambitious ideas into systems that survive real users, real hardware, and repeated testing.",
  developer:
    "Working across Rust orchestration, local inference, durable state, edge real-time infrastructure, and interfaces that expose the truth.",
  chaos:
    "Built from scratch. Shipped from chaos. Repeatedly tested until the unusual part becomes useful.",
};

export function Hero({ mode, onModeChange }: Props) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />

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
            <a className="button button--light" href="#projects">
              Explore systems <ArrowDownRight size={18} />
            </a>
            <a className="button button--outline" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Github size={18} />
            </a>
          </div>
        </div>

        <div className="hero-sticker motion-visual" aria-hidden="true">
          <img
            src="/atrx-sticker.png"
            alt=""
            width="960"
            height="751"
          />
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
