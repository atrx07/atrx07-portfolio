import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Database, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import type { VisitorMode } from "../types";
import { ProjectVisual } from "./ProjectVisual";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const traelyx = projects.find((project) => project.slug === "traelyx")!;

const capabilityIcons = [ShieldCheck, Database];
const compactFlagshipQuery = "(max-width: 900px)";

const isCompactFlagship = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(compactFlagshipQuery).matches;

export function Flagship({ mode }: { mode: VisitorMode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState(traelyx.architecture?.[0]);
  const [compactVisual, setCompactVisual] = useState(isCompactFlagship);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const media = window.matchMedia(compactFlagshipQuery);
    const syncLayout = () => setCompactVisual(media.matches);
    syncLayout();
    media.addEventListener("change", syncLayout);
    return () => media.removeEventListener("change", syncLayout);
  }, []);

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
          <h2 id="flagship-title">YOUR DRIVES. YOUR EVIDENCE. NO CLOUD REQUIRED.</h2>
          <p>
            Traelyx is building a trustworthy sensor-to-insight path around local data ownership,
            confidence, and explainable scoring—without pretending the roadmap is already the product.
          </p>
          <a className="text-link" href={traelyx.repoUrl} target="_blank" rel="noreferrer">
            Inspect repository <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="flagship-content">
          <div className="flagship-visual flagship-motion">
            <ProjectVisual project={traelyx} traelyxLayout={compactVisual ? "stacked" : "linear"} />
            <div className="flagship-overlay">
              <span>phase / M0 complete</span>
              <span>recorder / disabled by design</span>
              <span>cloud / optional</span>
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
              <h3>THE RECORDER STAYS OFF UNTIL THE FOUNDATION EARNS IT.</h3>
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
                  <span>{index === 0 ? "Honest capability state" : "Local authority"}</span>
                  <strong>{index === 0 ? "Recorder disabled" : "Drift schema v1"}</strong>
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
