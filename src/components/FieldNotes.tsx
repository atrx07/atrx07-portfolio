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
    <section className="field-notes section-shell" aria-labelledby="field-notes-title">
      <div className="field-note-portrait motion-visual" aria-hidden="true">
        <img src="/atrx-sticker.png" alt="" width="960" height="751" />
        <div className="portrait-stack" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="field-note-copy">
        <Quote size={30} aria-hidden="true" />
        <p className="eyebrow">Operating principle {index + 1} of {profile.principles.length}</p>
        <h2 id="field-notes-title">{principle.title.toUpperCase()}.</h2>
        <blockquote>{principle.body}</blockquote>
        <p>
          I'm an engineering student in Kerala, moving between native desktop software, browser interfaces,
          bots, cloud infrastructure, and real hardware. Keyboards and music technology keep the work
          pleasantly strange.
        </p>
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
