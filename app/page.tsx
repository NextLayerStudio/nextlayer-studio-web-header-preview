"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from '@emailjs/browser';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [aboutVideoIndex, setAboutVideoIndex] = useState(0);
  const aboutVideos = [
    "https://akinb3uuwih4cf6s.public.blob.vercel-storage.com/andrej.mp4",
    "https://akinb3uuwih4cf6s.public.blob.vercel-storage.com/andrej2.mp4",
    "https://akinb3uuwih4cf6s.public.blob.vercel-storage.com/andrej3.mp4",
  ];

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroHover, setHeroHover] = useState<'produkcia' | 'vyvoj' | null>(null);
  const [disciplinesHover, setDisciplinesHover] = useState<'produkcia' | 'vyvoj' | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showHamburger = isMobile ? true : scrollY > 400;

  useEffect(() => {
    emailjs.init('VBkXVCwNKLhntRGyJ');
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => setScrollY(container.scrollTop);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutVideoIndex(i => (i + 1) % aboutVideos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const section2Progress = Math.min(1, Math.max(0, (scrollY - 300) / 500));
  const section3Progress = Math.min(1, Math.max(0, (scrollY - 900) / 500));
  const section4Progress = Math.min(1, Math.max(0, (scrollY - 1500) / 500));
  const section5Progress = Math.min(1, Math.max(0, (scrollY - 2100) / 500));
  const section6Progress = Math.min(1, Math.max(0, (scrollY - 2700) / 500));

  const scrollToSection = (sectionIndex: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: sectionIndex * window.innerHeight,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const formData = new FormData(formRef.current!);
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const message = formData.get('message') as string;
    if (!name || name.trim().length < 2) newErrors.name = 'Meno musí mať aspoň 2 znaky';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Zadajte platný email';
    if (!message || message.trim().length < 10) newErrors.message = 'Správa musí mať aspoň 10 znakov';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFormErrors({});
    try {
      await emailjs.sendForm('service_1fedtkm', 'template_6u08llf', formRef.current, 'VBkXVCwNKLhntRGyJ');
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const produkciaItems = [
    "Video produkcia",
    "Správa sociálnych sietí",
    "Reklamné kampane",
    "Content stratégia",
  ];

  const vyvojItems = [
    "Web & e-shop",
    "UI/UX dizajn",
    "Brand identity",
    "Údržba & optimalizácia",
  ];

  const produkciaExtras = [
    "Scenár & réžia",
    "Natáčanie",
    "Strih & postprodukcia",
    "Grafika pre siete",
  ];

  const vyvojExtras = [
    "Webové aplikácie",
    "API & Backend",
    "CMS integrácia",
    "Optimalizácia výkonu",
  ];

  const clients = [
    { name: "Bombafasada", logo: "/logos/bombafasada.png", link: "https://www.instagram.com/bombafasada/" },
    { name: "Kávička u Janíčka", logo: "/logos/janicko.png", link: "https://www.instagram.com/kavicka_u_janicka" },
    { name: "Karin Art", logo: "/logos/karinart.png", link: "https://www.karinart.sk" },
    { name: "Beauty Institute", logo: "/logos/sisi.png", link: "https://www.sisikovacsova.com" },
    { name: "Know3D", logo: "/logos/know3d.png", link: "https://www.know3d.sk" },
    { name: "Stopalerg", logo: "/logos/stopalerg.webp", link: "https://www.instagram.com/stopalerg" },
    { name: "Takeoff", logo: "/logos/takeoff.png", link: "https://www.instagram.com/takeoff" },
    { name: "Autoškola Zvyky", logo: "/logos/zvyky.webp", link: "https://www.instagram.com/autoskola.zvyky" },
    { name: "NIE RAKOVINE", logo: "/logos/nie-rakovine.png", link: "https://nierakovine.sk" },
  ];

  return (
    <div ref={containerRef} className="bg-[#BAFF57] h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

      {/* Hamburger Button */}
      {showHamburger && !isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(true)}
          className={`fixed z-[60] cursor-pointer touch-manipulation ${isMobile ? 'top-4 right-4' : 'top-4 right-4 sm:top-6 sm:right-6'}`}
          role="button" tabIndex={0} aria-label="Open menu"
        >
          <div className={`relative bg-black flex flex-col items-center justify-center gap-2 hover:bg-black/80 transition-colors ${isMobile ? 'w-14 h-14' : 'w-14 h-14 sm:w-12 sm:h-12'}`}>
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-black"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-black"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-black"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-black"></div>
            <span className="w-5 h-[2px] bg-[#BAFF57]"></span>
            <span className="w-5 h-[2px] bg-[#BAFF57]"></span>
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
              <span className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2 rotate-45"></span>
              <span className="absolute top-1/2 left-0 w-full h-[2px] bg-black -translate-y-1/2 -rotate-45"></span>
            </div>
          </div>
        </button>
        <nav className="relative z-10 h-full flex flex-col items-start justify-center pl-6 sm:pl-12 md:pl-24 lg:pl-32 gap-3 sm:gap-4">
          <button onClick={() => scrollToSection(0)} className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2">
            <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">01</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Home</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2">
            <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">02</span>
            <a href="/marketing" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Marketing</a>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2">
            <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">03</span>
            <a href="/development" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Development</a>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2">
            <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">04</span>
            <a href="/design" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Design</a>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </button>
          <Link href="/cena" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2">
            <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">05</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Cena</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <Link href="/projekty" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2">
            <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">06</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Projekty</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <div className="absolute bottom-12 left-12 md:left-24 lg:left-32 text-[#BAFF57]/50 text-sm font-light">
            <p>team@nextlayer.studio</p>
            <p>+421 902 238 309</p>
          </div>
        </nav>
      </div>

      {/* ── HERO — split lime / white ── */}
      <main className="relative min-h-screen h-screen flex flex-col md:flex-row overflow-hidden snap-start snap-always" style={{ opacity: heroOpacity }}>
        {/* Logo + nav overlay */}
        <div className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-4 sm:left-8 md:left-10 z-40">
          <Image src="/fonts/Group.png" alt="Logo" width={80} height={80} className={`w-auto ${isMobile ? 'h-14' : 'h-10 sm:h-12 md:h-16'}`} priority />
        </div>

        {!isMobile && (
          <nav className="absolute top-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-8 lg:gap-12">
            <button onClick={() => scrollToSection(1)} className="text-sm lg:text-base font-normal hover:opacity-60 transition-opacity uppercase cursor-pointer">O NÁS</button>
            <button onClick={() => scrollToSection(5)} className="text-sm lg:text-base font-normal hover:opacity-60 transition-opacity uppercase cursor-pointer">KONTAKT</button>
            <a href="/cena" className="text-sm lg:text-base font-normal hover:opacity-60 transition-opacity uppercase">CENA</a>
            <a href="/projekty" className="text-sm lg:text-base font-normal hover:opacity-60 transition-opacity uppercase">PROJEKTY</a>
          </nav>
        )}

        {!isMobile && (
          <div
            className={`absolute inset-0 z-20 backdrop-blur-md bg-black/15 transition-opacity duration-300 ease-out ${heroHover ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: 'none' }}
          ></div>
        )}

        {/* LEFT — lime, produkcia */}
        <div
          className={`relative flex-1 bg-[#BAFF57] flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-24 md:pt-0 pb-8 md:pb-28 overflow-hidden ${isMobile ? '' : heroHover === 'vyvoj' ? 'z-10' : 'z-30'}`}
          onMouseEnter={() => !isMobile && setHeroHover('produkcia')}
          onMouseLeave={() => !isMobile && setHeroHover(null)}
        >
          <span className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[40vw] md:text-[22vw] font-bold leading-none text-black/[0.06] select-none pointer-events-none">01</span>
          {!isMobile && (
            <div
              className={`absolute inset-0 bg-white transition-opacity duration-500 ${heroHover === 'produkcia' ? 'opacity-100' : 'opacity-0'}`}
            ></div>
          )}
          <div className="relative max-w-md">
            <div className="flex items-center gap-3 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
              <span className="text-black/40 text-xs font-mono">01</span>
              <div className="w-8 h-px bg-black"></div>
            </div>
            <Link href="/marketing" className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] text-black">
              Online prítomnosť a získavanie nových zákazníkov
            </Link>
            <div className={`h-[2px] bg-black mt-5 transition-all duration-300 ${heroHover === 'produkcia' ? 'w-16' : 'w-0'}`}></div>
            <div className="mt-4 flex items-center gap-2 text-black/50 text-xs uppercase tracking-wider font-mono">
              Zistiť viac
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
            <div className={`mt-8 space-y-3 transition-all duration-300 ${!isMobile && heroHover === 'produkcia' ? 'opacity-100 translate-y-0' : isMobile ? 'opacity-100' : 'opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden md:h-auto md:overflow-visible'}`}>
              {!isMobile && produkciaItems.map((item) => (
                <Link key={item} href="/marketing" className="block text-black/70 hover:text-black hover:translate-x-1 text-sm uppercase tracking-wider transition-all duration-200">{item}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Center divider */}
        <div className="relative hidden md:flex w-px bg-black z-40 shrink-0 items-center justify-center">
          <span className="absolute w-2.5 h-2.5 bg-black rotate-45"></span>
        </div>
        <div className="relative md:hidden h-px bg-black w-full z-40">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></span>
        </div>

        {/* RIGHT — white, vývoj */}
        <div
          className={`relative flex-1 bg-white flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-8 md:pt-0 pb-24 md:pb-28 overflow-hidden text-right ${isMobile ? '' : heroHover === 'produkcia' ? 'z-10' : 'z-30'}`}
          onMouseEnter={() => !isMobile && setHeroHover('vyvoj')}
          onMouseLeave={() => !isMobile && setHeroHover(null)}
        >
          <span className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 text-[40vw] md:text-[22vw] font-bold leading-none text-black/[0.06] select-none pointer-events-none">02</span>
          {!isMobile && (
            <div
              className={`absolute inset-0 bg-[#BAFF57] transition-opacity duration-500 ${heroHover === 'vyvoj' ? 'opacity-100' : 'opacity-0'}`}
            ></div>
          )}
          <div className="relative max-w-md ml-auto">
            <div className="flex items-center justify-end gap-3 mb-5">
              <div className="w-8 h-px bg-black"></div>
              <span className="text-black/40 text-xs font-mono">02</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <Link href="/development" className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] text-black">
              Softvérové riešenia na mieru
            </Link>
            <div className={`h-[2px] bg-black mt-5 ml-auto transition-all duration-300 ${heroHover === 'vyvoj' ? 'w-16' : 'w-0'}`}></div>
            <div className="mt-4 flex items-center justify-end gap-2 text-black/50 text-xs uppercase tracking-wider font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              Zistiť viac
            </div>
            <div className={`mt-8 space-y-3 transition-all duration-300 ${!isMobile && heroHover === 'vyvoj' ? 'opacity-100 translate-y-0' : isMobile ? 'hidden' : 'opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden md:h-auto md:overflow-visible'}`}>
              {!isMobile && vyvojItems.map((item) => (
                <Link key={item} href="/development" className="block text-black/70 hover:text-black hover:-translate-x-1 text-sm uppercase tracking-wider transition-all duration-200">{item}</Link>
              ))}
            </div>
          </div>
        </div>

        {!isMobile && (
          <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-40 pointer-events-none" style={{ opacity: heroOpacity * 0.7 }}>
            <div className="w-px h-10 bg-black"></div>
            <span className="text-[10px] font-mono text-black uppercase tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>Bratislava · 2026</span>
            <div className="w-px h-10 bg-black"></div>
          </div>
        )}

        <h1 className="absolute bottom-0 left-0 right-0 z-30 text-[9vw] md:text-[8vw] font-bold leading-none tracking-tighter text-black text-center pointer-events-none mix-blend-multiply px-2 pb-1">
          NextLayer Studio
        </h1>
      </main>

      {/* ── O NÁS — large landscape reel, text overlapping on lime ── */}
      <section id="o-nas" className="relative min-h-screen h-screen bg-[#BAFF57] overflow-hidden snap-start snap-always">
        <div
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[62%] xl:w-[64%]"
          style={{ opacity: section2Progress }}
        >
          <div className="relative aspect-video bg-black overflow-hidden">
            {aboutVideos.map((src, i) => (
              <video
                key={src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: i === aboutVideoIndex ? 1 : 0 }}
                src={src}
              />
            ))}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 bg-gradient-to-t from-black/70 to-transparent">
              <a href="https://instagram.com/nextlayerstudio" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase tracking-wider text-white/80 hover:text-white">
                @nextlayerstudio
              </a>
              <span className="text-[11px] font-mono text-white/50">0{aboutVideoIndex + 1} / 03</span>
            </div>
          </div>
        </div>

        <div
          className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 py-12 md:h-full max-w-xl lg:max-w-[32rem]"
          style={{ opacity: section2Progress, transform: `translateX(${(1 - section2Progress) * -30}px)` }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-black/40 text-xs font-mono">01</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Kto sme</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
            Všetko<br />v jednom.
          </h2>
          <p className="mt-8 text-sm md:text-base leading-relaxed md:leading-[1.85] text-black/80">
            Sme produkčné a marketingové štúdio. Pomáhame firmám budovať profesionálnu prítomnosť na sociálnych sieťach — so scenárom, produkciou, réžiou aj strihom.
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed md:leading-[1.85] text-black/55">
            Vyvíjame aj weby, e-shopy a digitálne systémy, ktoré nielen dobre vyzerajú, ale hlavne fungujú.
          </p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <a href="/marketing" className="bg-black text-[#BAFF57] uppercase px-6 py-3.5 text-xs tracking-wider hover:bg-[#212121] transition-colors">Marketing</a>
            <a href="/development" className="bg-white text-black uppercase px-6 py-3.5 text-xs tracking-wider hover:bg-black hover:text-[#BAFF57] transition-colors">Development</a>
          </div>
        </div>

        {/* Mobile video */}
        <div className="md:hidden px-6 pb-10">
          <div className="relative aspect-video bg-black overflow-hidden">
            {aboutVideos.map((src, i) => (
              <video
                key={src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: i === aboutVideoIndex ? 1 : 0 }}
                src={src}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJEKTY — bento: one large + two stacked ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always ${isMobile ? 'min-h-screen py-24 px-5 overflow-y-auto' : 'min-h-screen h-screen px-8 lg:px-12 xl:px-16 py-10 overflow-hidden'} flex flex-col`}>
        <div className="relative z-10 flex items-end justify-between mb-6 md:mb-8 shrink-0" style={{ opacity: section3Progress }}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-black/40 text-xs font-mono">02</span>
              <div className="w-8 h-px bg-black"></div>
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Vybrané práce</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Naše projekty</h2>
          </div>
          <Link href="/projekty" className="hidden sm:inline-flex items-center gap-2 bg-black text-[#BAFF57] px-5 py-3 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
            Všetky
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </Link>
        </div>

        <div
          className={`relative z-10 flex-1 grid min-h-0 ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-12 grid-rows-2 gap-4'}`}
          style={{ opacity: section3Progress, transform: `translateY(${(1 - section3Progress) * 40}px)` }}
        >
          <div className={`group relative bg-black overflow-hidden ${isMobile ? 'aspect-[4/5]' : 'col-span-7 row-span-2'}`}>
            <div className="absolute inset-0 grid grid-cols-2 gap-1 bg-[#BAFF57]">
              {["video1", "video2"].map((name) => (
                <div key={name} className="relative overflow-hidden bg-black">
                  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover object-center" src={`https://akinb3uuwih4cf6s.public.blob.vercel-storage.com/bombafasada/${name}.mp4`} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none"></div>
            <div className="absolute top-4 left-4 md:top-5 md:left-5 flex items-center gap-2 bg-black/70 text-white px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BAFF57] animate-pulse"></span>
              @bombafasada · Reels
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <span className="bg-[#BAFF57] text-black text-[10px] font-mono uppercase tracking-wider px-2 py-0.5">Social Media</span>
              <p className="mt-3 text-white text-2xl md:text-4xl font-bold">Bombafasada</p>
              <p className="mt-1 text-white/70 text-sm font-light">Profesionálna fasádna spoločnosť — brand na sieťach.</p>
            </div>
          </div>

          <div className={`group relative bg-[#FDF2F8] overflow-hidden ${isMobile ? 'aspect-[16/10]' : 'col-span-5 row-span-1'}`}>
            <Image src="/screenshots/onkoklub-portfolio.jpg" alt="ONKO KLUB" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <span className="bg-black text-[#BAFF57] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5">Web & App Development</span>
              <p className="mt-2 text-white text-xl md:text-2xl font-bold">ONKO KLUB</p>
            </div>
          </div>

          <div className={`group relative bg-white overflow-hidden ${isMobile ? 'aspect-[16/10]' : 'col-span-5 row-span-1'}`}>
            <Image src="/screenshots/sisi-eshop.png" alt="New Era Microblading" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <span className="bg-black text-[#BAFF57] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5">E-shop</span>
              <p className="mt-2 text-white text-xl md:text-2xl font-bold">New Era Microblading</p>
            </div>
          </div>
        </div>

        <Link href="/projekty" className="sm:hidden mt-6 flex items-center justify-center gap-2 bg-black text-[#BAFF57] px-5 py-3 text-xs uppercase tracking-wider">
          Všetky projekty
        </Link>
      </section>

      {/* ── ČO ROBÍME — full-width index rows ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? 'min-h-screen py-20 px-5 flex flex-col justify-center' : 'min-h-screen h-screen flex flex-col justify-center'}`}>
        <div className="px-5 md:px-12 lg:px-16 mb-8 md:mb-10" style={{ opacity: section4Progress }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-black/40 text-xs font-mono">03</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Čo robíme</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">Jedna strecha.<br />Dve disciplíny.</h2>
        </div>

        <div className="w-full" style={{ opacity: section4Progress, transform: `translateY(${(1 - section4Progress) * 30}px)` }}>
          {[
            { id: 'produkcia' as const, num: '01', title: 'Online prítomnosť a získavanie nových zákazníkov', extras: produkciaExtras, href: '/marketing' },
            { id: 'vyvoj' as const, num: '02', title: 'Softvérové riešenia na mieru', extras: vyvojExtras, href: '/development' },
          ].map((item) => {
            const extrasVisible = isMobile || disciplinesHover === item.id;
            const isOpen = !isMobile && disciplinesHover === item.id;
            const isDimmed = !isMobile && disciplinesHover !== null && disciplinesHover !== item.id;
            return (
              <a
                key={item.num}
                href={item.href}
                onMouseEnter={() => !isMobile && setDisciplinesHover(item.id)}
                onMouseLeave={() => !isMobile && setDisciplinesHover(null)}
                className={`group grid grid-cols-12 items-start md:items-center gap-4 px-5 md:px-12 lg:px-16 py-8 md:py-10 border-t border-black/15 last:border-b text-black transition-all duration-300 ${
                  isOpen ? 'bg-white' : 'bg-transparent'
                } ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              >
                <span className="col-span-2 md:col-span-1 text-sm font-mono pt-1 text-black/30">{item.num}</span>
                <div className="col-span-10 md:col-span-6">
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight">{item.title}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${extrasVisible ? 'max-h-48 mt-5 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                    <div className="flex flex-col gap-2">
                      {item.extras.map((opt, i) => (
                        <span
                          key={opt}
                          className="text-xs md:text-sm uppercase tracking-wider font-mono text-black/55"
                          style={{
                            transitionDelay: extrasVisible ? `${i * 70}ms` : '0ms',
                            transform: extrasVisible ? 'translateY(0)' : 'translateY(-8px)',
                            opacity: extrasVisible ? 1 : 0,
                          }}
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="col-span-12 md:col-span-5 md:text-right text-xs uppercase tracking-wider font-mono pt-1 text-black/40">
                  ↗ Zistiť viac
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── ČÍSLA — typography + client marquee (hidden for now) ──
      <section className={`bg-[#BAFF57] relative snap-start snap-always overflow-hidden ${isMobile ? 'min-h-screen py-20 flex flex-col justify-center' : 'min-h-screen h-screen flex flex-col justify-between py-12'}`}>
        <div className="px-5 md:px-12 lg:px-16" style={{ opacity: section5Progress }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-black/40 text-xs font-mono">04</span>
            <div className="w-8 h-px bg-black"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">NextLayer v číslach</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold">Výsledky hovoria za nás.</h2>
        </div>

        <div
          className={`grid ${isMobile ? 'grid-cols-2 gap-y-10 px-5 mt-12' : 'grid-cols-4 gap-0 px-8 lg:px-12'} items-end`}
          style={{ opacity: section5Progress, transform: `translateY(${(1 - section5Progress) * 20}px)` }}
        >
          {[
            { number: '10+', label: 'Spokojných klientov' },
            { number: '50+', label: 'Videí vyrobených' },
            { number: '30+', label: 'Softvérové projekty' },
            { number: '2', label: 'Roky na trhu' },
          ].map((stat, i) => (
            <div key={i} className={`${!isMobile && i > 0 ? 'border-l border-black/20 pl-8' : ''}`}>
              <p className="text-6xl md:text-8xl lg:text-[7.5vw] font-bold leading-none tracking-tighter">{stat.number}</p>
              <p className="mt-3 text-xs md:text-sm uppercase tracking-widest text-black/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-black text-[#BAFF57] py-5 md:py-6 overflow-hidden mt-12 md:mt-0">
          <div className="flex whitespace-nowrap animate-client-marquee">
            {[...clients, ...clients].map((client, i) => (
              <a key={i} href={client.link} target="_blank" rel="noopener noreferrer" className="mx-8 md:mx-12 text-sm md:text-base uppercase tracking-[0.2em] font-light hover:text-white transition-colors">
                {client.name}
              </a>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ── KONTAKT — giant type + white form ── */}
      <section id="kontakt" className="relative min-h-screen h-screen bg-[#BAFF57] overflow-hidden snap-start snap-always flex flex-col">
        <p className="absolute -left-4 md:-left-8 top-8 md:top-4 text-[22vw] font-bold leading-none tracking-tighter text-black/[0.08] select-none pointer-events-none whitespace-nowrap">
          KONTAKT
        </p>

        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 px-5 md:px-12 lg:px-16 pt-24 md:pt-28 pb-8 items-center">
          <div className="lg:col-span-4" style={{ opacity: section6Progress, transform: `translateX(${(1 - section6Progress) * -40}px)` }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-black/40 text-xs font-mono">05</span>
              <div className="w-8 h-px bg-black"></div>
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Napíšte nám</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-none">Poďme na to.</h2>
            <a href="tel:+421902238309" className="block text-xl md:text-2xl font-bold hover:opacity-70 mb-2">+421 902 238 309</a>
            <a href="mailto:team@nextlayer.studio" className="block text-lg md:text-xl hover:opacity-70 mb-8">team@nextlayer.studio</a>
            <div className="flex gap-3">
              {[
                ['https://instagram.com/nextlayerstudio', 'IG'],
                ['https://x.com/NextLayerStudio', 'X'],
                ['https://www.tiktok.com/@nextlayerstudio', 'TT'],
              ].map(([href, label]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-[#BAFF57] flex items-center justify-center text-xs font-mono hover:bg-white hover:text-black transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8" style={{ opacity: section6Progress, transform: `translateX(${(1 - section6Progress) * 40}px)` }}>
            <form ref={formRef} onSubmit={sendEmail} className="bg-white p-6 md:p-10 space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" htmlFor="user_name">Meno <span className="text-red-600">*</span></label>
                  <input type="text" name="user_name" id="user_name" required className={`w-full bg-transparent border-b-2 border-black/20 px-0 py-2 text-lg focus:outline-none focus:border-black transition-colors ${formErrors.name ? 'border-red-500' : ''}`} placeholder="Vaše meno" />
                  {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" htmlFor="user_email">Email <span className="text-red-600">*</span></label>
                  <input type="email" name="user_email" id="user_email" required className={`w-full bg-transparent border-b-2 border-black/20 px-0 py-2 text-lg focus:outline-none focus:border-black transition-colors ${formErrors.email ? 'border-red-500' : ''}`} placeholder="vas@email.sk" />
                  {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2" htmlFor="message">Správa <span className="text-red-600">*</span></label>
                <textarea name="message" id="message" rows={4} required className={`w-full bg-transparent border-b-2 border-black/20 px-0 py-2 text-lg focus:outline-none focus:border-black transition-colors resize-none ${formErrors.message ? 'border-red-500' : ''}`} placeholder="Napíšte nám vašu správu..." />
                {formErrors.message && <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>}
              </div>
              {submitStatus === 'success' && (
                <div className="bg-black text-[#BAFF57] px-4 py-3 text-sm">Správa bola úspešne odoslaná!</div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-500/20 text-red-800 px-4 py-3 text-sm">Nastala chyba. Skúste to znovu.</div>
              )}
              <button type="submit" disabled={isSubmitting} className="w-full bg-black text-[#BAFF57] py-4 text-sm uppercase tracking-wider hover:bg-[#212121] transition-colors disabled:opacity-50">
                {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── PÄTIČKA — title card ── */}
      <footer className={`relative bg-[#212121] text-[#BAFF57] snap-start snap-always flex flex-col justify-between overflow-hidden ${isMobile ? 'min-h-screen py-16 px-5' : 'min-h-screen h-screen py-12 px-12 lg:px-16'}`}>
        <div className="flex items-start justify-between gap-8">
          <Image src="/fonts/Group.png" alt="NextLayer Studio" width={80} height={80} className="h-12 w-auto brightness-0 invert" />
          <nav className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-sm">
            <a href="/marketing" className="hover:text-white transition-colors">Marketing</a>
            <a href="/development" className="hover:text-white transition-colors">Development</a>
            <a href="/design" className="hover:text-white transition-colors">Design</a>
            <a href="/cena" className="hover:text-white transition-colors">Cena</a>
            <a href="/projekty" className="hover:text-white transition-colors">Projekty</a>
          </nav>
        </div>

        <h2 className="text-[12vw] font-bold leading-[0.85] tracking-tighter">
          NextLayer<br />Studio
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-8 border-t border-[#BAFF57]/20">
          <div>
            <a href="mailto:team@nextlayer.studio" className="block text-sm hover:text-white">team@nextlayer.studio</a>
            <a href="tel:+421902238309" className="block text-sm hover:text-white">+421 902 238 309</a>
            <p className="text-[#BAFF57]/40 text-xs mt-2">Bratislava, Slovensko</p>
          </div>
          <p className="text-[#BAFF57]/40 text-[10px] md:text-xs font-mono uppercase tracking-widest">© 2026 NextLayer Studio s.r.o. · IČO: 57141282</p>
          <div className="flex gap-4 text-[10px] md:text-xs font-mono uppercase">
            <a href="/obchodne-podmienky" className="hover:text-white">Podmienky</a>
            <a href="/ochrana-sukromia" className="hover:text-white">Údaje</a>
            <a href="/informacie-o-firme" className="hover:text-white">O firme</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
