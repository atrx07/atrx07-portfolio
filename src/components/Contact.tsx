import { Check, Clipboard, Github, Instagram, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { MaskButton, MaskLink } from "./godui/mask-button";

type Props = {
  copied: boolean;
  onCopyEmail: () => void;
};

export function Contact({ copied, onCopyEmail }: Props) {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-backdrop" aria-hidden="true">
        <span>ATRX</span>
      </div>
      <div className="contact-inner section-shell">
        <p className="eyebrow">Final transmission</p>
        <h2 id="contact-title">BRING AN INTERESTING PROBLEM.</h2>
        <p>
          Open to internships, collaboration, AI and automation work, and engineering problems that deserve
          more than a quick demo.
        </p>
        <div className="contact-actions">
          <MaskLink className="button" href={`mailto:${profile.email}`} mask="nature" variant="primary">
            <Mail size={18} />
            Start a conversation
          </MaskLink>
          <MaskButton className="button" type="button" onClick={onCopyEmail} mask="forest" variant="secondary">
            {copied ? <Check size={18} /> : <Clipboard size={18} />}
            {copied ? "Email copied" : "Copy email"}
          </MaskButton>
        </div>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={18} />
            github.com/atrx07
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            <Instagram size={18} />
            @atrx07
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} />
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
