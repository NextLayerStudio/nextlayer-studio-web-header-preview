import { Resend } from "resend";
import { NextResponse } from "next/server";

function getResend() {
  const apiKey = process.env.NLS_NEW_RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function validate(body: ContactBody): { ok: true; data: { name: string; email: string; message: string } } | { ok: false; error: string } {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Neplatné meno." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, error: "Neplatný email." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { ok: false, error: "Neplatná správa." };
  }

  return { ok: true, data: { name, email, message } };
}

export async function POST(request: Request) {
  const resend = getResend();
  if (!resend) {
    console.error("NLS_NEW_RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Kontaktný formulár nie je nakonfigurovaný." }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!to || !from) {
    console.error("CONTACT_TO_EMAIL or RESEND_FROM_EMAIL is not set");
    return NextResponse.json({ error: "Kontaktný formulár nie je nakonfigurovaný." }, { status: 503 });
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Neplatný formát dopytu." }, { status: 400 });
  }

  const parsed = validate(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  const subject = `Kontakt z webu — ${name}`;
  const text = `Meno: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
    <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <hr />
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Správu sa nepodarilo odoslať." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed:", err);
    return NextResponse.json({ error: "Správu sa nepodarilo odoslať." }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
