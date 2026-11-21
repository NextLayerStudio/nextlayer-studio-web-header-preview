/**
 * Automatická odpoveď návštevníkovi, ktorý vyplní formulár na webe.
 * Text schválil Andrej 21. 11. 2026 (NLSA/Claude/04-Emaily/automaticke-odpovede.md).
 *
 * Posiela sa len z overenej domény (nie z testovacej onboarding@resend.dev, tá
 * vie doručovať iba majiteľovi Resend účtu). Chyba automatickej odpovede nikdy
 * nezhodí samotný formulár.
 */

const SUBJECT = "Ďakujeme za správu, ozveme sa vám do 24 hodín";

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

export async function sendAutoReply(opts: { apiKey: string; from: string; to: string; name: string; replyTo?: string }) {
  if (!autoReplyEnabled(opts.from)) return;
  const text = body();
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
        subject: SUBJECT,
        text,
        html,
      }),
    });
    if (!res.ok) console.error("Automatická odpoveď zlyhala:", await res.text());
  } catch (err) {
    console.error("Automatická odpoveď zlyhala:", err);
  }
}
