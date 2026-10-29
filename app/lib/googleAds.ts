/**
 * Google Ads (účet 369-225-4429, team@nextlayer.studio).
 * Hodnoty sú verejné (sú v HTML každej stránky), preto nie sú v env.
 * Tag sa načíta cez GoogleAnalytics.tsx – AŽ po súhlase s marketingovými cookies.
 */
export const GOOGLE_ADS_ID = "AW-18511444855";

/** Konverzná akcia „Formulár konzultácia (lead)" – odoslanie formulára na /konzultacia. */
export const GOOGLE_ADS_LEAD_SEND_TO = "AW-18511444855/O_cpCOX60ZsdEPf2-PpE";

type WindowWithGtag = Window & { gtag?: (...args: unknown[]) => void };

export function trackGoogleAdsLead() {
  try {
    (window as WindowWithGtag).gtag?.("event", "conversion", {
      send_to: GOOGLE_ADS_LEAD_SEND_TO,
      transport_type: "beacon",
    });
  } catch {
    /* ignore */
  }
}

/** Prišiel návštevník z Google Ads? (gclid/gbraid/wbraid v URL) */
export function isGoogleAdsClick(): boolean {
  if (typeof window === "undefined") return false;
  const p = new URLSearchParams(window.location.search);
  return p.has("gclid") || p.has("gbraid") || p.has("wbraid") || p.get("utm_source") === "google";
}
