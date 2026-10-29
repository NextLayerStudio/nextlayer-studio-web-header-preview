"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/app/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function choose(value: "accepted" | "rejected") {
    setConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 bg-[#1a1a1a] border-t border-[#BAFF57]/15"
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[#BAFF57]/55 text-xs font-light leading-relaxed max-w-2xl">
          Používame nevyhnutné funkčné cookies. So súhlasom aktivujeme aj{" "}
          <strong className="text-[#BAFF57]/75 font-normal">marketingové a analytické nástroje</strong>{" "}
          (Meta Pixel, Google Analytics), ktoré merajú výsledky našich reklám a návštevnosť webu.{" "}
          <Link
            href="/ochrana-sukromia"
            className="text-[#BAFF57]/70 underline underline-offset-2 hover:text-[#BAFF57] transition-colors"
          >
            Viac informácií
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => choose("rejected")}
            className="px-5 py-2 border border-[#BAFF57]/20 text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider hover:border-[#BAFF57]/50 hover:text-[#BAFF57]/80 transition-colors"
          >
            Odmietnuť
          </button>
          <button
            onClick={() => choose("accepted")}
            className="px-5 py-2 bg-[#BAFF57] text-[#1a1a1a] text-xs font-mono uppercase tracking-wider hover:bg-[#BAFF57]/85 transition-colors"
          >
            Prijať
          </button>
        </div>
      </div>
    </div>
  );
}
