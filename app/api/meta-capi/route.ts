import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

// Pixel ID je verejné (je v HTML každej stránky) – záloha, ak v env chýba.
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "3667193526762389";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;
const GRAPH_VERSION = "v21.0";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hashPlain(value?: string | null): string[] | undefined {
  if (!value) return undefined;
  const norm = value.trim().toLowerCase();
  if (!norm) return undefined;
  return [sha256(norm)];
}

function hashPhone(value?: string | null): string[] | undefined {
  if (!value) return undefined;
  // len číslice, vrátane predvoľby; bez znaku "+"
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return undefined;
  return [sha256(digits)];
}

/**
 * Server-side Meta Conversions API.
 * Bez premenných NEXT_PUBLIC_FB_PIXEL_ID + META_CAPI_ACCESS_TOKEN je no-op.
 * Volá sa z klienta pri úspešnom odoslaní formulára; rovnaké `event_id`
 * ako browser Pixel → Meta obe udalosti deduplikuje.
 */
export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ ok: false, skipped: "missing-config" });
  }

  let body: Record<string, string | undefined>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const userAgent = req.headers.get("user-agent") || undefined;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        event_source_url: body.event_source_url,
        action_source: "website",
        user_data: {
          em: hashPlain(body.email),
          ph: hashPhone(body.phone),
          fn: hashPlain(body.first_name),
          ln: hashPlain(body.last_name),
          client_ip_address: ip,
          client_user_agent: userAgent,
          fbp: body.fbp || undefined,
          fbc: body.fbc || undefined,
        },
        custom_data: {
          content_name: "Bezplatná konzultácia",
          content_category: body.source || "meta-konzultacia",
        },
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    return NextResponse.json({ ok: res.ok, result }, { status: res.ok ? 200 : 502 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 200 });
  }
}
