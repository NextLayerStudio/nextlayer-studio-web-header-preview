"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_EVENT, hasMarketingConsent } from "@/app/lib/consent";

// Pixel ID je verejné (je v HTML každej stránky) – záloha, ak v env chýba.
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "3667193526762389";

/**
 * Meta Pixel – načíta sa AŽ po udelení marketingového súhlasu.
 * Bez nastavenej premennej NEXT_PUBLIC_FB_PIXEL_ID nerobí nič.
 *
 * PageView sa páli:
 *  - raz pri inicializácii skriptu,
 *  - a následne pri každej zmene routy (SPA navigácia).
 *
 * Štandardná udalosť "Lead" sa páli inde – priamo pri úspešnom odoslaní
 * formulára na /konzultacia (viď ConsultationLanding.tsx), aby sa dala
 * deduplikovať s Conversions API cez rovnaké eventID.
 */
export default function MetaPixel() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  // Skript sám odpáli prvý PageView; efekt nižšie rieši len ďalšie SPA navigácie.
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!PIXEL_ID) return;
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
      // prvé zapnutie – PageView už odpálil inline skript
      lastTracked.current = pathname;
      return;
    }
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }
  }, [enabled, pathname]);

  if (!PIXEL_ID || !enabled) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
