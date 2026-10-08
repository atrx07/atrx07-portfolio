import { create } from 'zustand';
import type Lenis from 'lenis';

export type SectionId = 'hero' | 'projects' | 'skills' | 'about' | 'contact';
export type Quality = 'high' | 'medium' | 'low';

export const SECTION_ORDER: SectionId[] = ['hero', 'projects', 'skills', 'about', 'contact'];
export const SECTION_LABELS: Record<SectionId, string> = {
  hero: 'Launch',
  projects: 'Planets',
  skills: 'Toolbox',
  about: 'Principles',
  contact: 'Contact',
};

interface PlanetsState {
  /** Mutable scroll progress 0..1, written imperatively from the scroll handler (never React state). */
  progress: { current: number };
  activeSection: SectionId;
  setActiveSection: (s: SectionId) => void;
  /** Selected project slug — written once per click; opens the dossier panel + camera fly-in. */
  selected: string | null;
  setSelected: (slug: string | null) => void;
  hovered: string | null;
  setHovered: (slug: string | null) => void;
  /** Planets the visitor has opened — the "explored n / 7" counter. */
  openedPlanets: string[];
  markOpened: (slug: string) => void;
  paused: boolean;
  togglePaused: () => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  webglFailed: boolean;
  failWebgl: () => void;
  texturesReady: boolean;
  setTexturesReady: () => void;
  loadProgress: number;
  setLoadProgress: (v: number) => void;
  booted: boolean;
  setBooted: () => void;
  /** Easter-egg state: konami code or typing "atrx" triggers signal mode. */
  signalMode: boolean;
  triggerSignalMode: () => void;
  lenis: Lenis | null;
  setLenis: (l: Lenis | null) => void;
  quality: Quality;
  setQuality: (q: Quality) => void;
}

let signalTimer: ReturnType<typeof setTimeout> | null = null;

export const usePlanets = create<PlanetsState>((set) => ({
  progress: { current: 0 },
  activeSection: 'hero',
  setActiveSection: (s) => set((prev) => (prev.activeSection === s ? prev : { activeSection: s })),
  selected: null,
  setSelected: (slug) => set({ selected: slug }),
  hovered: null,
  setHovered: (slug) => set({ hovered: slug }),
  openedPlanets: [],
  markOpened: (slug) =>
    set((s) => (s.openedPlanets.includes(slug) ? s : { openedPlanets: [...s.openedPlanets, slug] })),
  paused: false,
  togglePaused: () => set((s) => ({ paused: !s.paused })),
  reducedMotion: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),
  webglFailed: false,
  failWebgl: () => set({ webglFailed: true }),
  texturesReady: false,
  setTexturesReady: () => set({ texturesReady: true }),
  loadProgress: 0,
  setLoadProgress: (v) => set({ loadProgress: v }),
  booted: false,
  setBooted: () => set({ booted: true }),
  signalMode: false,
  triggerSignalMode: () =>
    set((s) => {
      if (signalTimer) clearTimeout(signalTimer);
      signalTimer = setTimeout(() => usePlanets.setState({ signalMode: false }), 9000);
      return s.signalMode ? s : { signalMode: true };
    }),
  lenis: null,
  setLenis: (l) => set({ lenis: l }),
  quality: 'high',
  setQuality: (q) => set({ quality: q }),
}));

/** Scroll the page to a section (nav dots, CTAs). */
export function scrollToSection(id: SectionId) {
  const { lenis } = usePlanets.getState();
  const el = document.getElementById(`sec-${id}`);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
