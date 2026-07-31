import type { VisitorMode } from "../types";
import { MagicTab, type MagicTabItem } from "./godui/magic-tab";

type Props = {
  mode: VisitorMode;
  onChange: (mode: VisitorMode) => void;
  compact?: boolean;
};

const modes = ["recruiter", "developer", "chaos"] satisfies VisitorMode[];
const modeItems: MagicTabItem[] = modes.map((item) => ({ value: item, label: item }));

export function VisitorModeSwitch({ mode, onChange, compact = false }: Props) {
  return (
    <MagicTab
      items={modeItems}
      value={mode}
      onValueChange={(value) => onChange(value as VisitorMode)}
      variant="default"
      size="md"
      rainbow
      className={`mode-switch ${compact ? "mode-switch--compact" : ""}`}
      data-mode={mode}
      aria-label="Visitor mode"
    />
  );
}
