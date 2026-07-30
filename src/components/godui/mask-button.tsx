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

function MaskLayers({ children, mask }: Required<Pick<MaskActionOptions, "children" | "mask">>) {
  return (
    <>
      <span className="mask-action__content">{children}</span>
      <span
        className="mask-action__fill"
        style={{ "--mask-image": `url("${MASK_ASSETS[mask]}")` } as CSSProperties}
        aria-hidden="true"
      >
        <span>{children}</span>
      </span>
    </>
  );
}

function usePressedState<T extends HTMLButtonElement | HTMLAnchorElement>(
  onKeyDown?: (event: KeyboardEvent<T>) => void,
  onKeyUp?: (event: KeyboardEvent<T>) => void,
  onPointerDown?: (event: PointerEvent<T>) => void,
  onPointerUp?: (event: PointerEvent<T>) => void,
  onPointerCancel?: (event: PointerEvent<T>) => void,
  onBlur?: FocusEventHandler<T>,
) {
  const [pressed, setPressed] = useState(false);

  return {
    pressed,
    handleKeyDown: (event: KeyboardEvent<T>) => {
      if (event.key === "Enter" || event.key === " ") setPressed(true);
      onKeyDown?.(event);
    },
    handleKeyUp: (event: KeyboardEvent<T>) => {
      if (event.key === "Enter" || event.key === " ") setPressed(false);
      onKeyUp?.(event);
    },
    handlePointerDown: (event: PointerEvent<T>) => {
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
        onKeyDown={press.handleKeyDown}
        onKeyUp={press.handleKeyUp}
        onPointerDown={press.handlePointerDown}
        onPointerUp={press.handlePointerUp}
        onPointerCancel={press.handlePointerCancel}
        onBlur={press.handleBlur}
        {...props}
      >
        <MaskLayers mask={mask}>{children}</MaskLayers>
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
        onKeyDown={press.handleKeyDown}
        onKeyUp={press.handleKeyUp}
        onPointerDown={press.handlePointerDown}
        onPointerUp={press.handlePointerUp}
        onPointerCancel={press.handlePointerCancel}
        onBlur={press.handleBlur}
        {...props}
      >
        <MaskLayers mask={mask}>{children}</MaskLayers>
      </a>
    );
  },
);

MaskButton.displayName = "MaskButton";
MaskLink.displayName = "MaskLink";

export { MaskButton, MaskLink };
