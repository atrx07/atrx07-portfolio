import { describe, expect, it, vi } from 'vitest';
import { createEggDetector } from './easterEgg';

describe('createEggDetector', () => {
  it('triggers on the Konami code', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'].forEach(
      (k) => egg.key(k),
    );
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('triggers on typing "atrx"', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    ['a', 't', 'r', 'x'].forEach((k) => egg.key(k));
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('is case-insensitive for "atrx"', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    ['A', 'T', 'R', 'X'].forEach((k) => egg.key(k));
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('does not trigger on a wrong sequence', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    ['a', 'b', 'c', 'd'].forEach((k) => egg.key(k));
    expect(onTrigger).not.toHaveBeenCalled();
  });

  it('resets the typing buffer on non-letter keys', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    ['a', 't', 'Enter', 'r', 'x'].forEach((k) => egg.key(k));
    expect(onTrigger).not.toHaveBeenCalled();
  });
});
