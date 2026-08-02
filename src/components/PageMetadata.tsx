import { useEffect } from "react";
import { applyPageMetadata, type RouteMetadata } from "../lib/pageMetadata";

type Props = {
  metadata: RouteMetadata;
};

export function PageMetadata({ metadata }: Props) {
  useEffect(() => {
    applyPageMetadata(metadata);

    const onVisibilityChange = () => {
      document.title = document.hidden ? "signal paused // ATRX" : metadata.title;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [metadata]);

  return null;
}
