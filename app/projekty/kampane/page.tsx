import Image from "next/image";
import Link from "next/link";
import SiteMenu from "../../components/SiteMenu";
import PageHero from "../../components/PageHero";
import PageCta from "../../components/PageCta";
import PageFooter from "../../components/PageFooter";
import Reveal from "../../components/Reveal";
import { campaigns } from "./data";

export const metadata = {
  title: "Kampane | NextLayer Studio",
};

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export default function KampanePage() {
  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll scroll-smooth">
      <SiteMenu active="projekty" />

      <PageHero
        activeNav="projekty"
        num="06"
        eyebrow="Projekty · Kampane"
        title={<>Kampane,<br />ktoré predávajú.</>}
        lead="Výber kampaní, ktoré sme pre klientov pripravili od stratégie až po reporting. Klikni na klienta a pozri si čísla, postup aj reklamy, ktoré v kampani bežali."
        wordmark="Kampane"
        panelLabel="Klienti"
        panelItems={campaigns.map((c) => c.client)}
        ctaLabel="Pozrieť kampane"
        ctaHref="#kampane"
      />

      {/* ── SUB-NAV ── */}
      <section className="sticky top-0 z-30 bg-[#BAFF57] border-b border-black/15 px-5 md:px-12 lg:px-16 py-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <Link href="/projekty" className="px-4 py-2 text-xs uppercase tracking-wider bg-white text-black/70 hover:bg-black hover:text-[#BAFF57] transition-colors duration-300">
            Všetky projekty
          </Link>
          <span className="px-4 py-2 text-xs uppercase tracking-wider bg-black text-[#BAFF57]">Kampane</span>
          <span className="ml-auto text-black/40 text-xs font-mono">
            {campaigns.length} {campaigns.length === 1 ? "kampaň" : campaigns.length < 5 ? "kampane" : "kampaní"}
          </span>
        </div>
      </section>

      {/* ── GRID ── */}
      <section id="kampane" className="px-5 md:px-12 lg:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {campaigns.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i, 5) * 80} offset={24} className="h-full">
              <Link
                href={`/projekty/kampane/${c.slug}`}
                className="group relative bg-white p-2 hover:p-3 flex flex-col h-full border border-black/10 hover:border-black transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[16/10]" style={{ backgroundColor: c.logoBg }}>
                  <Image
                    src={c.logo}
                    alt={c.client}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain p-[18%] group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-0 left-0 bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-wider px-2 py-1">
                    Kampaň
                  </span>
                  {c.sample && (
                    <span className="absolute top-0 right-0 bg-black/80 text-white text-[10px] font-mono uppercase tracking-wider px-2 py-1">
                      Ukážkové dáta
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {c.platforms.map((p) => (
                      <span key={p} className="bg-black text-[#BAFF57] text-[10px] font-mono uppercase tracking-wider px-2 py-1">{p}</span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col pt-5 pb-2 px-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40">{c.handle ?? "Kampaň"}</span>
                    <span className="text-[10px] font-mono text-black/30">{c.period}</span>
                  </div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold leading-tight">{c.client}</h3>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-black/55">{c.goal}</p>

                  <div className="mt-6 grid grid-cols-3 border-y border-black/10">
                    {c.stats.slice(0, 3).map((s, si) => (
                      <div key={s.label} className={`py-4 ${si > 0 ? "border-l border-black/10 pl-3" : ""}`}>
                        <p className="text-xl md:text-2xl font-bold tracking-tighter leading-none whitespace-nowrap">{s.value}</p>
                        <p className="mt-2 text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-black/45 leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.services.map((s) => (
                      <span key={s} className="bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-wider px-2 py-1">{s}</span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <span className="flex items-center justify-between bg-black text-[#BAFF57] px-5 py-4 text-xs uppercase tracking-wider group-hover:bg-[#BAFF57] group-hover:text-black transition-colors">
                      Detail kampane
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCta
        num="07"
        eyebrow="Tvoja kampaň"
        title={<>Chceš takéto<br />čísla aj ty?</>}
        lead="Povedz nám, čo chceš dosiahnuť. Navrhneme kampaň od stratégie cez produkciu až po reklamy a reporting."
        ghost="KAMPANE"
      />

      <PageFooter />
    </div>
  );
}
