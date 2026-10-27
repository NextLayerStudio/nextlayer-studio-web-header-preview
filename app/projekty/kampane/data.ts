export type CampaignStat = {
  value: string;
  label: string;
};

export type CampaignAd = {
  type: "video" | "image";
  src: string;
  poster?: string;
  title: string;
  platform: string;
  format: string;
};

export type CampaignStep = {
  title: string;
  desc: string;
};

export type CaseStudyDecision = {
  title: string;
  body: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
  after?: string[];
  /** Key outcome of the step, shown as a black callout */
  highlight?: string;
  figures?: CampaignStat[];
};

export type CaseStudyFinding = string | { title: string; items: string[] };

/** Headings may contain "\n" for a manual line break */
export type CaseStudy = {
  meta: { label: string; value: string }[];
  context: string[];
  findingsTitle?: string;
  findingsIntro?: string;
  findings: CaseStudyFinding[];
  decisionsTitle?: string;
  decisions: CaseStudyDecision[];
  /** The dark slab shows either the chain or the build list */
  chain?: string[];
  chainLabel?: string;
  chainTitle?: string;
  chainIntro?: string;
  chainNote?: string | string[];
  build?: CampaignStep[];
  buildTitle?: string;
  buildNote?: string;
  now: CampaignStep[];
  results: string[];
  takeaway: string;
};

export type Campaign = {
  slug: string;
  client: string;
  logo: string;
  logoBg: string;
  handle?: string;
  link: string;
  period: string;
  platforms: string[];
  goal: string;
  summary: string;
  services: string[];
  /** First three show on the card, all of them on the detail page */
  stats: CampaignStat[];
  steps: CampaignStep[];
  ads: CampaignAd[];
  result: string;
  /** Long-form write-up; replaces the generic "what we did" block on the detail page */
  caseStudy?: CaseStudy;
  /** Placeholder figures — renders a visible badge until real numbers replace them */
  sample?: boolean;
};

const BLOB = "https://akinb3uuwih4cf6s.public.blob.vercel-storage.com";

