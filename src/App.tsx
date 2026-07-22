import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArchitecturePlayground } from "./components/ArchitecturePlayground";
import { CapabilityMap } from "./components/CapabilityMap";
import { CommandPalette } from "./components/CommandPalette";
import { Contact } from "./components/Contact";
import { ExperimentRack } from "./components/ExperimentRack";
import { FieldNotes } from "./components/FieldNotes";
import { Flagship } from "./components/Flagship";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PortfolioTerminal } from "./components/PortfolioTerminal";
import { ProjectLab } from "./components/ProjectLab";
import { useDiscovery } from "./hooks/useDiscovery";
import { useSignalAudio } from "./hooks/useSignalAudio";
import { useSignalMode } from "./hooks/useSignalMode";
import { useVisitorMode } from "./hooks/useVisitorMode";
import { profile, siteMetadata } from "./data/profile";
import type { Project } from "./types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useVisitorMode();
  const { count, discovered, discover } = useDiscovery();
  const { active: signalActive, activate: activateSignal, deactivate: deactivateSignal } = useSignalMode();
  const { muted, toggleMuted, playSignal } = useSignalAudio();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [requestedProject, setRequestedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSystemLog, setShowSystemLog] = useState(false);
  const lastDiscovered = discovered[discovered.length - 1];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".motion-visual").forEach((element) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: element,
              start: "top 95%",
              end: "bottom 10%",
              scrub: 0.65,
            },
          })
          .fromTo(element, { scale: 0.82, opacity: 0.5 }, { scale: 1, opacity: 1 })
          .to(element, { opacity: 0.28 });
      });
    },
    { scope: mainRef },
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
    };

    const onVisibilityChange = () => {
      document.title = document.hidden ? "signal paused // ATRX" : siteMetadata.title;
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!lastDiscovered) return;
    setShowSystemLog(true);
    const timeout = window.setTimeout(() => setShowSystemLog(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [lastDiscovered]);

  const copyEmail = useCallback(async () => {
    let didCopy = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
        didCopy = true;
      }
    } catch {
      // Fall through to the selection-based copy path below.
    }

    if (!didCopy) {
      const textarea = document.createElement("textarea");
      textarea.value = profile.email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        didCopy = document.execCommand("copy");
      } finally {
        textarea.remove();
      }
    }

    if (didCopy) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }, []);

  const openProject = useCallback(
    (project: Project) => {
      setRequestedProject(project);
      discover(project.slug);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [discover],
  );

  const openTerminal = useCallback(() => {
    document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => terminalInputRef.current?.focus(), 600);
  }, []);

  return (
    <div className={signalActive ? "app-shell signal-mode" : "app-shell"}>
      <Header
        mode={mode}
        onModeChange={setMode}
        onOpenPalette={() => setPaletteOpen(true)}
        muted={muted}
        onToggleMuted={toggleMuted}
        discoveredCount={count}
      />

      <main id="main" ref={mainRef} className="overflow-x-hidden w-full max-w-full">
        <Hero mode={mode} onModeChange={setMode} />
        <Flagship mode={mode} />
        <ProjectLab
          mode={mode}
          onDiscover={discover}
          requestedProject={requestedProject}
          onRequestedProjectHandled={() => setRequestedProject(null)}
        />
        <ArchitecturePlayground onDiscover={discover} />
        <ExperimentRack />
        <PortfolioTerminal
          ref={terminalInputRef}
          onModeChange={setMode}
          onSignal={activateSignal}
          onPlaySignal={playSignal}
          onDiscover={discover}
        />
        <CapabilityMap />
        <FieldNotes />
        <Contact copied={copied} onCopyEmail={copyEmail} />
      </main>

      <Footer />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onModeChange={setMode}
        onOpenProject={openProject}
        onOpenTerminal={openTerminal}
        onCopyEmail={copyEmail}
      />

      {lastDiscovered && showSystemLog && (
        <div className="system-log" aria-live="polite">
          <span>system discovered</span>
          <strong>{lastDiscovered}</strong>
          <i>{count}/6</i>
        </div>
      )}

      {signalActive && (
        <div className="signal-overlay" role="status">
          <div>
            <span>ATRX SIGNAL MODE</span>
            <button type="button" onClick={deactivateSignal}>
              Exit signal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
