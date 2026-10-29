import type { Metadata } from "next";
import ConsultationLanding from "./ConsultationLanding";

export const metadata: Metadata = {
  title: "Bezplatná konzultácia — NextLayer Studio",
  description:
    "Máš firmu s históriou, ale online to nie je vidieť? Ozvi sa. Prvá konzultácia je zadarmo a nezáväzná — pozrieme sa na tvoje sociálne siete a povieme, čo by sme spravili inak.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Bezplatná konzultácia — NextLayer Studio",
    description:
      "Produkcia a marketing pre zavedené značky. Prvá konzultácia je zadarmo a nezáväzná.",
    type: "website",
  },
};

export default function KonzultaciaPage() {
  return <ConsultationLanding />;
}
