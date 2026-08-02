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
    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const targetId = getHashTargetId(location.hash);
        const target = targetId ? document.getElementById(targetId) : null;

        if (target) {
          target.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "start",
          });
          focusElement(target);
          return;
        }

        if (isInitialRoute || navigationType === "POP") return;

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        const heading = document.querySelector<HTMLElement>("[data-route-heading]");
        if (heading) focusElement(heading);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [location.hash, location.key, location.pathname, navigationType]);

  return null;
}
