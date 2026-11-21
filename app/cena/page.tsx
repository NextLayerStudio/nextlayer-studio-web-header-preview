"use client";

import { useState } from "react";
import Link from "next/link";
import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";
import Reveal from "../components/Reveal";

/* ── HLAVNÝ PRODUKT: reklama, ktorá prináša dopyty ── */

const mainVariants = [
  { id: "meta", name: "Facebook + Instagram", monthly: 290, once: 290, extra: [] as string[] },
  {
    id: "google",
    name: "+ Google",
    monthly: 390,
    once: 390,
    extra: ["Google reklama pre ľudí, ktorí ťa práve hľadajú", "Dopytový radar v cene"],
  },
];

const mainIncludes = [
  "Nastavíme reklamu a formulár na dopyty",
  "Reklamy pripravíme z tvojich fotiek a videí z mobilu",
  "Každý nový dopyt ti príde na mobil do pár minút",
  "Každý mesiac podrobný report: koľko dopytov prišlo, koľko stál jeden a čo sme pre teba urobili",
  "Výsledky si s tebou radi prejdeme na krátkom online hovore",
];

const forYou = [
  "Máš firmu, ktorá žije zo zákaziek alebo objednávok",
  "Vieš raz za mesiac natočiť mobilom pár krátkych videí podľa nášho scenára",
  "Na reklamu vieš dať aspoň 150 € mesačne (platíš priamo Facebooku / Googlu)",
];

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default function CenaPage() {
  const [variant, setVariant] = useState(mainVariants[0].id);
  const v = mainVariants.find((x) => x.id === variant) ?? mainVariants[0];

  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll scroll-smooth">
      <SiteMenu active="cena" />

      <PageHero
        activeNav="cena"
        num="05"
        eyebrow="Cenník"
        title={<>Reklama, ktorá ti<br />prináša dopyty.</>}
        lead="Nastavíme ti reklamu na Facebooku, Instagrame a Googli. Nové dopyty ti chodia na mobil do pár minút. Ty sa staráš len o zákazníkov."
        wordmark="Cena"
        panelLabel="Od 290 € mesačne"
        panelItems={["Reklama na FB, IG a Google", "Dopyty na mobil do pár minút", "Mesačný report", "Obsah natočíš mobilom"]}
        ctaLabel="Pozrieť cenu"
        ctaHref="#cena"
      />

      {/* ── HLAVNÝ PRODUKT ── */}
      <section id="cena" className="relative overflow-hidden px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <p className="absolute -right-6 top-6 text-[20vw] font-bold leading-none tracking-tighter text-black/[0.06] select-none pointer-events-none">€</p>

        <Reveal className="relative z-10">
          <div className="bg-black text-white p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-7">
                <span className="bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">Naša hlavná služba</span>
                <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Viac dopytov.<br /><span className="text-[#BAFF57]">Bez starostí.</span></h2>

                <ul className="mt-8 space-y-3">
                  {[...mainIncludes, ...v.extra].map((item) => (
                    <li key={item} className="flex gap-3 text-sm md:text-base leading-relaxed text-white/85">
                      <span className="mt-2 w-1.5 h-1.5 bg-[#BAFF57] rotate-45 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-12 flex flex-col">
                <div className="flex flex-wrap gap-2">
                  {mainVariants.map((x) => (
                    <button
                      key={x.id}
                      type="button"
                      onClick={() => setVariant(x.id)}
                      className={`px-4 py-2.5 text-xs uppercase tracking-wider border transition-colors ${
                        x.id === v.id ? "bg-[#BAFF57] text-black border-[#BAFF57]" : "border-white/25 text-white hover:border-[#BAFF57]"
                      }`}
                    >
                      {x.name}
                    </button>
                  ))}
                </div>

                <p className="mt-8 flex items-end gap-2 text-[#BAFF57]">
                  <span className="text-7xl md:text-8xl font-bold leading-[0.8] tracking-tighter">{v.monthly}</span>
                  <span className="text-4xl font-bold leading-none">€</span>
                </p>
                <p className="mt-3 text-[10px] md:text-xs uppercase tracking-widest font-mono text-white/50">mesačne</p>
                <p className="mt-4 text-sm text-white/70">+ {v.once} € jednorazovo za nastavenie</p>
                <p className="mt-1 text-xs text-white/45">Platíš mesačne vopred, bez viazanosti. Rozpočet na reklamu platíš priamo Facebooku / Googlu. Ceny sú konečné, nie sme platcami DPH.</p>

                <Link href="/#kontakt" className="mt-8 lg:mt-auto inline-flex items-center justify-between gap-3 bg-[#BAFF57] text-black uppercase px-6 py-4 text-xs tracking-wider hover:bg-white transition-colors">
                  Chcem viac dopytov
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            {/* rýchly filter: je to pre teba? */}
            <div className="mt-10 pt-8 border-t border-white/15">
              <p className="text-[10px] md:text-xs uppercase tracking-widest font-mono text-white/50">Je to pre teba, ak:</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {forYou.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-relaxed text-white/80">
                    <span className="text-[#BAFF57] font-bold">✓</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <PageCta
        num="03"
        eyebrow="Máš otázku?"
        title={<>Napíš nám,<br />poradíme ti.</>}
        lead="Napíš nám, čo robíš a koľko zákaziek by si chcel navyše. Do 24 hodín ti povieme, koľko dopytov ti reklama vie priniesť."
        ghost="CENA"
      />

      <PageFooter />
    </div>
  );
}
