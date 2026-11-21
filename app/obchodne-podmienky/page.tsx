import Link from "next/link";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata = {
  title: "Obchodné podmienky — NextLayer Studio",
  description: "Obchodné podmienky spoločnosti NextLayer Studio s.r.o.",
};

const summary = [
  "Všetky služby sa platia vopred. Prácu začíname až po pripísaní platby.",
  "Mesačné služby sa platia vždy vopred za mesiac, ktorý sa začína, so splatnosťou do 7. dňa mesiaca.",
  "Ak platba nepríde do 7. dňa, od 8. dňa pozastavíme prácu aj reklamy. Ak nepríde ani do 14. dňa, spolupráca končí.",
  "Bez viazanosti: mesačnú službu môžete kedykoľvek vypovedať s výpovednou lehotou jeden mesiac.",
  "Nastavenia reklám, ktoré vytvoríme, môžete používať počas spolupráce. Po jej skončení ich odstránime, ak sa nedohodneme inak.",
  "Reklamácie vybavujeme podľa Reklamačného poriadku, stačí e-mail na team@nextlayer.studio.",
];

const sections: LegalSection[] = [
  {
    title: "Základné ustanovenia",
    body: [
      <>Tieto obchodné podmienky (ďalej len „podmienky“) upravujú zmluvný vzťah medzi spoločnosťou NextLayer Studio s.r.o. (ďalej len „poskytovateľ“) a osobami, ktoré si objednávajú jej služby (ďalej len „klient“).</>,
      <>Poskytovateľ: <strong className="text-[#BAFF57]/90">NextLayer Studio s.r.o.</strong>, Wienerova alej 929/20, 900 42 Miloslavov, IČO: 57141282, DIČ: 2122583133, nie je platiteľom DPH. Kontakt: team@nextlayer.studio, +421 902 238 309.</>,
      <>Služby sú určené predovšetkým podnikateľom a zmluvný vzťah sa riadi zákonom č. 513/1991 Zb. Obchodný zákonník. Ak je klient spotrebiteľ, má práva podľa predpisov na ochranu spotrebiteľa a tieto podmienky ich neobmedzujú.</>,
      <>Ak sa zmluva s klientom a tieto podmienky líšia, platí zmluva.</>,
    ],
  },
  {
    title: "Služby",
    body: [
      <>Hlavnou službou poskytovateľa je reklama, ktorá prináša dopyty: nastavenie a mesačná správa reklamy na Facebooku, Instagrame a v Google, doručovanie dopytov na e-mail klienta a mesačné reporty (ďalej len „mesačná služba“). Aktuálne ceny sú na <Link href="/cena" className="underline">nextlayer.studio/cena</Link>.</>,
      <>Na požiadanie klienta poskytovateľ poskytuje aj jednorazové zákazky (najmä nastavenie sociálnych sietí, natáčanie videí, tvorbu a servis webu) podľa ponuky.</>,
      <>Presný rozsah služby, cena a termíny sú uvedené v zmluve alebo v ponuke, ktorú klient potvrdil.</>,
    ],
  },
  {
    title: "Uzatvorenie zmluvy",
    body: [
      <>Zmluvný vzťah vzniká podpisom zmluvy oboma stranami (aj elektronicky alebo naskenovanej), alebo potvrdením ponuky klientom e-mailom a jej akceptáciou poskytovateľom.</>,
      <>Ponuka je platná 14 dní od doručenia, ak v nej nie je uvedené inak.</>,
    ],
  },
  {
    title: "Cena a platba vopred",
    body: [
      <><strong className="text-[#BAFF57]/90">Všetky služby sa platia vopred.</strong> Poskytovateľ nezačne poskytovať službu ani žiadnu jej časť skôr, ako je príslušná platba pripísaná na jeho účet.</>,
      <>Mesačná služba: jednorazová odplata za nastavenie a odplata za prvý mesiac sa platia po uzatvorení zmluvy, so splatnosťou 7 dní. Odplata za každý ďalší kalendárny mesiac je splatná vopred, do 7. dňa tohto mesiaca. Poskytovateľ ju vyúčtuje k prvému dňu mesiaca e-mailom.</>,
      <>Jednorazové zákazky: celá cena je splatná pred začatím prác, ak v zmluve alebo ponuke nie je dohodnuté inak.</>,
      <>Formou vyúčtovania môže byť faktúra, zálohová faktúra alebo iná výzva na úhradu. Na povinnosti platiť vopred a na splatnosti forma nič nemení. Platba sa považuje za uhradenú dňom pripísania na účet poskytovateľa.</>,
      <>Ceny sú konečné, poskytovateľ nie je platiteľom DPH. Rozpočet na samotnú reklamu (platby spoločnostiam Meta alebo Google) nie je súčasťou ceny, klient ho platí priamo reklamnej platforme.</>,
    ],
  },
  {
    title: "Neuhradenie platby",
    body: [
      <>Ak mesačná odplata nie je uhradená do 7. dňa mesiaca, poskytovateľ je od 8. dňa oprávnený pozastaviť poskytovanie služby vrátane všetkých reklám klienta. Po uhradení ju obnoví do jedného pracovného dňa.</>,
      <>Ak mesačná odplata nie je uhradená ani do 14. dňa mesiaca, zmluva o mesačnej službe uplynutím tohto dňa zaniká, ak zmluva neurčuje inak.</>,
      <>K platbe posiela poskytovateľ najviac tri e-maily: vyúčtovanie, pripomienku deň pred uplynutím splatnosti a oznámenie o pozastavení.</>,
    ],
  },
  {
    title: "Dodanie a súčinnosť",
    body: [
      <>Klient poskytne včas potrebné prístupy (napr. partnerský prístup k stránke a reklamnému účtu), podklady a materiály. Termíny poskytovateľa sa predlžujú o čas, o ktorý sa klient omešká.</>,
      <>Výsledky práce sa odovzdávajú elektronicky (e-mailom, v reklamných účtoch klienta alebo cez cloudové úložisko).</>,
      <>Na dopyty, ktoré cez reklamu prídu, odpovedá klient sám. Poskytovateľ ich doručuje na e-mail klienta.</>,
      <>Poskytovateľ nezaručuje konkrétny počet dopytov ani ich cenu, výsledok závisí aj od rozpočtu, odboru, sezóny, konkurencie a od rýchlosti odpovede klienta.</>,
    ],
  },
  {
    title: "Vlastníctvo práce a licencia",
    body: [
      <>Mesačná služba: nastavenia a výsledky práce poskytovateľa (štruktúra kampaní, reklamy, texty reklám, publiká, formuláre, scenáre, šablóny a postupy) patria poskytovateľovi. Klient ich môže používať počas trvania zmluvy. Pri skončení spolupráce ich poskytovateľ z účtov klienta odstráni a ukončí svoj prístup, ak sa strany nedohodnú inak. Klientovi vždy zostávajú jeho účty, jeho vlastné materiály a dopyty, ktoré mu už boli doručené.</>,
      <>Jednorazové zákazky (videá, grafika, web): po úplnom zaplatení získava klient nevýhradnú licenciu na ich použitie na dohodnuté účely, ak zmluva neurčuje inak. Pred zaplatením ich klient nesmie používať.</>,
      <>Poskytovateľ môže výsledky práce uvádzať ako referenciu len so súhlasom klienta.</>,
    ],
  },
  {
    title: "Reklamácie",
    body: [
      <>Reklamácie sa riadia <Link href="/reklamacny-poriadok" className="underline">Reklamačným poriadkom</Link>. Reklamáciu stačí poslať e-mailom na team@nextlayer.studio. Reklamácia nemá vplyv na splatnosť platby.</>,
    ],
  },
  {
    title: "Zodpovednosť",
    body: [
      <>Poskytovateľ nezodpovedá za rozhodnutia reklamných platforiem (napr. zamietnutie reklamy, obmedzenie účtu), ak postupoval podľa ich pravidiel, ani za škodu spôsobenú nesprávnymi alebo neúplnými podkladmi klienta.</>,
      <>Celková zodpovednosť poskytovateľa za škodu je obmedzená výškou odplaty za službu, v súvislosti s ktorou škoda vznikla (pri mesačnej službe výškou odplaty za jeden mesiac), v rozsahu, v akom to dovoľuje zákon.</>,
    ],
  },
  {
    title: "Mlčanlivosť a osobné údaje",
    body: [
      <>Obe strany zachovávajú mlčanlivosť o dôverných informáciách druhej strany aj po skončení spolupráce.</>,
      <>Pri doručovaní dopytov spracúva poskytovateľ osobné údaje zákazníkov klienta ako sprostredkovateľ podľa čl. 28 GDPR, výlučne na doručenie dopytu a súhrnnú štatistiku. Podrobnosti sú v zmluve a v dokumente <Link href="/ochrana-sukromia" className="underline">Ochrana osobných údajov</Link>.</>,
    ],
  },
  {
    title: "Ukončenie spolupráce",
    body: [
      <>Mesačnú službu môže ktorákoľvek strana vypovedať aj bez udania dôvodu, e-mailom. Výpovedná lehota je jeden mesiac a začína plynúť prvým dňom mesiaca nasledujúceho po doručení výpovede.</>,
      <>Pri jednorazovej zákazke, ktorú klient zruší po začatí prác, má poskytovateľ nárok na odplatu za doteraz vykonanú prácu a vynaložené náklady.</>,
    ],
  },
  {
    title: "Záverečné ustanovenia",
    body: [
      <>Podmienky sa riadia právnym poriadkom Slovenskej republiky. Spory strany riešia prednostne dohodou, inak ich rozhodne príslušný súd v Slovenskej republike.</>,
      <>Poskytovateľ môže podmienky meniť. Pre existujúce zmluvy platí znenie účinné v deň ich uzatvorenia, ak sa strany nedohodnú inak.</>,
      <>Tieto podmienky sú platné a účinné od 22. novembra 2026 a nahrádzajú podmienky platné od 1. januára 2026.</>,
    ],
  },
];

export default function ObchodnePodmienky() {
  return (
    <LegalPage
      title="Obchodné podmienky"
      validFrom="Platné od 22. novembra 2026"
      summary={summary}
      sections={sections}
      current="/obchodne-podmienky"
    />
  );
}
