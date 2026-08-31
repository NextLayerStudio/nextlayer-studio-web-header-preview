import Link from "next/link";

type PageCtaProps = {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  /** Giant faint word bleeding off the left edge */
  ghost?: string;
};

export default function PageCta({ num, eyebrow, title, lead, ghost = "KONTAKT" }: PageCtaProps) {
  return (
    <section className="relative bg-[#BAFF57] snap-start snap-always overflow-hidden min-h-screen md:h-screen flex flex-col justify-center px-5 md:px-12 lg:px-16 py-20">
      <p className="absolute -left-4 md:-left-8 top-8 md:top-6 text-[22vw] font-bold leading-none tracking-tighter text-black/[0.08] select-none pointer-events-none whitespace-nowrap">
        {ghost}
      </p>

      <div className="relative z-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-black/40 text-xs font-mono">{num}</span>
          <div className="w-8 h-px bg-black"></div>
          <span className="text-black/50 text-xs uppercase tracking-widest font-mono">{eyebrow}</span>
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight">{title}</h2>

        <p className="mt-7 text-sm md:text-lg leading-relaxed md:leading-[1.8] text-black/70 max-w-xl">{lead}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/#kontakt" className="inline-flex items-center gap-3 bg-black text-[#BAFF57] uppercase px-7 py-4 text-xs tracking-wider hover:bg-white hover:text-black transition-colors">
            Kontaktovať nás
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </Link>
          <a href="tel:+421902238309" className="inline-flex items-center gap-3 bg-white text-black uppercase px-7 py-4 text-xs tracking-wider hover:bg-black hover:text-[#BAFF57] transition-colors">
            +421 902 238 309
          </a>
        </div>

        <div className="mt-12 flex items-center gap-3 text-black/40 text-[10px] font-mono uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 bg-black rotate-45"></span>
          Bratislava · 2026
        </div>
      </div>
    </section>
  );
}
