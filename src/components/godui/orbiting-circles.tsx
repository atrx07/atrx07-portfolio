"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

export type OrbitingCirclesProps = React.HTMLAttributes<HTMLDivElement> & {
  radius?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  showPath?: boolean;
  iconSize?: number;
};

const OrbitingCircles = React.forwardRef<HTMLDivElement, OrbitingCirclesProps>(
  (
    {
      radius = 120,
      duration = 20,
      delay = 0,
      reverse = false,
      showPath = true,
      iconSize = 40,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const items = React.Children.toArray(children);
    const itemCount = items.length || 1;
    const box = radius * 2 + iconSize;

    const spin = {
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear" as const,
    };

    return (
      <div
        ref={ref}
        data-slot="orbiting-circles"
        className={`relative ${className ?? ""}`}
        style={{ width: box, height: box, ...style }}
        {...props}
      >
        {showPath ? (
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40"
            style={{ width: radius * 2, height: radius * 2 }}
          />
        ) : null}

        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: reverse ? -360 : 360 }}
          transition={reduceMotion ? undefined : spin}
        >
          {items.map((child, index) => {
            const angle = (360 / itemCount) * index;

            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: iconSize,
                  height: iconSize,
                  marginLeft: -iconSize / 2,
                  marginTop: -iconSize / 2,
                  transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                }}
              >
                <motion.div
                  className="flex size-full items-center justify-center"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: reverse
                            ? [-angle, -angle + 360]
                            : [-angle, -angle - 360],
                        }
                  }
                  transition={reduceMotion ? undefined : spin}
                  style={reduceMotion ? { transform: `rotate(${-angle}deg)` } : undefined}
                >
                  {child}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  },
);

OrbitingCircles.displayName = "OrbitingCircles";

export { OrbitingCircles };
