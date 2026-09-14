"use client";

import { useEffect, useRef, useState } from "react";
import {
  Button,
  IconBox,
  MobileNativeHeader,
  PagingTabs,
  Row,
} from "@/components/monochrome";
import {
  deductions,
  formatUsd,
  liveDeductionDelta,
  liveRateAfter,
  payrollRun,
  seller,
  taxPosition,
  wallet,
} from "./data";

type Panel = "none" | "reasoning" | "reserve" | "success";

const ACCOUNT_TABS = [
  "Checking",
  "Savings",
  "Loans",
  "Credit Card",
  "Bitcoin",
] as const;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useAnimatedNumber(target: number, durationMs = 900) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setValue(from + (target - from) * easeOutCubic(t));
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, durationMs]);

  return value;
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6M17.9 17.9l-1.6-1.6M7.7 7.7 6.1 6.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron() {
  return (
    <svg className="bo-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function BankingOverviewMobile() {
  const [tab, setTab] = useState<(typeof ACCOUNT_TABS)[number]>("Checking");
  const [panel, setPanel] = useState<Panel>("none");
  const [liveDeductionVisible, setLiveDeductionVisible] = useState(false);
  const [setAside, setSetAside] = useState<number>(payrollRun.setAsideInitial);
  const [displayRate, setDisplayRate] = useState<number>(
    payrollRun.estimatedTaxRate,
  );
  const [payrollReserved, setPayrollReserved] = useState(false);
  const [totalReservedThisSession, setTotalReservedThisSession] = useState(0);
  const [lastReserved, setLastReserved] = useState(0);
  const [taxBalance, setTaxBalance] = useState<number>(wallet.taxSetAsideBefore);
  const [available, setAvailable] = useState<number>(wallet.available);
  const [pendingAmount, setPendingAmount] = useState<number>(
    payrollRun.setAsideInitial,
  );

  const animatedSetAside = useAnimatedNumber(setAside, 1200);
  const animatedRate = useAnimatedNumber(displayRate * 1000, 1200) / 1000;

  const progressReserved =
    taxPosition.reservedBefore + totalReservedThisSession;
  const behindBy = Math.max(0, taxPosition.target - progressReserved);

  const moneyIn = { pos: 18420, invoices: 5760 };
  const moneyOut = { billPay: 4120, payroll: payrollRun.grossPay };
  const moneyInTotal = moneyIn.pos + moneyIn.invoices;
  const moneyOutTotal = moneyOut.billPay + moneyOut.payroll;

  useEffect(() => {
    if (panel !== "reasoning") {
      if (panel === "none") {
        setLiveDeductionVisible(false);
        setSetAside(payrollRun.setAsideInitial);
        setDisplayRate(payrollRun.estimatedTaxRate);
      }
      return;
    }

    setLiveDeductionVisible(false);
    setSetAside(payrollRun.setAsideInitial);
    setDisplayRate(payrollRun.estimatedTaxRate);

    const show = window.setTimeout(() => {
      setLiveDeductionVisible(true);
      setSetAside(payrollRun.setAsideInitial - liveDeductionDelta);
      setDisplayRate(liveRateAfter);
    }, 1100);

    return () => window.clearTimeout(show);
  }, [panel]);

  function openReserve(amount: number) {
    setPendingAmount(amount);
    setPanel("reserve");
  }

  function confirmReserve(amount: number) {
    const isPayrollReserve =
      amount === payrollRun.setAsideInitial ||
      amount === payrollRun.setAsideInitial - liveDeductionDelta;
    if (isPayrollReserve) setPayrollReserved(true);
    setLastReserved(amount);
    setTotalReservedThisSession((n) => n + amount);
    setTaxBalance((b) => b + amount);
    setAvailable((a) => a - amount);
    setPanel("success");
  }

  const payrollReserveAmount = liveDeductionVisible
    ? payrollRun.setAsideInitial - liveDeductionDelta
    : payrollRun.setAsideInitial;
  const reserveAmount = Math.round(animatedSetAside);

  return (
    <div className="bo-stage">
      <div className="bo-phone">
        <div className="bo-status" aria-hidden>
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>

        <div className="bo-scroll mono-page-stack">
          <a className="bo-hub-link" href="/">
            ← Square Banking Design Hub
          </a>

          <header className="bo-header">
            <h1 className="bo-title">Banking</h1>
            <Button variant="secondary" size="icon" aria-label="Settings">
              <SettingsIcon />
            </Button>
          </header>

          <PagingTabs
            tabs={ACCOUNT_TABS}
            value={tab}
            onChange={(name) => setTab(name as (typeof ACCOUNT_TABS)[number])}
            aria-label="Accounts"
          />

          <div className="bo-mnh-wrap">
            <MobileNativeHeader
              accountLabel="Account ·4821"
              amount={formatUsd(available)}
              subtitle={
                <>
                  Available balance · {seller.location.split("·")[0].trim()}
                  <span className="mono-pill-ready">Ready to spend</span>
                </>
              }
            />
          </div>

          <section className="bo-tracker" aria-label="Debit card and tax set-aside">
            <Row
              title="Dave’s card"
              description="Mastercard ··4821"
              leading={<span className="bo-debit-thumb" aria-hidden />}
              onClick={() => undefined}
            />

            <p className="bo-tax-line">
              Tax set-aside{" "}
              {payrollReserved ? "reserved" : "ready"}:{" "}
              <strong>
                {formatUsd(
                  payrollReserved ? lastReserved : payrollReserveAmount,
                  { cents: false },
                )}
              </strong>
              {" · "}
              {payrollReserved
                ? `In Tax Set-Aside · due ${taxPosition.deadlineShort}`
                : behindBy > 0
                  ? `${formatUsd(behindBy, { cents: false })} still needed by ${taxPosition.deadlineShort}`
                  : `On track for ${taxPosition.deadlineShort}`}
            </p>

            {!payrollReserved ? (
              <>
                <Button
                  variant="primary"
                  block
                  className="bo-insight-stack"
                  onClick={() => openReserve(payrollReserveAmount)}
                >
                  Reserve tax set-aside
                </Button>
                <Button variant="ghost" block onClick={() => setPanel("reasoning")}>
                  See how this was calculated
                </Button>
              </>
            ) : (
              <Button variant="primary" block onClick={() => setPanel("reasoning")}>
                View tax details
              </Button>
            )}
          </section>

          <section className="bo-section" aria-label="Money in">
            <div className="bo-section-head">
              <h2 className="bo-section-label">Money in</h2>
            </div>
            <div className="bo-bar-card">
              <p className="bo-bar-total">{formatUsd(moneyInTotal)}</p>
              <div className="bo-bar" aria-hidden>
                <div
                  className="bo-bar-seg is-a"
                  style={{ width: `${(moneyIn.pos / moneyInTotal) * 100}%` }}
                />
                <div
                  className="bo-bar-seg is-b"
                  style={{
                    width: `${(moneyIn.invoices / moneyInTotal) * 100}%`,
                  }}
                />
              </div>
              <ul className="bo-legend">
                <li>
                  <span className="bo-swatch is-a" />
                  POS sales · {formatUsd(moneyIn.pos, { cents: false })}
                </li>
                <li>
                  <span className="bo-swatch is-b" />
                  Invoices paid · {formatUsd(moneyIn.invoices, { cents: false })}
                </li>
              </ul>
            </div>
          </section>

          <section className="bo-section" aria-label="Money out">
            <div className="bo-section-head">
              <h2 className="bo-section-label">Money out</h2>
            </div>
            <div className="bo-bar-card">
              <p className="bo-bar-total">
                {formatUsd(moneyOutTotal)}{" "}
                <span className="bo-muted" style={{ fontWeight: 500 }}>
                  committed
                </span>
              </p>
              <div className="bo-bar" aria-hidden>
                <div
                  className="bo-bar-seg is-a"
                  style={{
                    width: `${(moneyOut.billPay / moneyOutTotal) * 100}%`,
                  }}
                />
                <div
                  className="bo-bar-seg is-b"
                  style={{
                    width: `${(moneyOut.payroll / moneyOutTotal) * 100}%`,
                  }}
                />
              </div>
              <ul className="bo-legend">
                <li>
                  <span className="bo-swatch is-a" />
                  Bill pay · {formatUsd(moneyOut.billPay, { cents: false })}
                </li>
                <li>
                  <span className="bo-swatch is-b" />
                  Payroll · {formatUsd(moneyOut.payroll, { cents: false })}
                </li>
              </ul>
            </div>
          </section>

          <section className="bo-section" aria-label="Recent activity">
            <div className="bo-section-head">
              <h2 className="bo-section-label">Recent activity</h2>
              <Chevron />
            </div>
            <Row
              title="Payroll run · Gusto"
              description="Checking"
              leading={
                <IconBox>
                  <CardIcon />
                </IconBox>
              }
              trailing={
                <span className="bo-activity-side">
                  <p className="bo-activity-amt">
                    −{formatUsd(payrollRun.grossPay, { cents: false })}
                  </p>
                  <p className="bo-activity-bal">{formatUsd(available)}</p>
                </span>
              }
              showChevron={false}
            />
            <Row
              title="Card payment"
              description="Sales"
              leading={
                <IconBox>
                  <CardIcon />
                </IconBox>
              }
              trailing={
                <span className="bo-activity-side">
                  <p className="bo-activity-amt">+$8,420.00</p>
                  <p className="bo-activity-bal">{formatUsd(available + 8420)}</p>
                </span>
              }
              showChevron={false}
            />
            <Row
              title="Ferguson Supply"
              description="Job materials"
              leading={
                <IconBox>
                  <CardIcon />
                </IconBox>
              }
              trailing={
                <span className="bo-activity-side">
                  <p className="bo-activity-amt">−$312.40</p>
                  <p className="bo-activity-bal">
                    {formatUsd(available + 8420 - 312.4)}
                  </p>
                </span>
              }
              showChevron={false}
            />
          </section>
        </div>

        <nav className="bo-tabbar" aria-label="Primary">
          <span className="bo-tabbar-item">Checkout</span>
          <span className="bo-tabbar-item">Transactions</span>
          <span className="bo-tabbar-item is-active">Banking</span>
          <span className="bo-tabbar-item">More</span>
        </nav>

        {panel !== "none" ? (
          <div
            className="bo-scrim"
            role="presentation"
            onClick={() => setPanel("none")}
          />
        ) : null}

        <aside
          className={`bo-sheet ${panel === "reasoning" ? "is-open" : ""}`}
          aria-hidden={panel !== "reasoning"}
          inert={panel !== "reasoning" ? true : undefined}
        >
          <header className="bo-sheet-head">
            <h2>How we calculated this</h2>
            <button
              type="button"
              className="bo-icon-btn"
              aria-label="Close"
              onClick={() => setPanel("none")}
            >
              ×
            </button>
          </header>
          <div className="bo-sheet-body">
            <div className="bo-row">
              <span className="bo-muted">Income this pay period</span>
              <span>{formatUsd(payrollRun.grossPay, { cents: false })}</span>
            </div>
            <div className="bo-row">
              <span className="bo-muted">Estimated tax rate</span>
              <span>{(animatedRate * 100).toFixed(1)}%</span>
            </div>
            <div className="bo-divider" />
            <p className="bo-muted" style={{ marginBottom: 8 }}>
              Categorized deductible spend
            </p>
            <ul className="bo-deductions">
              {deductions.map((d) => {
                const show = d.settled || liveDeductionVisible;
                return (
                  <li
                    key={d.id}
                    className={`bo-deduction ${show ? "is-in" : "is-pending"} ${
                      !d.settled && liveDeductionVisible ? "is-live" : ""
                    }`}
                  >
                    <span>
                      {d.merchant}
                      <br />
                      <span className="bo-muted">{d.category}</span>
                    </span>
                    <span>−{formatUsd(d.amount)}</span>
                  </li>
                );
              })}
            </ul>
            <div
              className={`bo-live-box ${liveDeductionVisible ? "is-adjusted" : ""}`}
            >
              <p className="bo-muted">Set aside for this run</p>
              <p className="bo-live-num">
                {formatUsd(animatedSetAside, { cents: false })}
              </p>
              <p className="bo-muted">
                Your set-aside updates as your spend is categorized
              </p>
            </div>
            <button
              type="button"
              className="bo-btn-primary"
              onClick={() => openReserve(payrollReserveAmount)}
            >
              Reserve {formatUsd(reserveAmount, { cents: false })} now
            </button>
          </div>
        </aside>

        <aside
          className={`bo-sheet ${panel === "reserve" || panel === "success" ? "is-open" : ""}`}
          aria-hidden={panel !== "reserve" && panel !== "success"}
          inert={panel !== "reserve" && panel !== "success" ? true : undefined}
        >
          <header className="bo-sheet-head">
            <h2>{panel === "success" ? "Reserved" : "Confirm reserve"}</h2>
            <button
              type="button"
              className="bo-icon-btn"
              aria-label="Close"
              onClick={() => setPanel("none")}
            >
              ×
            </button>
          </header>
          <div className="bo-sheet-body">
            {panel === "success" ? (
              <>
                <p className="bo-card-name" style={{ marginBottom: 16 }}>
                  {formatUsd(lastReserved, { cents: false })} moved into Tax
                  Set-Aside
                </p>
                <div className="bo-bar-card" style={{ marginBottom: 16 }}>
                  <div className="bo-row">
                    <span className="bo-muted">Tax Set-Aside</span>
                    <strong>{formatUsd(taxBalance, { cents: false })}</strong>
                  </div>
                  <div className="bo-row">
                    <span className="bo-muted">Available</span>
                    <span>{formatUsd(available)}</span>
                  </div>
                </div>
                <p className="bo-muted" style={{ marginBottom: 16 }}>
                  Same account · no external transfer
                </p>
                <button
                  type="button"
                  className="bo-btn-primary"
                  onClick={() => setPanel("none")}
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <p className="bo-card-name" style={{ marginBottom: 16 }}>
                  Move {formatUsd(pendingAmount, { cents: false })} into Tax
                  Set-Aside
                </p>
                <div className="bo-bar-card" style={{ marginBottom: 16 }}>
                  <p className="bo-muted" style={{ marginBottom: 8 }}>
                    {seller.accountName} · {seller.accountMask}
                  </p>
                  <div className="bo-row">
                    <span className="bo-muted">From Available</span>
                    <span>{formatUsd(available)}</span>
                  </div>
                  <div className="bo-row">
                    <span className="bo-muted">To Tax Set-Aside</span>
                    <span>{formatUsd(taxBalance, { cents: false })}</span>
                  </div>
                </div>
                <p className="bo-muted" style={{ marginBottom: 16 }}>
                  One tap · funds stay in this account
                </p>
                <button
                  type="button"
                  className="bo-btn-primary"
                  onClick={() => confirmReserve(pendingAmount)}
                >
                  Confirm reserve
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
