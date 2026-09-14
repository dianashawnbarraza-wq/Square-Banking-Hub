import type { Metadata } from "next";
import CheckingHome from "./CheckingHome";
import "./checking.css";

export const metadata: Metadata = {
  title: "Square Checking · Banking",
  description:
    "Square Checking SPOS prototype — Banking home, Welcome, Deposit, Transfer, card tracker.",
  robots: { index: false, follow: false },
};

export default function CheckingPage() {
  return <CheckingHome showWelcome />;
}
