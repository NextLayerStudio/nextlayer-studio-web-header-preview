// Centrálna správa súhlasu s cookies / sledovacími technológiami.
// Hodnota sa ukladá do localStorage pod kľúčom "cookie_consent".
// Staršia hodnota "accepted" (pôvodná verzia lišty) zostáva platná.

export const CONSENT_KEY = "cookie_consent";
export const CONSENT_EVENT = "nls:consentchange";

export type ConsentValue = "accepted" | "rejected";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* localStorage nedostupné – ignorujeme */
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    /* ignore */
  }
}

// Súhlas s marketingovými nástrojmi (Meta Pixel, Conversions API).
export function hasMarketingConsent(): boolean {
  return getConsent() === "accepted";
}
