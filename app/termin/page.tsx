import type { Metadata } from "next";
import { Suspense } from "react";
import TerminForm from "./TerminForm";

export const metadata: Metadata = {
  title: "Vyber si termín — NextLayer Studio",
  description: "Dohodni si termín bezplatnej konzultácie s NextLayer Studio.",
  robots: { index: false, follow: false },
};

export default function TerminPage() {
  return (
    <Suspense fallback={null}>
      <TerminForm />
    </Suspense>
  );
}
