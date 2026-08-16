import type { Project } from "../types";

export const projectCategories = [
  "All",
  "Mobile & telemetry",
  "Local AI",
  "Real-time",
  "Bots & automation",
  "Music tech",
  "Security experiments",
  "Web / PWA",
] as const;

export const projects: Project[] = [
  {
    slug: "traelyx",
    name: "Traelyx",
    tagline: "Driving telemetry that explains itself.",
    summary:
      "An open-source, local-first Android platform that records verified GNSS and IMU evidence, then turns it into deterministic, confidence-aware telemetry without requiring an account or cloud.",
    categories: ["Mobile & telemetry"],
    technologies: ["Flutter", "Dart", "Kotlin", "Riverpod", "Drift", "SQLite", "Android"],
    status: "active",
    featured: true,
    repoUrl: "https://github.com/atrx07/Traelyx",
    proofPoints: [
      "M0–M2 are complete: the accountless Android app records real GNSS and dual-IMU evidence, recovers interrupted sessions, finalizes verified chunk indexes into Drift, and exports a strictly verified local-private fixture.",
      "The accepted M2.8 field proof covered a 39m17.1s approximately 99%-locked motorcycle trip with 3,689 ordered chunks, 2,322 GNSS fixes, and 939,895 dual-IMU samples; device and host archive hashes matched exactly.",
      "M3.1–M3.5 now decode raw trips fail-closed, align the analysis timeline, classify GNSS evidence and distance, calibrate stationary IMU evidence, transform frames, and derive filtered motion channels with provenance.",
      "M3.6–M3.7 add explainable categorical confidence, metric-scoped eligibility, and a bounded evidence-preserving replay timeline without inventing a global percentage or scoring signal.",
    ],
    constraints: [
      "M3.8 remains pending explicit authorization and must add a governed deterministic regression corpus across representative car, motorcycle, device-move, and GNSS-loss cases.",
      "The accepted physical fixture is grounded in one pocket-carried motorcycle trip on one Android 14 Tecno device; it does not establish mounted vehicle-frame validity, broad OEM reliability, deep-sleep/reboot behavior, or calibrated probability.",
      "The replay timeline is local, ephemeral, display-only processing. Event detection, Drive DNA, scoring, replay UI, maps, connected/social features, Guardian, commentary, and ML remain later milestones.",
    ],
    next: "M3.8 fixture regression corpus: after explicit authorization, turn governed private/synthetic evidence into deterministic regression coverage across car, motorcycle, device-move, and GNSS-loss cases before M4 event intelligence begins.",
    architecture: [
      {
        id: "evidence",
        label: "Native evidence",
        detail:
          "The completed M2 recorder owns GNSS and dual-IMU acquisition, bounded checksummed chunks, lifecycle recovery, Drift finalization, and explicit private export. Raw precise evidence remains under native local authority.",
        signal: "light",
      },
      {
        id: "timeline",
        label: "Analysis timeline",
        detail:
          "M3.1 reconstructs complete chunk order and produces a deterministic monotonic analysis timebase. Corrupt, mixed, gapped, overlapping, reordered, or unsupported evidence fails closed instead of being repaired silently.",
        signal: "blue",
      },
      {
        id: "channels",
        label: "Explainable channels",
        detail:
          "M3.2–M3.6 classify GNSS evidence, accumulate qualified distance, calibrate stationary IMU evidence, transform device/vehicle/world frames, derive filtered motion, and scope categorical confidence to each dependent metric.",
        signal: "red",
      },
      {
        id: "replay",
        label: "Replay reduction",
        detail:
          "M3.7 reduces synchronized derived/confidence frames into a lazy bounded display timeline while preserving extrema, missingness, movement transitions, provenance, confidence, and eligibility. It is not scoring evidence or a finished replay UI.",
        signal: "neutral",
      },
    ],
    visual: "telemetry",
  },
  {
    slug: "neuraloc",
    name: "NeuraLoc-Core",
    tagline: "A dependable control center for local AI.",
    summary:
      "Privacy-first Windows software for discovering, managing, and running GGUF models through verified native inference engines.",
    categories: ["Local AI"],
    technologies: ["React", "TypeScript", "Tauri 2", "Rust", "SQLite", "llama.cpp", "GGUF"],
    status: "active",
    featured: true,
    repoUrl: "https://github.com/atrx07/NeuraLoc-Core",
    proofPoints: [
      "Verified pinned llama.cpp Windows runtime with owned launch and stop lifecycle.",
      "Exact model-tokenized rolling context admission with bounded streaming chat.",
      "Durable SQLite history, branches, retries, versioned prompts, and provenance-preserving export.",
      "Real Qwen3 4B GGUF load, count, stream, cancel, and stop test passed locally.",
    ],
    constraints: [
      "CPU-route memory estimates remain conservative rather than promising unsupported performance.",
      "Downloads, multi-backend fit recommendations, and release packaging remain in progress.",
    ],
    next: "Model discovery and downloads, hardware-aware multi-backend recommendations, and release-ready Windows packaging.",
    architecture: [
      {
        id: "react",
        label: "React interface",
        detail: "Turns runtime state, model provenance, context limits, and durable conversations into legible controls.",
        signal: "light",
      },
      {
        id: "tauri",
        label: "Tauri IPC",
        detail: "Defines the narrow, typed desktop boundary between the web interface and trusted native operations.",
        signal: "blue",
      },
      {
        id: "rust",
        label: "Rust orchestration",
        detail: "Owns child processes, verification, cancellation, lifecycle state, and hardware-aware safety gates.",
        signal: "red",
      },
      {
        id: "sqlite",
        label: "SQLite + runtime",
        detail: "Persists conversation provenance while the pinned native engine keeps model execution on the machine.",
        signal: "neutral",
      },
    ],
    visual: "runtime",
  },
  {
    slug: "voidchat",
    name: "void.chat",
    tagline: "One room, durable messages, live delivery.",
    summary:
      "A real-time global chatroom combining Firebase identity with Cloudflare edge state and WebSocket broadcast.",
    categories: ["Real-time", "Web / PWA"],
    technologies: ["Cloudflare Workers", "Durable Objects", "D1", "WebSockets", "Firebase"],
    status: "shipped",
    featured: true,
    repoUrl: "https://github.com/atrx07/void-chat",
    proofPoints: [
      "Messages persist in D1 before a Durable Object fans updates out to every live socket.",
      "Firebase ID tokens are verified before REST and WebSocket access.",
    ],
    constraints: ["The interface is global-room focused rather than a multi-room messaging platform."],
    architecture: [
      {
        id: "browser",
        label: "Browser + Firebase",
        detail: "Authenticates users and opens an authorized WebSocket to the edge.",
        signal: "light",
      },
      {
        id: "worker",
        label: "Cloudflare Worker",
        detail: "Verifies identity, routes REST requests, and upgrades live connections.",
        signal: "blue",
      },
      {
        id: "d1",
        label: "D1 persistence",
        detail: "Stores messages as the durable source of chat history.",
        signal: "neutral",
      },
      {
        id: "do",
        label: "Durable Object",
        detail: "Maintains connected sockets and broadcasts new messages in real time.",
        signal: "red",
      },
    ],
    visual: "chat",
  },
  {
    slug: "aveline",
    name: "Aveline Bot",
    tagline: "Personality backed by persistent state.",
    summary:
      "A WhatsApp AI chatbot exploring per-user memory, mood-aware replies, group behavior, and resilient inference.",
    categories: ["Bots & automation"],
    technologies: ["Node.js", "Baileys", "Groq", "Upstash Redis", "Railway"],
    status: "experimental",
    featured: true,
    repoUrl: "https://github.com/atrx07/aveline-bot",
    proofPoints: [
      "Conversation and mood state survive restarts through per-user Redis storage.",
      "Multiple API keys and model fallbacks keep inference resilient under rate limits.",
    ],
    constraints: ["Mood is an interaction mechanism, not a claim of sentience or real emotion."],
    architecture: [
      {
        id: "whatsapp",
        label: "WhatsApp + Baileys",
        detail: "Receives direct messages and responds in groups only when mentioned or replied to.",
        signal: "light",
      },
      {
        id: "mood",
        label: "Mood pass",
        detail: "Classifies conversational tone and uses it to adjust the response prompt.",
        signal: "blue",
      },
      {
        id: "redis",
        label: "Upstash Redis",
        detail: "Keeps per-user conversation and interaction state durable across restarts.",
        signal: "neutral",
      },
      {
        id: "groq",
        label: "Groq fallback chain",
        detail: "Rotates keys and models to recover from timeouts and rate limits.",
        signal: "red",
      },
    ],
    visual: "memory",
  },
  {
    slug: "styleforge",
    name: "StyleForge Lite",
    tagline: "A browser sequencer that escaped into hardware.",
    summary:
      "A mobile-first Yamaha arranger sketchpad connecting WebAudio, MIDI, binary style files, and real-keyboard testing.",
    categories: ["Music tech", "Web / PWA"],
    technologies: ["JavaScript", "WebAudio", "MIDI", "Yamaha SFF1", "CASM"],
    status: "experimental",
    featured: true,
    repoUrl: "https://github.com/atrx07/styforge",
    proofPoints: [
      "Drum-grid and piano-roll editing with JSON projects, WebAudio preview, and MIDI export.",
      "CASM-aware experimental .STY generation tested against PSR-E hardware behavior.",
    ],
    constraints: ["Yamaha style validation is model-dependent and the built-in CASM remains reverse engineered."],
    visual: "sequencer",
  },
  {
    slug: "securescope",
    name: "SecureScope",
    tagline: "Security review, with the honesty label attached.",
    summary:
      "An AI-assisted web and code review interface that structures findings in an OWASP-style report.",
    categories: ["Security experiments", "Web / PWA"],
    technologies: ["JavaScript", "Cloudflare Pages", "Groq"],
    status: "prototype",
    featured: true,
    repoUrl: "https://github.com/atrx07/securescope",
    proofPoints: ["Produces structured, explainable review output while explicitly avoiding scanner-grade claims."],
    constraints: ["This is not a deterministic scanner engine; generated findings require human verification."],
    visual: "security",
  },
  {
    slug: "atrxinstadown",
    name: "AtrxInstaDown",
    tagline: "A short path from link to media.",
    summary:
      "A lightweight, installable mobile interface for a no-login Instagram media download workflow.",
    categories: ["Web / PWA"],
    technologies: ["HTML", "CSS", "JavaScript", "PWA"],
    status: "shipped",
    featured: true,
    repoUrl: "https://github.com/atrx07/atrxinstadown",
    proofPoints: ["Installable mobile-first flow for posts, Reels, and videos without account login."],
    constraints: ["Independent utility with no official Instagram affiliation."],
    visual: "mobile",
  },
];

export const architectureProjects = projects.filter((project) =>
  ["traelyx", "neuraloc", "voidchat", "aveline"].includes(project.slug),
);
