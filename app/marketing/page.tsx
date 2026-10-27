"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";
import Reveal from "../components/Reveal";
import ReelGallery from "../components/ReelGallery";
import { campaigns } from "../projekty/kampane/data";

const steps = [
  {
    num: "01",
    title: "Scenár & réžia",
    extras: ["Kreatívny koncept", "Písané zadanie", "Storyboard", "Réžia na mieste"],
    desc: "Každé video má príbeh. Píšeme scenáre šité na mieru tvojej značke a réžiou zabezpečíme, že výsledok pôsobí presne tak, ako má.",
  },
  {
    num: "02",
    title: "Natáčanie",
    extras: ["Kamera & optika", "Svetlo", "Zvuk", "Prevádzka, lokácia či štúdio"],
    desc: "Prichádzame k tebe — na prevádzku, na lokáciu alebo do štúdia. Profesionálna kamera, svetlo, zvuk. Ty len budeš na mieste.",
  },
  {
    num: "03",
    title: "Strih & postprodukcia",
    extras: ["Strih", "Color grading", "Titulky", "Hudba & mix"],
    desc: "Zostrihané, farebne upravené, s titulkami a hudbou. Dodávame hotové výstupy optimalizované pre každú platformu.",
  },
  {
    num: "04",
    title: "Schválenie & zverejnenie",
    extras: ["Jedno kolo úprav", "Presný popis zmien", "Plán zverejnenia", "Reporting"],
    desc: "Pred každým zverejnením máš právo na jedno kolo úprav s presným popisom. Hotové video zverejníme presne podľa plánu.",
  },
];

const reels = campaigns.flatMap((campaign) =>
  campaign.ads
    .filter((ad) => ad.type === "video")
    .map((ad) => ({
      src: ad.src,
      poster: ad.poster,
      title: ad.title,
      client: campaign.client,
      tag: ad.platform,
    }))
);

