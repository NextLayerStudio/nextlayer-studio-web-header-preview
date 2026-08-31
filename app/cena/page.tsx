"use client";

import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";

export default function CenaPage() {
  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <SiteMenu active="cena" />

      <PageHero
        activeNav="cena"
        num="05"
        eyebrow="Cenník"
        title={<>Ceny šijeme<br />na mieru.</>}
        lead="Pripravujeme prehľadný cenník. Do tej doby ti radi pripravíme individuálnu ponuku podľa toho, čo presne potrebuješ."
        wordmark="Cena"
        panelLabel="Na čo ti dáme ponuku"
        panelItems={["Marketing & produkcia", "Web & e-shop", "Softvér na mieru", "Dizajn & identita"]}
        ctaLabel="Napíš nám"
      />

      <PageCta
        num="01"
        eyebrow="Individuálna ponuka"
        title={<>Povedz nám,<br />čo potrebuješ.</>}
        lead="Ozvi sa nám s tým, čo máš v hlave. Vrátime sa ti s konkrétnym rozsahom, termínom a cenou."
        ghost="CENA"
      />

      <PageFooter />
    </div>
  );
}
