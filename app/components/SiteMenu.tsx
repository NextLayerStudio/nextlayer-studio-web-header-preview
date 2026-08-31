"use client";

import { useState } from "react";
import Link from "next/link";

type PageKey = "home" | "marketing" | "development" | "design" | "projekty";

const links: { key: PageKey; num: string; label: string; href: string }[] = [
  { key: "home", num: "01", label: "Home", href: "/" },
  { key: "marketing", num: "02", label: "Marketing", href: "/marketing" },
  { key: "development", num: "03", label: "Development", href: "/development" },
  { key: "design", num: "04", label: "Design", href: "/design" },
  { key: "projekty", num: "05", label: "Projekty", href: "/projekty" },
];

export default function SiteMenu({ active }: { active: PageKey }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] cursor-pointer touch-manipulation"
          role="button"
          tabIndex={0}
          aria-label="Open menu"
        >
          <div className="relative w-14 h-14 sm:w-12 sm:h-12 bg-black flex flex-col items-center justify-center gap-2 hover:bg-[#212121] transition-colors">
            <span className="w-5 h-[2px] bg-[#BAFF57]"></span>
            <span className="w-5 h-[2px] bg-[#BAFF57]"></span>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-[#212121]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute h-[1px] bg-[#BAFF57]/20 animate-float-slow-1" style={{ top: "30%", left: 0, width: "100%" }}></div>
          <div className="absolute h-[1px] bg-[#BAFF57]/15 animate-float-slow-3" style={{ top: "70%", left: 0, width: "100%" }}></div>
          <div className="absolute w-[1px] bg-[#BAFF57]/15 animate-float-vertical-1" style={{ left: "20%", top: 0, height: "100%" }}></div>
          <div className="absolute w-[1px] bg-[#BAFF57]/10 animate-float-vertical-3" style={{ right: "25%", top: 0, height: "100%" }}></div>
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#BAFF57]/30"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#BAFF57]/30"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#BAFF57]/30"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#BAFF57]/30"></div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 cursor-pointer touch-manipulation"
          aria-label="Close menu"
        >
          <div className="relative w-14 h-14 sm:w-12 sm:h-12 bg-[#BAFF57] flex items-center justify-center active:bg-[#BAFF57]/80 transition-colors">
            <div className="relative w-5 h-5 pointer-events-none">
              <span className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2 rotate-45"></span>
              <span className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2 -rotate-45"></span>
            </div>
          </div>
        </button>

        <nav className="relative z-10 h-full flex flex-col items-start justify-center pl-6 sm:pl-12 md:pl-24 lg:pl-32 gap-3 sm:gap-4">
          {links.map(({ key, num, label, href }) =>
            key === active ? (
              <div key={key} className="flex items-center gap-3 sm:gap-6 py-2">
                <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">{num}</span>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57]/50">{label}</span>
                <span className="w-4 h-[1px] bg-[#BAFF57]/50"></span>
              </div>
            ) : (
              <Link
                key={key}
                href={href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2"
              >
                <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">{num}</span>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">
                  {label}
                </span>
                <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
              </Link>
            )
          )}
          <div className="absolute bottom-12 left-6 sm:left-12 md:left-24 lg:left-32 text-[#BAFF57]/50 text-sm font-light">
            <p>team@nextlayer.studio</p>
            <p>+421 902 238 309</p>
          </div>
        </nav>
      </div>
    </>
  );
}
