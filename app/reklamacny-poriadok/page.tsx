import Link from "next/link";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata = {
  title: "Reklamačný poriadok — NextLayer Studio",
  description: "Ako reklamovať služby spoločnosti NextLayer Studio s.r.o.",
};

const summary = [
  "Reklamáciu pošlite e-mailom na team@nextlayer.studio, bez zbytočného odkladu, najneskôr do 14 dní od zistenia.",
  "Prijatie potvrdíme do 2 pracovných dní, vybavíme ju do 10 pracovných dní.",
  "Oprávnenú reklamáciu vyriešime bezplatnou opravou alebo zľavou z najbližšej platby.",
  "Reklamovať sa dá to, čo sme sa zaviazali urobiť. Počet dopytov a ich cenu zaručiť nevieme, preto nie sú dôvodom reklamácie.",
];

const sections: LegalSection[] = [
  {
    title: "Úvodné ustanovenia",
    body: [
      <>Tento reklamačný poriadok upravuje, ako klient uplatňuje práva zo zodpovednosti za vady služieb spoločnosti NextLayer Studio s.r.o., Wienerova alej 929/20, 900 42 Miloslavov, IČO: 57141282 (ďalej len „poskytovateľ“), a ako ich poskytovateľ vybavuje.</>,
      <>Reklamačný poriadok je súčasťou <Link href="/obchodne-podmienky" className="underline">Obchodných podmienok</Link> a zmlúv poskytovateľa. Pri podnikateľoch sa vzťahy neupravené týmto poriadkom riadia Obchodným zákonníkom. Ak je klient spotrebiteľ, má navyše práva podľa zákona č. 108/2024 Z. z. o ochrane spotrebiteľa a Občianskeho zákonníka, ktoré tento poriadok neobmedzuje.</>,
    ],
  },
  {
    title: "Čo je možné reklamovať",
    body: [
      <>Pri mesačnej službe (reklama, ktorá prináša dopyty), najmä: reklama nebola nastavená alebo spustená v dohodnutom termíne bez zavinenia klienta; dopyty z formulára neboli doručované na e-mail klienta; mesačný report nebol dodaný; chyba v nastavení reklamy, ktorú spôsobil poskytovateľ.</>,
      <>Pri jednorazových zákazkách (videá, grafika, web): výsledok nezodpovedá dohodnutému zadaniu alebo má technickú chybu.</>,
    ],
  },
  {
    title: "Čo nie je vadou služby",
    body: [
      <>Počet dopytov, cena za dopyt, ani obchodný výsledok klienta. Poskytovateľ ich nezaručuje, lebo závisia aj od rozpočtu, odboru, sezóny, konkurencie a od rýchlosti odpovede klienta na dopyty.</>,
      <>Rozhodnutia a výpadky reklamných platforiem a tretích strán (napr. zamietnutie reklamy, obmedzenie účtu, výpadok Facebooku), ak poskytovateľ postupoval podľa ich pravidiel.</>,
      <>Oneskorenie spôsobené klientom (neposkytnuté prístupy, materiály alebo súčinnosť) a obdobie, keď bola služba pozastavená pre neuhradenú platbu.</>,
      <>Výhrady k vzhľadu alebo obsahu, ktorý klient predtým schválil.</>,
    ],
  },
  {
    title: "Ako reklamovať",
    body: [
      <>Reklamáciu pošlite e-mailom na <strong className="text-[#BAFF57]/90">team@nextlayer.studio</strong>. Uveďte: názov firmy, číslo zmluvy alebo faktúry, čo nefunguje alebo čo chýba, kedy ste to zistili a ak je to možné, snímku obrazovky alebo iný doklad.</>,
      <>Reklamáciu uplatnite bez zbytočného odkladu, najneskôr do 14 dní od zistenia vady. Pri mesačnej službe najneskôr do konca mesiaca nasledujúceho po mesiaci, ktorého sa týka. Pri jednorazovej zákazke najneskôr do 14 dní od odovzdania výsledku.</>,
    ],
  },
  {
    title: "Vybavenie reklamácie",
    body: [
      <>Prijatie reklamácie potvrdíme e-mailom do 2 pracovných dní. Reklamáciu vybavíme do 10 pracovných dní od jej doručenia, pri zložitých prípadoch najneskôr do 30 dní. O výsledku vás informujeme e-mailom.</>,
      <>Oprávnenú reklamáciu vybavíme bezplatným odstránením vady (napríklad opravou nastavenia, doplnením reportu alebo úpravou výsledku). Ak vadu nie je možné odstrániť, poskytneme primeranú zľavu, ktorú odpočítame z najbližšej platby, alebo pri skončení spolupráce vrátime pomernú časť odplaty.</>,
      <>Ak reklamáciu neuznáme, vysvetlíme dôvod.</>,
      <>Uplatnenie reklamácie nemá vplyv na splatnosť platby za službu.</>,
    ],
  },
  {
    title: "Spotrebitelia",
    body: [
      <>Ak je klient spotrebiteľ a s vybavením reklamácie nie je spokojný, môže sa obrátiť na poskytovateľa so žiadosťou o nápravu. Ak poskytovateľ odpovie zamietavo alebo do 30 dní neodpovie, môže podať návrh na alternatívne riešenie sporu subjektu alternatívneho riešenia sporov, napríklad Slovenskej obchodnej inšpekcii (www.soi.sk), alebo využiť platformu RSO (ec.europa.eu/consumers/odr).</>,
    ],
  },
  {
    title: "Záverečné ustanovenia",
    body: [<>Tento reklamačný poriadok je platný a účinný od 22. novembra 2026.</>],
  },
];

export default function ReklamacnyPoriadok() {
  return (
    <LegalPage
      title="Reklamačný poriadok"
      validFrom="Platný od 22. novembra 2026"
      summary={summary}
      sections={sections}
      current="/reklamacny-poriadok"
    />
  );
}
