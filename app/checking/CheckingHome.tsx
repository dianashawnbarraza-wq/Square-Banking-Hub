"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Button,
  IconBox,
  MobileNativeHeader,
  PagingTabs,
  Row,
} from "@/components/monochrome";

type Sheet = "none" | "welcome" | "deposit" | "transfer";

const TABS = ["Checking", "Savings", "Loans", "Credit Card", "Bitcoin"] as const;

function SettingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function WalletMark() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" aria-hidden>
      <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10.5a1.5 1.5 0 0 1 1.5 1.5V4H15a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 15 13H3a1.5 1.5 0 0 1-1.5-1.5v-9Zm13.5 3H15v5h.5V5.5ZM4 3v8h10V5H4.5A1.5 1.5 0 0 1 3 3.5V3h1Z" />
    </svg>
  );
}

function CardGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function CheckingHome({ showWelcome = true }: { showWelcome?: boolean }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Checking");
  const [sheet, setSheet] = useState<Sheet>(showWelcome ? "welcome" : "none");

  return (
    <div className="ck-stage">
      <div className="ck-phone">
        <div className="ck-status" aria-hidden>
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>

        <div className="ck-scroll mono-page-stack">
          <Link className="ck-hub" href="/">
            ← Square Banking Design Hub
          </Link>

          <header className="ck-header">
            <h1 className="ck-title">Banking</h1>
            <Button variant="secondary" size="icon" aria-label="Settings">
              <SettingsIcon />
            </Button>
          </header>

          <PagingTabs
            tabs={TABS}
            value={tab}
            onChange={(name) => setTab(name as (typeof TABS)[number])}
            aria-label="Accounts"
          />

          <MobileNativeHeader
              accountLabel="Checking · 9103"
              amount="$423.21"
              subtitle="Available balance · West Broadway"
              actions={[
                { label: "Deposit", onClick: () => setSheet("deposit") },
                { label: "Transfer", onClick: () => setSheet("transfer") },
                { label: "Pay" },
              ]}
            />

          <section className="ck-tracker" aria-label="Card tracker">
            <div className="ck-tracker-head">
              <div>
                <h2 className="ck-h2">Spend now with your virtual card</h2>
                <p className="ck-muted">Physical card is printing · Arrives Apr 22</p>
              </div>
              <span className="ck-mini-card" aria-hidden />
            </div>
            <div className="ck-progress" aria-hidden>
              <span className="is-on" />
              <span />
              <span />
            </div>
            <div className="ck-progress-labels">
              <span className="is-on">PRINTING</span>
              <span>SHIPPED</span>
              <span>ARRIVED</span>
            </div>
            <Button variant="primary" block>
              <WalletMark />
              Add to Apple Wallet
            </Button>
          </section>

          <div className="ck-section-head">
            <h2 className="ck-h2">Recent activity</h2>
          </div>
          <Row
            title="Card payment"
            description="Sales"
            leading={
              <IconBox>
                <CardGlyph />
              </IconBox>
            }
            trailing={
              <span className="ck-side-stack">
                <span className="ck-side-amt">$302.21</span>
                <span className="ck-muted">$423.21</span>
              </span>
            }
            showChevron={false}
          />
          <Row
            title="Adam’s card"
            description="Mastercard ··1455"
            leading={
              <IconBox>
                <CardGlyph />
              </IconBox>
            }
            href="/checking/card"
            trailing={<span className="ck-muted">View</span>}
            showChevron={false}
          />

          <div className="ck-block-gap">
            <Link href="/checking/card" className="mono-btn mono-btn--primary mono-btn--md mono-btn--block">
              View card numbers
            </Link>
            <button type="button" className="ck-link-ghost" onClick={() => setSheet("welcome")}>
              Replay welcome
            </button>
          </div>
        </div>

        <nav className="ck-tabbar" aria-label="Primary">
          <span>Checkout</span>
          <span>Transactions</span>
          <span className="is-active">Banking</span>
          <span>More</span>
        </nav>

        {sheet !== "none" ? (
          <div className="ck-scrim" role="presentation" onClick={() => setSheet("none")} />
        ) : null}

        <aside
          className={`ck-sheet ${sheet === "welcome" ? "is-open" : ""}`}
          aria-hidden={sheet !== "welcome"}
          inert={sheet !== "welcome" ? true : undefined}
        >
          <div className="ck-sheet-handle" />
          <div className="ck-sheet-body">
            <div className="ck-welcome-art" aria-hidden>
              <div className="ck-welcome-card is-back" />
              <div className="ck-welcome-card is-front">
                <div className="ck-debit-mark" />
                <p className="ck-muted ck-welcome-brand">Shape and Form</p>
              </div>
            </div>
            <span className="mono-pill-ready">Ready to spend</span>
            <h2 className="ck-welcome-h">Spend your first sale instantly</h2>
            <p className="ck-welcome-p">
              Add your Square Debit Card to Apple Wallet and tap to pay anywhere.
            </p>
            <Button variant="primary" block>
              <WalletMark />
              Add to Apple Wallet
            </Button>
            <button type="button" className="ck-link-ghost" onClick={() => setSheet("none")}>
              Not now
            </button>
          </div>
        </aside>

        <aside
          className={`ck-sheet ${sheet === "deposit" ? "is-open" : ""}`}
          aria-hidden={sheet !== "deposit"}
          inert={sheet !== "deposit" ? true : undefined}
        >
          <div className="ck-sheet-handle" />
          <div className="ck-sheet-body">
            <h2 className="ck-sheet-title">Deposit</h2>
            <p className="ck-sheet-label">Quick add</p>
            <Row
              title="Link a debit card"
              description="Instant transfer"
              leading={
                <IconBox>
                  <CardGlyph />
                </IconBox>
              }
              onClick={() => undefined}
            />
            <p className="ck-sheet-label ck-sheet-label-gap">Make a deposit</p>
            <Row
              title="ACH & bank transfers"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M3 16V8l7-5 7 5v8H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8 16v-5h4v5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="Mobile check deposit"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="Cash deposit"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M10 6v8M7.5 8.5c.5-1 1.4-1.5 2.5-1.5s2 .5 2.5 1.5M7.5 11.5c.5 1 1.4 1.5 2.5 1.5s2-.5 2.5-1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
          </div>
        </aside>

        <aside
          className={`ck-sheet ${sheet === "transfer" ? "is-open" : ""}`}
          aria-hidden={sheet !== "transfer"}
          inert={sheet !== "transfer" ? true : undefined}
        >
          <div className="ck-sheet-handle" />
          <div className="ck-sheet-body">
            <h2 className="ck-sheet-title">Transfer</h2>
            <Row
              title="To another Square balance"
              description="Instant"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M4 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="To an external bank account"
              description="Instant (1.75% fee) or 1–2 business days"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M3 16V8l7-5 7 5v8H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8 16v-5h4v5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
