import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteMenu from "../../../components/SiteMenu";
import PageCta from "../../../components/PageCta";
import PageFooter from "../../../components/PageFooter";
import Reveal from "../../../components/Reveal";
import { campaigns, getCampaign } from "../data";
import CaseStudySections from "../CaseStudySections";
import { ArrowIcon, SectionLabel, pad } from "../ui";

type Params = { slug: string };

const CASE_STUDY_SECTION_COUNT = 6;

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  return { title: campaign ? `${campaign.client} — Kampaň | NextLayer Studio` : "Kampaň | NextLayer Studio" };
}

export default async function KampanDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();

  const index = campaigns.findIndex((x) => x.slug === c.slug);
  const next = campaigns[(index + 1) % campaigns.length];

  const cs = c.caseStudy;
  const showAds = !cs || c.ads.length > 0;
  const adsNum = cs ? 2 + CASE_STUDY_SECTION_COUNT : 3;
  const resultNum = adsNum + (showAds ? 1 : 0);

  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll scroll-smooth">
      <SiteMenu active="projekty" />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-5 md:px-12 lg:px-16 pt-24 md:pt-28 pb-14 md:pb-20">
        <Link href="/" className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-4 sm:left-8 md:left-10 z-40">
          <Image src="/fonts/Group.png" alt="NextLayer Studio" width={80} height={80} className="w-auto h-14 md:h-16" priority />
        </Link>

        <p className="absolute -right-4 bottom-0 text-[22vw] font-bold leading-none tracking-tighter text-black/[0.06] select-none pointer-events-none whitespace-nowrap">
          {String(index + 1).padStart(2, "0")}
        </p>

        <div className="relative z-10 flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest text-black/50 mb-10">
          <Link href="/projekty" className="hover:text-black transition-colors">Projekty</Link>
          <span>/</span>
          <Link href="/projekty/kampane" className="hover:text-black transition-colors">Kampane</Link>
          <span>/</span>
          <span className="text-black">{c.client}</span>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal className="lg:col-span-7">
            <SectionLabel num={c.period} label="Kampaň" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">{c.client}</h1>
            <p className="mt-6 text-lg md:text-2xl font-medium leading-snug max-w-2xl">{c.goal}</p>
            <p className="mt-5 text-sm md:text-base leading-relaxed md:leading-[1.8] text-black/70 max-w-xl">{c.summary}</p>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {c.platforms.map((p) => (
                <span key={p} className="bg-black text-[#BAFF57] text-[10px] font-mono uppercase tracking-wider px-2.5 py-1">{p}</span>
              ))}
              {c.sample && (
                <span className="bg-white text-black/60 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1">Ukážkové dáta</span>
              )}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-black text-[#BAFF57] uppercase px-6 py-3.5 text-xs tracking-wider hover:bg-white hover:text-black transition-colors">
                {c.handle ?? "Profil klienta"}
                <ArrowIcon />
              </a>
              <Link href="/projekty/kampane" className="inline-flex items-center gap-3 bg-white text-black uppercase px-6 py-3.5 text-xs tracking-wider hover:bg-black hover:text-[#BAFF57] transition-colors">
                Všetky kampane
              </Link>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={150}>
            <div className="bg-white p-2">
              <div className="relative aspect-square" style={{ backgroundColor: c.logoBg }}>
                <Image src={c.logo} alt={c.client} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-[20%]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ČÍSLA ── */}
      <section className="relative bg-[#212121] text-[#BAFF57] overflow-hidden px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <p className="absolute -left-6 bottom-0 text-[20vw] font-bold leading-none tracking-tighter text-[#BAFF57]/[0.05] select-none pointer-events-none">
          ČÍSLA
        </p>
        <Reveal className="relative z-10">
          <SectionLabel num="01" label="Výsledky kampane" dark />
          <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Čísla, ktoré sme dosiahli.</h2>
        </Reveal>
        <div className="relative z-10 mt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {c.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className={`${i % 2 === 1 ? "border-l border-[#BAFF57]/20 pl-6" : ""} ${i > 0 && i % 2 === 0 ? "lg:border-l lg:border-[#BAFF57]/20 lg:pl-6" : ""}`}>
              <p className="text-4xl md:text-6xl xl:text-7xl font-bold leading-none tracking-tighter whitespace-nowrap">{s.value}</p>
              <p className="mt-3 text-[10px] md:text-xs uppercase tracking-widest text-[#BAFF57]/55 font-mono">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {cs ? (
        <CaseStudySections cs={cs} start={2} />
      ) : (
      /* ── ČO SME ROBILI ── */
      <section className="px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <SectionLabel num="02" label="Čo sme robili" />
            <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Od stratégie<br />po reporting.</h2>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {c.services.map((s) => (
                <span key={s} className="bg-white text-black text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5">{s}</span>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-8 border-t border-black">
            {c.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="group grid grid-cols-12 gap-4 py-6 md:py-8 border-b border-black/15 hover:bg-white hover:px-5 transition-all duration-300">
                  <span className="col-span-2 md:col-span-1 text-xs font-mono text-black/40 pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="col-span-10 md:col-span-4 text-xl md:text-3xl font-bold leading-tight">{step.title}</h3>
                  <p className="col-span-12 md:col-span-7 text-sm md:text-base leading-relaxed text-black/65">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── REKLAMY ── */}
      {showAds && (
      <section className="bg-white px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <Reveal>
          <SectionLabel num={pad(adsNum)} label="Reklamy v kampani" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Kreatívy, ktoré bežali.</h2>
            <span className="text-black/40 text-xs font-mono">{c.ads.length} {c.ads.length === 1 ? "reklama" : c.ads.length > 1 && c.ads.length < 5 ? "reklamy" : "reklám"}</span>
          </div>
        </Reveal>

        {c.ads.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {c.ads.map((ad, i) => (
              <Reveal key={ad.src} delay={i * 80}>
                <figure className="group bg-[#BAFF57] p-2 hover:p-3 transition-all duration-300">
                  <div className={`relative overflow-hidden bg-black ${ad.format.includes("9:16") ? "aspect-[9/16]" : ad.format.includes("4:5") ? "aspect-[4/5]" : "aspect-square"}`}>
                    {ad.type === "video" ? (
                      <video autoPlay muted loop playsInline preload="metadata" poster={ad.poster} className="absolute inset-0 w-full h-full object-cover" src={ad.src} />
                    ) : (
                      <Image src={ad.src} alt={ad.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                    )}
                    <span className="absolute top-0 left-0 bg-black text-[#BAFF57] text-[10px] font-mono uppercase tracking-wider px-2 py-1">{ad.platform}</span>
                  </div>
                  <figcaption className="pt-3 pb-1 px-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-black/50">{ad.format}</p>
                    <p className="mt-1 text-sm md:text-base font-bold leading-tight">{ad.title}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-dashed border-black/25 px-6 py-16 text-center">
            <p className="text-black/50 text-xs font-mono uppercase tracking-widest">Ukážky reklám doplníme čoskoro</p>
          </div>
        )}
      </section>
      )}

      {/* ── VÝSLEDOK + ĎALŠIA ── */}
      <section className="px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-8">
            <div className="bg-black text-white p-8 md:p-12 h-full">
              <SectionLabel num={pad(resultNum)} label={cs ? "Čo si z toho beriete vy" : "Výsledok"} dark />
              <p className={`font-bold leading-tight tracking-tight ${cs ? "text-xl md:text-3xl" : "text-2xl md:text-4xl"}`}>{cs ? cs.takeaway : c.result}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={120}>
            <Link href={`/projekty/kampane/${next.slug}`} className="group flex flex-col justify-between bg-white p-8 md:p-10 h-full border border-black/10 hover:border-black transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-black/45">Ďalšia kampaň</span>
              <span className="mt-10 flex items-end justify-between gap-4">
                <span className="text-3xl md:text-4xl font-bold leading-tight">{next.client}</span>
                <span className="shrink-0 w-12 h-12 bg-black text-[#BAFF57] flex items-center justify-center group-hover:bg-[#BAFF57] group-hover:text-black transition-colors">
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <PageCta
        num="05"
        eyebrow="Tvoja kampaň"
        title={<>Chceš podobné<br />výsledky?</>}
        lead="Ozvi sa nám. Pripravíme kampaň na mieru — stratégiu, produkciu aj reklamy."
        ghost="KAMPAŇ"
      />

      <PageFooter />
    </div>
  );
}
