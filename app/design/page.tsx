"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";
import Reveal from "../components/Reveal";

const disciplines = [
  {
    num: "01",
    title: "UI/UX dizajn",
    extras: ["Wireframy", "Prototypy", "Dizajn systém", "Použiteľnosť"],
    desc: "Intuitívne rozhrania zamerané na používateľa — od prvého wireframu po hotový dizajn systém.",
  },
  {
    num: "02",
    title: "Brand identity",
    extras: ["Logo", "Typografia", "Farebná paleta", "Brand manuál"],
    desc: "Vizuálna identita, ktorá zaujme a zostane konzistentná na každom nosiči.",
  },
  {
    num: "03",
    title: "Graphic design",
    extras: ["Tlačoviny", "Sociálne siete", "Prezentácie", "Merch"],
    desc: "Vizuály, ktoré oživia váš projekt — online aj v tlači.",
  },
];

const palette = [
  { name: "Lime", role: "Primary", hex: "#BAFF57", rgb: "RGB 186, 255, 87", swatch: "bg-[#BAFF57]", type: "text-black", border: "border-black" },
  { name: "Black", role: "Contrast", hex: "#000000", rgb: "RGB 0, 0, 0", swatch: "bg-black", type: "text-[#BAFF57]", border: "border-transparent" },
  { name: "White", role: "Surface", hex: "#FFFFFF", rgb: "RGB 255, 255, 255", swatch: "bg-white", type: "text-black", border: "border-black/10" },
];

const works = [
  { image: "/fonts/Screenshot 2026-01-25 at 16.50.43.png", tag: "Brand Identity", title: "Hlavičkový papier", fit: "contain" },
  { image: "/fonts/Screenshot 2026-01-25 at 16.51.43.png", tag: "Brand Identity", title: "Dizajn letáčiku", fit: "contain" },
  { image: "/fonts/Screenshot 2026-01-25 at 16.51.14.png", tag: "Brand Identity", title: "Voucher dizajn", fit: "cover" },
  { image: "/fonts/Screenshot 2026-01-25 at 16.53.00.png", tag: "Web Design", title: "New Era eshop", fit: "cover" },
  { image: "/fonts/Screenshot 2026-01-25 at 16.53.32.png", tag: "Web Design", title: "Autoškola Zvyky", fit: "cover" },
  { image: "/fonts/Screenshot 2026-01-25 at 16.55.23.png", tag: "Web Design", title: "QR eshop", fit: "cover" },
  { image: "/fonts/Screenshot 2026-01-25 at 16.56.20 1.png", tag: "Brand Design", title: "Visual Identity", fit: "cover" },
];

const process = [
  { num: "01", title: "Brief", desc: "Zistíme, komu hovoríte a čo má dizajn dosiahnuť." },
  { num: "02", title: "Koncept", desc: "Postavíme vizuálny smer — typografiu, farby, tón." },
  { num: "03", title: "Dizajn", desc: "Rozkreslíme všetky obrazovky a nosiče do detailu." },
  { num: "04", title: "Handoff", desc: "Odovzdáme zdrojáky, dizajn systém a podklady pre vývoj." },
];

