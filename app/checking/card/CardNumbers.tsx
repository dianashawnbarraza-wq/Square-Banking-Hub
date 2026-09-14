"use client";

import Link from "next/link";
import { useState } from "react";
import { IconBox, Row } from "@/components/monochrome";

export default function CardNumbersPage() {
  const [showDetails, setShowDetails] = useState(true);
  const [locked, setLocked] = useState(false);

  return (
    <div className="ck-stage">
      <div className="ck-phone">
        <div className="ck-status" aria-hidden>
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>

        <div className="ck-scroll mono-page-stack">
          <header className="ck-card-page-head">
            <Link href="/checking" className="ck-back" aria-label="Back">
              ←
            </Link>
            <h1 className="ck-card-page-title">Adam Cortez’s card</h1>
          </header>

          <div className="ck-debit-face">
            <div className="ck-debit-top">
              <div>
                <p className="mono-row-title">Business debit</p>
                <p className="ck-muted">Virtual card</p>
              </div>
              <span className="ck-debit-mark" aria-hidden />
            </div>
            <div className="ck-debit-num-row">
              <p className="ck-debit-num">
                {showDetails ? "1234 5678 0912 0123" : "•••• •••• •••• 0123"}
              </p>
              <button type="button" className="ck-copy">
                Copy
              </button>
            </div>
            <div className="ck-debit-meta">
              <div>
                <div>EXP {showDetails ? "01/22" : "••/••"}</div>
                <div>CVC {showDetails ? "123" : "•••"}</div>
                <div style={{ marginTop: 8, color: "var(--mono-text-10)" }}>Adam Cortez</div>
              </div>
              <div className="ck-mc" aria-label="Mastercard">
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="ck-list-block">
            <h2>Mastercard 5786</h2>
            <Row
              title="Show card details"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M1.5 10S4.5 4.5 10 4.5 18.5 10 18.5 10 15.5 15.5 10 15.5 1.5 10 1.5 10Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </IconBox>
              }
              trailing={
                <button
                  type="button"
                  className={`ck-toggle ${showDetails ? "is-on" : ""}`}
                  aria-pressed={showDetails}
                  onClick={() => setShowDetails((v) => !v)}
                />
              }
              showChevron={false}
            />
            <Row
              title="Lock card"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </IconBox>
              }
              trailing={
                <button
                  type="button"
                  className={`ck-toggle ${locked ? "is-on" : ""}`}
                  aria-pressed={locked}
                  onClick={() => setLocked((v) => !v)}
                />
              }
              showChevron={false}
            />
            <Row
              title="Billing address"
              description="123 Main St, San Francisco, CA 94111"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M10 17s-6-4.2-6-8.2A3.8 3.8 0 0 1 10 5a3.8 3.8 0 0 1 6 3.8C16 12.8 10 17 10 17Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="10" cy="8.8" r="1.4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="Reset PIN"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M4 10a6 6 0 0 1 10.5-4M16 10a6 6 0 0 1-10.5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 3.5V6H12M5.5 16.5V14H8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="ATM Limits"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 8h14M7 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
          </div>

          <p className="ck-legal">
            Square is not a bank. Banking services are provided by Square Financial
            Services, Inc. or Sutton Bank, Members FDIC. Square Debit Card is issued
            by Sutton Bank, Member FDIC, pursuant to a license from Mastercard.
          </p>

          <div className="ck-list-block">
            <h2>Documents</h2>
            <Row
              title="Statements"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M4 4h9l3 3v9H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="Account ownership letter"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M10 3v10M6.5 9.5 10 13l3.5-3.5M4 16h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
          </div>

          <div className="ck-list-block">
            <h2>Get help</h2>
            <Row
              title="Problem with card"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 9v5M10 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="Support articles"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M7.8 7.8a2.4 2.4 0 0 1 4.2 1.6c0 1.4-2 1.8-2 3.2M10 14.5h.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="Contact us"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M4 5h12v8H8l-4 3V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </IconBox>
              }
              onClick={() => undefined}
            />
            <Row
              title="Cancel this card"
              leading={
                <IconBox>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="m7.5 7.5 5 5M12.5 7.5l-5 5"
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
        </div>
      </div>
    </div>
  );
}
