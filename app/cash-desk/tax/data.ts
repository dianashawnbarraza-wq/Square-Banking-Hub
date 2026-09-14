/** Mock data for Tax Set-Aside — structured as Gusto-known payroll facts, not user input. */

export const seller = {
  name: "Dave's Plumbing",
  location: "Oakland · Mission St",
  accountName: "Business Checking",
  accountMask: "•••• 4821",
} as const;

export const payrollRun = {
  id: "pr-2026-09-12",
  label: "Payroll · Sep 12",
  paidOn: "Sep 12, 2026",
  cadence: "Biweekly",
  grossPay: 18420,
  employeeCount: 6,
  /** Running estimated quarterly rate after categorized spend adjustments */
  estimatedTaxRate: 0.268,
  /** Set-aside already computed from gross × rate for this run */
  setAsideInitial: 4936,
} as const;

export const deductions = [
  {
    id: "ded-1",
    merchant: "Ferguson Supply",
    category: "Job materials",
    amount: 312.4,
    settled: true,
  },
  {
    id: "ded-2",
    merchant: "Shell Fleet",
    category: "Vehicle",
    amount: 86.18,
    settled: true,
  },
  {
    id: "ded-3",
    merchant: "Home Depot",
    category: "Job materials",
    amount: 54.0,
    /** Lands live in State 2 */
    settled: false,
  },
] as const;

/** Dollars the live Home Depot categorization knocks off the set-aside */
export const liveDeductionDelta = 14;

/** Rate after the live categorization lands (mock adjustment) */
export const liveRateAfter = 0.267;

export const taxPosition = {
  quarterLabel: "Q3 estimated taxes",
  deadline: "Sep 15, 2026",
  deadlineShort: "Sep 15",
  target: 14800,
  reservedBefore: 9240,
  /** After this payroll reserve lands */
  reservedAfterInitial: 9240 + payrollRun.setAsideInitial,
} as const;

export const wallet = {
  available: 41280.55,
  taxSetAsideBefore: 9240,
} as const;

export function formatUsd(n: number, opts?: { cents?: boolean }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts?.cents === false ? 0 : 2,
    maximumFractionDigits: opts?.cents === false ? 0 : 2,
  }).format(n);
}
