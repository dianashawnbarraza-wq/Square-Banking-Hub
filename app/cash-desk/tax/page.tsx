import type { Metadata } from "next";
import BankingOverviewMobile from "./TaxSetAsidePrototype";
import "./tax.css";

export const metadata: Metadata = {
  title: "Banking Overview · Tax Set-Aside",
  description:
    "Mobile Banking Overview with Gusto-native tax set-aside — Square Monochrome UI System.",
  robots: { index: false, follow: false },
};

export default function TaxSetAsidePage() {
  return <BankingOverviewMobile />;
}
