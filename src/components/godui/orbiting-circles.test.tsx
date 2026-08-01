import { render } from "@testing-library/react";
import type { HTMLAttributes } from "react";
import { OrbitingCircles } from "./orbiting-circles";

const motionState = vi.hoisted(() => ({ reduced: false }));

vi.mock("framer-motion", async () => {
  const React = await import("react");

  return {
    useReducedMotion: () => motionState.reduced,
    motion: {
      div: React.forwardRef<
        HTMLDivElement,
        HTMLAttributes<HTMLDivElement> & { animate?: unknown; transition?: unknown }
      >(function MotionDiv({ animate, transition: _transition, ...props }, ref) {
        return (
          <div
            ref={ref}
            data-motion="true"
            data-animate={animate ? JSON.stringify(animate) : undefined}
            {...props}
          />
        );
      }),
    },
  };
});

describe("OrbitingCircles", () => {
  afterEach(() => {
    motionState.reduced = false;
  });

  it("reserves the documented box and reverses the ring deliberately", () => {
    const { container } = render(
      <OrbitingCircles radius={96} iconSize={44} duration={18} reverse>
        <span>A</span>
        <span>B</span>
      </OrbitingCircles>,
    );

    const root = container.querySelector('[data-slot="orbiting-circles"]');
    const motionLayers = container.querySelectorAll('[data-motion="true"]');

    expect(root).toHaveStyle({ width: "236px", height: "236px" });
    expect(root?.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(motionLayers[0]).toHaveAttribute("data-animate", '{"rotate":-360}');
    expect(motionLayers[1]).toHaveAttribute("data-animate", '{"rotate":[0,360]}');
  });

  it("removes continuous rotation when reduced motion is requested", () => {
    motionState.reduced = true;

    const { container } = render(
      <OrbitingCircles radius={72} iconSize={36}>
        <span>A</span>
        <span>B</span>
      </OrbitingCircles>,
    );

    for (const layer of container.querySelectorAll('[data-motion="true"]')) {
      expect(layer).not.toHaveAttribute("data-animate");
    }
  });
});
