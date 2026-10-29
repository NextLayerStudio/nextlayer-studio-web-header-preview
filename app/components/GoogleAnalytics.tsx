"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_EVENT, hasMarketingConsent } from "@/app/lib/consent";
import { GOOGLE_ADS_ID } from "@/app/lib/googleAds";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
// gtag.js stačí načítať raz – ID z GA4 alebo z Google Ads, configujú sa obe.
const TAG_ID = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

/**
 * Google Analytics (GA4) – načíta sa AŽ po udelení súhlasu, rovnako ako Meta Pixel.
 * Spolu s GA4 sa configuje aj Google Ads tag (konverzie z kampaní).
 *
 * page_view sa páli:
 *  - raz pri inicializácii skriptu (automaticky cez gtag config),
 *  - a následne pri každej zmene routy (SPA navigácia).
 */
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const sync = () => setEnabled(hasMarketingConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (lastTracked.current === null) {
      // prvé zapnutie – page_view už odpálil inline config
      lastTracked.current = pathname;
      return;
    }
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", "page_view", { page_path: pathname });
    }
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
