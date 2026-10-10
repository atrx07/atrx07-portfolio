export type VisitorMode = "recruiter" | "developer" | "chaos";
export type ProjectStatus = "active" | "shipped" | "completed" | "experimental" | "prototype";

export type ArchitectureNode = {
  id: string;
  label: string;
  detail: string;
  signal: "light" | "blue" | "red" | "neutral";
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  categories: string[];
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  proofPoints: string[];
  constraints?: string[];
  architecture?: ArchitectureNode[];
  next?: string;
  visual: "telemetry" | "runtime" | "receipt" | "chat" | "memory" | "sequencer" | "security" | "mobile";
};
