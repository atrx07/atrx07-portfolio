import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { getHashTargetId, prefersReducedMotion } from "../lib/routeNavigation";

function focusElement(element: HTMLElement) {
  const hadTabIndex = element.hasAttribute("tabindex");
  if (!hadTabIndex) element.setAttribute("tabindex", "-1");
  element.focus({ preventScroll: true });

  if (!hadTabIndex) {
    element.addEventListener("blur", () => element.removeAttribute("tabindex"), { once: true });
  }
}

export function RouteEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const firstRender = useRef(true);

  useEffect(() => {
    const isInitialRoute = firstRender.current;
    firstRender.current = false;
    const targetId = getHashTargetId(location.hash);
    const shouldFocusHeading = !targetId && !isInitialRoute && navigationType !== "POP";
    let frame = 0;
    let observer: MutationObserver | null = null;
    let timeout = 0;

    if (shouldFocusHeading) window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const resolveTarget = () =>
      targetId
        ? document.getElementById(targetId)
        : shouldFocusHeading
          ? document.querySelector<HTMLElement>("[data-route-heading]")
          : null;

    const applyTarget = () => {
      const target = resolveTarget();
      if (!target) return false;

      if (targetId) {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      }
      focusElement(target);
      return true;
    };

    frame = window.requestAnimationFrame(() => {
      if (applyTarget() || (!targetId && !shouldFocusHeading)) return;

      observer = new MutationObserver(() => {
        if (!applyTarget()) return;
        observer?.disconnect();
        window.clearTimeout(timeout);
      });
      observer.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });
      timeout = window.setTimeout(() => observer?.disconnect(), 3000);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.clearTimeout(timeout);
    };
  }, [location.hash, location.key, location.pathname, navigationType]);

  return null;
}
