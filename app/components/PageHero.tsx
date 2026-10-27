import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroProps = {
  /** Index of the page inside the site, e.g. "02" */
  num: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  /** Giant type that bleeds along the bottom edge, like the homepage wordmark */
  wordmark: string;
  /** Right-hand white panel: short index of what the page covers */
  panelLabel: string;
  panelItems: string[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Highlights the matching top-nav entry; omit on pages absent from the nav */
  activeNav?: "cena" | "projekty";
};

const nav = [
  { key: "o-nas", label: "O nás", href: "/#o-nas" },
  { key: "kontakt", label: "Kontakt", href: "/#kontakt" },
  { key: "cena", label: "Cena", href: "/cena" },
  { key: "projekty", label: "Projekty", href: "/projekty" },
] as const;

export default function PageHero({
  num,
  eyebrow,
  title,
  lead,
  wordmark,
  panelLabel,
  panelItems,
  ctaLabel = "Kontaktovať nás",
  ctaHref = "/#kontakt",
  activeNav,
}: PageHeroProps) {
  return (
    <section className="relative min-h-screen md:h-screen flex flex-col md:flex-row overflow-hidden snap-start snap-always">
      <Link href="/" className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-4 sm:left-8 md:left-10 z-40">
        <Image src="/fonts/Group.png" alt="NextLayer Studio" width={80} height={80} className="w-auto h-14 md:h-16" priority />
      </Link>

      <nav className="hidden md:flex absolute top-8 left-1/2 -translate-x-1/2 z-40 items-center gap-8 lg:gap-12">
        {nav.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`text-sm lg:text-base uppercase transition-opacity ${
              item.key === activeNav ? "font-bold" : "font-normal hover:opacity-60"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* LEFT — lime, the pitch */}
      <div className="relative z-30 flex-1 bg-[#BAFF57] flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-28 md:pt-0 pb-10 md:pb-32 overflow-hidden">
        <span className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[40vw] md:text-[24vw] font-bold leading-none text-black/[0.06] select-none pointer-events-none">
          {num}
        </span>

        <div className="relative max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-black/40 text-xs font-mono">{num}</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">{eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight text-black">
            {title}
          </h1>

          <p className="mt-7 text-sm md:text-base lg:text-lg leading-relaxed md:leading-[1.8] text-black/80 max-w-xl">
            {lead}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={ctaHref} className="inline-flex items-center gap-3 bg-black text-[#BAFF57] uppercase px-6 py-3.5 text-xs tracking-wider hover:bg-white hover:text-black transition-colors">
              {ctaLabel}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </Link>
            <Link href="/projekty" className="inline-flex items-center gap-3 bg-white text-black uppercase px-6 py-3.5 text-xs tracking-wider hover:bg-black hover:text-[#BAFF57] transition-colors">
              Projekty
            </Link>
          </div>
        </div>
      </div>

      {/* Center divider */}
      <div className="relative hidden md:flex w-px bg-black z-40 shrink-0 items-center justify-center">
        <span className="absolute w-2.5 h-2.5 bg-black rotate-45"></span>
      </div>
      <div className="relative md:hidden h-px bg-black w-full z-40">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></span>
      </div>

      {/* RIGHT — white, index of the page */}
      <div className="relative z-30 md:w-[36%] lg:w-[34%] bg-white flex flex-col justify-center px-6 md:px-10 lg:px-12 pt-10 pb-28 md:py-0 md:pb-32 overflow-hidden">
        <span className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 text-[40vw] md:text-[20vw] font-bold leading-none text-black/[0.05] select-none pointer-events-none">
          {num}
        </span>

        <div className="relative">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">{panelLabel}</span>
          </div>

          <ul className="divide-y divide-black/10 border-y border-black/10">
            {panelItems.map((item, i) => (
              <li key={item} className="group flex items-baseline gap-4 py-3.5">
                <span className="text-black/30 text-[10px] font-mono shrink-0 w-5">0{i + 1}</span>
                <span className="text-sm md:text-base font-medium uppercase tracking-wide text-black/70 group-hover:text-black group-hover:translate-x-1 transition-all duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-3 text-black/40 text-[10px] font-mono uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 bg-black rotate-45"></span>
            Bratislava · 2026
          </div>
        </div>
      </div>

      <p className="absolute bottom-0 left-0 right-0 z-30 text-[11vw] md:text-[11vw] font-bold leading-none tracking-tighter text-black text-center pointer-events-none mix-blend-multiply px-2 pb-1">
        {wordmark}
      </p>
    </section>
  );
}
