import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App';

vi.mock('./Scene', () => ({ default: () => <div data-testid="scene-still" /> }));
afterAll(() => ScrollTrigger.disable());

describe('isolated portfolio exhibition contracts', () => {
  it('identifies Arppith and exposes published notes without the private draft fixture', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ARPPITH ANDREWS');
    expect(screen.getByRole('heading', { name: 'Local AI is a systems problem' })).toBeVisible();
    expect(screen.queryByText('Registry fixture')).not.toBeInTheDocument();
    expect(within(screen.getByRole('tabpanel', { name: 'All projects' })).getAllByRole('button')).toHaveLength(7);
  });

  it('keeps shipped projects out of the experimental category', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('tab', { name: 'Experiments' }));
    const panel = screen.getByRole('tabpanel', { name: 'Experiments projects' });
    expect(within(panel).getAllByRole('button')).toHaveLength(3);
    expect(within(panel).queryByRole('button', { name: /void.chat/ })).not.toBeInTheDocument();
    expect(within(panel).getByRole('button', { name: /SecureScope/ })).toBeVisible();
  });

  it('keeps the Traelyx limitations accessible beside implementation evidence', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Explore Traelyx' }));
    expect(window.location.hash).toBe('#project/traelyx');
    const dialog = screen.getByRole('dialog', { name: /^Traelyx\s*\.$/ });
    fireEvent.click(within(dialog).getByRole('tab', { name: 'Reality check' }));
    expect(within(dialog).getByText(/Guardian M6.8 is partial/)).toBeVisible();
    expect(within(dialog).getByText(/not population calibration/)).toBeVisible();
    expect(within(dialog).getByRole('link', { name: 'Inspect the source' })).toHaveAttribute('href', 'https://github.com/atrx07/Traelyx');
  });

  it('rejects arbitrary commands without executing them', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Open the terminal' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Terminal command' }), { target: { value: 'rm -rf /' } });
    fireEvent.click(screen.getByRole('button', { name: 'Run portfolio command' }));
    expect(screen.getByRole('log')).toHaveTextContent('Unknown command. Type help');
  });
});
