import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Cpu, Database, HardDrive, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { projects } from "../data/projects";
import type { VisitorMode } from "../types";
import { ProjectVisual } from "./ProjectVisual";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const neuraloc = projects[0];

const capabilityIcons = [HardDrive, Cpu, Database, ShieldCheck];

export function Flagship({ mode }: { mode: VisitorMode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState(neuraloc.architecture?.[0]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top+=104",
          end: "bottom bottom-=80",
          pin: titleRef.current,
          pinSpacing: false,
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
          <p className="eyebrow">Active development / local-first Windows</p>
          <h2 id="flagship-title">THE LOCAL AI CONTROL CENTER I WANTED TO TRUST.</h2>
          <p>
            NeuraLoc-Core is where interface craft meets process ownership, hardware limits, durable state,
            and verified native inference.
          </p>
          <a className="text-link" href={neuraloc.repoUrl} target="_blank" rel="noreferrer">
            Inspect repository <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="flagship-content">
          <div className="flagship-visual flagship-motion">
            <ProjectVisual project={neuraloc} />
            <div className="flagship-overlay">
              <span>runtime / b9986</span>
              <span>context / token exact</span>
              <span>state / durable</span>
            </div>
          </div>

          <div className="architecture-strip flagship-motion" aria-label="NeuraLoc-Core architecture">
            <div className="architecture-nodes">
              {neuraloc.architecture?.map((node, index) => (
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
              <h3>THE UNGLAMOROUS PARTS ARE THE PRODUCT.</h3>
              <ul>
                {neuraloc.proofPoints.map((point) => (
                  <li key={point}>
                    <Check size={17} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>

            <article className="proof-side">
              {capabilityIcons.slice(0, 2).map((Icon, index) => (
                <div key={neuraloc.technologies[index]}>
                  <Icon size={20} aria-hidden="true" />
                  <span>{index === 0 ? "Local by default" : "Owned lifecycle"}</span>
                  <strong>{index === 0 ? "Network off" : "Launch / cancel / stop"}</strong>
                </div>
              ))}
            </article>

            <article className="proof-side proof-side--next">
              <p className="eyebrow">Next checkpoint</p>
              <p>{neuraloc.next}</p>
              {mode !== "recruiter" && <small>{neuraloc.constraints?.join(" ")}</small>}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
