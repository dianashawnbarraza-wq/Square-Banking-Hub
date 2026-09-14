import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm" | "icon";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Full-width CTA (Welcome / sheets), not flex-grow in a row */
  block?: boolean;
  children?: ReactNode;
};

/**
 * Monochrome Button — Figma Button (catalog Deposit instances).
 * Primary: emphasis/fill · Secondary: fill/40 · Icon: 48×48 header actions.
 */
export default function Button({
  variant = "secondary",
  size = "md",
  block = false,
  className = "",
  children,
  type = "button",
  ...rest
}: Props) {
  const classes = [
    "mono-btn",
    `mono-btn--${variant}`,
    `mono-btn--${size}`,
    block ? "mono-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
