"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function MarketingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => setScrollY(container.scrollTop);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const showHamburger = !isMenuOpen;

  return (
    <div ref={containerRef} className="bg-[#212121] h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

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
          <div className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">02</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.2em] text-[#BAFF57]/50">Marketing</span>
            <span className="w-4 h-[1px] bg-[#BAFF57]/50"></span>
          </div>
          <Link href="/development" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">03</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.3em] transition-all duration-300">Development</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <Link href="/design" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">04</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.3em] transition-all duration-300">Design</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
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

      {/* ── HERO ── */}
      <section className="min-h-screen h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-40 h-40 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 border border-[#BAFF57]/10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-px h-48 bg-gradient-to-b from-transparent via-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-px bg-gradient-to-r from-transparent via-[#BAFF57]/20 to-transparent"></div>
          <div className={`absolute right-16 text-right ${isMobile ? 'top-12' : 'top-1/4'}`}>
            <span className="text-[#BAFF57]/20 text-6xl font-bold">100%</span>
            <p className="text-[#BAFF57]/30 text-xs mt-1">vaša kontrola</p>
          </div>
          <div className="absolute bottom-1/4 right-24">
            <span className="text-[#BAFF57]/20 text-5xl font-bold">24/7</span>
            <p className="text-[#BAFF57]/30 text-xs mt-1">online prítomnosť</p>
          </div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Social Media Production</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#BAFF57] mb-8 leading-tight">
            Tvoja značka.<br />Profesionálne.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#BAFF57]/70 max-w-2xl leading-relaxed font-light">
            Postaráme sa o celú produkciu — scenár, natáčanie, réžiu aj strih. Ty len schváliš výsledok. Tvoja značka na sociálnych sieťach bude reprezentovať to, čo skutočne si.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <span className="text-[#BAFF57]/30 text-sm">Scroll</span>
            <div className="w-8 h-12 border border-[#BAFF57]/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-[#BAFF57]/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCIA 2 — ČO ROBÍME ── */}
      <section className={`snap-start snap-always flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative ${isMobile ? 'min-h-screen py-40 overflow-y-auto' : 'min-h-screen h-screen overflow-hidden'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-[#BAFF57]/20 to-transparent"></div>
        </div>
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Kompletná produkcia</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BAFF57] mb-4 leading-tight max-w-3xl">
            Od nápadu po hotové video — všetko u nás.
          </h2>
          <p className="text-lg text-[#BAFF57]/60 leading-relaxed font-light mb-12 max-w-2xl">
            Nerobíme náhodný obsah. Každý výstup má jasný cieľ, profesionálnu produkčnú hodnotu a prináša tvoju značku k mladším publikám efektívne a so štýlom.
          </p>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${isMobile ? 'gap-8' : 'gap-4 sm:gap-6'}`}>
            {[
              { num: "01", title: "Scenár & Réžia", desc: "Každé video má príbeh. Píšeme scenáre šité na mieru tvojej značke a réžiou zabezpečíme, že výsledok pôsobí presne tak, ako má." },
              { num: "02", title: "Natáčanie", desc: "Prichádzame k tebe — na prevádzku, na lokáciu alebo do štúdia. Profesionálna kamera, svetlo, zvuk. Ty len budeš na mieste." },
              { num: "03", title: "Strih & Postprodukcia", desc: "Zostrihané, farebne upravené, s titulkami a hudbou. Dodávame hotové výstupy optimalizované pre každú platformu." },
              { num: "04", title: "Schválenie & Zverejnenie", desc: "Pred každým zverejnením máš právo na jedno kolo úprav s presným popisom. Hotové video zverejníme presne podľa plánu." },
            ].map((step) => (
              <div key={step.num} className="relative p-8 border border-[#BAFF57]/20 bg-[#BAFF57]/5">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/50"></div>
                <div className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-[#BAFF57] mb-3">{step.title}</h3>
                <p className="text-[#BAFF57]/60 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEKCIA 3 — VIDEO UKÁŽKY ── */}
      <section className={`snap-start snap-always flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative ${isMobile ? 'min-h-screen py-40 overflow-y-auto' : 'min-h-screen h-screen overflow-hidden'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-16 w-32 h-32 border border-[#BAFF57]/10 rotate-12"></div>
          <div className="absolute bottom-24 left-24 w-20 h-20 border border-[#BAFF57]/10"></div>
        </div>
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Ukážky našej práce</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BAFF57] mb-12 leading-tight">
            Reálne výstupy.<br />Reálni klienti.
          </h2>

          <div className={`grid grid-cols-1 lg:grid-cols-3 ${isMobile ? 'gap-10' : 'gap-6 md:gap-8'}`}>
            {/* Bombafasada video 1 */}
            <div className="group">
              <div className="relative overflow-hidden border border-[#BAFF57]/20 group-hover:border-[#BAFF57]/60 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#BAFF57]/50 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#BAFF57]/50 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                <div className="relative overflow-hidden bg-black" style={{ height: '420px' }}>
                  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" src="/videos/bombafasada/video1.mp4" />
                </div>
              </div>
              <div className="mt-4 px-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Bombafasada</span>
                  <span className="w-1 h-1 bg-[#BAFF57]/30 rounded-full"></span>
                  <span className="text-[#BAFF57]/40 text-xs font-mono">Reels</span>
                </div>
                <p className="text-[#BAFF57]/70 text-sm font-light leading-relaxed">
                  Edukačný reel o fasádnych povrchoch — profesionálny tón, odborný obsah, expert positioning.
                </p>
              </div>
            </div>

            {/* Bombafasada video 2 */}
            <div className="group">
              <div className="relative overflow-hidden border border-[#BAFF57]/20 group-hover:border-[#BAFF57]/60 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#BAFF57]/50 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#BAFF57]/50 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                <div className="relative overflow-hidden bg-black" style={{ height: '420px' }}>
                  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" src="/videos/bombafasada/video2.mp4" />
                </div>
              </div>
              <div className="mt-4 px-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Bombafasada</span>
                  <span className="w-1 h-1 bg-[#BAFF57]/30 rounded-full"></span>
                  <span className="text-[#BAFF57]/40 text-xs font-mono">Reels</span>
                </div>
                <p className="text-[#BAFF57]/70 text-sm font-light leading-relaxed">
                  Ukážka práce v teréne — záber na proces čistenia fasády s odborným komentárom.
                </p>
              </div>
            </div>

            {/* Kavičká u Janíčka video */}
            <div className="group">
              <div className="relative overflow-hidden border border-[#BAFF57]/20 group-hover:border-[#BAFF57]/60 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#BAFF57]/50 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#BAFF57]/50 group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                <div className="relative overflow-hidden bg-black" style={{ height: '420px' }}>
                  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" src="/videos/janicko/video1.mp4" />
                </div>
              </div>
              <div className="mt-4 px-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Kávička u Janíčka</span>
                  <span className="w-1 h-1 bg-[#BAFF57]/30 rounded-full"></span>
                  <span className="text-[#BAFF57]/40 text-xs font-mono">Reels</span>
                </div>
                <p className="text-[#BAFF57]/70 text-sm font-light leading-relaxed">
                  Atmosferický video obsah pre kaviareň — zachytáva autenticitu miesta a priťahuje nových hostí.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCIA 4 — PLATFORMY ── */}
      <section className={`snap-start snap-always flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative ${isMobile ? 'min-h-screen py-40 overflow-y-auto' : 'min-h-screen h-screen overflow-hidden'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-[#BAFF57]/20 to-transparent"></div>
        </div>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
                <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Kde ťa uvidí svet</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#BAFF57] mb-6 leading-tight">
                Profesionálna prítomnosť na každej platforme.
              </h2>
              <p className="text-lg text-[#BAFF57]/60 leading-relaxed font-light mb-8">
                Obsah tvoríme tak, aby fungoval na každej sieti — od krátkych Reels cez karusely až po dlhší video obsah. Každý formát má svoju logiku a my ju poznáme.
              </p>
              <div className="space-y-4">
                {["Instagram — Reels, Stories, Karusely", "TikTok — Krátke virálne formáty", "Facebook — Komunita a platená reklama", "YouTube — Dlhší obsah a Shorts"].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-[#BAFF57]"></div>
                    <span className="text-[#BAFF57]/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`grid grid-cols-2 ${isMobile ? 'gap-6 my-8' : 'gap-4'}`}>
              {[
                { icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>, label: "Instagram", sub: "Reels & Stories" },
                { icon: <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>, label: "TikTok", sub: "Krátke videá" },
                { icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>, label: "Facebook", sub: "Komunita & Reklamy" },
                { icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>, label: "LinkedIn", sub: "B2B marketing" },
              ].map((p) => (
                <div key={p.label} className="group relative p-6 border border-[#BAFF57]/20 hover:border-[#BAFF57]/50 transition-all duration-500 aspect-square flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#BAFF57]/50 -translate-x-px -translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#BAFF57]/50 translate-x-px translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
                  <svg className="w-8 h-8 text-[#BAFF57]/60 group-hover:text-[#BAFF57] transition-colors" viewBox="0 0 24 24" fill="currentColor">{p.icon}</svg>
                  <div>
                    <h3 className="text-lg font-bold text-[#BAFF57]">{p.label}</h3>
                    <p className="text-[#BAFF57]/40 text-sm">{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCIA 5 — PREČO MY ── */}
      <section className={`snap-start snap-always flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative ${isMobile ? 'min-h-screen py-40 overflow-y-auto' : 'min-h-screen h-screen overflow-hidden'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#BAFF57]/10 rounded-full"></div>
        </div>
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Naša filozofia</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BAFF57] mb-12 leading-tight">
            Nie zábava. Brand.
          </h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${isMobile ? 'gap-8 my-8' : 'gap-4 sm:gap-6 md:gap-8'}`}>
            {[
              { num: "01", title: "Profesionálna produkcia", desc: "Nerobíme lacný obsah. Každé video, každá fotografia — produkčná hodnota, ktorá reprezentuje tvoju značku na úrovni." },
              { num: "02", title: "Presné zadanie", desc: "Žiadne všeobecné scenáre. Každé natáčanie má písomné zadanie s presnými scénami, zábermi a popisom toho, čo sa bude diať." },
              { num: "03", title: "Tvoja kontrola", desc: "Každý výstup ti dáme na schválenie pred zverejnením. Jedno kolo úprav s presným zadaním je súčasťou každej spolupráce." },
            ].map((item) => (
              <div key={item.num} className="relative p-8 border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/50"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/50"></div>
                <div className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider mb-4">{item.num}</div>
                <h3 className="text-xl font-bold text-[#BAFF57] mb-3">{item.title}</h3>
                <p className="text-[#BAFF57]/60 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 border border-[#BAFF57]/20 bg-[#BAFF57]/5">
            <p className="text-lg text-[#BAFF57]/70 leading-relaxed font-light max-w-3xl">
              Veríme, že sociálne siete sú dnes primárna vizitka firmy. Firmy, ktoré chcú byť brané vážne, nemôžu mať náhodný obsah. Preto robíme produkciu tak, aby každý príspevok budoval ich reputáciu — nielen vyplnil feed.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="min-h-screen h-screen snap-start snap-always flex items-center justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#BAFF57]/10"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Začnime spoluprácu</span>
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#BAFF57] mb-6 sm:mb-8">
            Tvoja značka si zaslúži<br />lepšiu reprezentáciu.
          </h2>
          <p className="text-lg md:text-xl text-[#BAFF57]/60 mb-12 max-w-xl mx-auto font-light">
            Kontaktuj nás a spoločne vytvoríme produkčný plán, ktorý bude skutočne fungovať.
          </p>
          <Link href="/#kontakt" className="inline-flex items-center gap-4 px-8 py-4 bg-[#BAFF57] text-[#212121] font-medium uppercase tracking-wider hover:bg-[#BAFF57]/90 transition-colors">
            Kontaktovať nás
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
