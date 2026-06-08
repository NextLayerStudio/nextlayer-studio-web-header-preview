"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
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
        <p className="text-[#BAFF57]/55 text-xs font-light leading-relaxed max-w-xl">
          Táto stránka používa len nevyhnutné funkčné cookies.{" "}
          <Link href="/ochrana-sukromia" className="text-[#BAFF57]/70 underline underline-offset-2 hover:text-[#BAFF57] transition-colors">
            Viac informácií
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2 border border-[#BAFF57]/30 text-[#BAFF57]/70 text-xs font-mono uppercase tracking-wider hover:border-[#BAFF57] hover:text-[#BAFF57] transition-colors"
        >
          Rozumiem
        </button>
      </div>
    </div>
  );
}