const allCampaigns: Campaign[] = [
  {
    slug: "bombafasada",
    client: "Bombafasada",
    logo: "/logos/bombafasada-clean.png",
    logoBg: "#206CD3",
    handle: "@bombafasada",
    link: "https://www.instagram.com/bombafasada/",
    period: "2026",
    platforms: ["Instagram", "Facebook"],
    goal: "Viac dopytov na čistenie a renováciu fasád",
    summary:
      "Postavili sme Bombafasade expertnú značku na sociálnych sieťach. Edukačné reels o fasádach, zábery z realizácií a platená kampaň cielená na majiteľov domov v regióne.",
    services: ["Stratégia kampane", "Scenár & natáčanie", "Strih reels", "Meta Ads", "Reporting"],
    stats: [
      { value: "120k+", label: "Zobrazení" },
      { value: "45k", label: "Oslovených ľudí" },
      { value: "80+", label: "Dopytov" },
      { value: "4,2 %", label: "Engagement" },
    ],
    steps: [
      { title: "Stratégia", desc: "Definovali sme cieľovku, ponuku a tón komunikácie — odborník, ktorý vysvetľuje, nie predáva." },
      { title: "Produkcia", desc: "Natočili sme sériu edukačných reels priamo na realizáciách s odborným komentárom." },
      { title: "Kampaň", desc: "Najlepšie videá sme pustili do Meta Ads s cielením na majiteľov domov v okolí." },
      { title: "Optimalizácia", desc: "Každý týždeň sme vyhodnocovali výkon a rozpočet presúvali na víťazné kreatívy." },
    ],
    ads: [
      { type: "video", src: `${BLOB}/bombafasada/video1.mp4`, title: "Edukačný reel — fasádne povrchy", platform: "Instagram", format: "Reels 9:16" },
      { type: "video", src: `${BLOB}/bombafasada/video2.mp4`, title: "Realizácia v teréne", platform: "Facebook", format: "Reels 9:16" },
    ],
    result: "Z firmy, ktorá na sieťach nebola vidieť, sa stal rozpoznateľný odborník s pravidelným prísunom dopytov.",
    sample: true,
  },
  {
    slug: "karin-art",
    client: "KarinArt",
    logo: "/logos/karinart.png",
    logoBg: "#FFFFFF",
    handle: "@karin_art_tattoo",
    link: "https://www.instagram.com/karin_art_tattoo?igsh=N3lqejRsenR5MWd0",
    period: "Od 05/2026",
    platforms: ["Web", "Instagram", "Meta Ads"],
    goal: "60 vypredaných termínov za 20 € reklamy",
    summary:
      "Tetovanie a beauty štúdio v Bratislave. Postavili sme web s rezerváciami a vernostným programom, natáčame s Karin pravidelne a októbrová akcia na voľné návrhy vypredala 60 termínov pri 20 € v reklame.",
    services: ["Vývoj a správa webu s rezervačným systémom", "Vernostný program", "Scenáre a video produkcia", "Kampane a akcie"],
    stats: [
      { value: "60", label: "Vypredaných termínov" },
      { value: "20 €", label: "Do reklamy na akciu" },
      { value: "40 000+", label: "Zhliadnutí akciového videa" },
      { value: "180 000+", label: "Najúspešnejšie video" },
    ],
    steps: [
      { title: "Web s rezerváciami", desc: "Kalendár, ceny, portfólio a beauty na jednom mieste." },
      { title: "Vernostný program", desc: "Ink kredity, rebríček a VIP karta automaticky." },
      { title: "Video so scenárom", desc: "Karin hovorí ako Karin, nie ako reklama." },
      { title: "Akcia a 20 € boost", desc: "Októbrová akcia na voľné návrhy." },
    ],
    ads: [
      { type: "video", src: "/kampane/karin-art/karin_akcia.mp4", poster: "/kampane/karin-art/karin_akcia.jpg", title: "Októbrová akcia — voľné návrhy", platform: "Meta", format: "Reels 9:16" },
      { type: "video", src: "/kampane/karin-art/karin_jun21.mp4", poster: "/kampane/karin-art/karin_jun21.jpg", title: "Proces a štúdio", platform: "Instagram", format: "Reels 9:16" },
      { type: "video", src: "/kampane/karin-art/karin_beauty.mp4", poster: "/kampane/karin-art/karin_beauty.jpg", title: "Karin Beauty Sphere", platform: "Instagram", format: "Reels 9:16" },
      { type: "video", src: "/kampane/karin-art/karin_cinematic.mp4", poster: "/kampane/karin-art/karin_cinematic.jpg", title: "Cinematic reel", platform: "Instagram", format: "Reels 9:16" },
    ],
    result: "Všetkých 60 termínov októbrovej akcie vypredaných — väčšina záujmu prišla organicky, nie z rozpočtu.",
    caseStudy: {
      meta: [
        { label: "Klient", value: "KarinArt, tetovacia umelkyňa Karin Haizerová z Bratislavy a jej beauty štúdio Karin Beauty Sphere" },
        { label: "Služby", value: "Vývoj a správa webu s rezervačným systémom, vernostný program, scenáre a video produkcia, kampane a akcie" },
        { label: "Spolupráca", value: "Od mája 2026, pokračuje" },
      ],
      context: [
        "Karin tetuje a popri tom vedie beauty štúdio s ošetreniami pleti. Má vlastný rukopis, verných klientov a portfólio, ktoré sa dobre pozerá. Termíny sa však dohadovali cez správy, akcie sa vymýšľali narýchlo a obsah na sieťach nemal jasný cieľ.",
        "Pri tetovaní pritom rozhoduje dôvera viac ako cena. Človek si nechá niečo navždy urobiť na kožu len od niekoho, koho pozná, komu verí a koho práca sa mu páči.",
      ],
      findingsTitle: "Tri veci, ktoré\nbrzdili rast.",
      findings: [
        "Rezervácia termínu bola najslabší krok. Kto sa rozhodol, musel písať, čakať na odpoveď a dohadovať sa. Časť ľudí po ceste odpadla.",
        "Dva svety, tetovanie a beauty, bežali vedľa seba bez prepojenia. Klientka z jedného nevedela o druhom.",
        "Najsilnejší marketing Karin mala vo svojich klientoch. Odporúčania fungovali, ale nikto ich neodmeňoval ani nesledoval.",
      ],
      decisionsTitle: "Päť rozhodnutí,\nktoré zaplnili kalendár.",
      decisions: [
        {
          title: "Web ako pracovný nástroj, nie vizitka.",
          body: [
            "Postavili sme web, na ktorom si klient sám vyberie službu aj termín a rezervuje si ho bez písania. Karin má administráciu, v ktorej spravuje kalendár, ceny, portfólio aj ošetrenia v beauty štúdiu. Tetovanie a Karin Beauty Sphere sú na jednom webe a navzájom na seba odkazujú.",
            "Súčasťou webu je aj sekcia voľných návrhov: hotové motívy, ktoré si klient vyberie a rovno zarezervuje termín. Pri každom je cena aj orientačná veľkosť, takže človek vie, do čoho ide, ešte pred prvou správou.",
          ],
        },
        {
          title: "Odporúčania ako systém.",
          body: ["Na leto sme na web doplnili vernostný program:"],
          table: {
            head: ["Časť", "Ako funguje"],
            rows: [
              ["Ink kredity", "Každý klient má vlastný pozývací odkaz a QR kód; keď pozvaný kamarát príde na tetovanie, pozývateľ dostane kredit na ďalšie tetovanie"],
              ["Rebríček", "Verejný rebríček pozývateľov počas leta; víťaz získa VIP kartu"],
              ["Vernostná karta", "Za každú návštevu jedno políčko, odmeny rastú, posledné políčko je VIP karta"],
              ["VIP karta", "Trvalá zľava, narodeninová výhoda a VIP návrhy; počet miest je obmedzený"],
              ["Zákaznícka zóna", "Klient vidí svoje kredity, vernostnú kartu, QR kód a pozývací odkaz na jednom mieste"],
            ],
          },
          after: [
            "Všetko beží automaticky. Karin nemusí nič počítať ani si pamätať, kto koho priviedol.",
          ],
        },
        {
          title: "Scenáre, v ktorých hovorí Karin, nie reklama.",
          body: [
            "Každé video má vopred napísaný scenár, ktorý znie ako Karin, nie ako leták. Prvá veta má zastaviť palec („Čo keby som ti povedala, že tvoji kamoši ti zaplatia ďalšie tetovanie?“), potom jednoduché vysvetlenie a na konci jeden konkrétny krok: napíš do komentára, pozri link v biu, rezervuj termín.",
            "Natáčame s Karin dlhodobo a pravidelne: proces tetovania, zahojené tetovania, voľné návrhy aj netradičné formáty, ako tetovanie na zrkadlo. Viaceré videá mali desiatky tisíc zhliadnutí a najúspešnejšie viac ako 180 000, hoci profil má okolo 2 000 sledovateľov. Ľudia si zvykajú na jej tvár a rukopis, a keď príde akcia, nehovorí k cudzím ľuďom, ale k publiku, ktoré ju už pozná.",
          ],
          figures: [
            { value: "180 000+", label: "Najúspešnejšie video" },
            { value: "~2 000", label: "Sledovateľov profilu" },
          ],
        },
        {
          title: "Akcia, ktorú web zvládne sám.",
          body: [
            "Na október sme pripravili akciu na voľné návrhy. Na web sme doplnili akciové ceny, ktoré Karin zapne aj vypne jedným tlačidlom pre všetky návrhy naraz. Pri akcii web ukazuje len akciovú cenu, aby bola ponuka jasná na prvý pohľad.",
            "K akcii sme natočili video, v ktorom ju Karin predstavuje sama, priamo do kamery a vlastnými slovami. Začína otázkou „Chceš nové tetovanie?“ a za pár sekúnd povie, čo je v ponuke, koľko to stojí a kde si termín rezervovať. Video sme pripli na vrch profilu, aby ho videl každý, kto naň príde.",
          ],
        },
        {
          title: "Reklama len ako malý postrčok.",
          body: [
            "Do videa išlo len 20 € na reklamu. Zámerne. Video nemalo za úlohu kúpiť si dosah, ale dostať sa k ľuďom, ktorí Karin už poznajú, a k ich priateľom. Zvyšok urobilo samo video: ľudia ho pozerali, zdieľali a písali si o termíny cez web aj správy.",
          ],
          figures: [
            { value: "60", label: "Vypredaných termínov" },
            { value: "20 €", label: "Do reklamy" },
            { value: "40 000+", label: "Zhliadnutí akciového videa" },
          ],
          highlight: "Októbrová akcia: všetkých 60 termínov vypredaných. Do reklamy išlo len 20 €, všetky ostatné zhliadnutia a rezervácie prišli organicky.",
        },
      ],
      now: [],
      results: [
        "Októbrová akcia: všetkých 60 termínov vypredaných",
        "Do reklamy išlo len 20 €, všetky ostatné zhliadnutia a rezervácie prišli organicky",
        "Akciové video: viac ako 40 000 zhliadnutí na profile s približne 2 000 sledovateľmi, teda zhruba 20-násobok publika",
        "Rezervácie prebiehajú priamo cez web, bez dohadovania v správach",
        "Vernostný program s pozývacími odkazmi, kreditmi a VIP kartou beží automaticky",
      ],
      takeaway:
        "Akcia nepotrebuje veľký rozpočet, ak ju predstaví človek, ktorého ľudia poznajú, a ak sa dá na jedno kliknutie rezervovať. Pravidelné video buduje publikum, ktoré vám verí, a dobrý web zabezpečí, aby sa záujem zmenil na obsadený termín. Keď fungujú obe, reklama je len malý postrčok, nie motor.",
    },
  },
  {
    slug: "autoskola-zvyky",
    client: "Autoškola Zvyky",
    logo: "/logos/zvyky.webp",
    logoBg: "#EEF6FD",
    handle: "@autoskola.zvyky",
    link: "https://www.instagram.com/autoskola.zvyky/",
    period: "Od 01/2026",
    platforms: ["Web", "Instagram", "Facebook", "Meta Ads"],
    goal: "Web, video, influencerka a reklama ako jeden reťazec",
    summary:
      "Autoškola s desaťročnou históriou, ktorú v Bratislave nikto nepoznal. Postavili sme web s online prihláškou, obsah založený na dôvere, spoluprácu s influencerkou a reklamu, ktorá vedie priamo na prihlášku.",
    services: ["Vývoj a správa webu", "Správa sociálnych sietí", "Video produkcia", "Spolupráca s influencerkou", "Meta reklamy", "Partnerstvá"],
    stats: [
      { value: "68 000", label: "Zhliadnutí videa s influencerkou" },
      { value: "20", label: "Nových žiakov zo spolupráce" },
      { value: "10 000 €", label: "Tržby pri nákladoch 800 €" },
      { value: "0,06 €", label: "Cena za návštevu webu" },
    ],
    steps: [
      { title: "Najprv web, až potom obsah", desc: "Web s administráciou termínov a online prihláškou." },
      { title: "Obsah postavený na dôvere", desc: "Štyri série videí, každá s vlastnou úlohou." },
      { title: "Nové publikum cez influencerku", desc: "Šesť konceptov pre Michaelu Pospíšilovú." },
      { title: "Reklama vedie na prihlášku", desc: "Meta reklama priamo na online prihlášku." },
    ],
    ads: [
      { type: "video", src: "/kampane/zvyky/zvyky_01.mp4", poster: "/kampane/zvyky/zvyky_01.jpg", title: "Na skúške so žiakom", platform: "Instagram", format: "Reels 9:16" },
      { type: "video", src: "/kampane/zvyky/zvyky_03.mp4", poster: "/kampane/zvyky/zvyky_03.jpg", title: "Paralelné parkovanie", platform: "Instagram", format: "Reels 9:16" },
      { type: "video", src: "/kampane/zvyky/zvyky_michaela.mp4", poster: "/kampane/zvyky/zvyky_michaela.jpg", title: "Michaela Pospíšilová — spolupráca s influencerkou", platform: "Meta", format: "Reels 9:16" },
      { type: "video", src: "/kampane/zvyky/zvyky_02.mp4", poster: "/kampane/zvyky/zvyky_02.jpg", title: "Prvá hodina v autoškole", platform: "Instagram", format: "Reels 9:16" },
    ],
    result: "Bratislavská pobočka prvýkrát predbehla Malacky v návštevnosti webu.",
    caseStudy: {
      meta: [
        { label: "Klient", value: "Autoškola Zvyky, pobočky Bratislava a Malacky" },
        { label: "Služby", value: "Vývoj a správa webu, správa sociálnych sietí, video produkcia, spolupráca s influencerkou, Meta reklamy, partnerstvá" },
        { label: "Spolupráca", value: "Od januára 2026, pokračuje" },
      ],
      context: [
        "Autoškola Zvyky učí ľudí šoférovať viac ako desať rokov. Má skúsených inštruktorov, vlastné cvičisko a verných žiakov. V Bratislave však bola nová. Silnejšia bola vždy pobočka v Malackách, a to aj online: ľudia z Bratislavy autoškolu nepoznali a web ich nemal kam poslať.",
        "Bratislava je pritom jeden z najkonkurenčnejších trhov autoškôl na Slovensku. Človek si vyberá podľa toho, koho pozná, komu verí a kde sa najjednoduchšie prihlási.",
      ],
      findings: [
        "Autoškola nemala miesto, kam by mohla posielať záujemcov. Prihlasovanie na kurz bežalo cez telefón a správy, termíny kurzov sa spravovali ručne.",
        "Na sociálnych sieťach takmer nebola. Keď niekto autoškolu hľadal, nenašiel dôvod, prečo práve ona.",
        "Rozhodnutie o autoškole je rozhodnutie o dôvere. Rodič aj študent riešia, či sa budú cítiť bezpečne, či ich nikto nebude zosmiešňovať a či to zvládnu. Krásne zábery áut na to neodpovedajú.",
      ],
      decisions: [
        {
          title: "Najprv web, až potom obsah.",
          body: [
            "Bolo by jednoduché začať natáčať. Video bez miesta, kde sa dá prihlásiť, však len zvyšuje počet ľudí, ktorí odídu. Preto sme ako prvé postavili web a doplnili ho o dve veci, ktoré autoškola reálne potrebovala:",
          ],
          bullets: [
            "Administráciu termínov kurzov, v ktorej si autoškola sama pridáva a mení termíny bez nás.",
            "Online prihlášku na kurz, ktorá ide rovno autoškole. Bez telefonovania, bez prepisovania z papiera.",
          ],
          after: [
            "K webu dostala autoškola aj návod na administráciu a mesačný servis. Web sa tak postupne zlepšuje bez potreby veľkých prerábok.",
          ],
        },
        {
          title: "Obsah postavený na dôvere, nie na efekte.",
          body: ["Natáčanie sme rozdelili do sérií a každá mala vlastnú úlohu:"],
          table: {
            head: ["Séria", "Úloha", "Príklad"],
            rows: [
              ["Dôvera a profesionalita", "Ukázať ľudí za autoškolou", "Majiteľ rozpráva, prečo sa nenaháňa za počtami; „deň inštruktora“; inštruktor robí test parkovania majiteľovi"],
              ["Skúsenosť a učenie", "Dokázať, že inštruktori vedia, čo robia", "„3 chyby, ktoré na skúške vidíme najčastejšie“, vždy chyba a hneď správna technika"],
              ["Virálna séria", "Dostať sa k ľuďom, ktorí autoškolu ešte nepoznajú", "Parkovanie na čas, parkovanie so zaviazanými očami na uzavretej ploche"],
              ["Nová učebňa", "Ukázať priestor, kam sa chce človek vrátiť", "Pokojné, estetické videá z teórie, menej informácií, viac atmosféry"],
            ],
          },
          after: [
            "Každé video malo písomný scenár s háčikom na prvé tri sekundy a výzvou na konci. Inštruktori nie sú herci. Vďaka scenáru vedeli, čo ich čaká, natáčanie išlo rýchlo a nikto nebol pred kamerou nervózny.",
          ],
          highlight: "Už v marci prichádzala z Instagramu zhruba polovica návštev webu. Obsah teda začal ľudí posielať tam, kde sa dalo prihlásiť.",
        },
        {
          title: "Nové publikum cez influencerku, nie cez vyšší rozpočet.",
          body: [
            "Obsah oslovoval hlavne mladých chalanov. Mladé ženy sa však často boja začať šoférovať: zosmiešnenia, toho, že budú pomalé, alebo že ich niekto bude poučovať zhora. Tie sme bežnými videami nezasiahli.",
            "Namiesto navýšenia reklamy sme hľadali človeka, ktorému toto publikum verí. Pripravili sme šesť konceptov pre influencerku Michaelu Pospíšilovú. Žiadny z nich nebol „influencerka chváli autoškolu“. Boli to formáty, ktoré strach normalizujú: prvá jazda bez prikrášľovania, otázky, ktoré sa človek hanbí položiť, hodnotenie jazdy inštruktorom, ktorý opravuje pokojne a bez ponižovania.",
            "Prvé video vyšlo 3. augusta ako spoločný príspevok na jej profile aj na profile autoškoly. Michaela v ňom rozpráva o svojich začiatkoch a spomína, že Zvyky sú v Bratislave nové a majú uvítaciu cenu.",
          ],
          figures: [
            { value: "6", label: "Konceptov pre influencerku" },
            { value: "8 → 30+", label: "Návštev webu denne v deň vydania" },
          ],
          highlight: "V ten istý večer vyskočila návštevnosť webu zo zhruba 8 ľudí denne na viac ako 30 a ľudia chodili presne na stránky bratislavských kurzov. Bratislavská pobočka vtedy prvýkrát predbehla Malacky v návštevnosti webu.",
        },
        {
          title: "Reklama, ktorá vedie na prihlášku, nie na formulár.",
          body: [
            "V septembri sme spustili Meta reklamu na Bratislavu a okolie (25 km). Pôvodne bola postavená ako formulár na kontakty priamo na Facebooku. Prvý deň fungovala: 6 kontaktov po približne 1,40 €.",
            "Po jednom dni sme ju aj tak otočili. Kontakt z formulára znamená, že niekto musí volať, dobiehať a presviedčať. Autoškola však má na webe hotovú online prihlášku, ktorú sme postavili na začiatku. Reklama preto odvtedy nevedie na formulár, ale priamo na web a text hovorí jasne: nemusíš volať, prihlás sa online.",
            "V reklame bežali tri kreatívy: mestské auto, auto na cvičisku a video s Michaelou. Video jasne vyhralo a minulo 85 z 91 €, pretože ho Meta ukazovala najviac ľuďom.",
          ],
          figures: [
            { value: "1 508", label: "Návštev webu za 91 €" },
            { value: "5,6 %", label: "Miera prekliku" },
            { value: "85 z 91 €", label: "Minulo víťazné video" },
          ],
        },
      ],
      chain: [
        "Web s online prihláškou a administráciou termínov",
        "Pravidelný obsah (dôvera, skúsenosť, virál, učebňa)",
        "Influencerka otvorí nové publikum",
        "Reklama znásobí najlepšie video a pošle ľudí na prihlášku",
        "Prihlásený žiak, bez jediného telefonátu",
      ],
      chainNote:
        "Žiaden z týchto krokov by sám osebe nefungoval tak dobre. Video bez webu by viedlo do prázdna. Web bez obsahu by nikto nenašiel. Reklama bez silného videa by bola drahá.",
      now: [
        { title: "Dlhodobá reklama", desc: "150 € mesačne od októbra do januára, s rovnakým nastavením ako úspešná septembrová kampaň." },
        { title: "22 vzdelávacích príspevkov", desc: "Fakty o vodičáku a skúške, kvízy, tipy a humor pre 16–25-ročných aj ich rodičov. Prvá karta je vždy háčik, posledná vedie na prihlášku. Fakty o zákone sú overené zo zdrojov." },
        { title: "Natáčanie v novej učebni", desc: "Sedem videí, kde je priorita atmosféra a estetika priestoru." },
        { title: "Ďalšie videá s Michaelou", desc: "Zo zostávajúcich konceptov." },
        { title: "Partnerstvá pre absolventov", desc: "Pripravujeme spolupráce s autopožičovňou (zvýhodnenie na prvé požičanie auta po získaní vodičáku), s požičovňou luxusných áut (súťaž o zážitkovú jazdu) a so známou osobnosťou z motoršportu. Absolvent tak od autoškoly dostane viac než len preukaz a autoškola má ďalší dôvod, prečo ju odporučiť." },
      ],
      results: [
        "68 000 zhliadnutí videa s influencerkou",
        "20 nových žiakov z tejto spolupráce",
        "Približne 10 000 € tržieb pri nákladoch 800 € na výrobu",
        "Reklama v septembri: 1 508 návštev webu za 91 €, teda asi 6 centov za návštevu, miera prekliku 5,6 %",
        "Bratislavská pobočka prvýkrát predbehla Malacky v návštevnosti webu",
        "Prihlasovanie na kurzy je online, termíny si autoškola spravuje sama",
      ],
      takeaway:
        "Obsah, reklama a web nie sú tri samostatné nákupy. Sú to články jednej reťaze a najslabší z nich určuje výsledok. Preto ich u nás robí jeden tím, ktorý vidí celú cestu zákazníka, od prvého videa po odoslanú prihlášku.",
    },
  },
  {
    slug: "kvety-pre-vas",
    client: "Kvety pre Vás",
    logo: "/logos/kvetyprevas.svg",
    logoBg: "#FBEFF0",
    link: "https://kvetyprevas.sk/",
    period: "Od 06/2026",
    platforms: ["Meta Ads", "Google Ads", "Instagram", "Facebook"],
    goal: "Najprv upratať, potom rásť",
    summary:
      "Rodinné kvetinárstvo s tradíciou od 70. rokov, ktoré do marketingu investovalo tisíce eur mesačne a nevedelo, čo za to má. Začali sme auditom, upratali 287 kampaní na päť a celé Meta postavili na pevnom rozpočte 300 € mesačne.",
    services: ["Audit reklám a sociálnych sietí", "Prestavba Meta reklám", "Retargeting", "Sezónne kampane", "Obsahová stratégia", "Grafika", "Produktový feed pre Google", "B2B partnerstvá"],
    stats: [
      { value: "5,6 €", label: "Tržieb na 1 € reklamy" },
      { value: "287 → 5", label: "Kampaní na Meta" },
      { value: "300 €", label: "Pevný mesačný rozpočet" },
      { value: "~8 €", label: "Tržieb na 1 € v najlepšom týždni" },
    ],
    steps: [
      { title: "Najprv oprava, potom rast", desc: "Platba v Google Ads, meranie a upratanie účtov." },
      { title: "Zachrániť to, čo funguje", desc: "Jediná fungujúca kampaň ako základ novej štruktúry." },
      { title: "Päť kampaní s jasnou úlohou", desc: "Predaj, retargeting, B2B, sviatky a meniny." },
      { title: "Menej obsahu, ale pravidelne", desc: "Pevný týždenný rytmus namiesto tisícok príspevkov." },
    ],
    ads: [
      { type: "video", src: "/kampane/kvety/kvetyprevas_reel.mp4", poster: "/kampane/kvety/kvetyprevas_reel.jpg", title: "Ako vzniká kytica", platform: "Meta", format: "Reels 9:16" },
      { type: "video", src: "/kampane/kvety/kvety_02.mp4", poster: "/kampane/kvety/kvety_02.jpg", title: "Ako udržať kyticu čo najdlhšie čerstvú", platform: "Meta", format: "Reels 9:16" },
      { type: "video", src: "/kampane/kvety/kvety_06.mp4", poster: "/kampane/kvety/kvety_06.jpg", title: "Ako previezť kyticu, aby sa nepoškodila", platform: "Meta", format: "Reels 9:16" },
      { type: "video", src: "/kampane/kvety/kvety_01.mp4", poster: "/kampane/kvety/kvety_01.jpg", title: "Floristka o ružiach", platform: "Meta", format: "Reels 9:16" },
    ],
    result: "Od 287 kampaní k piatim, ktorým rozumie aj klient.",
    caseStudy: {
      meta: [
        { label: "Klient", value: "Kvety pre Vás, rodinné kvetinárstvo v Bratislave s tradíciou od 70. rokov a e-shopom od roku 2009" },
        { label: "Služby", value: "Audit reklám a sociálnych sietí, prestavba Meta reklám, retargeting, sezónne kampane, obsahová stratégia, grafika, produktový feed pre Google, B2B partnerstvá" },
        { label: "Spolupráca", value: "Od júna 2026, pokračuje" },
      ],
      context: [
        "Kvety pre Vás majú všetko, čo by si iná firma priala: desaťročia tradície, hodnotenie 4,9 z 5, otvorené 365 dní v roku a doručenie po Bratislave do dvoch hodín. Do marketingu investujú rádovo tisíce eur mesačne. Napriek tomu prišli s jednou vetou:",
        "„Míňame veľa a nevieme, čo za to máme.“",
      ],
      findingsTitle: "Audit pred\nkampaňou.",
      findingsIntro: "Nezačali sme návrhom kampane. Začali sme auditom, najprv zvonku a potom priamo v reklamných účtoch.",
      findings: [
        {
          title: "Sociálne siete",
          items: [
            "Takmer 3 700 príspevkov bez jednotného vizuálu.",
            "Dva oddelené Instagram profily, ktoré si delili publikum.",
            "Obsah a reklama nemali spoločný smer.",
          ],
        },
        {
          title: "Google Ads",
          items: [
            "Reklama reálne predávala (122 nákupov za 30 dní), takže nešlo o nefunkčný kanál, ale o kanál s chybami v prevedení.",
            "Zlyhávala platba a kampaniam hrozilo úplné zastavenie.",
            "Rozpočet sa míňal aj v hodinách, keď ľudia kvety nekupujú.",
            "Časť merania nedávala zmysel.",
          ],
        },
        {
          title: "Meta (Facebook a Instagram)",
          items: [
            "V účte bolo 287 kampaní, z toho 258 „aktívnych“.",
            "Takmer celý výsledok však robila jediná kampaň, ktorá roky bežala s pár eurami denne.",
            "Viac ako 100 kampaní tvorili platené meninové príspevky po pár eur, bez jediného nákupu, čo ročne robilo stovky eur bez úžitku.",
            "Chýbal retargeting, teda reklama pre ľudí, ktorí už boli na webe alebo mali kvety v košíku.",
            "Predchádzajúca agentúra účet roky nechávala bežať na autopilote.",
          ],
        },
      ],
      decisionsTitle: "Osem rozhodnutí,\nktoré upratali účty.",
      decisions: [
        {
          title: "Najprv oprava, potom rast.",
          body: [
            "Prvý princíp stratégie: kým nefunguje základ, viac peňazí len znásobí chyby. Preto sme ako prvé riešili platbu v Google Ads, meranie a upratanie účtov. Až potom nové kampane.",
          ],
        },
        {
          title: "Zachrániť to, čo funguje.",
          body: [
            "Jediná fungujúca Meta kampaň zostala nedotknutá a stala sa základom novej štruktúry. Ostatných 286 kampaní sme zarchivovali. Nič sme nezmazali. Históriu sa dá kedykoľvek obnoviť a staré kampane sa dajú použiť ako šablóna.",
          ],
          figures: [
            { value: "1", label: "Kampaň zostala nedotknutá" },
            { value: "286", label: "Kampaní zarchivovaných" },
            { value: "0", label: "Kampaní zmazaných" },
          ],
        },
        {
          title: "Strop rozpočtu namiesto „uvidíme“.",
          body: [
            "Na Meta sme stanovili pevný strop 300 € mesačne pre všetky trvalé kampane. Dôvod: najprv dokázať, že to funguje, a až potom pridávať. Rozpočet na sviatky sa schvaľuje zvlášť pre každý sviatok.",
          ],
        },
        {
          title: "Päť kampaní, každá s jasnou úlohou.",
          body: [],
          table: {
            head: ["Kampaň", "Úloha", "Ako"],
            rows: [
              ["Stála predajná", "Priviesť nových zákazníkov", "Väčšina rozpočtu; vizuály o doručení do 2 hodín, hodnoteniach a tradícii; nikdy nie katalógová fotka na bielom pozadí"],
              ["Retargeting", "Vrátiť ľudí, ktorí už boli na webe alebo mali kvety v košíku", "Menšia časť rozpočtu; tí, čo práve nakúpili, sú vylúčení, aby nedostávali zbytočné reklamy"],
              ["B2B partnerstvá", "Získať firmy s pravidelnou potrebou kvetov", "Formulár s otázkou na typ podniku; pripravená, spustí sa v druhej fáze"],
              ["Sezónne špičky", "Zarobiť na sviatkoch", "Samostatná kampaň pre každý sviatok, štart asi 3 týždne vopred, po sviatku sa vypne; staré sviatočné kampane mali s minimálnym rozpočtom návratnosť 13–19×"],
              ["Meniny", "Pripomenúť sviatok bez platenia reklamy", "Presunuté z platených boostov do organických stories"],
            ],
          },
        },
        {
          title: "Dušičky: poučiť sa z histórie.",
          body: [
            "Dušičky na Facebooku Kvetom doteraz nefungovali. V roku 2023 stáli takmer 240 € a nepriniesli ani jeden nákup. Neopakovali sme to isté. Tento rok:",
          ],
          bullets: [
            "Nová kreatíva: video o vencoch a doručení priamo na cintorín, nie statické obrázky.",
            "Nízky rozpočet 6 € denne.",
            "Reklama sa nezobrazuje vo feede profilu, aby sa smútočný obsah nemiešal s radostným obsahom značky.",
            "Jasné pravidlo vopred: ak po týždni nepríde nákup, rozpočet presunieme do Google vyhľadávania, kde ľudia „veniec na hrob“ priamo hľadajú.",
          ],
        },
        {
          title: "Zľava až vtedy, keď ju treba.",
          body: [
            "Pripravili sme test zľavového kódu. Kampane však bežia bez neho, kým to nie je nutné. Zľava, ktorá nie je potrebná, je len stratená marža.",
          ],
        },
        {
          title: "Menej obsahu, ale pravidelne.",
          body: [
            "Problém nebol v tom, že by Kvety nepublikovali. Publikovali až príliš veľa a bez systému. Nastavili sme preto menší, ale pevný týždenný rytmus:",
          ],
          table: {
            head: ["Deň", "Formát", "Téma"],
            rows: [
              ["Utorok", "Príspevok alebo carousel", "Edukácia — ako sa starať o kvety, čo znamenajú, ako vybrať"],
              ["Štvrtok", "Video", "Proces — ako floristky viažu kytice, ako funguje doručenie"],
              ["Nedeľa", "Príspevok alebo carousel", "Estetika — nálada, detaily, krása kvetov"],
            ],
          },
          after: [
            "Pravidelný menší objem porazí nepravidelný veľký. Ľudia vedia, čo môžu čakať, a tím to zvládne dlhodobo.",
          ],
        },
        {
          title: "Meniny ako systém, nie ako výdavok.",
          body: [
            "Platené meninové príspevky sme nahradili dvomi typmi stories: každý pondelok týždenný „kalendárik“ s menami na celý týždeň a samostatné stories pre 20 najčastejších mien na Slovensku v deň ich menín. Všetko v jednej grafike, pripravené na rok dopredu.",
          ],
          figures: [
            { value: "20", label: "Najčastejších mien so stories" },
            { value: "0 €", label: "Na reklame" },
          ],
        },
      ],
      buildTitle: "Technika\npod kapotou.",
      build: [
        { title: "Napojenie cez rozhranie Meta", desc: "Reklamný účet napojený cez rozhranie Meta. Kampane, publiká aj reklamy sa dajú stavať, kontrolovať a vyhodnocovať rýchlo a presne. Upratanie stoviek kampaní trvalo minúty, nie dni." },
        { title: "Sedem vlastných publík", desc: "Návštevníci webu, ľudia s tovarom v košíku, zákazníci (aby sme ich vylúčili), ľudia, ktorí reagovali na Facebooku a Instagrame." },
        { title: "Reklamy pre každý formát zvlášť", desc: "Carousel 4:5 do feedu a 9:16 do Stories a Reels, v jednej reklame. Nič sa neoreže." },
        { title: "Vlastný produktový feed pre Google", desc: "Postavili sme generátor, ktorý každú noc automaticky pripraví aktuálny katalóg produktov pre nákupné reklamy na Googli." },
      ],
      now: [
        { title: "Prestavba Google Ads", desc: "Štruktúra kampaní, časové rozvrhnutie rozpočtu a napojenie nového katalógu produktov." },
        { title: "Sezónny kalendár", desc: "Po Dušičkách prídu Vianoce (štart koncom novembra), Valentín, MDŽ a Deň matiek." },
        { title: "Obsah na celý rok", desc: "22 inšpiratívnych carouselov o kvetoch a meninové stories na celý rok." },
        { title: "B2B partnerstvá", desc: "Pohrebníctva, svadobné salóny, hotely a športové kluby. Pripravili sme segmenty, šablóny e-mailov a správ aj zoznam prvých firiem. Oslovujú priamo zamestnanci kvetinárstva vo voľnejších chvíľach a existujúci firemný zákazník slúži ako referencia." },
        { title: "Jednotný vizuál", desc: "Zjednotenie vizuálu naprieč všetkými sieťami." },
      ],
      results: [
        "Hlavná predajná kampaň na Meta: návratnosť približne 5,6 € tržieb na 1 € reklamy za 30 dní, v najlepšom týždni takmer 8 €",
        "Celé Meta stojí na pevnom rozpočte 300 € mesačne, ktorý ide len do kampaní s jasnou úlohou",
        "Od 287 kampaní k piatim, ktorým rozumie aj klient",
        "Zrušené platené meninové boosty, ktoré ročne stáli stovky eur bez jediného nákupu",
        "Katalóg produktov pre Google sa aktualizuje automaticky každú noc",
      ],
      takeaway:
        "Viac peňazí do reklamy nie je vždy odpoveď. Často najviac prinesie, keď prestanete platiť za to, čo nefunguje, a peniaze presuniete tam, kde už výsledky sú. Každú spoluprácu preto začíname tým, že sa pozrieme do čísel. Až potom navrhujeme, čo ďalej.",
    },
  },
  {
    slug: "stuzka-nadeje",
    client: "NIE RAKOVINE — Stužka nádeje",
    logo: "/logos/stuzka-nadeje.webp",
    logoBg: "#FDF2F8",
    link: "https://www.nierakovine.sk/stuzka",
    period: "Od 05/2026",
    platforms: ["ONKO KLUB", "Stužka nádeje", "Web", "Video"],
    goal: "ONKO KLUB, Stužka nádeje a web, ktorý slúži pacientom",
    summary:
      "Pacientska organizácia s malým tímom chcela uzavretú komunitu pre onkologických pacientov. Postavili sme členskú platformu ONKO KLUB, natočili do nej videá, prevzali a vyčistili web nierakovine.sk a spustili darcovskú kampaň Stužka nádeje.",
    services: ["Vývoj členskej platformy ONKO KLUB", "Video produkcia", "Prevzatie a vyčistenie webu", "Darcovská kampaň Stužka nádeje", "Technika a foto/video na podujatiach"],
    stats: [
      { value: "22. 9.", label: "Spustenie ONKO KLUBU" },
      { value: "27. 9.", label: "Štart Stužky nádeje" },
      { value: "2", label: "Natáčacie dni pre ONKO knižnicu" },
      { value: "1", label: "Dodávateľ pre aplikáciu, videá, web aj podujatia" },
    ],
    steps: [
      { title: "Systém, ktorý šetrí čas", desc: "Členstvo, platby, rezervácie a knižnica v jednej aplikácii." },
      { title: "Obsah ako súčasť zákazky", desc: "Dva natáčacie dni s lektorkami a odborníčkami." },
      { title: "Web nierakovine.sk", desc: "Prevzatý, zálohovaný, verzovaný a vyčistený." },
      { title: "Stužka nádeje", desc: "Darcovstvo bez trenia, prepojené s ONKO KLUBOM." },
    ],
    ads: [],
    result: "Členstvo, platby, rezervácie, knižnica aj partnerské zľavy fungujú bez potreby technika.",
    caseStudy: {
      meta: [
        { label: "Klient", value: "NIE RAKOVINE, o. z., pacientska organizácia pre onkologických pacientov a ich blízkych" },
        { label: "Služby", value: "Vývoj členskej platformy ONKO KLUB, video produkcia, prevzatie a vyčistenie webu nierakovine.sk, darcovská kampaň Stužka nádeje, technika a foto/video na podujatiach" },
        { label: "Spolupráca", value: "Od mája 2026, pokračuje" },
      ],
      context: [
        "NIE RAKOVINE sprevádza ľudí najťažším obdobím ich života. Prevádzkuje online poradňu, mapu pomoci, podujatia a edukačné projekty. Chceli urobiť ďalší krok: vytvoriť uzavretú komunitu, kde pacient nájde workshopy, odborné videá, zľavy od partnerov a ľudí, ktorí vedia, čím prechádza.",
        "Organizácia má malý tím a obmedzený rozpočet. Každá hodina, ktorú strávi administratívou, chýba pacientom.",
      ],
      findingsTitle: "Tri veci, ktoré\nrozhodli o riešení.",
      findings: [
        "Takúto platformu nejde poskladať z hotovej šablóny. Potrebuje členstvo s pravidelnými platbami, rezervácie, knižnicu videí, správu obsahu aj vlastnú logiku pre ľudí s rôznymi diagnózami.",
        "Pôvodný web nierakovine.sk bol na mieru postavený systém od predchádzajúceho dodávateľa, bez verzovania a bez dokumentácie. Každá zmena bola riziko.",
        "Ide o citlivé údaje. Bezpečnosť, súkromie a GDPR nie sú doplnok, ale podmienka.",
      ],
      decisionsTitle: "Šesť rozhodnutí,\nktoré šetria čas.",
      decisions: [
        {
          title: "Nie web s tabuľkami, ale systém, ktorý šetrí čas.",
          body: [
            "Najlacnejšie by bolo postaviť pekný web a platby, rezervácie a členov riešiť cez e-maily a tabuľky. Pre malú organizáciu by to však znamenalo hodiny ručnej práce každý týždeň, navždy. Preto vznikol ONKO KLUB ako jeden systém, ktorý si organizácia spravuje sama:",
          ],
          bullets: [
            "Členstvo vo viacerých úrovniach vrátane bezplatného, aby sa do komunity dostal aj ten, kto si platené členstvo nemôže dovoliť.",
            "Automatické mesačné a ročné platby cez platobnú bránu. Organizácia nič nevyberá ručne, členstvo sa obnovuje samo.",
            "Rezervácie podujatí a workshopov vrátane zrušenia priamo v aplikácii.",
            "ONKO knižnica s videami odborníkov.",
            "Zľavy od partnerov a priestor pre sponzorov.",
            "Administrácia, v ktorej koordinátorka spravuje obsah, podujatia, členov aj kategórie zliav bez programátora.",
          ],
        },
        {
          title: "Obsah ako súčasť zákazky, nie ako „dodá klient“.",
          body: [
            "Platforma bez obsahu je prázdna miestnosť. Preto sme v máji počas dvoch natáčacích dní nakrútili videá s lektorkami a odborníčkami: jogu, mindfulness, workshopy aj promo videá jednotlivých lektoriek. Každé natáčanie malo vlastný scenár. Tieto videá tvoria základ ONKO knižnice.",
          ],
        },
        {
          title: "Feed, ktorý sa prispôsobí človeku.",
          body: [
            "Domovská stránka člena nie je len zoznam najnovších príspevkov. Typy obsahu sa striedajú (video, článok, recept, sprievodca, novinka), aby sa ten istý druh neopakoval dookola. Obsah k diagnóze člena má prednosť. Najbližšie podujatie je vždy navrchu a partnerské ponuky sa objavujú s rozostupmi, aby neprekrikovali obsah.",
          ],
        },
        {
          title: "Bezpečnosť riešime skôr, než nastane problém.",
          body: [
            "Ešte pred spustením sme si na vlastný kód urobili bezpečnostný audit a nájdené slabiny opravili. Spracovanie údajov má zmluvu podľa GDPR. Keď sa po spustení začali objavovať automatické falošné registrácie, nasadili sme ochranu proti robotom, ktorá skutočných ľudí nezdržiava.",
          ],
        },
        {
          title: "Ukázať hodnotu ešte pred registráciou.",
          body: [
            "Ľudia sa neregistrujú do niečoho, čo nevidia. Na verejnej stránke sú preto ukážky z ONKO knižnice aj prehľad podujatí, rovnocenne vedľa seba, pretože práve to je obsah, za ktorý sa v klube platí. Celý verejný web sme pripravili aj pre vyhľadávače, aby ONKO KLUB našiel každý, kto hľadá pomoc.",
          ],
        },
        {
          title: "Web nierakovine.sk neprerábame, ale staviame na ňom.",
          body: [
            "Pôvodný web sme prevzali, zálohovali, dali pod verzovanie a rozbehli lokálne, aby sa dal bezpečne upravovať. Potom sme ho vyčistili po stránke bezpečnosti aj rýchlosti. Neprerábali sme ho od nuly, lebo funguje a organizáciu by to stálo zbytočné peniaze. Nové veci pridávame ako samostatné moduly, ktoré nič existujúce nerozbijú.",
          ],
        },
      ],
      chainLabel: "Stužka nádeje",
      chainTitle: "Darcovstvo\nbez trenia.",
      chainIntro:
        "Na jeseň organizácia prišla s darcovskou kampaňou Stužka nádeje. Postavili sme ju ako samostatný modul priamo na webe nierakovine.sk, vizuálne v štýle ONKO KLUBU.",
      chain: [
        "Návštevník si pozrie video a príbehy pacientov",
        "Vyberie sumu a zaplatí cez overenú darcovskú platformu",
        "Hneď mu príde poďakovanie s digitálnou stužkou nádeje",
        "Ak chce, dostane aj fyzický balíček so stužkou cez výdajné miesta",
        "Ak dal súhlas, pridá sa do newslettera organizácie. Ak nie, jeho e-mail sa použije iba na poďakovanie",
        "Darca sa môže automaticky stať členom ONKO KLUBU",
      ],
      chainNote: [
        "Platby sa k darcom priraďujú automaticky. Organizácia teda nemusí nič párovať ručne.",
        "Stužka nádeje je navyše prepojená s ONKO KLUBOM. Vďaka pripravenému rozhraniu sa darca môže automaticky stať členom klubu, a tak sa z jednorazového darcu môže stať súčasť komunity.",
      ],
      now: [
        { title: "Prevádzka a rozvoj ONKO KLUBU", desc: "V rámci mesačnej správy." },
        { title: "HPV akadémia", desc: "Na vzdelávacom podujatí pre študentov v Trnave sme zabezpečili techniku, svetlo, systém na anonymné otázky z publika, fotky pre partnerov a natáčanie. Zo záberov pripravujeme sedem krátkych videí, z toho jedno ako pozvánku na ďalší ročník pre školy." },
        { title: "Sociálne siete ONKO KLUBU", desc: "Spolu s organizáciou ladíme rozsah správy." },
        { title: "Pink október", desc: "Kampaň Pink október a ďalší obsah na webe organizácie." },
      ],
      results: [
        "ONKO KLUB je verejne spustený od 22. 9. 2026 a prijíma členov. Platby bežia naostro od 9. 9. 2026.",
        "Členstvo, platby, rezervácie, knižnica aj partnerské zľavy fungujú bez potreby technika.",
        "Stužka nádeje beží naživo na nierakovine.sk/stuzka od 27. 9. 2026.",
        "Web nierakovine.sk je zálohovaný, verzovaný, rýchlejší a bezpečnejší.",
        "Jeden dodávateľ pre aplikáciu, videá do nej, web organizácie aj podujatia.",
      ],
      takeaway:
        "Technológia má ľuďom vracať čas. Keď staviame aplikáciu, nepýtame sa len „čo má vedieť“, ale aj „koľko práce ušetrí ľuďom, ktorí ju budú používať každý deň“. A keďže video, web aj aplikáciu robí jeden tím, obsah do platformy nevzniká až potom ako problém niekoho iného.",
    },
  },
];

/** Real case studies first, placeholder entries after */
export const campaigns = [...allCampaigns].sort((a, b) => Number(!!a.sample) - Number(!!b.sample));

export function getCampaign(slug: string) {
  return campaigns.find((c) => c.slug === slug);
}
