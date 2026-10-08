import { create } from 'zustand';
import type Lenis from 'lenis';

export type WorldId = 'hero' | 'projects' | 'skills' | 'principles' | 'contact';
export type Quality = 'high' | 'medium' | 'low';

export const WORLD_ORDER: WorldId[] = ['hero', 'projects', 'skills', 'principles', 'contact'];
export const WORLD_LABELS: Record<WorldId, string> = {
  hero: 'Origin',
  projects: 'Build shelf',
  skills: 'Capability map',
  principles: 'Operating system',
  contact: 'Open channel',
};

interface WorldsState {
  /** Mutable scroll progress 0..1, written imperatively from the scroll handler (never React state). */
  progress: { current: number };
  activeWorld: WorldId;
  setActiveWorld: (w: WorldId) => void;
  selectedProject: string | null;
  setSelectedProject: (slug: string | null) => void;
  selectedSkill: number | null;
  setSelectedSkill: (i: number | null) => void;
  /** Dossiers the visitor has opened — the "discovered x / 7" counter. */
  openedDossiers: string[];
  markOpened: (slug: string) => void;
  paused: boolean;
  togglePaused: () => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  webglFailed: boolean;
  failWebgl: () => void;
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

export const useWorlds = create<WorldsState>((set) => ({
  progress: { current: 0 },
  activeWorld: 'hero',
  setActiveWorld: (w) => set((s) => (s.activeWorld === w ? s : { activeWorld: w })),
  selectedProject: null,
  setSelectedProject: (slug) => set({ selectedProject: slug }),
  selectedSkill: null,
  setSelectedSkill: (i) => set({ selectedSkill: i }),
  openedDossiers: [],
  markOpened: (slug) =>
    set((s) => (s.openedDossiers.includes(slug) ? s : { openedDossiers: [...s.openedDossiers, slug] })),
  paused: false,
  togglePaused: () => set((s) => ({ paused: !s.paused })),
  reducedMotion: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),
  webglFailed: false,
  failWebgl: () => set({ webglFailed: true }),
  booted: false,
  setBooted: () => set({ booted: true }),
  signalMode: false,
  triggerSignalMode: () =>
    set((s) => {
      if (signalTimer) clearTimeout(signalTimer);
      signalTimer = setTimeout(() => useWorlds.setState({ signalMode: false }), 9000);
      return s.signalMode ? s : { signalMode: true };
    }),
  lenis: null,
  setLenis: (l) => set({ lenis: l }),
  quality: 'high',
  setQuality: (q) => set({ quality: q }),
}));

/** Scroll the page to a world section (used by nav dots, mobile buttons, CTAs). */
export function flyTo(world: WorldId) {
  const { lenis } = useWorlds.getState();
  const el = document.getElementById(`world-${world}`);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
