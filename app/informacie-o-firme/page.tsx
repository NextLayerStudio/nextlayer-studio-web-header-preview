import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Informácie o firme — NextLayer Studio",
  description: "Firemné a kontaktné údaje spoločnosti NextLayer Studio s.r.o.",
};

export default function InformacieOFirme() {
  return (
    <div className="min-h-screen bg-[#212121] text-[#BAFF57]">
      {/* Header */}
      <header className="border-b border-[#BAFF57]/10 px-8 lg:px-24 py-6 flex items-center justify-between">
        <Link href="/">
          <Image src="/fonts/Group.png" alt="NextLayer Studio" width={60} height={60} className="h-10 w-auto brightness-0 invert" />
        </Link>
        <Link href="/" className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono hover:text-[#BAFF57] transition-colors">
          ← Späť na hlavnú
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-8 py-16 lg:py-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[#BAFF57]/40"></div>
          <span className="text-[#BAFF57]/40 text-xs uppercase tracking-widest font-mono">Firemné údaje</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#BAFF57] mb-4">Informácie o firme</h1>
        <p className="text-[#BAFF57]/40 text-sm font-mono mb-16">NextLayer Studio s.r.o. · Obchodný register SR</p>

        {/* Main info block */}
        <div className="border border-[#BAFF57]/15 mb-12">
          <div className="px-8 py-6 border-b border-[#BAFF57]/10">
            <p className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-widest mb-2">Obchodné meno</p>
            <p className="text-[#BAFF57] text-2xl font-bold">NextLayer Studio s.r.o.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <InfoRow label="Právna forma" value="Spoločnosť s ručením obmedzeným" />
            <InfoRow label="IČO" value="57 141 282" />
            <InfoRow label="DIČ" value="2122583133" />
            <InfoRow label="Platca DPH" value="Nie je platcom DPH" />
            <InfoRow label="Sídlo" value="Wienerova alej 929/20, 900 42 Miloslavov" />
            <InfoRow label="Konateľ" value="Andrej Paulička" />
            <InfoRow label="Register" value="Obchodný register SR" />
            <InfoRow label="Zapísaná" value="Okresný súd Bratislava I" />
          </div>
        </div>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-6">Kontaktné údaje</h2>
          <div className="border border-[#BAFF57]/15">
            <InfoRow label="E-mail" value="team@nextlayer.studio" />
            <InfoRow label="Web" value="nextlayer.studio" />
            <InfoRow label="Instagram" value="@nextlayer.studio" />
          </div>
        </section>

        {/* Banking */}
        <section className="mb-12">
          <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-6">Bankové spojenie</h2>
          <div className="border border-[#BAFF57]/15">
            <InfoRow label="Banka" value="Tatra banka, a.s." />
            <InfoRow label="IBAN" value="SK10 1100 0000 0029 4927 5915" />
            <InfoRow label="Mena" value="EUR" />
          </div>
        </section>

        {/* Note */}
        <div className="border-l-2 border-[#BAFF57]/20 pl-6">
          <p className="text-[#BAFF57]/50 text-sm leading-relaxed font-light">
            Spoločnosť NextLayer Studio s.r.o. nie je platcom dane z pridanej hodnoty (DPH). Ceny uvedené v cenových ponukách a faktúrach sú konečné a DPH sa na ne nevzťahuje.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-[#BAFF57]/10 flex flex-col sm:flex-row gap-6">
          <Link href="/obchodne-podmienky" className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider hover:text-[#BAFF57] transition-colors">
            Obchodné podmienky →
          </Link>
          <Link href="/ochrana-sukromia" className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider hover:text-[#BAFF57] transition-colors">
            Ochrana osobných údajov →
          </Link>
        </div>
      </main>

      <footer className="border-t border-[#BAFF57]/10 px-8 lg:px-24 py-6 text-center">
        <p className="text-[#BAFF57]/25 text-xs font-mono uppercase tracking-widest">© 2026 NextLayer Studio s.r.o. · IČO: 57141282</p>
      </footer>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row border-b border-[#BAFF57]/10 last:border-b-0 px-8 py-4 gap-1 sm:gap-8">
      <span className="text-[#BAFF57]/35 text-xs font-mono uppercase tracking-wider w-full sm:w-44 shrink-0 pt-0.5">{label}</span>
      <span className="text-[#BAFF57]/80 text-sm font-light">{value}</span>
    </div>
  );
}
