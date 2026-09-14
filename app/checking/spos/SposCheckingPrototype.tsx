"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Button,
  IconBox,
  MobileNativeHeader,
  PagingTabs,
  Row,
} from "@/components/monochrome";

type Tab = "checkout" | "transactions" | "banking" | "more";
type CheckoutPhase = "ready" | "charging" | "sold";

const ACCOUNT_TABS = ["Checking", "Savings", "Loans", "Credit Card", "Bitcoin"] as const;

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

function CardGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function SposCheckingPrototype() {
  const [tab, setTab] = useState<Tab>("checkout");
  const [accountTab, setAccountTab] = useState<(typeof ACCOUNT_TABS)[number]>("Checking");
  const [checkout, setCheckout] = useState<CheckoutPhase>("ready");
  const [amount] = useState("$42.00");
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [saleComplete, setSaleComplete] = useState(false);

  useEffect(() => {
    if (checkout !== "charging") return;
    const t = window.setTimeout(() => {
      setCheckout("sold");
      setSaleComplete(true);
    }, 900);
    return () => window.clearTimeout(t);
  }, [checkout]);

  function goTab(next: Tab) {
    if (next === "banking" && tab === "checkout") {
      setWelcomeOpen(true);
    }
    setTab(next);
  }

  function charge() {
    if (checkout !== "ready") return;
    setCheckout("charging");
  }

  function dismissWelcome() {
    setWelcomeOpen(false);
  }

  return (
    <div className="spos-stage">
      <Link className="spos-hub" href="/">
        ← Square Banking Design Hub
      </Link>

      <div className="spos-phone" data-node-id="spos-frame">
        <div className="spos-status" aria-hidden>
          <span>9:41</span>
          <span className="spos-status-icons">●●● ▮</span>
        </div>

        <div className="spos-body">
          {tab === "checkout" ? (
            <section className="spos-checkout mono-page-stack" aria-label="Checkout">
              <header className="spos-page-head">
                <h1 className="spos-title">Checkout</h1>
              </header>
              <p className="spos-muted">Shape and Form · West Broadway</p>

              <div className="spos-amount-card">
                <p className="spos-amount-label">Sale amount</p>
                <p className="spos-amount">{amount}</p>
                <p className="spos-muted">Latte · tip included</p>
              </div>

              {checkout === "ready" ? (
                <Button variant="primary" block onClick={charge}>
                  Charge {amount}
                </Button>
              ) : null}

              {checkout === "charging" ? (
                <Button variant="primary" block disabled>
                  Processing…
                </Button>
              ) : null}

              {checkout === "sold" ? (
                <div className="spos-sold mono-cluster">
                  <p className="spos-sold-title">Sale complete</p>
                  <p className="spos-muted">
                    {amount} deposited to Square Checking · open Banking to spend it
                  </p>
                  <Button variant="secondary" block onClick={() => goTab("banking")}>
                    Go to Banking
                  </Button>
                  <Button
                    variant="ghost"
                    block
                    onClick={() => {
                      setCheckout("ready");
                      setSaleComplete(false);
                    }}
                  >
                    New sale
                  </Button>
                </div>
              ) : null}
            </section>
          ) : null}

          {tab === "transactions" ? (
            <section className="spos-checkout mono-page-stack" aria-label="Transactions">
              <header className="spos-page-head">
                <h1 className="spos-title">Transactions</h1>
              </header>
              <Row
                title={saleComplete ? "Card payment" : "No sales yet"}
                description={saleComplete ? "Sales · just now" : "Complete a sale on Checkout"}
                leading={
                  <IconBox>
                    <CardGlyph />
                  </IconBox>
                }
                trailing={
                  saleComplete ? (
                    <span className="spos-side-amt">{amount}</span>
                  ) : undefined
                }
                showChevron={false}
              />
            </section>
          ) : null}

          {tab === "more" ? (
            <section className="spos-checkout mono-page-stack" aria-label="More">
              <header className="spos-page-head">
                <h1 className="spos-title">More</h1>
              </header>
              <p className="spos-muted">Settings and account tools stay in product chrome.</p>
            </section>
          ) : null}

          {tab === "banking" ? (
            <section className="spos-banking mono-page-stack" aria-label="Banking">
              <header className="spos-page-head">
                <h1 className="spos-title">Banking</h1>
                <Button variant="secondary" size="icon" aria-label="Settings">
                  <SettingsIcon />
                </Button>
              </header>

              <PagingTabs
                tabs={ACCOUNT_TABS}
                value={accountTab}
                onChange={(name) => setAccountTab(name as (typeof ACCOUNT_TABS)[number])}
                aria-label="Accounts"
              />

              <MobileNativeHeader
                accountLabel="Checking · 9103"
                amount={saleComplete ? "$465.21" : "$423.21"}
                subtitle="Available balance · West Broadway"
                actions={[{ label: "Deposit" }, { label: "Transfer" }, { label: "Pay" }]}
              />

              <section className="spos-tracker" aria-label="Card tracker">
                <div className="spos-tracker-head">
                  <div>
                    <h2 className="spos-h2">Spend now with your virtual card</h2>
                    <p className="spos-muted">Physical card is printing · Arrives Apr 22</p>
                  </div>
                  <span className="spos-mini-card" aria-hidden />
                </div>
                <div className="spos-progress" aria-hidden>
                  <span className="is-on" />
                  <span />
                  <span />
                </div>
                <div className="spos-progress-labels">
                  <span className="is-on">PRINTING</span>
                  <span>SHIPPED</span>
                  <span>ARRIVED</span>
                </div>
                <Button variant="primary" block>
                  <Image src="/spos/wallet.svg" alt="" width={31} height={23} />
                  Add to Apple Wallet
                </Button>
              </section>

              <div className="spos-section-head">
                <h2 className="spos-h2">Recent activity</h2>
              </div>
              {saleComplete ? (
                <Row
                  title="Card payment"
                  description="Sales"
                  leading={
                    <IconBox>
                      <CardGlyph />
                    </IconBox>
                  }
                  trailing={
                    <span className="spos-side-stack">
                      <span className="spos-side-amt">{amount}</span>
                      <span className="spos-muted">$465.21</span>
                    </span>
                  }
                  showChevron={false}
                />
              ) : null}
              <Row
                title="Adam’s card"
                description="Mastercard ··1455"
                leading={
                  <IconBox>
                    <CardGlyph />
                  </IconBox>
                }
                href="/checking/card"
                trailing={<span className="spos-muted">View</span>}
                showChevron={false}
              />
            </section>
          ) : null}
        </div>

        <nav className="spos-tabbar" aria-label="Primary">
          {(
            [
              ["checkout", "Checkout"],
              ["transactions", "Transactions"],
              ["banking", "Banking"],
              ["more", "More"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`spos-tab${tab === id ? " is-active" : ""}`}
              onClick={() => goTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        {welcomeOpen ? (
          <div className="spos-scrim" role="presentation" onClick={dismissWelcome} />
        ) : null}

        <aside
          className={`spos-welcome ${welcomeOpen ? "is-open" : ""}`}
          aria-hidden={!welcomeOpen}
          inert={!welcomeOpen ? true : undefined}
          aria-label="Welcome to Square Checking"
        >
          <div className="spos-welcome-handle" />
          <div className="spos-welcome-art" aria-hidden>
            <div className="spos-welcome-gradient" />
            <div className="spos-card-float">
              <Image
                src="/spos/welcome-card.png"
                alt=""
                width={302}
                height={226}
                className="spos-card-img"
                priority
              />
            </div>
          </div>
          <div className="spos-welcome-copy mono-cluster">
            <span className="spos-ready-pill">
              <Image src="/spos/ready-icon.svg" alt="" width={16} height={16} />
              Ready to spend
            </span>
            <h2 className="spos-welcome-h">Spend your first sale instantly</h2>
            <p className="spos-welcome-p">
              Add your Square Debit Card to Apple Wallet and tap to pay anywhere.
            </p>
          </div>
          <div className="spos-welcome-actions">
            <Button variant="primary" block className="spos-wallet-btn">
              <Image src="/spos/wallet.svg" alt="" width={31} height={23} />
              Add to Apple Wallet
            </Button>
            <button type="button" className="spos-not-now" onClick={dismissWelcome}>
              Not now
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
