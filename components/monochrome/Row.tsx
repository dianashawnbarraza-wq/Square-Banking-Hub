import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: ReactNode;
  leading?: ReactNode;
  /** Replaces default chevron (e.g. amounts, toggles) */
  trailing?: ReactNode;
  showChevron?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
};

/**
 * Monochrome Row — Figma Row (86:8197).
 * Leading accessory · primary/secondary text · trailing.
 */
export default function Row({
  title,
  description,
  leading,
  trailing,
  showChevron = true,
  onClick,
  href,
  className = "",
}: Props) {
  const content = (
    <>
      {leading ? <span className="mono-row-leading">{leading}</span> : null}
      <span className="mono-row-content">
        <span className="mono-row-title">{title}</span>
        {description ? <span className="mono-row-desc">{description}</span> : null}
      </span>
      {(trailing || showChevron) && (
        <span className="mono-row-trailing">
          {trailing ??
            (showChevron ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M6 3.5 10.5 8 6 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null)}
        </span>
      )}
    </>
  );

  const cls = ["mono-row", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a className={cls} href={href}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={cls}>{content}</div>;
}

export function IconBox({ children }: { children: ReactNode }) {
  return <span className="mono-icon-box">{children}</span>;
}
