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
        <p className="text-[#BAFF57]/40 text-sm font-mono mb-16">Platné od 1. januára 2026 · Aktualizované 8. novembra 2026 · V súlade s nariadením GDPR (EÚ) 2016/679</p>

        <div className="space-y-12 text-[#BAFF57]/70 text-sm leading-relaxed font-light">

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">1. Prevádzkovateľ osobných údajov</h2>
            <p className="mb-3">Prevádzkovateľom osobných údajov je spoločnosť <strong className="text-[#BAFF57]/90">NextLayer Studio s.r.o.</strong>, Wienerova alej 929/20, 900 42 Miloslavov, IČO: 57141282.</p>
            <p>Kontakt na zodpovednú osobu: <strong className="text-[#BAFF57]/90">team@nextlayer.studio</strong></p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">2. Aké osobné údaje zbierame</h2>
            <p className="mb-3">Osobné údaje zbierame prostredníctvom kontaktných formulárov na tejto stránke (vrátane formulára &bdquo;Bezplatná konzultácia&ldquo;) a formulárov v našich reklamách na Facebooku a Instagrame. Zbierané údaje zahŕňajú:</p>
            <ul className="list-none space-y-2 mb-3 pl-4">
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>meno a priezvisko,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>e-mailovú adresu,</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>telefónne číslo (ak ho zadáš),</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>názov firmy a odkaz na tvoj web alebo profil na sociálnej sieti (ak ich zadáš),</li>
              <li className="flex gap-3"><span className="text-[#BAFF57]/30">—</span>obsah správy (dobrovoľne zadaný text).</li>
            </ul>
            <p className="mb-3"><strong className="text-[#BAFF57]/90">Formuláre v reklamách na Facebooku a Instagrame.</strong> Ak vyplníš formulár priamo v našej reklame (napr. &bdquo;3 nápady na videá pre vašu firmu zadarmo&ldquo;), formulár technicky prevádzkuje spoločnosť Meta a údaje, ktoré do neho zadáš, nám odovzdá. Použijeme ich len na to, aby sme ti poslali sľúbené nápady, odpovedali na tvoj dopyt a prípadne ti zavolali alebo napísali s ponukou spolupráce.</p>
            <p className="mb-3">Ak si udelíš súhlas s marketingovými cookies (bod 6), pri odoslaní formulára na webe spracúvame aj technické identifikátory potrebné na meranie reklamy (cookies <span className="font-mono text-xs">_fbp</span> a <span className="font-mono text-xs">_fbc</span>, IP adresu a údaj o prehliadači) a e-mail a telefón v pseudonymizovanej (hašovanej) podobe, ktoré odovzdávame spoločnosti Meta na priradenie dopytu ku kampani.</p>
            <p>Bez udeleného marketingového súhlasu sa žiadne sledovacie identifikátory nezbierajú ani neodosielajú.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">3. Účel a právny základ spracovania</h2>
            <p className="mb-3">Osobné údaje z kontaktných formulárov spracúvame za účelom <strong className="text-[#BAFF57]/90">odpovedania na tvoj dopyt a prípadného nadviazania obchodnej spolupráce</strong>.</p>
            <p>Právnym základom spracovania je čl. 6 ods. 1 písm. b) nariadenia GDPR — spracúvanie je nevyhnutné na prijatie opatrení pred uzatvorením zmluvy, resp. čl. 6 ods. 1 písm. f) — oprávnený záujem prevádzkovateľa na komunikáciu s potenciálnymi klientmi.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">4. Doba uchovávania</h2>
            <p>Osobné údaje z kontaktných formulárov uchováme po dobu nevyhnutnú na vybavenie tvojho dopytu, najviac však 2 roky od jeho prijatia. Ak dôjde k uzatvoreniu zmluvného vzťahu, údaje sa spracúvajú po dobu trvania zmluvy a ďalej v súlade s účtovnými a daňovými predpismi (spravidla 5–10 rokov).</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">5. Príjemcovia a sprostredkovatelia</h2>
            <p className="mb-3">Odosielanie správ cez kontaktný formulár je zabezpečené prostredníctvom služby <strong className="text-[#BAFF57]/90">Resend</strong> (Resend, Inc., resend.com), ktorá plní úlohu sprostredkovateľa v zmysle GDPR pri doručení e-mailu na team@nextlayer.studio.</p>
            <p className="mb-3">Prevádzku a hosting stránky zabezpečuje <strong className="text-[#BAFF57]/90">Vercel Inc.</strong> (USA), vrátane nástroja Vercel Analytics na anonymnú štatistiku návštevnosti bez cookies.</p>
            <p className="mb-3">Formuláre v reklamách na Facebooku a Instagrame prevádzkuje a údaje z nich nám odovzdáva <strong className="text-[#BAFF57]/90">Meta Platforms Ireland Ltd.</strong> (Írsko). Ak si udelíš marketingový súhlas (bod 6), príjemcami pseudonymizovaných údajov o návštevách a odoslaných formulároch sú Meta Platforms Ireland Ltd. a <strong className="text-[#BAFF57]/90">Google Ireland Ltd.</strong> (Írsko), prípadne ich materské spoločnosti v USA. Prenos do USA je krytý štandardnými zmluvnými doložkami a rámcom EU–US Data Privacy Framework.</p>
            <p>Osobné údaje nepredávame. K údajom majú prístup len osoby v rámci spoločnosti NextLayer Studio s.r.o. nevyhnutné pre spracovanie tvojho dopytu.</p>
          </section>

          <section>
            <h2 className="text-[#BAFF57] text-lg font-bold uppercase tracking-wider mb-4">6. Cookies a sledovacie technológie</h2>
            <p className="mb-3"><strong className="text-[#BAFF57]/90">Nevyhnutné funkčné cookies.</strong> Používame ich na základné fungovanie stránky, napr. na uloženie tvojej voľby ohľadom cookies. Nevyžadujú tvoj súhlas podľa zákona č. 452/2021 Z. z. o elektronických komunikáciách.</p>
            <p className="mb-3"><strong className="text-[#BAFF57]/90">Anonymná štatistika návštevnosti.</strong> Vercel Analytics meria návštevnosť bez cookies a bez identifikácie jednotlivých návštevníkov.</p>
            <p className="mb-3"><strong className="text-[#BAFF57]/90">Marketingové nástroje (len s tvojím súhlasom).</strong> Ak v cookie lište klikneš &bdquo;Prijať&ldquo;, aktivujeme <strong className="text-[#BAFF57]/90">Meta Pixel</strong> a <strong className="text-[#BAFF57]/90">Meta Conversions API</strong> spoločnosti Meta a <strong className="text-[#BAFF57]/90">Google Ads</strong> (prípadne Google Analytics) spoločnosti Google. Slúžia na meranie účinnosti našich reklám (koľko ľudí po kliknutí na reklamu odoslalo formulár) a na zobrazovanie reklám ľuďom, ktorí našu stránku navštívili. Ukladajú sa cookies týchto služieb (napr. <span className="font-mono text-xs">_fbp</span>, <span className="font-mono text-xs">_fbc</span>, <span className="font-mono text-xs">_gcl_au</span>) s dobou platnosti spravidla do 90 dní. Právnym základom je tvoj súhlas podľa čl. 6 ods. 1 písm. a) GDPR.</p>
            <p className="mb-3">Súhlas môžeš kedykoľvek odvolať vymazaním cookies v prehliadači alebo nás kontaktuj na team@nextlayer.studio. Do udelenia súhlasu sa žiadne marketingové skripty nenačítajú.</p>
            <p>Zásady spracovania údajov: Meta &ndash; <span className="text-[#BAFF57]/90">facebook.com/privacy/policy</span>, Google &ndash; <span className="text-[#BAFF57]/90">policies.google.com/privacy</span>.</p>
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
