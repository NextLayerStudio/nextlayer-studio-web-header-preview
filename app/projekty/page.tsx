"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";
import Reveal from "../components/Reveal";
import DesignGallery from "../components/DesignGallery";
import { campaigns } from "./kampane/data";
import { designWorks } from "./designWorks";

type Project = {
  id: number;
  title: string;
  category: "development" | "design" | "marketing";
  description: string;
  tag: string;
  image: string;
  link: string | null;
  year: string;
  contain?: boolean;
  imageBg?: string;
  imageAspect?: "4/3" | "3/2";
  objectPosition?: string;
  /** Small brand logo: shown padded and centered instead of filling the frame */
  logo?: boolean;
  handle?: string;
};

const aspectClasses: Record<NonNullable<Project["imageAspect"]>, string> = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
};

const projects: Project[] = [
  { id: 1, title: "Karin Art", category: "development", description: "Profesionálne tetovanie Bratislava", tag: "Web Development", image: "/screenshots/karin-art-portfolio-mockup-v3.jpg", link: "https://www.karinart.sk", year: "2024", imageBg: "#1C1428", objectPosition: "center" },
  { id: 2, title: "Beauty Institute", category: "development", description: "Permanent Beauty Institute Bratislava", tag: "Web Development", image: "/screenshots/sisi-kovacsova-portfolio-mockup-v5.jpg", link: "https://www.sisikovacsova.com", year: "2024", objectPosition: "center" },
  { id: 26, title: "Onko klub", category: "development", description: "Členská platforma a aplikácia pre onkologických pacientov a ich blízkych", tag: "Web & App Development", image: "/screenshots/onkoklub-portfolio.jpg", link: "https://www.onkoklub.sk/", year: "2026", imageBg: "#FDF2F8", objectPosition: "center" },
  { id: 29, title: "Stužka nádeje", category: "development", description: "Kampaňová stránka PINK OKTÓBER pre NIE RAKOVINE", tag: "Web Development", image: "/screenshots/stuzka-portfolio.jpg", link: "https://www.nierakovine.sk/stuzka", year: "2026", imageBg: "#FDF2F8", objectPosition: "center" },
  { id: 20, title: "Know3D", category: "development", description: "E-shop pre 3D tlač a filament", tag: "E-shop Development", image: "/screenshots/know3d-portfolio-mockup.jpg", link: "https://www.know3d.sk", year: "2026", imageBg: "#E8F0F8", objectPosition: "center" },
  { id: 21, title: "JVD Cars", category: "development", description: "Web pre autobazár a autoslužby", tag: "Web Development", image: "/screenshots/jvdcars-portfolio-mockup.jpg", link: "https://www.jvdcars.sk/", year: "2026", imageBg: "#1A1A1A", objectPosition: "center" },
  { id: 27, title: "Autoškola Zvyky", category: "development", description: "Web pre autoškolu v Bratislave a Malackách", tag: "Web Development", image: "/screenshots/zvyky-portfolio.jpg", link: "https://www.zvyky.sk", year: "2026", imageBg: "#EEEEEE", objectPosition: "center" },
  { id: 14, title: "Michal Kurka", category: "development", description: "Web pre finančného poradcu", tag: "Web Development", image: "/screenshots/michal-kurka-portfolio-mockup.jpg", link: "https://michal-kurka-web.vercel.app/domov", year: "2024", imageBg: "#1A1A1A", objectPosition: "center" },
  { id: 15, title: "Karolína Pifflová", category: "development", description: "Portfólio umelkyňe", tag: "Web Development", image: "/screenshots/karolina-pifflova-portfolio-mockup.jpg", link: "https://www.karolinaromanapifflova.com/", year: "2024", imageBg: "#F5D4D8", objectPosition: "center" },
  { id: 23, title: "New Era Microblading", category: "development", description: "E-shop pre kozmetické studio Beauty Institute", tag: "E-shop Development", image: "/screenshots/sisi-eshop.png", link: "https://www.sisikovacsova.com", year: "2026" },
  { id: 17, title: "Andrej Paulička", category: "development", description: "Osobné portfólio developera", tag: "Web Development", image: "/image copy 8.png", link: "https://www.andrejpaulicka.com", year: "2024" },
  { id: 4, title: "Dashboard", category: "development", description: "Cloud Storage & Project Management", tag: "SaaS Dashboard System", image: "/fonts/dashboard.png", link: "https://dashboard-blue-alpha.vercel.app", year: "2024" },
  { id: 5, title: "Invoice Generator", category: "development", description: "PBSQ Invoice Generator", tag: "Automatizácia", image: "/fonts/invoice.png", link: "https://next-js-invoice-generator-six.vercel.app/login", year: "2024" },
  { id: 6, title: "Name Sorting Tool", category: "development", description: "My Contacts App", tag: "Application Development", image: "/fonts/name.png", link: "https://name-sorting-tool.vercel.app", year: "2024" },
  { id: 16, title: "Účtovníctvo App", category: "development", description: "Aplikácia na zjednodušenie vedenia účtovníctva", tag: "Automatizácia", image: "/image copy 7.png", link: null, year: "2024" },
  { id: 18, title: "Bombafasada", category: "marketing", description: "Profesionálna fasádna spoločnosť — brand na sociálnych sieťach", tag: "Social Media Production", image: "/logos/bombafasada-clean.png", link: "https://www.instagram.com/bombafasada/", year: "2026", logo: true, imageBg: "#206CD3", handle: "@bombafasada" },
  { id: 24, title: "Karin Art", category: "marketing", description: "Tetovacie štúdio — obsah a správa Instagramu", tag: "Social Media Production", image: "/logos/karinart.png", link: "https://www.instagram.com/karin_art_tattoo?igsh=N3lqejRsenR5MWd0", year: "2026", logo: true, imageBg: "#FFFFFF", handle: "@karin_art_tattoo" },
  { id: 25, title: "Autoškola Zvyky", category: "marketing", description: "Autoškola — obsah a správa Instagramu", tag: "Social Media Production", image: "/logos/zvyky.webp", link: "https://www.instagram.com/autoskola.zvyky/", year: "2026", logo: true, imageBg: "#EEF6FD", handle: "@autoskola.zvyky" },
  { id: 28, title: "Kvety pre Vás", category: "marketing", description: "Rodinné kvetinárstvo — online kampane pre e-shop", tag: "Online kampane", image: "/logos/kvetyprevas.svg", link: "https://www.instagram.com/kvetyprevas.sk/?hl=sk", year: "2026", logo: true, imageBg: "#FBEFF0", handle: "@kvetyprevas.sk" },
];

