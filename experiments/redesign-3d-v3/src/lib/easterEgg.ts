/** Keyboard easter-egg detector: Konami code or typing "atrx" triggers the callback. */

const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

export interface EggDetector {
  key: (raw: string) => void;
  reset: () => void;
}

export function createEggDetector(onTrigger: () => void): EggDetector {
  let ki = 0;
  let buf = '';
  return {
    key(raw: string) {
      const k = raw.toLowerCase();
      if (k === KONAMI[ki]) {
        ki++;
        if (ki === KONAMI.length) {
          ki = 0;
          onTrigger();
        }
      } else {
        ki = k === KONAMI[0] ? 1 : 0;
      }
      if (/^[a-z]$/.test(k)) {
        buf = (buf + k).slice(-4);
        if (buf === 'atrx') {
          buf = '';
          onTrigger();
        }
      } else {
        buf = '';
      }
    },
    reset() {
      ki = 0;
      buf = '';
    },
  };
}
