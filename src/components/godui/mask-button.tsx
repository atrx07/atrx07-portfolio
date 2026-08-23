import {
  forwardRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FocusEvent,
  type FocusEventHandler,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

export type MaskButtonMask = "nature" | "urban" | "forest";
export type MaskButtonVariant = "primary" | "secondary";
export type MaskButtonSize = "sm" | "md" | "lg";

type MaskActionOptions = {
  children: ReactNode;
  mask?: MaskButtonMask;
  variant?: MaskButtonVariant;
  size?: MaskButtonSize;
};

export type MaskButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MaskActionOptions;
export type MaskLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & MaskActionOptions;

const MASK_ASSETS: Record<MaskButtonMask, string> = {
  nature: new URL("../assets/mask-nature.png", import.meta.url).href,
  urban: new URL("../assets/mask-urban.png", import.meta.url).href,
  forest: new URL("../assets/mask-forest.png", import.meta.url).href,
};

function MaskLayers({
  children,
  mask,
  ready,
}: Required<Pick<MaskActionOptions, "children" | "mask">> & { ready: boolean }) {
  return (
    <>
      <span className="mask-action__content">{children}</span>
      <span
        className="mask-action__fill"
        style={ready ? ({ "--mask-image": `url("${MASK_ASSETS[mask]}")` } as CSSProperties) : undefined}
        aria-hidden="true"
      >
        <span>{children}</span>
      </span>
    </>
  );
}

function canLoadAnimatedMask() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return false;

  return (
    CSS.supports("mask-image", "linear-gradient(#000, #000)") ||
    CSS.supports("-webkit-mask-image", "linear-gradient(#000, #000)")
  );
}

function usePressedState<T extends HTMLButtonElement | HTMLAnchorElement>(
  onKeyDown?: (event: KeyboardEvent<T>) => void,
  onKeyUp?: (event: KeyboardEvent<T>) => void,
  onPointerDown?: (event: PointerEvent<T>) => void,
  onPointerUp?: (event: PointerEvent<T>) => void,
  onPointerCancel?: (event: PointerEvent<T>) => void,
  onPointerEnter?: (event: PointerEvent<T>) => void,
  onFocus?: FocusEventHandler<T>,
  onBlur?: FocusEventHandler<T>,
) {
  const [pressed, setPressed] = useState(false);
  const [maskReady, setMaskReady] = useState(false);
  const armMask = () => {
    if (!maskReady && canLoadAnimatedMask()) setMaskReady(true);
  };

  return {
    pressed,
    maskReady,
    handleKeyDown: (event: KeyboardEvent<T>) => {
      if (event.key === "Enter" || event.key === " ") {
        armMask();
        setPressed(true);
      }
      onKeyDown?.(event);
    },
    handleKeyUp: (event: KeyboardEvent<T>) => {
      if (event.key === "Enter" || event.key === " ") setPressed(false);
      onKeyUp?.(event);
    },
    handlePointerDown: (event: PointerEvent<T>) => {
      armMask();
      setPressed(true);
      onPointerDown?.(event);
    },
    handlePointerUp: (event: PointerEvent<T>) => {
      setPressed(false);
      onPointerUp?.(event);
    },
    handlePointerCancel: (event: PointerEvent<T>) => {
      setPressed(false);
      onPointerCancel?.(event);
    },
    handlePointerEnter: (event: PointerEvent<T>) => {
      armMask();
      onPointerEnter?.(event);
    },
    handleFocus: (event: FocusEvent<T>) => {
      armMask();
      onFocus?.(event);
    },
    handleBlur: (event: FocusEvent<T>) => {
      setPressed(false);
      onBlur?.(event);
    },
  };
}

const MaskButton = forwardRef<HTMLButtonElement, MaskButtonProps>(
  (
    {
      children,
      className,
      mask = "nature",
      variant = "primary",
      size = "md",
      type = "button",
      onKeyDown,
      onKeyUp,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onPointerEnter,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const press = usePressedState(
      onKeyDown,
      onKeyUp,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onPointerEnter,
      onFocus,
      onBlur,
    );

    return (
      <button
        ref={ref}
        type={type}
        className={`mask-action ${className ?? ""}`}
        data-mask={mask}
        data-variant={variant}
        data-size={size}
        data-pressed={press.pressed ? "true" : undefined}
        data-mask-ready={press.maskReady ? "true" : undefined}
        onKeyDown={press.handleKeyDown}
        onKeyUp={press.handleKeyUp}
        onPointerDown={press.handlePointerDown}
        onPointerUp={press.handlePointerUp}
        onPointerCancel={press.handlePointerCancel}
        onPointerEnter={press.handlePointerEnter}
        onFocus={press.handleFocus}
        onBlur={press.handleBlur}
        {...props}
      >
        <MaskLayers mask={mask} ready={press.maskReady}>{children}</MaskLayers>
      </button>
    );
  },
);

const MaskLink = forwardRef<HTMLAnchorElement, MaskLinkProps>(
  (
    {
      children,
      className,
      mask = "nature",
      variant = "primary",
      size = "md",
      onKeyDown,
      onKeyUp,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onPointerEnter,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const press = usePressedState(
      onKeyDown,
      onKeyUp,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onPointerEnter,
      onFocus,
      onBlur,
    );

    return (
      <a
        ref={ref}
        className={`mask-action ${className ?? ""}`}
        data-mask={mask}
        data-variant={variant}
        data-size={size}
        data-pressed={press.pressed ? "true" : undefined}
        data-mask-ready={press.maskReady ? "true" : undefined}
        onKeyDown={press.handleKeyDown}
        onKeyUp={press.handleKeyUp}
        onPointerDown={press.handlePointerDown}
        onPointerUp={press.handlePointerUp}
        onPointerCancel={press.handlePointerCancel}
        onPointerEnter={press.handlePointerEnter}
        onFocus={press.handleFocus}
        onBlur={press.handleBlur}
        {...props}
      >
        <MaskLayers mask={mask} ready={press.maskReady}>{children}</MaskLayers>
      </a>
    );
  },
);

MaskButton.displayName = "MaskButton";
MaskLink.displayName = "MaskLink";

export { MaskButton, MaskLink };
