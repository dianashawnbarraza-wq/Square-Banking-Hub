import type { ReactNode } from "react";
import Button from "./Button";

type Action = { label: string; onClick?: () => void };

type Props = {
  accountLabel?: string;
  amount: string;
  subtitle?: ReactNode;
  onAccountClick?: () => void;
  actions?: Action[];
};

/**
 * Monochrome Mobile Native Header — Figma `86:3473`.
 * White card · account row · display balance · Deposit/Transfer/Pay.
 */
export default function MobileNativeHeader({
  accountLabel = "Checking · 9103",
  amount,
  subtitle = "Available balance",
  onAccountClick,
  actions = [
    { label: "Deposit" },
    { label: "Transfer" },
    { label: "Pay" },
  ],
}: Props) {
  return (
    <section className="mono-mnh" aria-label="Account balance">
      <button type="button" className="mono-mnh-account" onClick={onAccountClick}>
        <span>{accountLabel}</span>
        <svg className="mono-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M6 3.5 10.5 8 6 12.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="mono-mnh-amount">{amount}</p>
      {subtitle ? <div className="mono-mnh-sub">{subtitle}</div> : null}
      <div className="mono-mnh-actions">
        {actions.map((action) => (
          <Button key={action.label} variant="secondary" size="md" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
