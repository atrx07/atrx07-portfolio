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
      "An open-source, local-first Android platform being built to turn phone GNSS and IMU data into confidence-aware, explainable driver intelligence.",
    categories: ["Mobile & telemetry"],
    technologies: ["Flutter", "Dart", "Kotlin", "Riverpod", "Drift", "SQLite", "Android"],
    status: "active",
    featured: true,
    repoUrl: "https://github.com/atrx07/Traelyx",
    proofPoints: [
      "M0 foundation launches on a physical Android 14 device with accountless Flutter, Riverpod, go_router, and centralized dark-first theme boundaries.",
      "Drift schema v1 persists local settings while a provider-neutral map contract and versioned Flutter-to-Kotlin recorder bridge keep core dependencies replaceable.",
      "GitHub Actions validates generated source, formatting, analysis, Flutter and Kotlin tests, repository contracts, Android builds, and artifact size reporting.",
      "The native recorder service is registered but intentionally disabled: no sensor or location data is collected before the reliability milestone passes.",
    ],
    constraints: [
      "M0 is complete, but real trip recording and background reliability are not implemented yet.",
      "Drive DNA, telemetry confidence, scoring, replay, Guardian Connect, social features, commentary providers, and ML remain roadmap systems rather than available features.",
      "Final map provider, model runtime, scoring thresholds, and visual tokens remain subject to prototype and real-device validation.",
    ],
    next: "M1 application foundation: semantic theme, Drive / Trips / DNA / Social / You navigation, local settings, the full Drift schema, migrations, and diagnostics before the M2 recorder gate.",
    architecture: [
      {
        id: "flutter",
        label: "Flutter app",
        detail:
          "Owns accountless product flows, Riverpod state, go_router navigation, diagnostics, replay presentation, and the user-facing explanation layer. The M0 shell is validated on Android 14.",
        signal: "light",
      },
      {
        id: "kotlin",
        label: "Kotlin recorder boundary",
        detail:
          "The versioned native bridge and disabled foreground-service skeleton exist now. M2 will make this layer own GNSS, IMU, timestamps, buffering, recovery, and screen-lock reliability.",
        signal: "blue",
      },
      {
        id: "drift",
        label: "Drift local authority",
        detail:
          "SQLite is the local-first source of truth. Schema v1 currently persists bootstrap settings; trips, chunks, events, scores, baselines, and sync metadata belong to the next foundation stage.",
        signal: "neutral",
      },
      {
        id: "intelligence",
        label: "Telemetry + Drive DNA",
        detail:
          "Planned Dart processing will align sensor time, propagate confidence, produce deterministic evidence, and feed explicit versioned scoring. ML may support evidence later, never own the final score.",
        signal: "red",
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