const filters = [
  { key: "all", label: "Všetky" },
  { key: "development", label: "Development" },
  { key: "design", label: "Design" },
  { key: "marketing", label: "Marketing" },
] as const;

const categoryLabels: Record<Project["category"], string> = {
  development: "Development",
  design: "Design",
  marketing: "Marketing",
};

function projectCountLabel(count: number) {
  if (count === 1) return "projekt";
  if (count < 5) return "projekty";
  return "projektov";
}

/** Two rows on a 3-column desktop grid */
const PROJECTS_PREVIEW_COUNT = 6;
const CAMPAIGNS_PREVIEW_COUNT = 3;
const DESIGN_PREVIEW_COUNT = 8;

export default function ProjektyPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cardProjects = projects.filter((p) => p.category !== "design");
  const filtered =
    activeFilter === "all"
      ? cardProjects
      : activeFilter === "design"
        ? []
        : cardProjects.filter((p) => p.category === activeFilter);
  const hasMoreProjects = filtered.length > PROJECTS_PREVIEW_COUNT;
  const visibleProjects = showAllProjects ? filtered : filtered.slice(0, PROJECTS_PREVIEW_COUNT);
  const showGallery = activeFilter === "all" || activeFilter === "design";
  const visibleDesignWorks = activeFilter === "design" ? designWorks : designWorks.slice(0, DESIGN_PREVIEW_COUNT);
  const filterCount =
    activeFilter === "design"
      ? designWorks.length
      : activeFilter === "all"
        ? cardProjects.length + designWorks.length
        : filtered.length;

  const setFilter = (key: string) => {
    setActiveFilter(key);
    setShowAllProjects(false);
  };

  return (
    <div className={`bg-[#BAFF57] text-black h-screen scroll-smooth ${lightboxOpen ? "overflow-hidden" : "overflow-y-scroll"}`}>
      <SiteMenu active="projekty" />

      <PageHero
        activeNav="projekty"
        num="06"
        eyebrow="Portfólio"
        title={<>Naše<br />projekty.</>}
        lead="Prezrite si výber našich najlepších prác z oblasti vývoja, dizajnu a marketingu. Každý projekt je príbeh úspechu."
        wordmark="Projekty"
        panelLabel="Čo v portfóliu nájdeš"
        panelItems={["Weby & e-shopy", "Kampane & reklamy", "Brand identity", "Social media produkcia"]}
      />

      {/* ── FILTER ── */}
      <section className="sticky top-0 z-30 bg-[#BAFF57] border-b border-black/15 px-5 md:px-12 lg:px-16 py-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <span className="hidden sm:inline text-black/50 text-xs uppercase tracking-widest font-mono mr-2">Filter</span>
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilter(filter.key)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-300 ${
                activeFilter === filter.key
                  ? "bg-black text-[#BAFF57]"
                  : "bg-white text-black/70 hover:bg-black hover:text-[#BAFF57]"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <span className="ml-auto text-black/40 text-xs font-mono">
            {filterCount} {projectCountLabel(filterCount)}
          </span>
        </div>
      </section>

      {/* ── GRID ── */}
      {visibleProjects.length > 0 && (
      <section className="bg-[#BAFF57] px-5 md:px-12 lg:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {visibleProjects.map((project, i) => {
            const Wrapper = project.link ? "a" : "div";
            return (
              <Reveal key={project.id} delay={Math.min(i, 5) * 60} offset={24}>
                <Wrapper
                  {...(project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group relative bg-white p-2 hover:p-3 flex flex-col h-full border border-black/10 hover:border-black transition-all duration-300"
                >
                  <div
                    className={`relative overflow-hidden ${aspectClasses[project.imageAspect ?? "4/3"]}`}
                    style={{ backgroundColor: project.imageBg ?? "#212121" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                      className={`${
                        project.logo
                          ? "object-contain p-[18%]"
                          : project.contain
                            ? "object-contain object-center"
                            : `object-cover${project.objectPosition ? "" : " object-top"}`
                      } group-hover:scale-105 transition-transform duration-700`}
                    />
                    <span className="absolute top-0 left-0 bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-wider px-2 py-1">
                      {categoryLabels[project.category]}
                    </span>
                    {project.handle && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black text-[#BAFF57] text-[10px] font-mono tracking-wider px-2 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor"></circle></svg>
                        {project.handle}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col pt-4 pb-2 px-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-black/40">{project.tag}</span>
                      <span className="text-[10px] font-mono text-black/30">{project.year}</span>
                    </div>
                    <h3 className="mt-2 text-xl md:text-2xl font-bold leading-tight">{project.title}</h3>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-black/55">{project.description}</p>

                    {project.link && (
                      <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-black/40 group-hover:text-black transition-colors">
                        {project.handle ? "Navštíviť sociálne siete" : "Navštíviť web"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                      </span>
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>

        {hasMoreProjects && !showAllProjects && (
          <div className="mt-10 md:mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects(true)}
              className="inline-flex items-center gap-3 bg-black text-[#BAFF57] uppercase px-8 py-4 text-xs tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Zobraziť viac
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        )}
      </section>
      )}

      {showGallery && (
        <section id="design" className="bg-[#BAFF57] px-5 md:px-12 lg:px-16 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-black/40 text-xs font-mono">01</span>
                <div className="w-8 h-px bg-black"></div>
                <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Design</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">
                Galéria vizuálov.
              </h2>
              <p className="mt-5 text-sm md:text-base leading-relaxed text-black/55 max-w-xl">
                Social ads, print a brand. Klikni na vizuál a pozri ho naplno.
              </p>
            </Reveal>
            {activeFilter !== "design" && designWorks.length > DESIGN_PREVIEW_COUNT && (
              <Reveal delay={120}>
                <button
                  type="button"
                  onClick={() => setFilter("design")}
                  className="inline-flex items-center gap-3 bg-black text-[#BAFF57] uppercase px-6 py-4 text-xs tracking-wider hover:bg-white hover:text-black transition-colors shrink-0"
                >
                  Celá galéria
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </button>
              </Reveal>
            )}
          </div>
          <DesignGallery works={visibleDesignWorks} onOpenChange={setLightboxOpen} />
        </section>
      )}

      {/* ── KAMPANE ── */}
      {activeFilter !== "design" && (
      <section id="kampane" className="relative bg-[#212121] text-[#BAFF57] overflow-hidden px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <p className="absolute -right-6 bottom-0 text-[18vw] font-bold leading-none tracking-tighter text-[#BAFF57]/[0.05] select-none pointer-events-none">
          ADS
        </p>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#BAFF57]/40 text-xs font-mono">02</span>
              <div className="w-8 h-px bg-[#BAFF57]"></div>
              <span className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono">Kampane</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">
              Kampane,<br />ktoré predávajú.
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-[#BAFF57]/60 max-w-xl">
              Stratégia, produkcia, reklamy a reporting. Klikni na klienta a pozri si čísla, postup a kreatívy z kampane.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/projekty/kampane"
              className="inline-flex items-center gap-3 bg-[#BAFF57] text-black uppercase px-6 py-4 text-xs tracking-wider hover:bg-white transition-colors shrink-0"
            >
              Všetky kampane
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </Link>
          </Reveal>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {campaigns.slice(0, CAMPAIGNS_PREVIEW_COUNT).map((c, i) => (
            <Reveal key={c.slug} delay={i * 100}>
              <Link
                href={`/projekty/kampane/${c.slug}`}
                className="group block bg-[#BAFF57] p-2 hover:p-3 transition-all duration-300 h-full"
              >
                <div className="bg-white text-black p-5 md:p-6 flex flex-col h-full min-h-[280px]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative w-16 h-16 shrink-0 border border-black/10" style={{ backgroundColor: c.logoBg }}>
                      <Image src={c.logo} alt="" fill sizes="64px" className="object-contain p-2" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black/40">{c.period}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold leading-tight">{c.client}</h3>
                  <p className="mt-2 text-sm text-black/55 leading-relaxed line-clamp-2">{c.goal}</p>
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-black/10 pt-5">
                    {c.stats.slice(0, 3).map((s) => (
                      <div key={s.label}>
                        <p className="text-lg md:text-xl font-bold tracking-tighter leading-none whitespace-nowrap">{s.value}</p>
                        <p className="mt-1.5 text-[8px] md:text-[9px] font-mono uppercase tracking-wider text-black/45 leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-auto pt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-black/45 group-hover:text-black transition-colors">
                    Detail kampane
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      )}

      <PageCta
        num="07"
        eyebrow="Začnime spoluprácu"
        title={<>Máte projekt<br />na mysli?</>}
        lead="Radi by sme aj váš projekt pridali do nášho portfólia. Kontaktujte nás a poďme spolupracovať."
        ghost="PROJEKTY"
      />

      <PageFooter />
    </div>
  );
}
