import type { Project } from "../types";
import { sableSummary } from "./sableMetadata";

export const sableEvidence = {
  commit: "5a727c90131efb0f7f125bc5ad55d45c633a7e44",
  inspected: "2026-10-11",
  docsUrl: "https://github.com/atrx07/Sable-AI/blob/5a727c90131efb0f7f125bc5ad55d45c633a7e44/docs/demo.md",
  architectureUrl: "https://github.com/atrx07/Sable-AI/blob/5a727c90131efb0f7f125bc5ad55d45c633a7e44/docs/architecture.md",
} as const;

export const sableProject: Project = {
  slug: "sable",
  name: "Sable-AI",
  tagline: "A coding agent with a receipt for every change.",
  summary: sableSummary,
  categories: ["Developer tools", "Bots & automation"],
  technologies: ["Python", "Groq", "AST context", "JSONL traces", "Native / PRoot"],
  status: "completed",
  featured: true,
  repoUrl: "https://github.com/atrx07/Sable-AI",
  proofPoints: [
    "The v2 foundation is complete: bounded sequential tools, capability approvals, transactions, context, verification, CLI automation, and evaluation infrastructure.",
    "File-tool edits capture a baseline before mutation; fingerprint-aware undo preserves later user changes as explicit conflicts.",
    "QUICK / AFFECTED / FULL checks distinguish failure, incomplete evidence, and policy blocks. Genuine failures can enter bounded repair; verified auto-commit requires passing checks.",
    "A committed 53-scenario deterministic suite exercises real runtime paths with scripted providers, including refusals, rollback, repair, and test-integrity attacks.",
    "One-shot automation emits a schema-versioned JSON result and explicit exit codes; bounded session summaries and redacted traces remain local.",
  ],
  constraints: [
    "Groq is the only production provider. Selected repository context is sent to hosted inference; local-first does not mean offline.",
    "Native and PRoot processes do not provide kernel filesystem or network isolation. Transactions cover Sable file tools, not arbitrary subprocess side effects.",
    "Affected-test selection and integrity checks are heuristics. Scripted evaluations are acceptance fixtures, not live-model reliability benchmarks.",
    "Version 2.0.0 is available from source; a PyPI publication or public release is not established by the repository documentation.",
  ],
  next: "Ongoing upgrades are proposed: additional providers and offline inference, richer code context, resumable tasks, and IDE integration. The completed v2 foundation remains available from source.",
  architecture: [
    { id: "sable-context", label: "Repository context", signal: "light", detail: "Bounded path, Python AST symbol, import, and test-neighbor selection feeds the model. Groq supplies hosted inference; selected context leaves the host." },
    { id: "sable-policy", label: "Runtime authority", signal: "blue", detail: "The model requests an action; the runtime owns budgets, mode ceilings, exact-action capability approvals, workspace checks, and execution." },
    { id: "sable-transaction", label: "Recoverable edits", signal: "neutral", detail: "File-tool mutations snapshot their baseline and record post-state fingerprints. Undo restores matching paths and preserves later user edits as conflicts." },
    { id: "sable-verification", label: "Verification evidence", signal: "red", detail: "Required checks classify PASS, FAIL, INCOMPLETE, and BLOCKED. Only a genuine failure enters bounded repair; JSON results and local traces expose the outcome." },
  ],
  visual: "receipt",
};

// A portfolio explanation of documented contracts, not an execution or recorded run.
export const sableReceipt = {
  fixture: "coding.simple_bug",
  file: "calculator.py",
  signature: "def add(left, right):",
  before: "    return left - right",
  after: "    return left + right",
  preserved: "tests/test_calculator.py",
  checkCases: [
    { id: "pass", label: "Checks pass", status: "PASS", stamp: "VERIFIED", detail: "When required checks pass, verified auto-commit becomes eligible. A green check is evidence from those checks, not proof of global correctness." },
    { id: "missing", label: "Tool missing", status: "INCOMPLETE", stamp: "UNVERIFIED", detail: "A required tool is unavailable. Evidence is incomplete, so verified auto-commit is withheld. Missing tools do not trigger model repair." },
    { id: "blocked", label: "Policy blocks", status: "BLOCKED", stamp: "UNVERIFIED", detail: "Policy prevents a required check. The runtime reports a block and withholds verified auto-commit; model output cannot override that decision." },
  ],
  undoCases: {
    matching: { status: "RESTORE AVAILABLE", detail: "The current file matches Sable's recorded post-state. Undo can restore the pre-edit snapshot without rewriting Git history." },
    changed: { status: "LATER EDIT PRESERVED", detail: "The current fingerprint differs from Sable's post-state. Undo reports a conflict and preserves the newer user edit." },
  },
} as const;
