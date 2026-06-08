import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Ochrana osobných údajov — NextLayer Studio",
  description: "Zásady ochrany osobných údajov (GDPR) spoločnosti NextLayer Studio s.r.o.",
};

export default function OchranaSukromia() {
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
          <span className="text-[#BAFF57]/40 text-xs uppercase tracking-widest font-mono">Právne dokumenty</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#BAFF57] mb-4">Ochrana osobných údajov</h1>
        <p className="text-[#BAFF57]/40 text-sm font-mono mb-16">Platné od 1. januára 2026 · V súlade s nariadením GDPR (EÚ) 2016/679</p>

        <div className="space-y-12 text-[#BAFF57]/70 text-sm leading-relaxed font-light">

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">1. Prevádzkovateľ osobných údajov</h2>
            <p className="mb-3">Prevádzkovateľom osobných údajov je spoločnosť <strong className="text-[#BAFF57]/90">NextLayer Studio s.r.o.</strong>, Wienerova alej 929/20, 900 42 Miloslavov, IČO: 57141282.</p>
            <p>Kontakt na zodpovednú osobu: <strong className="text-[#BAFF57]/90">team@nextlayer.studio</strong></p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">2. Aké osobné údaje zbierame</h2>
            <p className="mb-3">Táto webová stránka zbiera osobné údaje výlučne prostredníctvom kontaktného formulára. Zbierané údaje zahŕňajú:</p>
            <ul className="list-none space-y-2 mb-3 pl-4">
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>meno a priezvisko,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>e-mailovú adresu,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>obsah správy (dobrovoľne zadaný text).</li>
            </ul>
            <p>Iné osobné údaje (napr. IP adresa, technické údaje o prehliadači) nie sú cielene zbierané ani uchovávané.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">3. Účel a právny základ spracovania</h2>
            <p className="mb-3">Osobné údaje z kontaktného formulára spracúvame za účelom <strong className="text-[#BAFF57]/90">odpovedania na tvoj dopyt a prípadného nadviazania obchodnej spolupráce</strong>.</p>
            <p>Právnym základom spracovania je čl. 6 ods. 1 písm. b) nariadenia GDPR — spracúvanie je nevyhnutné na prijatie opatrení pred uzatvorením zmluvy, resp. čl. 6 ods. 1 písm. f) — oprávnený záujem prevádzkovateľa na komunikáciu s potenciálnymi klientmi.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">4. Doba uchovávania</h2>
            <p>Osobné údaje z kontaktného formulára uchováme po dobu nevyhnutnú na vybavenie tvojho dopytu, najviac však 2 roky od jeho prijatia. Ak dôjde k uzatvoreniu zmluvného vzťahu, údaje sa spracúvajú po dobu trvania zmluvy a ďalej v súlade s účtovnými a daňovými predpismi (spravidla 5–10 rokov).</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">5. Príjemcovia a sprostredkovatelia</h2>
            <p className="mb-3">Odosielanie správ cez kontaktný formulár je zabezpečené prostredníctvom služby <strong className="text-[#BAFF57]/90">EmailJS</strong> (EmailJS Ltd., emailjs.com), ktorá plní úlohu sprostredkovateľa v zmysle GDPR. EmailJS má sídlo v EÚ a spĺňa požiadavky ochrany osobných údajov.</p>
            <p>Osobné údaje neposkytujeme tretím stranám na marketingové účely ani ich nepredávame. K údajom môžu mať prístup len vybrané osoby v rámci spoločnosti NextLayer Studio s.r.o. nevyhnutné pre spracovanie tvojho dopytu.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">6. Cookies a sledovacie technológie</h2>
            <p className="mb-3">Táto webová stránka nepoužíva reklamné ani analytické cookies tretích strán. Používame výlučne <strong className="text-[#BAFF57]/90">funkčné cookies</strong>, ktoré sú nevyhnutné pre správne fungovanie stránky (napr. uloženie tvojej voľby ohľadom cookies).</p>
            <p className="mb-3">Funkčné cookies nevyžadujú tvoj súhlas podľa § 55 ods. 5 zákona č. 452/2021 Z. z. o elektronických komunikáciách, nakoľko slúžia výlučne na prevádzku stránky.</p>
            <p>Stránka neobsahuje Google Analytics, Facebook Pixel ani žiadne iné sledovacie skripty.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">7. Tvoje práva</h2>
            <p className="mb-3">Ako dotknutá osoba máš právo:</p>
            <ul className="list-none space-y-2 mb-3 pl-4">
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span><strong className="text-[#BAFF57]/80">na prístup</strong> k svojim osobným údajom,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span><strong className="text-[#BAFF57]/80">na opravu</strong> nesprávnych alebo neúplných údajov,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span><strong className="text-[#BAFF57]/80">na vymazanie</strong> (právo &bdquo;na zabudnutie&ldquo;), ak nie sú dané zákonné dôvody na ďalšie spracovanie,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span><strong className="text-[#BAFF57]/80">na obmedzenie spracovania</strong> v prípadoch stanovených GDPR,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span><strong className="text-[#BAFF57]/80">na prenosnosť</strong> osobných údajov,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span><strong className="text-[#BAFF57]/80">namietať</strong> voči spracovaniu na základe oprávneného záujmu,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span><strong className="text-[#BAFF57]/80">podať sťažnosť</strong> na Úrad na ochranu osobných údajov SR (uoou.sk).</li>
            </ul>
            <p>Na uplatnenie svojich práv nás kontaktuj na adrese team@nextlayer.studio.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">8. Bezpečnosť</h2>
            <p>Prijali sme primerané technické a organizačné opatrenia na ochranu tvojich osobných údajov pred neoprávneným prístupom, zmenami, zverejnením alebo zničením. Komunikácia na stránke je šifrovaná protokolom HTTPS.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">9. Zmeny tohto dokumentu</h2>
            <p>Tieto zásady môžeme aktualizovať v závislosti od legislatívnych zmien alebo zmien v spôsobe spracovania údajov. Aktuálna verzia je vždy dostupná na tejto stránke s uvedením dátumu platnosti.</p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-[#BAFF57]/10 flex flex-col sm:flex-row gap-6">
          <Link href="/obchodne-podmienky" className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider hover:text-[#BAFF57] transition-colors">
            Obchodné podmienky →
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
