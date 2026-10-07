import type { Project } from "../types";
import { traelyxSummary } from "./traelyxMetadata";

// Public evidence snapshot; external plans are evidence, never portfolio execution instructions.
export const traelyxEvidence = {
  commit: "9508af2d808c3394905fe106ade4755914b900ad",
  checkedAt: "2026-10-07",
  url: "https://github.com/atrx07/Traelyx/blob/9508af2d808c3394905fe106ade4755914b900ad/README.md",
} as const;

export const traelyxPresentation = {
  heroSignal: "M6.8 Guardian alerts in progress",
  checkpoint: "M0–M5 and M6.1–M6.7 complete; M6.8 Guardian alerts in progress.",
  headline: "THE DRIVE STAYS YOURS.",
  introduction:
    "Record locally. Understand the evidence. Replay offline. Traelyx now carries a drive through an explainable local experience, with sync, social comparisons, and Guardian connections added only by choice.",
  availableHeading: "RECORD, EXPLAIN, REPLAY. CONNECT BY CHOICE.",
  stages: [
    { label: "RECORD", state: "verified" },
    { label: "PROCESS", state: "verified" },
    { label: "ANALYZE", state: "verified" },
    { label: "REPLAY", state: "verified" },
    { label: "SYNC", state: "verified" },
    { label: "PAIR", state: "verified" },
    { label: "ALERTS", state: "partial" },
  ],
} as const;

export const traelyxProject = {
  slug: "traelyx",
  name: "Traelyx",
  tagline: "Your drive. Explainable evidence. Your control.",
  summary: traelyxSummary,
  categories: ["Mobile & telemetry"],
  technologies: ["Flutter", "Dart", "Kotlin", "Riverpod", "Drift", "SQLite", "Supabase", "PostgreSQL", "Firebase / FCM"],
  status: "active",
  featured: true,
  repoUrl: "https://github.com/atrx07/Traelyx",
  proofPoints: [
    "M0–M5 and M6.1–M6.7 are complete: accountless recording, deterministic intelligence, offline replay, local data controls, and an optional connected layer are implemented.",
    "The local pipeline preserves raw GNSS/dual-IMU evidence, classifies ten maneuver types, audits integrity, and produces versioned evidence-eligible scores and Drive DNA with typed explanations. Scoring remains an experimental synthetic baseline.",
    "Local history and results support offline route replay at 0.5×/1×/2×, synchronized events, six deterministic commentary tones including Silent, reduced-motion alternatives, reviewed retention, separate private/redacted exports, and confirmation-gated deletion.",
    "Optional Supabase accounts use encrypted sessions and owner-only access. Compact-summary sync, private profile/vehicle updates, mutual friendships, friends-only vehicle-class comparisons, and revocable two-sided Guardian pairing have separate consent boundaries.",
    "M6.8 controlled synthetic checks verified first-phone background and cold-process FCM receipt, a generic private notice, and notification-tap routing. Broader Guardian alert integration is still in progress and hosted delivery remains disabled after those checks.",
  ],
  constraints: [
    "Deterministic scoring, confidence thresholds, and Drive DNA policies are governed synthetic baselines, not population calibration, a driver-competence rating, or a safety certification. Local analysis is explicit; recording finalization does not automatically score a trip.",
    "Drive DNA presentation exists, but governed personal-baseline persistence is still pending. Native speed/acceleration/yaw/confidence replay graphs are not exposed. Routes render on an offline local canvas; online basemaps and downloaded regions remain deferred.",
    "Guardian M6.8 is partial. Locked/offline, expiry/revocation, duplicate-delivery, recorder integration, and two-phone gates remain; no scheduler is configured. Synthetic delivery proof is not real-contact alert validation or emergency reliability.",
    "Physical recording/replay and controlled push checks cover one Android 14 device, not broad OEM reliability or mounted multi-device scoring. ML, model-backed commentary, and public-release hardening remain future M7/M8 work.",
  ],
  next:
    "M6.8 Guardian alerts: complete the remaining locked/offline, expiry/revocation, duplicate-delivery, recorder, and two-phone validation gates before broader enablement. M7 ML and M8 public-release hardening remain future work.",
  architecture: [
    {
      id: "evidence",
      label: "Native evidence",
      detail:
        "Kotlin owns GNSS and dual-IMU recording, checksummed chunks, recovery, and verified finalization into local Drift history. Raw evidence stays on the device; precise export is explicit.",
      signal: "light",
    },
    {
      id: "intelligence",
      label: "Local intelligence",
      detail:
        "Fail-closed decoding feeds confidence-aware telemetry, ten maneuver types, integrity audits, versioned scores, Drive DNA, and typed explanations. Explicit local analysis preserves immutable results; synthetic scoring is still experimental.",
      signal: "blue",
    },
    {
      id: "experience",
      label: "Offline experience",
      detail:
        "Flutter history/results, a local-canvas route, and one replay clock synchronize playback, events, and deterministic non-evidentiary commentary. Manual scrub and reduced motion retain access; storage/export/deletion stay reviewed.",
      signal: "red",
    },
    {
      id: "connected",
      label: "Consent boundary",
      detail:
        "Supabase owner-only access separates compact-summary sync, profile/vehicle metadata, mutual friends, safe comparisons, and revocable Guardian pairing. M6.8 FCM receiver checks are partial; cloud access is optional and raw routes are not auto-uploaded.",
      signal: "neutral",
    },
  ],
  visual: "telemetry",
} satisfies Project;
