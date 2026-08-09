export const profile = {
  name: "Arppith Andrews",
  handle: "atrx07",
  brand: "ATRX",
  role: "Engineering student, AI and automation builder, software developer, and web developer",
  location: "Kerala, India",
  email: "arppithandrewsee@gmail.com",
  github: "https://github.com/atrx07",
  instagram: "https://instagram.com/atrx07",
  avatar: "https://avatars.githubusercontent.com/u/141434243?v=4",
  headline: "I build local AI software, real-time applications, and bots with memory.",
  supporting:
    "Turning ambitious ideas into systems that survive real users, real hardware, and repeated testing.",
  availability: "Open to internships, collaborations, and interesting engineering problems",
  principles: [
    {
      title: "Local where it matters",
      body: "Privacy and ownership are product features, not implementation trivia.",
    },
    {
      title: "Real targets beat perfect mockups",
      body: "Hardware, users, and failure states tell the truth faster than polished assumptions.",
    },
    {
      title: "State should survive",
      body: "Memory, history, retries, and recovery are what make a system dependable.",
    },
    {
      title: "Playfulness is allowed",
      body: "Serious engineering does not require a lifeless interface.",
    },
  ],
} as const;

export const siteMetadata = {
  title: "Arppith Andrews | AI, Automation & Software Developer",
  description:
    "Arppith Andrews (atrx07) is an engineering student, AI and automation builder, software developer, and web developer creating local AI and real-time systems.",
  canonicalUrl: "https://atrx07.pages.dev/",
  socialImagePath: "/atrx-wide.jpg",
  socialImageAlt: "ATRX artwork for Arppith Andrews, engineering student and AI automation builder",
  lastModified: "2026-08-09",
} as const;

export const fieldNotesMetadata = {
  title: "Field Notes | Arppith Andrews (atrx07)",
  description:
    "Engineering notes from Arppith Andrews (atrx07) on local AI, real-time systems, automation, debugging, and unusual browser tools.",
  launchedAt: "2026-08-02",
} as const;

export const capabilityGroups = [
  {
    title: "Native, mobile & local AI",
    items: ["Flutter", "Dart", "Kotlin", "Drift", "Rust", "Tauri 2", "SQLite", "llama.cpp", "GGUF"],
  },
  {
    title: "Interfaces",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Automation & bots",
    items: ["Node.js", "Python", "Baileys", "Discord.js", "Telegram tooling"],
  },
  {
    title: "Real-time & cloud",
    items: ["Cloudflare Workers", "Durable Objects", "D1", "WebSockets", "Firebase", "Upstash Redis"],
  },
  {
    title: "Hardware & media",
    items: ["WebAudio", "MIDI", "Yamaha SFF1", "CASM exploration", "Android / ADB"],
  },
] as const;

type Experiment = {
  name: string;
  detail: string;
  kind: string;
  url?: string;
};

export const experiments: Experiment[] = [
  {
    name: "Discord Rich Presence",
    detail: "Desktop activity states spanning code, music, terminal, idle, and GitHub signals.",
    kind: "unlinked experiment",
  },
  {
    name: "Android Rich Presence",
    detail: "A mobile companion explored through Android Studio and wireless ADB.",
    kind: "unlinked experiment",
  },
  {
    name: "HTTP Load Tester",
    detail: "A compact Python utility for controlled request and response testing.",
    kind: "public repository",
    url: "https://github.com/atrx07/python-http-load-tester",
  },
  {
    name: "Call-screening QA",
    detail: "Workflow testing around AI call screening, edge cases, and response quality.",
    kind: "lab note",
  },
  {
    name: "Prompt & agent tooling",
    detail: "Versioned prompts, local orchestration, GGUF models, and durable conversation branches.",
    kind: "ongoing lab",
  },
];