export default function DesignPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <SiteMenu active="design" />

      <PageHero
        activeNav="design"
        num="04"
        eyebrow="Vizuálna identita"
        title={<>Dizajn podľa<br />najnovších trendov.</>}
        lead="Napredujeme vo svete dizajnu a kreativity. Naše produkty razia cestu v modernom digitálnom svete — od identity značky až po hotové rozhranie."
        wordmark="Design"
        panelLabel="Čo pre teba tvoríme"
        panelItems={["UI/UX dizajn", "Brand identity", "Graphic design", "Web design"]}
      />

      {/* ── DISCIPLÍNY — full-width index rows ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? "min-h-screen py-20 flex flex-col justify-center" : "min-h-screen h-screen flex flex-col justify-center"}`}>
        <Reveal className="px-5 md:px-12 lg:px-16 mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-black/40 text-xs font-mono">01</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">O dizajne</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Tri disciplíny.<br />Jeden vizuálny jazyk.</h2>
        </Reveal>

        <Reveal className="w-full">
          {disciplines.map((item) => {
            const extrasVisible = isMobile || hover === item.num;
            const isOpen = !isMobile && hover === item.num;
            const isDimmed = !isMobile && hover !== null && hover !== item.num;
            return (
              <div
                key={item.num}
                onMouseEnter={() => !isMobile && setHover(item.num)}
                onMouseLeave={() => !isMobile && setHover(null)}
                className={`group grid grid-cols-12 items-start md:items-center gap-4 px-5 md:px-12 lg:px-16 py-7 md:py-9 border-t border-black/15 last:border-b text-black transition-all duration-300 ${
                  isOpen ? "bg-white" : "bg-transparent"
                } ${isDimmed ? "opacity-30" : "opacity-100"}`}
              >
                <span className="col-span-2 md:col-span-1 text-sm font-mono pt-1 text-black/30">{item.num}</span>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="text-xl md:text-3xl font-bold leading-tight">{item.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${extrasVisible ? "max-h-40 mt-4 opacity-100" : "max-h-0 mt-0 opacity-0"}`}>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {item.extras.map((opt, i) => (
                        <span
                          key={opt}
                          className="text-[10px] md:text-xs uppercase tracking-wider font-mono text-black/55"
                          style={{
                            transitionDelay: extrasVisible ? `${i * 60}ms` : "0ms",
                            transform: extrasVisible ? "translateY(0)" : "translateY(-8px)",
                            opacity: extrasVisible ? 1 : 0,
                          }}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="col-span-12 md:col-span-6 text-sm md:text-base leading-relaxed text-black/60">{item.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* ── PALETA ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? "min-h-screen py-20 px-5" : "min-h-screen h-screen flex flex-col px-8 lg:px-12 xl:px-16 py-10"}`}>
        <Reveal className="mb-6 md:mb-8 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-black/40 text-xs font-mono">02</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Naša paleta</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Tri farby. Nič viac.</h2>
        </Reveal>

        <Reveal className={`flex-1 grid min-h-0 ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-4"}`} delay={100}>
          {palette.map((color) => (
            <div key={color.name} className={`group relative ${color.swatch} border ${color.border} flex flex-col justify-between p-6 md:p-8 ${isMobile ? "aspect-[4/3]" : ""} overflow-hidden`}>
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${color.type} opacity-50`}>{color.role}</span>
              <div>
                <p className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tighter ${color.type}`}>{color.name}</p>
                <div className={`mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t pt-4 ${color.name === "Black" ? "border-[#BAFF57]/25" : "border-black/20"}`}>
                  <span className={`font-mono text-sm md:text-base ${color.type}`}>{color.hex}</span>
                  <span className={`text-[10px] md:text-xs font-mono ${color.type} opacity-50`}>{color.rgb}</span>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── PRÁCE ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always flex flex-col ${isMobile ? "min-h-screen py-24 px-5 overflow-y-auto" : "min-h-screen h-screen px-8 lg:px-12 xl:px-16 py-10 overflow-hidden"}`}>
        <Reveal className="flex items-end justify-between mb-6 md:mb-8 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-black/40 text-xs font-mono">03</span>
              <div className="w-8 h-px bg-black"></div>
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Naše práce</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Vybrané vizuály.</h2>
          </div>
        </Reveal>

        <Reveal className={`flex-1 grid min-h-0 ${isMobile ? "grid-cols-1 gap-5" : "grid-cols-2 grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 gap-3 lg:gap-4"}`} delay={100}>
          {works.map((work) => (
            <div key={work.image} className="group relative bg-white p-2 hover:p-3 flex flex-col border border-black/10 hover:border-black transition-all duration-300">
              <div className={`relative overflow-hidden bg-[#212121] ${isMobile ? "aspect-[4/3]" : "flex-1 min-h-0"}`}>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={`${work.fit === "contain" ? "object-contain p-2" : "object-cover"} group-hover:scale-105 transition-transform duration-700`}
                />
              </div>
              <div className="pt-3 pb-1 px-1">
                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-black/40">{work.tag}</span>
                <p className="mt-1 text-sm md:text-base font-bold leading-tight">{work.title}</p>
              </div>
            </div>
          ))}

          <Link href="/projekty" className="group relative bg-black text-[#BAFF57] flex flex-col justify-between p-5 md:p-6 hover:bg-white hover:text-black transition-colors duration-300">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">08</span>
            <div>
              <p className="text-xl md:text-2xl font-bold leading-none">Všetky projekty</p>
              <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider opacity-60">
                Pozrieť
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── PROCES — dark slab ── */}
      <section className={`bg-[#212121] text-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? "min-h-screen py-20 px-5" : "min-h-screen h-screen flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-12"}`}>
        <p className="absolute -right-6 bottom-0 text-[20vw] font-bold leading-none tracking-tighter text-[#BAFF57]/[0.05] select-none pointer-events-none">
          04
        </p>

        <Reveal className="relative z-10 mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#BAFF57]/40 text-xs font-mono">04</span>
            <div className="w-8 h-px bg-[#BAFF57]"></div>
            <span className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono">Ako pracujeme</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">
            Od briefu<br />po handoff.
          </h2>
        </Reveal>

        <Reveal className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#BAFF57]/15" delay={120}>
          {process.map((step) => (
            <div key={step.num} className="group bg-[#212121] hover:bg-[#BAFF57] hover:text-black p-6 md:p-8 transition-colors duration-300">
              <span className="text-[10px] font-mono text-[#BAFF57]/40 group-hover:text-black/40 transition-colors">{step.num}</span>
              <h3 className="mt-4 text-lg md:text-xl font-bold leading-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#BAFF57]/55 group-hover:text-black/60 transition-colors">{step.desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <PageCta
        num="05"
        eyebrow="Začnime spoluprácu"
        title={<>Poďme tvoriť<br />spolu.</>}
        lead="Máte víziu? My ju pretvoríme na vizuálnu realitu. Kontaktujte nás."
        ghost="DESIGN"
      />

      <PageFooter />
    </div>
  );
}
