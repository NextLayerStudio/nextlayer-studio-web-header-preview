"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteMenu from "../components/SiteMenu";
import PageHero from "../components/PageHero";
import PageCta from "../components/PageCta";
import PageFooter from "../components/PageFooter";
import Reveal from "../components/Reveal";

const services = [
  {
    num: "01",
    title: "Webové aplikácie",
    extras: ["Next.js", "React", "Node.js", "TypeScript"],
    desc: "Vyvíjame komplexné webové aplikácie s modernými frameworkami ako Next.js, React a Node.js.",
  },
  {
    num: "02",
    title: "E-commerce riešenia",
    extras: ["Katalóg produktov", "Platobné brány", "Skladové stavy", "Objednávky"],
    desc: "Tvoríme e-shopy na mieru s intuitívnym UX, bezpečnými platbami a efektívnou správou produktov.",
  },
  {
    num: "03",
    title: "API & backend",
    extras: ["REST & GraphQL", "Databázy", "Autentifikácia", "Integrácie tretích strán"],
    desc: "Navrhujeme a implementujeme robustné API rozhrania a backendové systémy pre vaše projekty.",
  },
  {
    num: "04",
    title: "CMS integrácia",
    extras: ["Headless CMS", "Editovateľné sekcie", "Správa médií", "Viacjazyčnosť"],
    desc: "Integrujeme moderné CMS systémy pre jednoduchú správu obsahu bez potreby programovania.",
  },
  {
    num: "05",
    title: "Optimalizácia",
    extras: ["Core Web Vitals", "SEO", "Caching", "Audit výkonu"],
    desc: "Zrýchľujeme existujúce weby, optimalizujeme výkon a zlepšujeme SEO pre lepšie výsledky.",
  },
  {
    num: "06",
    title: "Údržba & podpora",
    extras: ["Monitoring", "Aktualizácie", "Záloha dát", "Technická podpora"],
    desc: "Poskytujeme dlhodobú údržbu, aktualizácie a technickú podporu pre vaše digitálne produkty.",
  },
];

const projects = [
  {
    image: "/fonts/dashboard.png",
    tag: "SaaS Dashboard System",
    title: "Dashboard",
    desc: "Cloud storage & project management",
    href: "https://dashboard-blue-alpha.vercel.app",
  },
  {
    image: "/fonts/invoice.png",
    tag: "Automatizácia",
    title: "Invoice Generator",
    desc: "PBSQ Invoice Generator",
    href: "https://next-js-invoice-generator-six.vercel.app/login",
  },
  {
    image: "/fonts/name.png",
    tag: "Application Development",
    title: "Name Sorting Tool",
    desc: "My Contacts App",
    href: "https://name-sorting-tool.vercel.app",
  },
];

const stack = ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Prisma", "Vercel"];

