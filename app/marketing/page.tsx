"use client";

import { useState } from "react";
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
    title: "Nastavíme reklamu",
    desc: "Pripravíme reklamu na Facebooku a Instagrame (aj na Googli, ak chceš) a formulár, cez ktorý ti zákazníci pošlú dopyt.",
  },
  {
    num: "02",
    title: "Ty natočíš pár videí mobilom",
    desc: "Raz za mesiac dostaneš presný scenár. Natočíš pár krátkych videí z práce, zaberie ti to asi 15 minút. Reklamy z nich spravíme my.",
  },
  {
    num: "03",
    title: "Dopyty ti chodia na mobil",
    desc: "Každý nový dopyt ti príde do pár minút. Zákazník hneď dostane automatickú odpoveď, takže ťa konkurencia nepredbehne.",
  },
  {
    num: "04",
    title: "Každý mesiac vidíš výsledok",
    desc: "Report ti povie, koľko dopytov prišlo a koľko stál jeden. Reklamu priebežne ladíme, aby boli dopyty lacnejšie.",
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

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default function MarketingPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className={`bg-[#BAFF57] text-black h-screen scroll-smooth ${lightboxOpen ? "overflow-hidden" : "overflow-y-scroll"}`}>
      <SiteMenu active="marketing" />

      <PageHero
        num="02"
        eyebrow="Systém na dopyty"
        title={<>Systém, ktorý ti<br />prináša dopyty.</>}
        lead="Takto získavame zákazníkov pre firmy: reklama na Facebooku, Instagrame a Googli, dopyty na mobil do pár minút a každý mesiac jasný report. Obsah natočíš ty mobilom podľa nášho scenára."
        wordmark="Dopyty"
        panelLabel="Od 290 € mesačne"
        panelItems={["Reklama na FB, IG a Google", "Dopyty na mobil do pár minút", "Mesačný report", "Obsah natočíš mobilom"]}
        ctaLabel="Ako to funguje"
        ctaHref="#ako"
      />

      {/* ── AKO TO FUNGUJE ── */}
      <section id="ako" className="px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <Reveal className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-black/40 text-xs font-mono">01</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Ako to funguje</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">4 kroky.<br />Ty riešiš len zákazníkov.</h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {steps.map((s) => (
            <div key={s.num} className="bg-white p-6 md:p-8">
              <span className="text-xs font-mono text-black/40">{s.num}</span>
              <h3 className="mt-4 text-xl md:text-2xl font-bold leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/65">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── CENA ── */}
      <section className="px-5 md:px-12 lg:px-16 pb-16 md:pb-24">
        <Reveal>
          <div className="bg-black text-white p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-[#BAFF57] text-xs uppercase tracking-widest font-mono">Cena</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Jasná cena,<br /><span className="text-[#BAFF57]">žiadne prekvapenia.</span></h2>
              <p className="mt-5 text-sm md:text-base text-white/65 max-w-xl">
                Facebook + Instagram za 290 € mesačne, s Googlom za 390 € mesačne. K tomu jednorazové nastavenie. Rozpočet na reklamu platíš priamo Facebooku / Googlu, odporúčame aspoň 150 € mesačne.
              </p>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-12">
              <p className="flex items-end gap-2 text-[#BAFF57]">
                <span className="text-sm uppercase tracking-widest font-mono text-white/50 mr-2 mb-2">od</span>
                <span className="text-7xl md:text-8xl font-bold leading-[0.8] tracking-tighter">290</span>
                <span className="text-4xl font-bold leading-none">€</span>
              </p>
              <p className="mt-3 text-[10px] md:text-xs uppercase tracking-widest font-mono text-white/50">mesačne, minimálne 3 mesiace</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#kontakt" className="inline-flex items-center gap-3 bg-[#BAFF57] text-black uppercase px-6 py-4 text-xs tracking-wider hover:bg-white transition-colors">
                  Chcem viac dopytov
                  <ArrowIcon />
                </Link>
                <Link href="/cena" className="inline-flex items-center gap-3 border border-white/25 text-white uppercase px-6 py-4 text-xs tracking-wider hover:border-[#BAFF57] hover:text-[#BAFF57] transition-colors">
                  Celý cenník
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-4" delay={100}>
          <p className="text-sm md:text-base leading-relaxed text-black/70 max-w-4xl border-l-2 border-black pl-5 md:pl-7">
            Sociálne siete ti vieme aj nastaviť a natáčanie s nami je tiež možné, ale je výrazne drahšie (240 € za video). Tieto služby nájdeš v <Link href="/cena" className="underline font-medium">cenníku</Link>.
          </p>
        </Reveal>
      </section>

      {/* ── UKÁŽKY ── */}
      <section className="px-5 md:px-12 lg:px-16 pb-16 md:pb-20">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-black/40 text-xs font-mono">02</span>
              <div className="w-8 h-px bg-black"></div>
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Ukážky reklám</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Reálne výstupy.</h2>
            <p className="mt-4 text-sm md:text-base text-black/55 max-w-xl">Klikni na video a pozri ho naplno.</p>
          </div>
          <Link href="/projekty" className="inline-flex items-center gap-2 bg-black text-[#BAFF57] px-5 py-3 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors shrink-0">
            Všetky projekty
            <ArrowIcon />
          </Link>
        </Reveal>

        <Reveal>
          <ReelGallery reels={reels} onOpenChange={setLightboxOpen} />
        </Reveal>
      </section>

      <PageCta
        num="03"
        eyebrow="Začnime"
        title={<>Chceš viac<br />zákaziek?</>}
        lead="Napíš nám, čo robíš a odkiaľ máš zákazníkov dnes. Do 24 hodín ti povieme, či ti systém na dopyty vie pomôcť."
        ghost="DOPYTY"
      />

      <PageFooter />
    </div>
  );
}
