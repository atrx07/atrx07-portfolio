import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Database, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { projects } from "../data/projects";
import type { VisitorMode } from "../types";
import { ProjectVisual } from "./ProjectVisual";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const traelyx = projects.find((project) => project.slug === "traelyx")!;

const capabilityIcons = [ShieldCheck, Database];

export function Flagship({ mode }: { mode: VisitorMode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState(traelyx.architecture?.[0]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => {
            const section = sectionRef.current;
            const title = titleRef.current;
            if (!section || !title) return 0;

            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const sectionPadding = Number.parseFloat(window.getComputedStyle(section).paddingTop) || 0;
            const headerHeight =
              document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ?? 72;
            const centeredTop = Math.max(headerHeight + 4, (window.innerHeight - title.offsetHeight) / 2);

            return sectionTop + sectionPadding - centeredTop;
          },
          end: "bottom bottom",
          pin: titleRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        gsap.to(titleRef.current, {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom 92%",
            end: "bottom 72%",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".flagship-motion").forEach((element) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              end: "bottom 15%",
              scrub: 0.7,
            },
          })
          .fromTo(element, { scale: 0.86, opacity: 0.35 }, { scale: 1, opacity: 1, duration: 0.55 })
          .to(element, { opacity: 0.35, duration: 0.45 });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="now" className="flagship section-shell" ref={sectionRef} aria-labelledby="flagship-title">
      <div className="flagship-grid">
        <div className="flagship-title" ref={titleRef}>
          <p className="eyebrow">Active development / local-first Android</p>
          <h2 id="flagship-title">THE PIPELINE REFUSES TO GUESS.</h2>
          <p>
            Traelyx now carries verified GNSS and motion evidence from a resilient native recorder
            through deterministic local processing, explaining what each channel can support instead
            of hiding uncertainty behind one convenient score.
          </p>
          <a className="text-link" href={traelyx.repoUrl} target="_blank" rel="noreferrer">
            Inspect repository <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="flagship-content">
          <div className="flagship-visual flagship-visual--traelyx flagship-motion">
            <ProjectVisual project={traelyx} />
            <div className="flagship-overlay">
              <span>phase / M3.7 complete</span>
              <span>processing / local</span>
              <span>fixture corpus / next gate</span>
            </div>
          </div>

          <div className="architecture-strip flagship-motion" aria-label="Traelyx architecture">
            <div className="architecture-nodes">
              {traelyx.architecture?.map((node, index) => (
                <button
                  key={node.id}
                  type="button"
                  className={selectedNode?.id === node.id ? "is-active" : ""}
                  onClick={() => setSelectedNode(node)}
                  onFocus={() => setSelectedNode(node)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{node.label}</strong>
                </button>
              ))}
            </div>
            <div className="architecture-readout" aria-live="polite">
              <span>Selected responsibility</span>
              <strong>{selectedNode?.label}</strong>
              <p>{selectedNode?.detail}</p>
            </div>
          </div>

          <div className="proof-bento flagship-motion">
            <article className="proof-main">
              <p className="eyebrow">Available now</p>
              <h3>DECODE, DERIVE, EXPLAIN—WITHOUT INVENTING CERTAINTY.</h3>
              <ul>
                {traelyx.proofPoints.map((point) => (
                  <li key={point}>
                    <Check size={17} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>

            <article className="proof-side">
              {capabilityIcons.slice(0, 2).map((Icon, index) => (
                <div key={traelyx.technologies[index]}>
                  <Icon size={20} aria-hidden="true" />
                  <span>{index === 0 ? "Accepted field proof" : "Local processing"}</span>
                  <strong>{index === 0 ? "39m17 / 3,689 chunks" : "Categorical confidence"}</strong>
                </div>
              ))}
            </article>

            <article className="proof-side proof-side--next">
              <p className="eyebrow">Next checkpoint</p>
              <p>{traelyx.next}</p>
              {mode !== "recruiter" && <small>{traelyx.constraints?.join(" ")}</small>}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
