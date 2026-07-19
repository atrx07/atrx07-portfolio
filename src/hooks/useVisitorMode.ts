import { useLocalStorage } from "./useLocalStorage";
import type { VisitorMode } from "../types";

const isVisitorMode = (value: unknown): value is VisitorMode =>
  value === "recruiter" || value === "developer" || value === "chaos";

export function useVisitorMode() {
  const [storedMode, setStoredMode] = useLocalStorage<VisitorMode>("atrx-visitor-mode", "recruiter");
  const mode = isVisitorMode(storedMode) ? storedMode : "recruiter";

  return [mode, setStoredMode] as const;
}
