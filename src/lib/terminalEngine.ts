import { commandStrings, terminalCommands } from "../data/commands";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import type { VisitorMode } from "../types";

export type TerminalAction = "clear" | "open-github" | "mode" | "signal" | "sound";

export type TerminalResult = {
  lines: string[];
  action?: TerminalAction;
  mode?: VisitorMode;
};

const projectByCommand: Record<string, string> = {
  traelyx: "traelyx",
  neuraloc: "neuraloc",
  voidchat: "voidchat",
  aveline: "aveline",
  styleforge: "styleforge",
};

function projectLines(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return ["Project not found in the public index."];

  return [
    `${project.name} // ${project.status.toUpperCase()}`,
    project.summary,
    `stack: ${project.technologies.join(" / ")}`,
    `proof: ${project.proofPoints[0]}`,
    project.repoUrl ? `repo: ${project.repoUrl}` : "repo: unlinked experiment",
  ];
}

export function executeTerminalCommand(rawInput: string): TerminalResult {
  const input = rawInput.trim().toLowerCase().replace(/\s+/g, " ");

  if (!input) return { lines: [] };

  if (input === "help") {
    return {
      lines: terminalCommands.map(({ command, description }) => `${command.padEnd(20)} ${description}`),
    };
  }

  if (input === "about") {
    return {
      lines: [
        `${profile.name} // ${profile.handle}`,
        profile.role,
        profile.headline,
        `location: ${profile.location}`,
      ],
    };
  }

  if (input === "projects") {
    return {
      lines: projects.map((project) => `${project.name.padEnd(18)} ${project.status} // ${project.tagline}`),
    };
  }

  if (input.startsWith("project ")) {
    const slug = projectByCommand[input.slice("project ".length)];
    return {
      lines: slug
        ? projectLines(slug)
        : ["Unknown project. Try: traelyx, neuraloc, voidchat, aveline, styleforge."],
    };
  }

  if (input === "stack") {
    return {
      lines: [
        "mobile: Flutter / Dart / Kotlin / Riverpod / Drift",
        "native AI: Rust / Tauri 2 / SQLite / llama.cpp / GGUF",
        "interface: React / TypeScript / JavaScript / HTML / CSS",
        "systems: Node.js / Python / Cloudflare / WebSockets / Redis",
        "unusual: WebAudio / MIDI / Yamaha SFF1 / Android ADB",
      ],
    };
  }

  if (input === "now") {
    const current = projects.find((project) => project.slug === "traelyx");
    return {
      lines: current
          ? [
            `${current.name} // active development`,
            "Current checkpoint: M2 complete and M3.1–M3.7 validated; verified local GNSS/dual-IMU evidence now flows through fail-closed decoding, filtering, calibration, derived channels, categorical confidence, and bounded replay reduction.",
            `Next: ${current.next}`,
          ]
        : ["Current project signal unavailable."],
    };
  }

  if (input === "contact") {
    return { lines: [`email: ${profile.email}`, `github: ${profile.github}`, `instagram: ${profile.instagram}`] };
  }

  if (input === "github") {
    return { lines: [`Opening allowlisted URL: ${profile.github}`], action: "open-github" };
  }

  if (input === "clear") {
    return { lines: [], action: "clear" };
  }

  if (input.startsWith("mode ")) {
    const mode = input.slice("mode ".length) as VisitorMode;
    if (mode === "recruiter" || mode === "developer" || mode === "chaos") {
      return { lines: [`Visitor mode switched to ${mode}.`], action: "mode", mode };
    }
    return { lines: ["Unknown mode. Use recruiter, developer, or chaos."] };
  }

  if (input === "whoami") {
    return { lines: ["visitor@atrx: curious human with keyboard access"] };
  }

  if (input === "atrx" || input === "chaos") {
    return { lines: ["signal mode armed for five seconds. press Escape to exit."], action: "signal" };
  }

  if (input === "sudo hire atrx") {
    return {
      lines: [
        "permission granted: good judgment detected.",
        `contact route: mailto:${profile.email}`,
      ],
    };
  }

  if (input === "play signal") {
    return { lines: ["requesting user-triggered four-step signal..."], action: "sound" };
  }

  if (input === "coffee") {
    return { lines: ["fuel status: abstract dependency, not currently injectable."] };
  }

  return {
    lines: [`command not found: ${rawInput.trim()}`, "Type help to inspect the fixed command set."],
  };
}

export function completeTerminalCommand(input: string) {
  const normalized = input.trimStart().toLowerCase();
  const matches = commandStrings.filter((command) => command.startsWith(normalized));
  return matches.length === 1 ? matches[0] : input;
}
