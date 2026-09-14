import type { Metadata } from "next";
import SposCheckingPrototype from "./SposCheckingPrototype";
import "./spos.css";

export const metadata: Metadata = {
  title: "Checking · Square Point of Sale",
  description:
    "Mobile SPOS: complete a sale on Checkout, open Banking for Welcome, dismiss to Banking home.",
  robots: { index: false, follow: false },
};

export default function SposCheckingPage() {
  return <SposCheckingPrototype />;
}
