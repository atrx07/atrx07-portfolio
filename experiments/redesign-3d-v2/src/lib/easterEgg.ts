/** Easter-egg key detector — pure, tested. Triggers on the Konami code or typing "atrx". */

const KONAMI = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
  'b', 'a',
];

export function createEggDetector(onTrigger: () => void) {
  let buf: string[] = [];
  return {
    key(raw: string) {
      const k = raw.toLowerCase();
      buf.push(k);
      if (buf.length > 14) buf.shift();
      const joined = buf.join(' ');
      const tail = buf.slice(-KONAMI.length);
      const konamiHit = tail.length === KONAMI.length && KONAMI.every((code, i) => tail[i] === code);
      if (joined.includes('a t r x') || joined.replace(/ /g, '').includes('atrx') || konamiHit) {
        buf = [];
        onTrigger();
      }
    },
    reset() {
      buf = [];
    },
  };
}
