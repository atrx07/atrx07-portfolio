import { capabilityGroups } from "../data/profile";

export function CapabilityMap() {
  return (
    <section className="capability-map section-shell" aria-labelledby="capability-title">
      <div className="capability-heading" data-reveal>
        <p className="eyebrow">Capability map</p>
        <h2 id="capability-title">TOOLS GROUPED BY THE PROBLEM THEY SOLVE.</h2>
      </div>

      <div className="capability-grid">
        {capabilityGroups.map((group, index) => (
          <article key={group.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{group.title}</h3>
            <div>
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
