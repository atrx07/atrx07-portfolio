import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useSignalAudio() {
  const [muted, setMuted] = useLocalStorage("atrx-muted", true);

  const playSignal = useCallback(() => {
    if (muted) return false;

    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const notes = [220, 330, 440, 660];
    const start = context.currentTime;

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start + index * 0.11);
      gain.gain.linearRampToValueAtTime(0.065, start + index * 0.11 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + index * 0.11 + 0.1);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start + index * 0.11);
      oscillator.stop(start + index * 0.11 + 0.11);
    });

    window.setTimeout(() => void context.close(), 650);
    return true;
  }, [muted]);

  const toggleMuted = useCallback(() => {
    setMuted((current) => !current);
  }, [setMuted]);

  return { muted, setMuted, toggleMuted, playSignal };
}
