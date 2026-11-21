"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_EVENT, getConsent } from "@/app/lib/consent";
import { GOOGLE_ADS_ID } from "@/app/lib/googleAds";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
// gtag.js stačí načítať raz – ID z GA4 alebo z Google Ads, configujú sa obe.
const TAG_ID = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

type Gtag = (...args: unknown[]) => void;

function consentState(granted: boolean) {
  const v = granted ? "granted" : "denied";
  return { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v };
}

/**
 * Google tag (Google Ads + prípadne GA4) s Consent Mode v2 (21. 11. 2026).
 *
 * Tag sa načíta vždy, ale kým návštevník nedá súhlas, sú všetky úložiská
 * zakázané (denied): Google neukladá žiadne cookies a dostáva len anonymné
 * signály bez cookies (konverzie sa modelujú). Po kliknutí na „Prijať“ sa
 * súhlas aktualizuje na granted. Meta Pixel sa naďalej načíta až po súhlase.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  // zmena súhlasu v lište → consent update
  useEffect(() => {
    const sync = () => {
      const g = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof g === "function") g("consent", "update", consentState(getConsent() === "accepted"));
    };
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // page_view pri SPA navigácii (prvý page_view odpáli config)
  useEffect(() => {
    if (lastTracked.current === null) {
      lastTracked.current = pathname;
      return;
    }
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    const g = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof g === "function") g("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return (
    <>
      <Script id="google-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var nlsGranted = false;
          try { nlsGranted = localStorage.getItem('cookie_consent') === 'accepted'; } catch (e) {}
          var nlsV = nlsGranted ? 'granted' : 'denied';
          gtag('consent', 'default', {
            ad_storage: nlsV, ad_user_data: nlsV, ad_personalization: nlsV, analytics_storage: nlsV,
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', !nlsGranted);
          gtag('set', 'url_passthrough', true);
          gtag('js', new Date());
          ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ""}
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`} strategy="afterInteractive" />
    </>
  );
}
