import type { VisitorMode } from "../types";

type Props = {
  mode: VisitorMode;
  onChange: (mode: VisitorMode) => void;
  compact?: boolean;
};

const modes: VisitorMode[] = ["recruiter", "developer", "chaos"];

export function VisitorModeSwitch({ mode, onChange, compact = false }: Props) {
  return (
    <div
      className={`mode-switch ${compact ? "mode-switch--compact" : ""}`}
      data-mode={mode}
      role="group"
      aria-label="Visitor mode"
    >
      <span className="mode-switch__indicator" aria-hidden="true" />
      {modes.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={mode === item}
          onClick={() => onChange(item)}
          className={mode === item ? "is-active" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
