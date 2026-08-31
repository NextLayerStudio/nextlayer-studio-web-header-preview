"use client";

import { useState } from "react";
import Image from "next/image";
import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";
import Reveal from "../components/Reveal";

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
};

const projects: Project[] = [
  { id: 1, title: "Karin Art", category: "development", description: "Profesionálne tetovanie Bratislava", tag: "Web Development", image: "/fonts/karinart.png", link: "https://www.karinart.sk", year: "2024" },
  { id: 2, title: "Beauty Institute", category: "development", description: "Permanent Beauty Institute Bratislava", tag: "Web Development", image: "/fonts/sisi.png", link: "https://www.sisikovacsova.com", year: "2024" },
  { id: 3, title: "Natus Volare", category: "development", description: "Profesionálne dronové služby", tag: "Web Development", image: "/fonts/natus.png", link: "https://misk0o.github.io/Michal-Pipa-X-Natus-Volare/sluzby.html", year: "2024" },
  { id: 4, title: "Dashboard", category: "development", description: "Cloud Storage & Project Management", tag: "SaaS Dashboard System", image: "/fonts/dashboard.png", link: "https://dashboard-blue-alpha.vercel.app", year: "2024" },
  { id: 5, title: "Invoice Generator", category: "development", description: "PBSQ Invoice Generator", tag: "Automatizácia", image: "/fonts/invoice.png", link: "https://next-js-invoice-generator-six.vercel.app/login", year: "2024" },
  { id: 6, title: "Name Sorting Tool", category: "development", description: "My Contacts App", tag: "Application Development", image: "/fonts/name.png", link: "https://name-sorting-tool.vercel.app", year: "2024" },
  { id: 14, title: "Michal Kurka", category: "development", description: "Web pre finančného poradcu", tag: "Web Development", image: "/image copy 5.png", link: "https://michal-kurka-web.vercel.app/domov", year: "2024" },
  { id: 15, title: "Karolína Pifflová", category: "development", description: "Portfólio umelkyňe", tag: "Web Development", image: "/image copy 6.png", link: "https://www.karolinaromanapifflova.com/", year: "2024" },
  { id: 16, title: "Účtovníctvo App", category: "development", description: "Aplikácia na zjednodušenie vedenia účtovníctva", tag: "Automatizácia", image: "/image copy 7.png", link: null, year: "2024" },
  { id: 17, title: "Andrej Paulička", category: "development", description: "Osobné portfólio developera", tag: "Web Development", image: "/image copy 8.png", link: "https://www.andrejpaulicka.com", year: "2024" },
  { id: 23, title: "New Era Microblading", category: "development", description: "E-shop pre kozmetické studio Beauty Institute", tag: "E-shop Development", image: "/screenshots/sisi-eshop.png", link: "https://www.sisikovacsova.com", year: "2026" },
  { id: 20, title: "Know3D", category: "development", description: "E-shop pre 3D tlač a filament", tag: "E-shop Development", image: "/screenshots/know3d.png", link: "https://www.know3d.sk", year: "2026" },
  { id: 21, title: "JVD Cars", category: "development", description: "Web pre autobazár a autoslužby", tag: "Web Development", image: "/screenshots/jvd-cars.png", link: "https://www.jvdcars.sk/", year: "2026" },
  { id: 18, title: "Bombafasada", category: "marketing", description: "Profesionálna fasádna spoločnosť — brand na sociálnych sieťach", tag: "Social Media Production", image: "/logos/bombafasada.png", link: "https://www.instagram.com/bombafasada", year: "2026", contain: true },
  { id: 19, title: "Kávička u Janíčka", category: "marketing", description: "Kaviareň — video produkcia a správa profilu", tag: "Social Media Production", image: "/screenshots/janicko-post.png", link: "https://www.instagram.com/kavicka_u_janicka", year: "2026" },
  { id: 22, title: "NIE RAKOVINE — Redesign", category: "design", description: "Redesign webu pre onkologické združenie", tag: "Web Design", image: "/screenshots/nie-rakovine-redesign.png", link: "https://onkoklub.sk", year: "2026" },
  { id: 7, title: "Hlavičkový papier", category: "design", description: "ukážka moderného technologického dizajnu", tag: "Brand Identity", image: "/fonts/Screenshot 2026-01-25 at 16.50.43.png", link: null, year: "2024", contain: true },
  { id: 8, title: "Dizajn letáčiku", category: "design", description: "jednoduchý a prehľadný dizajn", tag: "Brand Identity", image: "/fonts/Screenshot 2026-01-25 at 16.51.43.png", link: null, year: "2024", contain: true },
  { id: 9, title: "Voucher dizajn", category: "design", description: "jednoduchý dizajn pre zľavovú kartičku", tag: "Brand Identity", image: "/fonts/Screenshot 2026-01-25 at 16.51.14.png", link: null, year: "2024" },
  { id: 10, title: "New Era eshop", category: "design", description: "dizajn nového eshopu", tag: "Web Design", image: "/fonts/Screenshot 2026-01-25 at 16.53.00.png", link: null, year: "2024" },
  { id: 11, title: "Autoškola Zvyky", category: "design", description: "Dizajn webstránky pre autoškolu", tag: "Web Design", image: "/fonts/Screenshot 2026-01-25 at 16.53.32.png", link: null, year: "2024" },
  { id: 12, title: "QR eshop", category: "design", description: "Dizajn moderného eshopu a identity značky", tag: "Web Design", image: "/fonts/Screenshot 2026-01-25 at 16.55.23.png", link: null, year: "2024" },
  { id: 13, title: "Visual Identity", category: "design", description: "Komplexná vizuálna identita značky", tag: "Brand Design", image: "/fonts/Screenshot 2026-01-25 at 16.56.20 1.png", link: null, year: "2024" },
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

export default function ProjektyPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll scroll-smooth">
      <SiteMenu active="projekty" />

      <PageHero
        activeNav="projekty"
        num="05"
        eyebrow="Portfólio"
        title={<>Naše<br />projekty.</>}
        lead="Prezrite si výber našich najlepších prác z oblasti vývoja, dizajnu a marketingu. Každý projekt je príbeh úspechu."
        wordmark="Projekty"
        panelLabel="Čo v portfóliu nájdeš"
        panelItems={["Weby & e-shopy", "Interné aplikácie", "Brand identity", "Social media produkcia"]}
      />

      {/* ── FILTER ── */}
      <section className="sticky top-0 z-30 bg-[#BAFF57] border-b border-black/15 px-5 md:px-12 lg:px-16 py-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <span className="hidden sm:inline text-black/50 text-xs uppercase tracking-widest font-mono mr-2">Filter</span>
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
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
            {filtered.length} {projectCountLabel(filtered.length)}
          </span>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="bg-[#BAFF57] px-5 md:px-12 lg:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((project, i) => {
            const Wrapper = project.link ? "a" : "div";
            return (
              <Reveal key={project.id} delay={Math.min(i, 5) * 60} offset={24}>
                <Wrapper
                  {...(project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group relative bg-white p-2 hover:p-3 flex flex-col h-full border border-black/10 hover:border-black transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#212121]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`${project.contain ? "object-contain p-3" : "object-cover object-top"} group-hover:scale-105 transition-transform duration-700`}
                    />
                    <span className="absolute top-0 left-0 bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-wider px-2 py-1">
                      {categoryLabels[project.category]}
                    </span>
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
                        {project.category === "marketing" ? "Navštíviť sociálne siete" : "Navštíviť web"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                      </span>
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </section>

      <PageCta
        num="06"
        eyebrow="Začnime spoluprácu"
        title={<>Máte projekt<br />na mysli?</>}
        lead="Radi by sme aj váš projekt pridali do nášho portfólia. Kontaktujte nás a poďme spolupracovať."
        ghost="PROJEKTY"
      />

      <PageFooter />
    </div>
  );
}
