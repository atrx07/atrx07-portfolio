import { useCallback, useEffect, useRef, useState } from "react";

export function useSignalMode() {
  const [active, setActive] = useState(false);
  const buffer = useRef("");
  const timeout = useRef<number>();

  const activate = useCallback(() => {
    setActive(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setActive(false), 5000);
  }, []);

  const deactivate = useCallback(() => {
    window.clearTimeout(timeout.current);
    setActive(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable;

      if (event.key === "Escape" && active) {
        deactivate();
        return;
      }

      if (isTyping || event.key.length !== 1) return;
      buffer.current = `${buffer.current}${event.key.toLowerCase()}`.slice(-4);
      if (buffer.current === "atrx") {
        activate();
        buffer.current = "";
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timeout.current);
    };
  }, [activate, active, deactivate]);

  return { active, activate, deactivate };
}
