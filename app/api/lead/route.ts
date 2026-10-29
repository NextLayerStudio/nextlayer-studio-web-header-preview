import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.NLS_NEW_RESEND_API_KEY;
const TO_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "team@nextlayer.studio";
// Kým nie je v Resende overená doména nextlayer.studio, posiela sa z ich
// zdieľanej testovacej domény – funguje bez ďalšieho nastavenia.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "NextLayer Studio <onboarding@resend.dev>";

/**
 * Prijme dopyt z /konzultacia a pošle notifikačný e-mail cez Resend.
 * Bez RESEND_API_KEY je no-op (vráti ok:false, error:"missing-config"),
 * aby stránka fungovala aj pred nastavením – len bez odoslania mailu.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const company = (body.company || "").trim();
  const note = (body.note || "").trim();
  const source = body.source || "konzultacia";
  const utmSource = (body.utm_source || "").trim();
  const utmCampaign = (body.utm_campaign || "").trim();
  const utmContent = (body.utm_content || "").trim();

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY nie je nastavený – dopyt sa nepodarilo poslať mailom:", {
      name,
      email,
      phone,
      company,
      note,
    });
    return NextResponse.json({ ok: false, error: "missing-config" }, { status: 200 });
  }

  const text = [
    `Nový dopyt — ${source}`,
    "",
    `Meno: ${name}`,
    `E-mail: ${email}`,
    `Telefón: ${phone || "—"}`,
    `Firma / web: ${company || "—"}`,
    "",
    "Čo chce riešiť:",
    note || "— (nevyplnené)",
    "",
    `Zdroj (UTM): ${utmSource || "—"} / kampaň: ${utmCampaign || "—"} / kreatíva: ${utmContent || "—"}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Nový dopyt — ${name}${company ? ` (${company})` : ""}${utmContent ? ` [${utmContent}]` : ""}`,
        text,
      }),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Resend error:", result);
      return NextResponse.json({ ok: false, error: result }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    console.error("Odoslanie leadu zlyhalo:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
