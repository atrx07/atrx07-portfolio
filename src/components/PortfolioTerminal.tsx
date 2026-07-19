import { CornerDownLeft, TerminalSquare } from "lucide-react";
import { forwardRef, useRef, useState } from "react";
import { commandStrings } from "../data/commands";
import { profile } from "../data/profile";
import { completeTerminalCommand, executeTerminalCommand } from "../lib/terminalEngine";
import type { VisitorMode } from "../types";

type OutputLine = {
  id: number;
  text: string;
  kind: "command" | "output";
};

type Props = {
  onModeChange: (mode: VisitorMode) => void;
  onSignal: () => void;
  onPlaySignal: () => boolean;
  onDiscover: (slug: string) => void;
};

const projectCommandSlugs: Record<string, string> = {
  "project neuraloc": "neuraloc",
  "project voidchat": "voidchat",
  "project aveline": "aveline",
  "project styleforge": "styleforge",
};

export const PortfolioTerminal = forwardRef<HTMLInputElement, Props>(function PortfolioTerminal(
  { onModeChange, onSignal, onPlaySignal, onDiscover },
  ref,
) {
  const [input, setInput] = useState("");
  const nextLineId = useRef(3);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<OutputLine[]>([
    { id: 1, text: "ATRX portfolio shell / fixed command parser", kind: "output" },
    { id: 2, text: "Type help. Nothing here reaches a real shell.", kind: "output" },
  ]);

  const appendLines = (nextLines: string[], kind: OutputLine["kind"] = "output") => {
    setLines((current) => [
      ...current,
      ...nextLines.map((text) => ({ id: nextLineId.current++, text, kind })),
    ]);
  };

  const submit = () => {
    const raw = input;
    if (!raw.trim()) return;

    const result = executeTerminalCommand(raw);
    appendLines([`visitor@atrx:~$ ${raw}`], "command");
    setHistory((current) => [...current, raw]);
    setHistoryIndex(-1);
    setInput("");

    if (result.action === "clear") {
      setLines([]);
      return;
    }

    appendLines(result.lines);

    if (result.action === "open-github") {
      window.open(profile.github, "_blank", "noopener,noreferrer");
    }
    if (result.action === "mode" && result.mode) onModeChange(result.mode);
    if (result.action === "signal") onSignal();
    if (result.action === "sound" && !onPlaySignal()) {
      appendLines(["signal muted. enable sound from the navigation first."]);
    }

    const discoveredSlug = projectCommandSlugs[raw.trim().toLowerCase()];
    if (discoveredSlug) onDiscover(discoveredSlug);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      setInput((current) => completeTerminalCommand(current));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(history[history.length - 1 - nextIndex] ?? "");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? "" : history[history.length - 1 - nextIndex] ?? "");
    }
  };

  return (
    <section id="terminal" className="terminal-section section-shell" aria-labelledby="terminal-title">
      <div className="terminal-intro">
        <p className="eyebrow">Safe portfolio terminal</p>
        <h2 id="terminal-title">A SHELL WITH NOTHING SHARP INSIDE.</h2>
        <p>
          A parser over a fixed command list. Use history, tab completion, and the commands below without
          touching a real system.
        </p>
        <div className="terminal-command-cloud" aria-label="Available command examples">
          {commandStrings.slice(0, 9).map((command) => (
            <button type="button" key={command} onClick={() => setInput(command)}>
              {command}
            </button>
          ))}
        </div>
      </div>

      <div className="terminal-window">
        <div className="terminal-titlebar">
          <span>
            <TerminalSquare size={16} />
            portfolio.shell
          </span>
          <span>ALLOWLISTED / LOCAL</span>
        </div>
        <div className="terminal-output" role="log" aria-live="polite">
          {lines.map((line) => (
            <div key={line.id} className={line.kind === "command" ? "terminal-command" : ""}>
              {line.text}
            </div>
          ))}
        </div>
        <label className="terminal-input-row">
          <span>visitor@atrx:~$</span>
          <span className="sr-only">Portfolio terminal command</span>
          <input
            ref={ref}
            aria-label="Portfolio terminal command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-describedby="terminal-instructions"
          />
          <button type="button" onClick={submit} aria-label="Run terminal command">
            <CornerDownLeft size={17} />
          </button>
        </label>
        <p id="terminal-instructions" className="terminal-help">
          Up/Down history · Tab completes a unique command · Enter runs
        </p>
      </div>
    </section>
  );
});