const platforms = [
  { label: "Instagram", sub: "Reels, Stories, Karusely", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { label: "TikTok", sub: "Krátke virálne formáty", icon: "M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" },
  { label: "Facebook", sub: "Komunita & platená reklama", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "LinkedIn", sub: "B2B marketing", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
];

const principles = [
  { num: "01", title: "Profesionálna produkcia", desc: "Nerobíme lacný obsah. Každé video, každá fotografia — produkčná hodnota, ktorá reprezentuje tvoju značku na úrovni." },
  { num: "02", title: "Presné zadanie", desc: "Žiadne všeobecné scenáre. Každé natáčanie má písomné zadanie s presnými scénami, zábermi a popisom toho, čo sa bude diať." },
  { num: "03", title: "Tvoja kontrola", desc: "Každý výstup ti dáme na schválenie pred zverejnením. Jedno kolo úprav s presným zadaním je súčasťou každej spolupráce." },
];

export default function MarketingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [stepHover, setStepHover] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={`bg-[#BAFF57] text-black h-screen scroll-smooth ${lightboxOpen ? "overflow-hidden" : "overflow-y-scroll snap-y snap-mandatory"}`}>
      <SiteMenu active="marketing" />

      <PageHero
        num="02"
        eyebrow="Social Media Production"
        title={<>Tvoja značka.<br />Profesionálne.</>}
        lead="Postaráme sa o celú produkciu — scenár, natáčanie, réžiu aj strih. Ty len schváliš výsledok. Tvoja značka na sociálnych sieťach bude reprezentovať to, čo skutočne si."
        wordmark="Marketing"
        panelLabel="Čo pre teba robíme"
        panelItems={["Video produkcia", "Správa sociálnych sietí", "Reklamné kampane", "Content stratégia"]}
      />

      {/* ── PROCES — full-width index rows ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always ${isMobile ? "min-h-screen py-16 overflow-y-auto flex flex-col justify-center" : "min-h-screen h-screen overflow-hidden flex flex-col justify-center"}`}>
        <Reveal className="px-5 md:px-12 lg:px-16 mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-black/40 text-xs font-mono">01</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Kompletná produkcia</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Od nápadu<br />po hotové video.</h2>
        </Reveal>

        <Reveal className="w-full">
          {steps.map((step) => {
            const extrasVisible = isMobile || stepHover === step.num;
            const isOpen = !isMobile && stepHover === step.num;
            const isDimmed = !isMobile && stepHover !== null && stepHover !== step.num;
            return (
              <div
                key={step.num}
                onMouseEnter={() => !isMobile && setStepHover(step.num)}
                onMouseLeave={() => !isMobile && setStepHover(null)}
                className={`group grid grid-cols-12 items-start md:items-center gap-4 px-5 md:px-12 lg:px-16 py-6 md:py-7 border-t border-black/15 last:border-b text-black transition-all duration-300 ${
                  isOpen ? "bg-white" : "bg-transparent"
                } ${isDimmed ? "opacity-30" : "opacity-100"}`}
              >
                <span className="col-span-2 md:col-span-1 text-sm font-mono pt-1 text-black/30">{step.num}</span>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">{step.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${extrasVisible ? "max-h-48 mt-4 opacity-100" : "max-h-0 mt-0 opacity-0"}`}>
                    <div className="flex flex-col gap-1.5">
                      {step.extras.map((opt, i) => (
                        <span
                          key={opt}
                          className="text-xs md:text-sm uppercase tracking-wider font-mono text-black/55"
                          style={{
                            transitionDelay: extrasVisible ? `${i * 70}ms` : "0ms",
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
                <p className="col-span-12 md:col-span-6 text-sm md:text-base leading-relaxed text-black/60">{step.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* ── UKÁŽKY — reel gallery ── */}
      <section className="bg-[#BAFF57] relative snap-start px-5 md:px-12 lg:px-16 py-16 md:py-20">
        <Reveal className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-black/40 text-xs font-mono">02</span>
              <div className="w-8 h-px bg-black"></div>
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Ukážky našej práce</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Reálne výstupy.</h2>
            <p className="mt-4 text-sm md:text-base text-black/55 max-w-xl">
              Klikni na reel a pozri ho naplno. Šípky alebo klávesy na ďalší.
            </p>
          </div>
          <Link href="/projekty" className="inline-flex items-center gap-2 bg-black text-[#BAFF57] px-5 py-3 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors shrink-0">
            Všetky projekty
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </Link>
        </Reveal>

        <Reveal>
          <ReelGallery reels={reels} onOpenChange={setLightboxOpen} />
        </Reveal>
      </section>

      {/* ── PLATFORMY — dark slab ── */}
      <section className={`bg-[#212121] text-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? "min-h-screen py-20 px-5" : "min-h-screen h-screen flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-12"}`}>
        <p className="absolute -right-6 bottom-0 text-[20vw] font-bold leading-none tracking-tighter text-[#BAFF57]/[0.05] select-none pointer-events-none">
          24/7
        </p>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#BAFF57]/40 text-xs font-mono">03</span>
              <div className="w-8 h-px bg-[#BAFF57]"></div>
              <span className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono">Kde ťa uvidí svet</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">
              Prítomnosť<br />na každej platforme.
            </h2>
            <p className="mt-7 text-sm md:text-base leading-relaxed md:leading-[1.8] text-[#BAFF57]/60 max-w-xl">
              Obsah tvoríme tak, aby fungoval na každej sieti — od krátkych Reels cez karusely až po dlhší video obsah. Každý formát má svoju logiku a my ju poznáme.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-4">
              {[
                { number: "50+", label: "Videí vyrobených" },
                { number: "100%", label: "Vaša kontrola" },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-[#BAFF57]/25 pt-4">
                  <p className="text-4xl md:text-5xl font-bold leading-none tracking-tighter">{stat.number}</p>
                  <p className="mt-2 text-[10px] md:text-xs uppercase tracking-widest text-[#BAFF57]/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6 grid grid-cols-2 gap-3 md:gap-4" delay={120}>
            {platforms.map((p) => (
              <div key={p.label} className="group relative bg-[#BAFF57] text-black p-5 md:p-6 aspect-square flex flex-col justify-between hover:bg-white transition-colors duration-300">
                <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor"><path d={p.icon} /></svg>
                <div>
                  <h3 className="text-base md:text-lg font-bold leading-tight">{p.label}</h3>
                  <p className="text-black/50 text-[11px] md:text-xs mt-1">{p.sub}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FILOZOFIA ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? "min-h-screen py-20 px-5" : "min-h-screen h-screen flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-12"}`}>
        <Reveal className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-black/40 text-xs font-mono">04</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Naša filozofia</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">Nie zábava. Brand.</h2>
        </Reveal>

        <Reveal className={`grid grid-cols-1 md:grid-cols-3 ${isMobile ? "gap-4" : "gap-4"}`} delay={100}>
          {principles.map((item) => (
            <div key={item.num} className="group bg-white p-6 md:p-8 hover:bg-black hover:text-[#BAFF57] transition-colors duration-300">
              <span className="text-xs font-mono text-black/30 group-hover:text-[#BAFF57]/40 transition-colors">{item.num}</span>
              <h3 className="mt-4 text-lg md:text-xl font-bold leading-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/60 group-hover:text-[#BAFF57]/60 transition-colors">{item.desc}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-6 md:mt-8" delay={200}>
          <p className="text-base md:text-xl leading-relaxed md:leading-[1.7] text-black/70 max-w-4xl border-l-2 border-black pl-5 md:pl-7">
            Veríme, že sociálne siete sú dnes primárna vizitka firmy. Firmy, ktoré chcú byť brané vážne, nemôžu mať náhodný obsah. Preto robíme produkciu tak, aby každý príspevok budoval ich reputáciu — nielen vyplnil feed.
          </p>
        </Reveal>
      </section>

      <PageCta
        num="05"
        eyebrow="Začnime spoluprácu"
        title={<>Tvoja značka si zaslúži<br />lepšiu reprezentáciu.</>}
        lead="Kontaktuj nás a spoločne vytvoríme produkčný plán, ktorý bude skutočne fungovať."
        ghost="MARKETING"
      />

      <PageFooter />
    </div>
  );
}
