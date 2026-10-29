import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ďakujeme — ozveme sa do 24 hodín | NextLayer Studio",
  description: "Tvoj dopyt sme prijali. Ozveme sa do 24 hodín.",
  robots: { index: false, follow: false },
};

export default function DakujemePage() {
  return (
    <main className="h-screen overflow-y-auto bg-[#BAFF57] text-black flex flex-col">
      <header className="flex items-center justify-between px-5 sm:px-8 lg:px-16 py-5">
        <Link href="/" aria-label="NextLayer Studio">
          <Image
            src="/fonts/Group.png"
            alt="NextLayer Studio"
            width={80}
            height={80}
            className="h-9 sm:h-10 w-auto"
            priority
          />
        </Link>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-black/50">
          nextlayer.studio
        </span>
      </header>

      <section className="flex-1 flex items-center px-5 sm:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto w-full py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-px bg-black/50" />
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">
              Dopyt prijatý
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
            Ďakujeme. Ozveme sa do 24&nbsp;hodín.
          </h1>

          <p className="text-base sm:text-lg text-black/70 leading-relaxed mb-4">
            Tvoju správu sme dostali. Pozrieme sa na tvoju firmu a sociálne siete ešte pred hovorom,
            aby sme ti vedeli povedať niečo konkrétne — nie všeobecné frázy.
          </p>
          <p className="text-base sm:text-lg text-black/70 leading-relaxed mb-10">
            Ak to súri, napíš nám priamo na{" "}
            <a href="mailto:team@nextlayer.studio" className="underline font-medium hover:opacity-70">
              team@nextlayer.studio
            </a>{" "}
            alebo zavolaj na{" "}
            <a href="tel:+421902238309" className="underline font-medium hover:opacity-70">
              +421&nbsp;902&nbsp;238&nbsp;309
            </a>
            .
          </p>

          <div className="border-t border-black/15 pt-8">
            <p className="text-black/40 text-xs uppercase tracking-widest font-mono mb-4">
              Kým čakáš
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://instagram.com/nextlayerstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-black/30 px-6 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-[#BAFF57] transition-colors"
              >
                Pozri našu prácu na Instagrame
              </a>
              <Link
                href="/projekty"
                className="inline-flex items-center gap-3 border border-black/30 px-6 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-[#BAFF57] transition-colors"
              >
                Úspešné projekty
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#212121] text-[#BAFF57]/40 px-5 sm:px-8 lg:px-16 py-8">
        <div className="max-w-5xl mx-auto text-xs font-mono uppercase tracking-widest">
          © 2026 NextLayer Studio s.r.o. · Bratislava
        </div>
      </footer>
    </main>
  );
}
