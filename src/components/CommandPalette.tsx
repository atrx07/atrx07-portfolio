import {
  ArrowDownToLine,
  BriefcaseBusiness,
  Clipboard,
  Github,
  Radio,
  Search,
  TerminalSquare,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { scrollToId } from "../lib/scroll";
import type { Project, VisitorMode } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onModeChange: (mode: VisitorMode) => void;
  onOpenProject: (project: Project) => void;
  onOpenTerminal: () => void;
  onCopyEmail: () => void;
};

type PaletteAction = {
  label: string;
  group: string;
  icon: LucideIcon;
  run: () => void;
};

export function CommandPalette({
  open,
  onClose,
  onModeChange,
  onOpenProject,
  onOpenTerminal,
  onCopyEmail,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const execute = (action: () => void) => {
    action();
    dialogRef.current?.close();
  };

  const actions = useMemo<PaletteAction[]>(
    () => [
      {
        label: "Go to Now building",
        group: "Navigate",
        icon: Radio,
        run: () => scrollToId("now"),
      },
      {
        label: "Go to Projects",
        group: "Navigate",
        icon: BriefcaseBusiness,
        run: () => scrollToId("projects"),
      },
      {
        label: "Go to Architecture",
        group: "Navigate",
        icon: ArrowDownToLine,
        run: () => scrollToId("architecture"),
      },
      {
        label: "Go to About",
        group: "Navigate",
        icon: UserRound,
        run: () => scrollToId("about"),
      },
      {
        label: "Open portfolio terminal",
        group: "Tools",
        icon: TerminalSquare,
        run: onOpenTerminal,
      },
      {
        label: "Switch to Recruiter mode",
        group: "Visitor mode",
        icon: UserRound,
        run: () => onModeChange("recruiter"),
      },
      {
        label: "Switch to Developer mode",
        group: "Visitor mode",
        icon: UserRound,
        run: () => onModeChange("developer"),
      },
      {
        label: "Switch to Chaos mode",
        group: "Visitor mode",
        icon: Radio,
        run: () => onModeChange("chaos"),
      },
      ...projects.map((project) => ({
        label: `Open ${project.name}`,
        group: "Projects",
        icon: BriefcaseBusiness,
        run: () => onOpenProject(project),
      })),
      {
        label: "Copy public email",
        group: "Contact",
        icon: Clipboard,
        run: onCopyEmail,
      },
      {
        label: "Open GitHub profile",
        group: "Contact",
        icon: Github,
        run: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
      },
    ],
    [onCopyEmail, onModeChange, onOpenProject, onOpenTerminal],
  );

  const filteredActions = actions.filter((action) =>
    `${action.label} ${action.group}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <dialog
      ref={dialogRef}
      className="command-dialog"
      aria-label="Command palette"
      onClose={() => {
        setQuery("");
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="command-palette">
        <div className="command-search">
          <Search size={20} aria-hidden="true" />
          <label className="sr-only" htmlFor="command-search-input">
            Search commands
          </label>
          <input
            id="command-search-input"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Navigate, inspect, or switch mode..."
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close command palette"
          >
            <X size={18} />
          </button>
        </div>
        <div className="command-results">
          {filteredActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.label} type="button" onClick={() => execute(action.run)}>
                <Icon size={18} />
                <span>
                  <strong>{action.label}</strong>
                  <small>{action.group}</small>
                </span>
              </button>
            );
          })}
          {filteredActions.length === 0 && <p>No matching command.</p>}
        </div>
        <div className="command-footer">
          <span>Ctrl / Cmd + K</span>
          <span>Escape to close</span>
        </div>
      </div>
    </dialog>
  );
}
