import type { Metadata } from "next";
import CardNumbersPage from "./CardNumbers";
import "../checking.css";

export const metadata: Metadata = {
  title: "Square Checking · Card numbers",
  description: "Square Debit Card numbers and settings — Checking SPOS prototype.",
  robots: { index: false, follow: false },
};

export default function CheckingCardPage() {
  return <CardNumbersPage />;
}
