"use client";

import { useState } from "react";
import Link from "next/link";

export default function CenaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showHamburger = !isMenuOpen;

  return (
    <div className="bg-[#212121] h-screen overflow-y-scroll">

      {/* Hamburger Button */}
      {showHamburger && (
        <div onClick={() => setIsMenuOpen(true)} className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] cursor-pointer touch-manipulation" role="button" tabIndex={0} aria-label="Open menu">
          <div className="relative w-14 h-14 sm:w-12 sm:h-12 bg-[#BAFF57] flex flex-col items-center justify-center gap-2 hover:bg-[#BAFF57]/80 active:bg-[#BAFF57]/60 transition-colors">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#BAFF57]"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#BAFF57]"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#BAFF57]"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#BAFF57]"></div>
            <span className="w-5 h-[2px] bg-[#212121]"></span>
            <span className="w-5 h-[2px] bg-[#212121]"></span>
          </div>
        </div>
      )}

      {/* Full Screen Menu */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#212121]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute h-[1px] bg-[#BAFF57]/20 animate-float-slow-1" style={{ top: '30%', left: '0', width: '100%' }}></div>
          <div className="absolute h-[1px] bg-[#BAFF57]/15 animate-float-slow-3" style={{ top: '70%', left: '0', width: '100%' }}></div>
          <div className="absolute w-[1px] bg-[#BAFF57]/15 animate-float-vertical-1" style={{ left: '20%', top: '0', height: '100%' }}></div>
          <div className="absolute w-[1px] bg-[#BAFF57]/10 animate-float-vertical-3" style={{ right: '25%', top: '0', height: '100%' }}></div>
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#BAFF57]/30"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#BAFF57]/30"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#BAFF57]/30"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#BAFF57]/30"></div>
        </div>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 group z-50 cursor-pointer touch-manipulation" aria-label="Close menu">
          <div className="relative w-14 h-14 sm:w-12 sm:h-12 bg-[#BAFF57] flex items-center justify-center pointer-events-auto active:bg-[#BAFF57]/80 transition-colors">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#BAFF57]"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#BAFF57]"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#BAFF57]"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#BAFF57]"></div>
            <div className="relative w-5 h-5 pointer-events-none">
              <span className="absolute top-1/2 left-0 w-full h-[2px] bg-[#212121] -translate-y-1/2 rotate-45"></span>
              <span className="absolute top-1/2 left-0 w-full h-[2px] bg-[#212121] -translate-y-1/2 -rotate-45"></span>
            </div>
          </div>
        </button>
        <nav className="relative z-10 h-full flex flex-col items-start justify-center pl-12 md:pl-24 lg:pl-32 gap-4">
          <Link href="/" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">01</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.3em] transition-all duration-300">Home</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <Link href="/#o-nas" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">02</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.3em] transition-all duration-300">O nás</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <Link href="/#kontakt" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">03</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.3em] transition-all duration-300">Kontakt</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <div className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">04</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.2em] text-[#BAFF57]/50">Cena</span>
            <span className="w-4 h-[1px] bg-[#BAFF57]/50"></span>
          </div>
          <Link href="/projekty" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">05</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.3em] transition-all duration-300">Projekty</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <div className="absolute bottom-12 left-12 md:left-24 lg:left-32 text-[#BAFF57]/50 text-sm font-light">
            <p>team@nextlayer.studio</p>
            <p>+421 902 238 309</p>
          </div>
        </nav>
      </div>

      {/* ── HERO — placeholder ── */}
      <section className="min-h-screen h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-40 h-40 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 border border-[#BAFF57]/10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-px h-48 bg-gradient-to-b from-transparent via-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-px bg-gradient-to-r from-transparent via-[#BAFF57]/20 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Cenník</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#BAFF57] mb-8 leading-tight">
            Ceny šijeme<br />na mieru.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#BAFF57]/70 max-w-2xl leading-relaxed font-light">
            Pripravujeme prehľadný cenník. Do tej doby ti radi pripravíme individuálnu ponuku podľa toho, čo presne potrebuješ.
          </p>
          <div className="mt-12">
            <a href="/#kontakt" className="inline-flex items-center gap-2 bg-[#BAFF57] text-black px-6 py-3.5 text-xs uppercase tracking-wider hover:bg-white transition-colors">
              Napíš nám
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
