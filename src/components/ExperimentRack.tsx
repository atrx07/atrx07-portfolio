import { ArrowUpRight, FlaskConical } from "lucide-react";
import { experiments } from "../data/profile";

export function ExperimentRack() {
  return (
    <section className="experiment-rack section-shell" aria-labelledby="experiments-title">
      <div className="rack-heading" data-reveal>
        <div>
          <p className="eyebrow">Lab notes and smaller systems</p>
          <h2 id="experiments-title">THE WORKBENCH NEVER REALLY CLOSES.</h2>
        </div>
        <FlaskConical size={36} aria-hidden="true" />
      </div>

      <div className="experiment-list">
        {experiments.map((experiment, index) => (
          <article key={experiment.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{experiment.name}</h3>
              <p>{experiment.detail}</p>
            </div>
            <small>{experiment.kind}</small>
            {experiment.url ? (
              <a href={experiment.url} target="_blank" rel="noreferrer" aria-label={`Open ${experiment.name}`}>
                <ArrowUpRight size={19} />
              </a>
            ) : (
              <i aria-hidden="true" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
