import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { profile } from "../data/profile";

export function FieldNotes() {
  const [index, setIndex] = useState(0);
  const principle = profile.principles[index];

  const move = (direction: number) => {
    setIndex((current) => (current + direction + profile.principles.length) % profile.principles.length);
  };

  return (
    <section id="about" className="field-notes section-shell" aria-labelledby="field-notes-title">
      <div className="field-note-portrait motion-visual" aria-hidden="true">
        <img
          className="field-note-art"
          src="/atrx-portrait.jpg"
          alt=""
          width="1080"
          height="1080"
          loading="lazy"
          decoding="async"
        />
        <div className="portrait-stack" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="field-note-copy">
        <Quote size={30} aria-hidden="true" />
        <p className="eyebrow">About Arppith Andrews</p>
        <h2 id="field-notes-title">ENGINEERING STUDENT. AI &amp; AUTOMATION BUILDER.</h2>
        <p className="about-identity">
          <strong>Software developer and web developer focused on local AI, real-time systems, and automation.</strong>
          {" "}I'm Arppith Andrews, based in Kerala, India. I build across native desktop software, browser
          interfaces, bots, cloud infrastructure, and real hardware. Keyboards and music technology keep
          the work pleasantly strange.
        </p>
        <p className="eyebrow principle-kicker">
          Operating principle {index + 1} of {profile.principles.length}
        </p>
        <h3>{principle.title.toUpperCase()}.</h3>
        <blockquote aria-live="polite">{principle.body}</blockquote>
        <div className="carousel-controls">
          <button type="button" className="icon-button" onClick={() => move(-1)} aria-label="Previous principle">
            <ArrowLeft size={19} />
          </button>
          <div aria-hidden="true">
            {profile.principles.map((item, itemIndex) => (
              <i key={item.title} className={itemIndex === index ? "is-active" : ""} />
            ))}
          </div>
          <button type="button" className="icon-button" onClick={() => move(1)} aria-label="Next principle">
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
