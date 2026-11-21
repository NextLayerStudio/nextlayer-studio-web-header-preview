import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export type LegalSection = { title: string; body: ReactNode[] };

const others = [
  { href: "/obchodne-podmienky", label: "Obchodné podmienky" },
  { href: "/reklamacny-poriadok", label: "Reklamačný poriadok" },
  { href: "/ochrana-sukromia", label: "Ochrana osobných údajov" },
  { href: "/informacie-o-firme", label: "Informácie o firme" },
];

/** Spoločné rozloženie právnych stránok (obchodné podmienky, reklamačný poriadok). */
export default function LegalPage({
  title,
  validFrom,
  summary,
  sections,
  current,
}: {
  title: string;
  validFrom: string;
  summary?: string[];
  sections: LegalSection[];
  current: string;
}) {
  return (
    <div className="min-h-screen bg-[#212121] text-[#BAFF57]">
      <header className="border-b border-[#BAFF57]/10 px-5 md:px-8 lg:px-24 py-6 flex items-center justify-between">
        <Link href="/">
          <Image src="/fonts/Group.png" alt="NextLayer Studio" width={60} height={60} className="h-10 w-auto brightness-0 invert" />
        </Link>
        <Link href="/" className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono hover:text-[#BAFF57] transition-colors flex items-center gap-2">
          ← Späť na hlavnú
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-5 md:px-8 py-16 lg:py-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[#BAFF57]/40"></div>
          <span className="text-[#BAFF57]/40 text-xs uppercase tracking-widest font-mono">Právne dokumenty</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#BAFF57] mb-4">{title}</h1>
        <p className="text-[#BAFF57]/40 text-sm font-mono mb-12">{validFrom} · NextLayer Studio s.r.o.</p>

        {summary && (
          <div className="mb-14 border border-[#BAFF57]/25 p-6">
            <p className="text-[#BAFF57] text-xs uppercase tracking-widest font-mono mb-4">V skratke</p>
            <ul className="space-y-2 text-sm text-[#BAFF57]/85 leading-relaxed">
              {summary.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="text-[#BAFF57]/40">—</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-12 text-[#BAFF57]/70 text-sm leading-relaxed font-light">
          {sections.map((s, i) => (
            <section key={s.title}>
              <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">
                {i + 1}. {s.title}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} className="mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#BAFF57]/10 flex flex-col sm:flex-row flex-wrap gap-6">
          {others
            .filter((o) => o.href !== current)
            .map((o) => (
              <Link key={o.href} href={o.href} className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider hover:text-[#BAFF57] transition-colors">
                {o.label} →
              </Link>
            ))}
        </div>
      </main>

      <footer className="border-t border-[#BAFF57]/10 px-8 lg:px-24 py-6 text-center">
        <p className="text-[#BAFF57]/25 text-xs font-mono uppercase tracking-widest">© 2026 NextLayer Studio s.r.o. · IČO: 57141282</p>
      </footer>
    </div>
  );
}
