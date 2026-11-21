/**
 * Automatická odpoveď návštevníkovi, ktorý vyplní formulár na webe.
 * Text schválil Andrej 21. 11. 2026 (NLSA/Claude/04-Emaily/automaticke-odpovede.md).
 *
 * Posiela sa len z overenej domény (nie z testovacej onboarding@resend.dev, tá
 * vie doručovať iba majiteľovi Resend účtu). Chyba automatickej odpovede nikdy
 * nezhodí samotný formulár.
 */

export type AutoReplyVariant = "kontakt" | "plan" | "nevhodny";

const SUBJECTS: Record<AutoReplyVariant, string> = {
  kontakt: "Ďakujeme za správu, ozveme sa vám do 24 hodín",
  plan: "Ďakujeme, plán dopytov pre vás pripravujeme – NextLayer Studio",
  nevhodny: "Ďakujeme za záujem – NextLayer Studio",
};

const PLAN = [
  "Dobrý deň,",
  "",
  "ďakujeme, že ste sa nám ozvali. Bezplatný plán, koľko dopytov vám reklama vie priniesť a za koľko, vám pošleme najneskôr do 48 hodín, väčšinou už na druhý deň.",
  "",
  "Čo bude v pláne:",
  "1. Odhad, koľko dopytov mesačne môžete čakať a koľko by stál jeden.",
  "2. Tri konkrétne nápady na reklamu z vašej vlastnej práce.",
  "3. Presná cena, žiadne skryté poplatky.",
  "",
  "Ak nám chcete niečo doplniť, napríklad aké zákazky chcete najviac alebo v akom regióne pracujete, stačí odpovedať na tento e-mail.",
  "",
  "S pozdravom",
  "NextLayer Studio",
].join("\n");

const NEVHODNY = [
  "Dobrý deň,",
  "",
  "ďakujeme za záujem. Robíme reklamu na Facebooku, Instagrame a Googli pre firmy a živnostníkov, ktorá im prináša dopyty, takže vám teraz pomôcť nevieme.",
  "",
  "Ak by ste neskôr s firmou chceli reklamu, ktorá prinesie zákazníkov, stačí odpovedať na tento e-mail. Prajeme veľa úspechov.",
  "",
  "S pozdravom",
  "NextLayer Studio",
].join("\n");

// Oslovenie bez mena: z formulára nevieme správne vyskloňovať priezvisko.
function body() {
  return [
    "Dobrý deň,",
    "",
    "ďakujeme za vašu správu, dostali sme ju a už sa jej venujeme. Ozveme sa vám najneskôr do 24 hodín v pracovný deň.",
    "",
    "Medzitým si môžete pozrieť, ako získavame zákazníkov pre firmy: https://nextlayer.studio/marketing",
    "",
    "Ak nám chcete niečo doplniť, stačí odpovedať na tento e-mail.",
    "",
    "S pozdravom",
    "NextLayer Studio",
  ].join("\n");
}

function escapeHtml(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function autoReplyEnabled(from: string | undefined) {
  return !!from && !from.includes("resend.dev");
}

export async function sendAutoReply(opts: { apiKey: string; from: string; to: string; name: string; replyTo?: string; variant?: AutoReplyVariant }) {
  if (!autoReplyEnabled(opts.from)) return;
  const variant = opts.variant ?? "kontakt";
  const text = variant === "plan" ? PLAN : variant === "nevhodny" ? NEVHODNY : body();
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:560px;color:#111;font-size:15px;line-height:1.6;">${escapeHtml(text)
    .replace(/https:\/\/nextlayer\.studio\/marketing/, '<a href="https://nextlayer.studio/marketing" style="color:#111;">nextlayer.studio/marketing</a>')
    .replace(/\n/g, "<br>")}</div>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${opts.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: opts.from,
        to: [opts.to],
        reply_to: opts.replyTo || "team@nextlayer.studio",
        subject: SUBJECTS[variant],
        text,
        html,
      }),
    });
    if (!res.ok) console.error("Automatická odpoveď zlyhala:", await res.text());
  } catch (err) {
    console.error("Automatická odpoveď zlyhala:", err);
  }
}