export default function DevelopmentPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [serviceHover, setServiceHover] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-[#BAFF57] text-black h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <SiteMenu active="development" />

      <PageHero
        activeNav="development"
        num="03"
        eyebrow="Software na mieru"
        title={<>Softvérové riešenia<br />na mieru.</>}
        lead="Vytvárame moderné webové aplikácie, e-shopy a digitálne riešenia na mieru. Používame najnovšie technológie pre maximálny výkon a škálovateľnosť."
        wordmark="Development"
        panelLabel="Čo pre teba staviame"
        panelItems={["Web & e-shop", "UI/UX dizajn", "Brand identity", "Údržba & optimalizácia"]}
      />

      {/* ── SLUŽBY — full-width index rows ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? "min-h-screen py-20 flex flex-col justify-center" : "min-h-screen h-screen flex flex-col justify-center"}`}>
        <Reveal className="px-5 md:px-12 lg:px-16 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-black/40 text-xs font-mono">01</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Služby</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Šesť spôsobov,<br />ako to postavíme.</h2>
        </Reveal>

        <Reveal className="w-full">
          {services.map((service) => {
            const extrasVisible = isMobile || serviceHover === service.num;
            const isOpen = !isMobile && serviceHover === service.num;
            const isDimmed = !isMobile && serviceHover !== null && serviceHover !== service.num;
            return (
              <div
                key={service.num}
                onMouseEnter={() => !isMobile && setServiceHover(service.num)}
                onMouseLeave={() => !isMobile && setServiceHover(null)}
                className={`group grid grid-cols-12 items-start md:items-center gap-4 px-5 md:px-12 lg:px-16 py-4 md:py-5 border-t border-black/15 last:border-b text-black transition-all duration-300 ${
                  isOpen ? "bg-white" : "bg-transparent"
                } ${isDimmed ? "opacity-30" : "opacity-100"}`}
              >
                <span className="col-span-2 md:col-span-1 text-sm font-mono pt-1 text-black/30">{service.num}</span>
                <div className="col-span-10 md:col-span-5">
                  <h3 className="text-lg md:text-2xl font-bold leading-tight">{service.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${extrasVisible ? "max-h-40 mt-3 opacity-100" : "max-h-0 mt-0 opacity-0"}`}>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {service.extras.map((opt, i) => (
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
                <p className="col-span-12 md:col-span-6 text-sm leading-relaxed text-black/60">{service.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* ── PROJEKTY — bento ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always flex flex-col ${isMobile ? "min-h-screen py-24 px-5 overflow-y-auto" : "min-h-screen h-screen px-8 lg:px-12 xl:px-16 py-10 overflow-hidden"}`}>
        <Reveal className="relative z-10 flex items-end justify-between mb-6 md:mb-8 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-black/40 text-xs font-mono">02</span>
              <div className="w-8 h-px bg-black"></div>
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Naše projekty</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Postavené a nasadené.</h2>
          </div>
          <Link href="/projekty" className="hidden sm:inline-flex items-center gap-2 bg-black text-[#BAFF57] px-5 py-3 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
            Všetky
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </Link>
        </Reveal>

        <Reveal className={`relative z-10 flex-1 grid min-h-0 ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-4"}`}>
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white p-2 hover:p-3 flex flex-col transition-all duration-300 border border-black/10 hover:border-black"
            >
              <div className={`relative overflow-hidden bg-black ${isMobile ? "aspect-[4/3]" : "flex-1 min-h-0"}`}>
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="pt-4 pb-2 px-1">
                <span className="bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-wider px-2 py-0.5">{project.tag}</span>
                <p className="mt-3 text-xl md:text-2xl font-bold leading-none">{project.title}</p>
                <p className="mt-1.5 text-black/50 text-xs md:text-sm font-light">{project.desc}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-black/40 group-hover:text-black transition-colors">
                  Navštíviť web
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </section>

      {/* ── STACK — dark slab ── */}
      <section className={`bg-[#212121] text-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? "min-h-screen py-20 px-5" : "min-h-screen h-screen flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-12"}`}>
        <p className="absolute -right-6 bottom-0 text-[20vw] font-bold leading-none tracking-tighter text-[#BAFF57]/[0.05] select-none pointer-events-none">
          30+
        </p>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#BAFF57]/40 text-xs font-mono">03</span>
              <div className="w-8 h-px bg-[#BAFF57]"></div>
              <span className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono">Technológie</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">
              Moderný stack.<br />Žiadne kompromisy.
            </h2>
            <p className="mt-7 text-sm md:text-base leading-relaxed md:leading-[1.8] text-[#BAFF57]/60 max-w-xl">
              Staviame na nástrojoch, ktoré sa dajú udržiavať aj o päť rokov. Rýchle načítanie, čistý kód a architektúra, ktorá znesie rast tvojho biznisu.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-4">
              {[
                { number: "30+", label: "Softvérových projektov" },
                { number: "100/100", label: "Cieľ pre Web Vitals" },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-[#BAFF57]/25 pt-4">
                  <p className="text-3xl md:text-4xl font-bold leading-none tracking-tighter">{stat.number}</p>
                  <p className="mt-2 text-[10px] md:text-xs uppercase tracking-widest text-[#BAFF57]/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={120}>
            <ul className="grid grid-cols-2 gap-px bg-[#BAFF57]/15">
              {stack.map((tech, i) => (
                <li key={tech} className="group bg-[#212121] hover:bg-[#BAFF57] hover:text-black px-5 py-6 md:py-7 flex items-baseline gap-3 transition-colors duration-300">
                  <span className="text-[10px] font-mono text-[#BAFF57]/40 group-hover:text-black/40 transition-colors">0{i + 1}</span>
                  <span className="text-sm md:text-base font-medium uppercase tracking-wide">{tech}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <PageCta
        num="04"
        eyebrow="Začnime spoluprácu"
        title={<>Máte projekt<br />na mysli?</>}
        lead="Poďme spolu premeniť vašu víziu na realitu. Kontaktujte nás a začnime spolupracovať."
        ghost="DEVELOPMENT"
      />

      <PageFooter />
    </div>
  );
}
