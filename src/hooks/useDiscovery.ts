import { useCallback, useMemo, useState } from "react";

const storageKey = "atrx-discovered-systems";

function readDiscovered() {
  if (typeof window === "undefined") return [] as string[];

  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useDiscovery() {
  const [discovered, setDiscovered] = useState<string[]>(readDiscovered);

  const discover = useCallback((slug: string) => {
    setDiscovered((current) => {
      if (current.includes(slug)) return current;
      const next = [...current, slug];
      window.sessionStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }, []);

  return useMemo(
    () => ({
      discovered,
      count: discovered.length,
      discover,
    }),
    [discovered, discover],
  );
}
