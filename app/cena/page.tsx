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
  "Zákazník hneď dostane automatickú odpoveď",
  "Každý mesiac report: koľko dopytov prišlo a koľko stál jeden",
];

const forYou = [
  "Máš firmu, ktorá žije zo zákaziek alebo objednávok",
  "Vieš raz za mesiac natočiť mobilom pár krátkych videí podľa nášho scenára",
  "Na reklamu vieš dať aspoň 150 € mesačne (platíš priamo Facebooku / Googlu)",
];

/* ── ĎALŠIE SLUŽBY ── */

type Extra = { id: string; title: string; price: string; priceNote?: string; desc: string; items: string[] };

const extras: Extra[] = [
  {
    id: "radar",
    title: "Dopytový radar",
    price: "49 €",
    priceNote: "mesačne, bez viazanosti",
    desc: "Každé ráno e-mail s novými dopytmi a zákazkami z tvojho odboru.",
    items: ["Dopytové portály, verejné zákazky (Vestník) aj európske tendre (TED)", "Nastavený na tvoj odbor a región", "Pri reklame s Googlom je v cene"],
  },
  {
    id: "siete",
    title: "Sociálne siete",
    price: "od 290 €",
    priceNote: "jednorazovo za nastavenie",
    desc: "Siete ti nastavíme a pripravíme plán. Obsah natočíš ty mobilom.",
    items: [
      "Nastavenie profilov, šablóny, plán na 3 mesiace a scenáre: 290 € jednorazovo",
      "Zverejňovanie z tvojich fotiek a videí (do 8 príspevkov): + 190 € mesačne",
      "Príspevky (grafiky, karusely, texty) tvoríme my: + 340 € mesačne",
    ],
  },
  {
    id: "natacanie",
    title: "Natáčanie s nami",
    price: "240 €",
    priceNote: "za 1 video, min. 2 videá",
    desc: "Chceš, aby sme prišli s kamerou? Dá sa, ale je to výrazne drahšie.",
    items: ["Scenár, natáčanie, strih, titulky a hudba", "Verzie pre Instagram, Facebook aj reklamu", "Doprava mimo Bratislavy 0,40 €/km"],
  },
  {
    id: "web",
    title: "Servis webu",
    price: "od 20 €",
    priceNote: "mesačne",
    desc: "Hosting, aktualizácie, zálohy a drobné úpravy.",
    items: ["Servis webu: 20 € mesačne", "Servis e-shopu: 30 € mesačne", "Nový web na mieru naceníme po krátkom hovore"],
  },
];

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default function CenaPage() {
  const [variant, setVariant] = useState(mainVariants[0].id);
  const [open, setOpen] = useState<string | null>(null);
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
                <p className="mt-1 text-xs text-white/45">Minimálne 3 mesiace. Rozpočet na reklamu platíš priamo Facebooku / Googlu.</p>

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

      {/* ── ĎALŠIE SLUŽBY ── */}
      <section className="px-5 md:px-12 lg:px-16 pb-16 md:pb-24">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-black/40 text-xs font-mono">02</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Ďalšie služby</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Potrebuješ aj niečo iné?</h2>
          <p className="mt-5 text-sm md:text-base text-black/70 max-w-xl">
            Sociálne siete ti nastavíme, obsah natočíš ty mobilom. Natáčanie s nami sa dá, ale je výrazne drahšie. Klikni a uvidíš cenu.
          </p>
        </Reveal>

        <div className="mt-8 border-t border-black/15">
          {extras.map((e) => {
            const isOpen = open === e.id;
            return (
              <div key={e.id} className="border-b border-black/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : e.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"
                >
                  <span>
                    <span className="block text-lg md:text-2xl font-bold">{e.title}</span>
                    <span className="block mt-1 text-sm text-black/60">{e.desc}</span>
                  </span>
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center border border-black text-lg">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                    <ul className="md:col-span-8 space-y-2">
                      {e.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm md:text-base leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 bg-black rotate-45 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="md:col-span-4 md:text-right">
                      <p className="text-4xl md:text-5xl font-bold tracking-tighter">{e.price}</p>
                      {e.priceNote && <p className="mt-1 text-[10px] md:text-xs uppercase tracking-widest font-mono text-black/50">{e.priceNote}</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-black/45 text-[10px] font-mono uppercase tracking-[0.2em]">Ceny sú konečné, nie sme platcami DPH</p>
      </section>

      <PageCta
        num="03"
        eyebrow="Nevieš si vybrať?"
        title={<>Poradíme ti,<br />čo sa oplatí.</>}
        lead="Napíš nám, čo robíš a koľko zákaziek by si chcel navyše. Odporučíme, čo dáva zmysel — a čo netreba."
        ghost="CENA"
      />

      <PageFooter />
    </div>
  );
}
