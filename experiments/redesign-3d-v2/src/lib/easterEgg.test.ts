import { describe, expect, it, vi } from 'vitest';
import { createEggDetector } from './easterEgg';

describe('createEggDetector', () => {
  it('triggers when the user types "atrx"', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    'atrx'.split('').forEach((k) => egg.key(k));
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });
  it('triggers on the Konami code', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
      .forEach((k) => egg.key(k));
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });
  it('does not trigger on random typing', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    'hello world'.split('').forEach((k) => egg.key(k));
    expect(onTrigger).not.toHaveBeenCalled();
  });
  it('can trigger again after reset', () => {
    const onTrigger = vi.fn();
    const egg = createEggDetector(onTrigger);
    'atrx'.split('').forEach((k) => egg.key(k));
    egg.reset();
    'atrx'.split('').forEach((k) => egg.key(k));
    expect(onTrigger).toHaveBeenCalledTimes(2);
  });
});
