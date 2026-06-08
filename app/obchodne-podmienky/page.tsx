import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Obchodné podmienky — NextLayer Studio",
  description: "Obchodné podmienky spoločnosti NextLayer Studio s.r.o.",
};

export default function ObchodnePodmienky() {
  return (
    <div className="min-h-screen bg-[#212121] text-[#BAFF57]">
      {/* Header */}
      <header className="border-b border-[#BAFF57]/10 px-8 lg:px-24 py-6 flex items-center justify-between">
        <Link href="/">
          <Image src="/fonts/Group.png" alt="NextLayer Studio" width={60} height={60} className="h-10 w-auto brightness-0 invert" />
        </Link>
        <Link href="/" className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono hover:text-[#BAFF57] transition-colors flex items-center gap-2">
          ← Späť na hlavnú
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-8 py-16 lg:py-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[#BAFF57]/40"></div>
          <span className="text-[#BAFF57]/40 text-xs uppercase tracking-widest font-mono">Právne dokumenty</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#BAFF57] mb-4">Obchodné podmienky</h1>
        <p className="text-[#BAFF57]/40 text-sm font-mono mb-16">Platné od 1. januára 2026 · NextLayer Studio s.r.o.</p>

        <div className="space-y-12 text-[#BAFF57]/70 text-sm leading-relaxed font-light">

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">1. Základné ustanovenia</h2>
            <p className="mb-3">Tieto obchodné podmienky (ďalej len &bdquo;Podmienky&ldquo;) upravujú zmluvný vzťah medzi spoločnosťou NextLayer Studio s.r.o. (ďalej len &bdquo;Poskytovateľ&ldquo;) a fyzickými alebo právnickými osobami, ktoré si objednávajú jej služby (ďalej len &bdquo;Klient&ldquo;).</p>
            <p className="mb-3">Poskytovateľom je spoločnosť <strong className="text-[#BAFF57]/90">NextLayer Studio s.r.o.</strong>, so sídlom Wienerova alej 929/20, 900 42 Miloslavov, IČO: 57141282, DIČ: 2122583133 (nie je platcom DPH). Kontakt: team@nextlayer.studio.</p>
            <p>Odoslaním objednávky alebo podpísaním zmluvy o dielo Klient potvrdzuje, že sa oboznámil s týmito Podmienkami a súhlasí s nimi v plnom rozsahu.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">2. Predmet zmluvy</h2>
            <p className="mb-3">Poskytovateľ vykonáva pre Klienta služby v oblasti:</p>
            <ul className="list-none space-y-2 mb-3 pl-4">
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>správy sociálnych sietí, video produkcie a content marketingu,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>vývoja webových stránok, e-shopov a webových aplikácií,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>grafického dizajnu, vizuálnej identity a UI/UX dizajnu,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>ďalších digitálnych a marketingových služieb podľa dohody.</li>
            </ul>
            <p>Presný rozsah, termíny a cena sú špecifikované v cenovej ponuke alebo zmluve o dielo, ktorá tvorí neoddeliteľnú súčasť zmluvného vzťahu.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">3. Uzatvorenie zmluvy a objednávka</h2>
            <p className="mb-3">Zmluvný vzťah vzniká:</p>
            <ul className="list-none space-y-2 mb-3 pl-4">
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>podpísaním zmluvy o dielo oboma stranami, alebo</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>písomným (e-mailovým) potvrdením objednávky zo strany Klienta a jej akceptáciou Poskytovateľom.</li>
            </ul>
            <p>Cenová ponuka je záväzná 14 dní od jej doručenia Klientovi, pokiaľ nie je v ponuke uvedené inak.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">4. Cena a platobné podmienky</h2>
            <p className="mb-3">Ceny za poskytnuté služby sú uvedené v cenovej ponuke alebo zmluve. Všetky ceny sú bez DPH — Poskytovateľ nie je platcom DPH.</p>
            <p className="mb-3">Platby sa uskutočňujú na základe vystavenej faktúry na bankový účet Poskytovateľa. Splatnosť faktúry je 14 dní od jej doručenia, pokiaľ nie je dohodnuté inak.</p>
            <p className="mb-3">Pri zákazkách nad 500 € je Poskytovateľ oprávnený požadovať zálohovú platbu vo výške 50 % z celkovej ceny pred začatím prác. Zostatok je splatný po odovzdaní výsledného diela.</p>
            <p>V prípade omeškania s platbou má Poskytovateľ právo pozastaviť poskytovanie ďalších služieb až do úplného uhradenia záväzkov.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">5. Dodanie a odovzdanie výsledkov</h2>
            <p className="mb-3">Termín dodania je stanovený v cenovej ponuke alebo zmluve. Termíny sú orientačné a môžu byť ovplyvnené mierou spolupráce Klienta (poskytnutie podkladov, schválenia a pod.).</p>
            <p className="mb-3">Výsledky práce sú odovzdané elektronicky (e-mailom, cez cloudové úložisko alebo projektové nástroje) alebo spôsobom dohodnutým v zmluve.</p>
            <p>Klient je povinný poskytnúť Poskytovateľovi včas všetky potrebné podklady, prístupy a informácie. Omeškanie zo strany Klienta nekladie zodpovednosť za nedodanie v termíne na Poskytovateľa.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">6. Autorské práva a licencia</h2>
            <p className="mb-3">Všetky výstupy (grafika, kód, videá, texty a iné materiály) vytvorené Poskytovateľom sú predmetom autorského práva. Po úplnom uhradení dohodnutej ceny prechádza na Klienta nevýhradná licencia na ich použitie na dohodnuté účely.</p>
            <p className="mb-3">Poskytovateľ si vyhradzuje právo na použitie vytvorených výstupov vo svojom portfóliu a marketingových materiáloch, pokiaľ Klient písomne nevznesie námietku.</p>
            <p>Klient nesmie ďalej predávať ani sublicencovať výstupy tretím stranám bez predchádzajúceho písomného súhlasu Poskytovateľa.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">7. Reklamácie</h2>
            <p className="mb-3">Klient je oprávnený uplatniť reklamáciu písomne na adresu team@nextlayer.studio do 14 dní od odovzdania výsledkov práce.</p>
            <p className="mb-3">Reklamácia musí obsahovať popis vady, zákazkové číslo alebo číslo faktúry a priložené relevantné podklady.</p>
            <p>Poskytovateľ posúdi reklamáciu do 10 pracovných dní. Oprávnená reklamácia bude bezplatne opravená. Na opravách, ktoré presahujú dohodnutý rozsah pôvodnej zákazky, sa môžu strany dohodnúť na príplatku.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">8. Zodpovednosť za škodu</h2>
            <p className="mb-3">Poskytovateľ nezodpovedá za nepriame škody, ušlý zisk ani za straty spôsobené nesprávnymi alebo neúplnými podkladmi poskytnutými Klientom.</p>
            <p>Celková náhrada škody zo strany Poskytovateľa je limitovaná výškou ceny zaplatenej za konkrétnu zákazku, v súvislosti s ktorou škoda vznikla.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">9. Mlčanlivosť a ochrana informácií</h2>
            <p className="mb-3">Obe strany sa zaväzujú zachovávať mlčanlivosť o dôverných informáciách druhej strany, ku ktorým získajú prístup v rámci spolupráce, a to aj po skončení zmluvného vzťahu.</p>
            <p>Za dôverné informácie sa nepovažujú informácie, ktoré sú verejne dostupné, alebo také, ktoré strana poznala pred začatím spolupráce.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">10. Ukončenie spolupráce</h2>
            <p className="mb-3">Každá zo strán môže ukončiť zmluvu písomnou výpoveďou s výpovednou dobou 30 dní, ak nie je v zmluve dohodnuté inak.</p>
            <p>Pri predčasnom ukončení zo strany Klienta bez zavinenia Poskytovateľa je Klient povinný uhradiť hodnotu doteraz vykonaných prác, ako aj prípadné storno náklady (napr. zakúpený softvér, licencie).</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">11. Záverečné ustanovenia</h2>
            <p className="mb-3">Tieto Podmienky sa riadia právnym poriadkom Slovenskej republiky. Prípadné spory sa strany zaväzujú riešiť prednostne dohodou. Ak nedôjde k dohode, spory bude riešiť príslušný súd v Slovenskej republike.</p>
            <p className="mb-3">Poskytovateľ si vyhradzuje právo na zmenu týchto Podmienok. O zmene informuje Klientov zverejnením na webovej stránke alebo priamou komunikáciou.</p>
            <p>Tieto Podmienky nadobúdajú platnosť a účinnosť dňa 1. januára 2026.</p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-[#BAFF57]/10 flex flex-col sm:flex-row gap-6">
          <Link href="/ochrana-sukromia" className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider hover:text-[#BAFF57] transition-colors">
            Ochrana osobných údajov →
          </Link>
          <Link href="/informacie-o-firme" className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider hover:text-[#BAFF57] transition-colors">
            Informácie o firme →
          </Link>
        </div>
      </main>

      <footer className="border-t border-[#BAFF57]/10 px-8 lg:px-24 py-6 text-center">
        <p className="text-[#BAFF57]/25 text-xs font-mono uppercase tracking-widest">© 2026 NextLayer Studio s.r.o. · IČO: 57141282</p>
      </footer>
    </div>
  );
}
