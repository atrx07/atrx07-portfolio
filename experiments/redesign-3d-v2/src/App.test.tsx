import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

vi.mock('lenis', () => ({
  default: class MockLenis {
    on() {}
    destroy() {}
    stop() {}
    start() {}
    scrollTo() {}
    raf() {}
  },
}));
vi.mock('./three/Scene', () => ({ default: () => null }));
vi.mock('./lib/quality', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./lib/quality')>();
  return { ...mod, hasWebGL: () => false };
});

import App from './App';
import { Chapters } from './dom/Chapters';
import { useWorlds } from './store';

beforeEach(() => {
  cleanup();
  useWorlds.setState({
    booted: false,
    webglFailed: false,
    selectedProject: null,
    selectedSkill: null,
    openedDossiers: [],
    signalMode: false,
    activeWorld: 'hero',
    paused: false,
  });
});

describe('App without WebGL', () => {
  it('renders the readable static fallback with real project content', async () => {
    render(<App />);
    expect(await screen.findByText('The build shelf')).toBeInTheDocument();
    expect(screen.getByText('NeuraLoc-Core')).toBeInTheDocument();
    expect(screen.getByText('Traelyx')).toBeInTheDocument();
    expect(screen.getByText(/bots with memory/)).toBeInTheDocument();
    expect(screen.getByText('Capability map')).toBeInTheDocument();
  });
});

describe('Chapters', () => {
  it('renders the hero headline and all five world chapters', () => {
    render(<Chapters />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/local AI software/);
    expect(screen.getByText('Seven systems, seven worlds.')).toBeInTheDocument();
    expect(screen.getByText('No skill bars. Just orbs.')).toBeInTheDocument();
    expect(screen.getByText('How the work gets built.')).toBeInTheDocument();
    expect(screen.getByText('Beam me a signal.')).toBeInTheDocument();
  });

  it('shows the real contact email', () => {
    render(<Chapters />);
    expect(screen.getByText('arppithandrewsee@gmail.com')).toBeInTheDocument();
  });
});
