import { describe, expect, it, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Page } from './dom/Sections';
import { profile } from '../../../src/data/profile';
import { projects } from '../../../src/data/projects';

afterEach(() => cleanup());

describe('Page (DOM portfolio)', () => {
  it('renders the hero with the real headline', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.headline);
  });

  it('renders a card for every project', () => {
    render(<Page />);
    for (const p of projects) {
      expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument();
    }
  });

  it('renders the skills groups', () => {
    render(<Page />);
    expect(screen.getByText('The toolbox.')).toBeInTheDocument();
  });

  it('renders the principles', () => {
    render(<Page />);
    expect(screen.getByText('How I work.')).toBeInTheDocument();
  });

  it('renders contact with the real email', () => {
    render(<Page />);
    expect(screen.getByText('Open a channel.')).toBeInTheDocument();
    expect(screen.getAllByText(profile.email).length).toBeGreaterThan(0);
  });
});
