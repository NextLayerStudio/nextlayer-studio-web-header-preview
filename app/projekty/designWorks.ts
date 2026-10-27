export type DesignWork = {
  id: string;
  image: string;
  title: string;
  tag: string;
  client?: string;
  year: string;
  aspect?: "portrait" | "landscape";
};

export const designWorks: DesignWork[] = [
  { id: "kvety-kytica-u-dveri", image: "/design/kvety-pre-vas/kytica-u-dveri.png", title: "Kytica u dverí do 1–2 hodín", tag: "Social Ads", client: "Kvety pre Vás", year: "2026" },
  { id: "kvety-prevas10-akcia", image: "/design/kvety-pre-vas/prevas10-akcia.jpg", title: "PREVAS10 — 10 % zľava", tag: "Social Ads", client: "Kvety pre Vás", year: "2026" },
  { id: "kvety-zasluzis-si", image: "/design/kvety-pre-vas/zasluzis-si-kvety.jpg", title: "Zaslúžiš si kvety", tag: "Social Ads", client: "Kvety pre Vás", year: "2026" },
  { id: "kvety-kup-jej-prevas10", image: "/design/kvety-pre-vas/kup-jej-kvety-prevas10.jpg", title: "Kúp jej kvety — PREVAS10", tag: "Social Ads", client: "Kvety pre Vás", year: "2026" },
  { id: "kvety-kup-jej", image: "/design/kvety-pre-vas/kup-jej-kvety.jpg", title: "Kúp jej kvety. Len tak.", tag: "Social Ads", client: "Kvety pre Vás", year: "2026" },
  { id: "kvety-povedz-to", image: "/design/kvety-pre-vas/povedz-to-kvetmi.jpg", title: "Povedz to kvetmi", tag: "Social Ads", client: "Kvety pre Vás", year: "2026" },
  { id: "zvyky-vodicak-bratislava", image: "/design/zvyky/vodicak-bratislava.jpg", title: "Vodičák v Bratislave bez stresu", tag: "Social Ads", client: "Autoškola Zvyky", year: "2026" },
  { id: "zvyky-darcekovy-poukaz", image: "/design/zvyky/darcekovy-poukaz.png", title: "Darčekový poukaz — kondičná jazda B", tag: "Print", client: "Autoškola Zvyky", year: "2026" },
  { id: "bomba-jesen-akcia", image: "/design/bombafasada/jesen-letak-cta.jpg", title: "Jesenná akcia", tag: "Offline kampaň", client: "Bombafasáda", year: "2026" },
  { id: "bomba-prenosna", image: "/design/bombafasada/jesen-prenosna-zlava.jpg", title: "Prenosná zľava JESEN10", tag: "Offline kampaň", client: "Bombafasáda", year: "2026" },
  { id: "bomba-sused", image: "/design/bombafasada/recenzia-sused-qr.jpg", title: "Recenzia pre susedov", tag: "Offline kampaň", client: "Bombafasáda", year: "2026" },
  { id: "bomba-google", image: "/design/bombafasada/recenzia-google.png", title: "Výzva na recenziu", tag: "Offline kampaň", client: "Bombafasáda", year: "2026" },
  { id: "nie-rakovine-redesign", image: "/screenshots/nie-rakovine-redesign.png", title: "Redesign webu", tag: "Web Design", client: "NIE RAKOVINE", year: "2026", aspect: "landscape" },
  { id: "dizajn-letaciku", image: "/fonts/Screenshot 2026-01-25 at 16.51.43.png", title: "Dizajn letáčiku", tag: "Brand Identity", year: "2024", aspect: "landscape" },
  { id: "voucher", image: "/fonts/Screenshot 2026-01-25 at 16.51.14.png", title: "Voucher dizajn", tag: "Brand Identity", year: "2024", aspect: "landscape" },
  { id: "new-era-eshop", image: "/fonts/Screenshot 2026-01-25 at 16.53.00.png", title: "New Era eshop", tag: "Web Design", year: "2024", aspect: "landscape" },
  { id: "zvyky-web", image: "/fonts/Screenshot 2026-01-25 at 16.53.32.png", title: "Autoškola Zvyky", tag: "Web Design", year: "2024", aspect: "landscape" },
  { id: "qr-eshop", image: "/fonts/Screenshot 2026-01-25 at 16.55.23.png", title: "QR eshop", tag: "Web Design", year: "2024", aspect: "landscape" },
  { id: "visual-identity", image: "/fonts/Screenshot 2026-01-25 at 16.56.20 1.png", title: "Visual Identity", tag: "Brand Design", year: "2024", aspect: "landscape" },
];
