"use client";

import Link from "next/link";
import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";
import Reveal from "../components/Reveal";

type Plan = {
  num: string;
  name: string;
  price: string;
  videos: number;
  posts: number;
  note: string;
  featured?: boolean;
};

const plans: Plan[] = [
  { num: "01", name: "Štart", price: "370", videos: 3, posts: 3, note: "Pravidelná prítomnosť na sieťach bez starostí." },
  { num: "02", name: "Rast", price: "540", videos: 4, posts: 3, note: "Viac videí, viac dosahu, viac nových ľudí.", featured: true },
  { num: "03", name: "Pro", price: "740", videos: 6, posts: 4, note: "Silný a konzistentný obsah pre rastúce značky." },
];

const videoIncludes = ["Texty & scenár", "Natáčanie", "Strih", "Upload"];
const postIncludes = ["Dizajn", "Fotenie"];

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

function PlanCard({ plan }: { plan: Plan }) {
  const dark = plan.featured;
  const muted = dark ? "text-[#BAFF57]/50" : "text-black/45";
  const line = dark ? "border-[#BAFF57]/20" : "border-black/10";
  const chip = dark
    ? "border border-[#BAFF57]/30 text-[#BAFF57]/80"
    : "bg-[#BAFF57] text-black";

  return (
    <div className={`group h-full p-2 hover:p-3 transition-all duration-500 ${dark ? "bg-[#212121]" : "bg-white"}`}>
      <div className={`relative h-full flex flex-col p-6 md:p-8 ${dark ? "bg-[#212121] text-[#BAFF57] border border-[#BAFF57]/15" : "bg-white text-black border border-black/10"}`}>
        <div className="flex items-center justify-between h-6">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono ${muted}`}>{plan.num}</span>
            <div className={`w-6 h-px ${dark ? "bg-[#BAFF57]" : "bg-black"}`}></div>
            <span className="text-xs uppercase tracking-widest font-mono">{plan.name}</span>
          </div>
          {plan.featured && (
            <span className="bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
              Najobľúbenejší
            </span>
          )}
        </div>

        <div className="mt-10 flex items-end gap-2">
          <span className="text-7xl md:text-8xl font-bold leading-[0.8] tracking-tighter">{plan.price}</span>
          <span className="text-3xl md:text-4xl font-bold leading-none tracking-tighter">€</span>
        </div>
        <p className={`mt-3 text-[10px] md:text-xs uppercase tracking-widest font-mono ${muted}`}>za mesiac</p>
        <p className={`mt-5 text-sm leading-relaxed ${dark ? "text-[#BAFF57]/70" : "text-black/65"}`}>{plan.note}</p>

        <div className={`mt-8 border-t ${line} pt-6`}>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold tracking-tighter leading-none">{plan.videos}×</span>
            <span className="text-sm uppercase tracking-wider font-medium">Videá / Reels</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {videoIncludes.map((item) => (
              <span key={item} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 ${chip}`}>{item}</span>
            ))}
          </div>
        </div>

        <div className={`mt-6 border-t ${line} pt-6`}>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold tracking-tighter leading-none">{plan.posts}×</span>
            <span className="text-sm uppercase tracking-wider font-medium">Posty</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {postIncludes.map((item) => (
              <span key={item} className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 ${chip}`}>{item}</span>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-auto md:pt-10">
          <Link
            href="/#kontakt"
            className={`flex items-center justify-between gap-3 px-5 py-4 uppercase text-xs tracking-wider transition-colors ${
              dark
                ? "bg-[#BAFF57] text-black hover:bg-white"
                : "bg-black text-[#BAFF57] hover:bg-[#BAFF57] hover:text-black"
            }`}
          >
            Chcem balík {plan.name}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CenaPage() {
  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll scroll-smooth">
      <SiteMenu active="cena" />

      <PageHero
        activeNav="cena"
        num="05"
        eyebrow="Cenník"
        title={<>Jasné ceny.<br />Žiadne prekvapenia.</>}
        lead="Vyber si balík social media produkcie, ktorý sedí tvojej značke. Postaráme sa o všetko — od textov a natáčania až po strih a upload."
        wordmark="Cena"
        panelLabel="Naše balíky"
        panelItems={["Štart — 370 €", "Rast — 540 €", "Pro — 740 €", "Na mieru — dohodou"]}
        ctaLabel="Pozrieť balíky"
        ctaHref="#balicky"
      />

      {/* ── BALÍKY ── */}
      <section id="balicky" className="relative overflow-hidden px-5 md:px-12 lg:px-16 py-20 md:py-28">
        <p className="absolute -right-6 top-6 text-[20vw] font-bold leading-none tracking-tighter text-black/[0.06] select-none pointer-events-none">
          €
        </p>

        <Reveal className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-black/40 text-xs font-mono">01</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Social media balíky</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
            Vyber si<br />svoj balík.
          </h2>
          <p className="mt-7 text-sm md:text-lg leading-relaxed md:leading-[1.8] text-black/70 max-w-xl">
            Každé video riešime od A po Z — napíšeme texty, natočíme, zostrihame a nahráme. Posty navrhneme a nafotíme.
          </p>
        </Reveal>

        <div className="relative z-10 mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {plans.map((plan, i) => (
            <Reveal key={plan.num} delay={i * 120} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>

        {/* ── NA MIERU ── */}
        <Reveal delay={200} className="relative z-10 mt-4 md:mt-5">
          <div className="relative overflow-hidden bg-black text-white p-7 md:p-12">
            <p className="absolute -right-4 -bottom-10 text-[14rem] md:text-[18rem] font-bold leading-none tracking-tighter text-[#BAFF57]/[0.07] select-none pointer-events-none">
              04
            </p>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#BAFF57]/60 text-xs font-mono">04</span>
                  <div className="w-6 h-px bg-[#BAFF57]"></div>
                  <span className="text-[#BAFF57] text-xs uppercase tracking-widest font-mono">Na mieru</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">
                  Potrebuješ viac?<br />
                  <span className="text-[#BAFF57]">Spravíme balík pre teba.</span>
                </h3>
                <p className="mt-6 text-sm md:text-base leading-relaxed md:leading-[1.8] text-white/60 max-w-xl">
                  Vyšší objem videí, viac postov, kampane alebo kombinácia s webom či dizajnom. Rozsah aj cenu prispôsobíme presne tebe — všetko prediskutujeme na stretnutí.
                </p>
              </div>

              <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-12">
                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-mono">Cena</p>
                <p className="mt-2 text-5xl md:text-6xl font-bold tracking-tighter leading-none text-[#BAFF57]">Individuálne</p>
                <p className="mt-3 text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-mono">dohodneme na stretnutí</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/#kontakt" className="inline-flex items-center gap-3 bg-[#BAFF57] text-black uppercase px-6 py-4 text-xs tracking-wider hover:bg-white transition-colors">
                    Dohodnúť stretnutie
                    <ArrowIcon />
                  </Link>
                  <a href="tel:+421902238309" className="inline-flex items-center gap-3 border border-white/25 text-white uppercase px-6 py-4 text-xs tracking-wider hover:border-[#BAFF57] hover:text-[#BAFF57] transition-colors">
                    Zavolať
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="relative z-10 mt-8 flex items-center gap-3 text-black/45 text-[10px] font-mono uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 bg-black rotate-45"></span>
          Ceny sú uvedené za mesiac
        </p>
      </section>

      <PageCta
        num="02"
        eyebrow="Nevieš si vybrať?"
        title={<>Poradíme ti,<br />čo sa oplatí.</>}
        lead="Napíš nám, čo robíš a kam chceš rásť. Odporučíme balík, ktorý dáva zmysel — alebo navrhneme vlastný."
        ghost="CENA"
      />

      <PageFooter />
    </div>
  );
}
