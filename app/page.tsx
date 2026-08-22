"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from '@emailjs/browser';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showHamburger = isMobile ? true : scrollY > 400;

  const loadingText = "Budujeme značky, ktoré sa nezabúdajú.";

  useEffect(() => {
    emailjs.init('VBkXVCwNKLhntRGyJ');
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= loadingText.length) {
        setDisplayedText(loadingText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setLoadingFadeOut(true);
          setTimeout(() => setIsLoading(false), 800);
        }, 500);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, [isLoading]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => setScrollY(container.scrollTop);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

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

      {/* Loading Screen */}
      {isLoading && (
        <div className={`fixed inset-0 z-50 bg-[#BAFF57] flex items-center justify-center transition-opacity duration-700 ${loadingFadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-black text-center px-8 max-w-4xl">
            {displayedText}<span className="animate-pulse">|</span>
          </p>
        </div>
      )}

      {/* Hamburger Button */}
      {showHamburger && !isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(true)}
          className={`fixed z-[60] cursor-pointer touch-manipulation ${isMobile ? 'top-4 right-4' : 'top-4 right-4 sm:top-6 sm:right-6'}`}
          role="button" tabIndex={0} aria-label="Open menu"
        >
          <div className={`relative bg-black flex flex-col items-center justify-center gap-2 hover:bg-black/80 active:bg-black/60 transition-colors ${isMobile ? 'w-14 h-14' : 'w-14 h-14 sm:w-12 sm:h-12'}`}>
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
          <Link href="/projekty" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 sm:gap-6 transition-all duration-300 touch-manipulation py-2">
            <span className="text-[#BAFF57]/40 text-xs sm:text-sm font-light">05</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Projekty</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          <div className="absolute bottom-12 left-12 md:left-24 lg:left-32 text-[#BAFF57]/50 text-sm font-light">
            <p>team@nextlayer.studio</p>
            <p>+421 902 238 309</p>
          </div>
        </nav>
      </div>

      {/* ── HERO ── */}
      <main className="min-h-screen h-screen bg-[#BAFF57] pt-8 md:pt-12 flex flex-col overflow-hidden snap-start snap-always" style={{ opacity: heroOpacity }}>
        <div className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-4 sm:left-8 md:left-16 lg:left-24 xl:left-32 z-10 transition-transform duration-300 ease-out" style={{ transform: `translateX(-${scrollY * 0.4}px)` }}>
          <Image src="/fonts/Group.png" alt="Logo" width={80} height={80} className={`w-auto ${isMobile ? 'h-20' : 'h-10 sm:h-12 md:h-16 lg:h-20'}`} priority />
        </div>

        {!isMobile && (
          <nav className="flex flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 transition-transform duration-300 ease-out" style={{ transform: `translateX(-${scrollY * 0.6}px)` }}>
            <a href="/marketing" className="text-sm md:text-base lg:text-lg font-normal hover:opacity-70 transition-opacity uppercase px-2 py-1">MARKETING</a>
            <a href="/development" className="text-sm md:text-base lg:text-lg font-normal hover:opacity-70 transition-opacity uppercase px-2 py-1">DEVELOPMENT</a>
            <a href="/design" className="text-sm md:text-base lg:text-lg font-normal hover:opacity-70 transition-opacity uppercase px-2 py-1">DESIGN</a>
            <a href="/projekty" className="text-sm md:text-base lg:text-lg font-normal hover:opacity-70 transition-opacity uppercase px-2 py-1">ÚSPEŠNÉ PROJEKTY</a>
          </nav>
        )}

        {!isMobile && (
          <a href="#kontakt" className="absolute top-6 md:top-8 lg:top-12 right-4 md:right-8 lg:right-12 text-sm md:text-base lg:text-lg font-normal hover:opacity-70 transition-transform duration-300 ease-out uppercase px-2 py-1" style={{ transform: `translateX(${scrollY * 0.8}px)` }}>
            KONTAKT
          </a>
        )}

        {/* Blur overlay — zvyšok obrazovky sa rozmaže, keď je aktívny hover na Produkcia / Vývoj */}
        {!isMobile && (
          <div
            className={`absolute inset-0 z-20 backdrop-blur-md bg-black/10 transition-opacity duration-300 ease-out ${heroHover ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: 'none' }}
          ></div>
        )}

        {/* Produkcia (vľavo) / Vývoj (vpravo) */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center gap-8 sm:gap-10 md:gap-16 lg:gap-24 pointer-events-none">
            {/* Produkcia */}
            <div
              className={`group relative pointer-events-auto transition-all duration-300 max-w-[200px] sm:max-w-[240px] md:max-w-xs lg:max-w-sm ${heroHover === 'vyvoj' ? 'z-10' : 'z-30'}`}
              onMouseEnter={() => setHeroHover('produkcia')}
              onMouseLeave={() => setHeroHover(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="text-black/50"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                <span className="text-black/40 text-xs font-mono">01</span>
                <div className="w-8 h-px bg-black/30"></div>
              </div>
              <Link href="/marketing" className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-black hover:opacity-70 transition-opacity">
                Online prítomnosť a získavanie nových zákazníkov
              </Link>
              <div className="w-0 h-[2px] bg-black mt-4 group-hover:w-16 transition-all duration-300"></div>
              <div className="mt-4 flex items-center gap-2 text-black/50 text-xs uppercase tracking-wider font-mono group-hover:text-black transition-colors">
                Zistiť viac
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
              <div className={`absolute top-full left-0 pt-6 space-y-3 transition-all duration-300 ease-out ${heroHover === 'produkcia' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                {produkciaItems.map((item) => (
                  <Link key={item} href="/marketing" className="block origin-left text-black/70 hover:text-black hover:scale-110 text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-200">{item}</Link>
                ))}
              </div>
            </div>

            {/* Deliaca čiara */}
            <div className="w-px h-40 bg-black/20 self-center shrink-0"></div>

            {/* Vývoj */}
            <div
              className={`group relative text-right pointer-events-auto transition-all duration-300 max-w-[200px] sm:max-w-[240px] md:max-w-xs lg:max-w-sm ${heroHover === 'produkcia' ? 'z-10' : 'z-30'}`}
              onMouseEnter={() => setHeroHover('vyvoj')}
              onMouseLeave={() => setHeroHover(null)}
            >
              <div className="flex items-center justify-end gap-3 mb-4">
                <div className="w-8 h-px bg-black/30"></div>
                <span className="text-black/40 text-xs font-mono">02</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="text-black/50"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <Link href="/development" className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-black hover:opacity-70 transition-opacity">
                Softvérové riešenia na mieru
              </Link>
              <div className="w-0 h-[2px] bg-black mt-4 ml-auto group-hover:w-16 transition-all duration-300"></div>
              <div className="mt-4 flex items-center justify-end gap-2 text-black/50 text-xs uppercase tracking-wider font-mono group-hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 order-2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                Zistiť viac
              </div>
              <div className={`absolute top-full right-0 pt-6 space-y-3 transition-all duration-300 ease-out ${heroHover === 'vyvoj' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                {vyvojItems.map((item) => (
                  <Link key={item} href="/development" className="block origin-right text-black/70 hover:text-black hover:scale-110 text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-200">{item}</Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Vertikálny dekoratívny prvok */}
        {!isMobile && (
          <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3" style={{ opacity: heroOpacity * 0.35 }}>
            <div className="w-px h-14 bg-black/50"></div>
            <span className="text-[10px] font-mono text-black/50 uppercase tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>Bratislava · 2026</span>
            <div className="w-px h-14 bg-black/50"></div>
          </div>
        )}

        {/* Scroll indikátor */}
        {!isMobile && (
          <div className="absolute bottom-6 left-4 sm:left-8 md:left-12 lg:left-24 xl:left-32 flex items-center gap-3" style={{ opacity: heroOpacity * 0.4 }}>
            <div className="w-px h-8 bg-black/40"></div>
            <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest">Scroll</span>
          </div>
        )}

        <div className="mt-auto w-screen -mb-[2vw] transition-transform duration-300 ease-out overflow-hidden" style={{ transform: `translateX(${scrollY * 2}px)` }}>
          <h1 className="text-[10vw] sm:text-[11vw] md:text-[12vw] lg:text-[13vw] font-bold leading-none whitespace-nowrap w-full text-center tracking-tighter -ml-[1vw] px-2">
            NextLayer Studio
          </h1>
        </div>
      </main>

      {/* ── SEKCIA 2 — O NÁS ── */}
      <section className="min-h-screen h-screen bg-[#BAFF57] flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative overflow-hidden snap-start snap-always">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full transition-all duration-700 ease-out" style={{ transform: `translateX(${100 - section2Progress * 100}%)`, opacity: section2Progress * 0.8 }}>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="60" y1="0" x2="100" y2="40" stroke="black" strokeWidth="0.2" opacity="0.5" />
              <line x1="70" y1="0" x2="100" y2="30" stroke="black" strokeWidth="0.15" opacity="0.4" />
              <line x1="50" y1="0" x2="100" y2="50" stroke="black" strokeWidth="0.2" opacity="0.45" />
              <line x1="40" y1="0" x2="100" y2="60" stroke="black" strokeWidth="0.15" opacity="0.4" />
            </svg>
          </div>
          <div className="absolute top-1/4 right-0 h-px bg-black transition-all duration-500 ease-out" style={{ width: `${section2Progress * 33}%`, opacity: section2Progress * 0.4 }}></div>
          <div className="absolute top-1/3 right-10 h-px bg-black transition-all duration-700 ease-out" style={{ width: `${section2Progress * 25}%`, opacity: section2Progress * 0.35 }}></div>
          <div className="absolute top-2/3 right-0 h-px bg-black transition-all duration-600 ease-out" style={{ width: `${section2Progress * 40}%`, opacity: section2Progress * 0.3 }}></div>
          <div className="absolute top-20 right-20 w-32 h-32 border border-black transition-all duration-700 ease-out" style={{ opacity: section2Progress * 0.25, transform: `rotate(${45 + (1 - section2Progress) * 45}deg) scale(${section2Progress})` }}></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-black transition-all duration-800 ease-out" style={{ opacity: section2Progress * 0.3, transform: `rotate(${12 + (1 - section2Progress) * 30}deg) scale(${section2Progress})` }}></div>
        </div>

        <div
          className={`relative z-10 w-full max-w-6xl transition-all duration-700 ease-out grid ${isMobile ? 'grid-cols-1 gap-10' : 'grid-cols-1 lg:grid-cols-2 gap-16'} items-center`}
          style={{ transform: `translateY(${(1 - section2Progress) * 30}px)`, opacity: section2Progress }}
        >
          {/* Ľavá strana — text */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-black/50"></div>
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Kto sme</span>
            </div>
            <p className={`${isMobile ? 'text-sm leading-[2.4] font-medium' : 'font-normal text-left text-sm md:text-base lg:text-lg leading-[2.5] md:leading-[2.8] lg:leading-[3]'}`}>
              Sme produkčné a marketingové štúdio. Pomáhame firmám budovať profesionálnu prítomnosť na sociálnych sieťach — so scenárom, produkciou, réžiou aj strihom. Všetko v jednom.
            </p>
            <p className={`mt-6 ${isMobile ? 'text-sm leading-[2.4] font-medium' : 'font-normal text-left text-sm md:text-base lg:text-lg leading-[2.5] md:leading-[2.8] lg:leading-[3]'}`}>
              Nezabúdame ani na web a digitálne systémy — vyvíjame aplikácie a e-shopy, ktoré nielen dobre vyzerajú, ale hlavne fungujú. Každý projekt berieme ako príležitosť posunúť značku ďalej.
            </p>
            <div className="mt-10 flex gap-4 flex-wrap">
              <a href="/marketing" className="bg-black text-[#BAFF57] font-normal hover:bg-black/80 transition-colors uppercase px-6 py-3 text-sm tracking-wider">
                Marketing
              </a>
              <a href="/development" className="border border-black text-black font-normal hover:bg-black/10 transition-colors uppercase px-6 py-3 text-sm tracking-wider">
                Development
              </a>
            </div>
            <a
              href="https://instagram.com/nextlayerstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 text-sm text-black/60 hover:text-black transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @nextlayerstudio
              <span className="w-0 h-[1px] bg-black group-hover:w-8 transition-all duration-300"></span>
            </a>
          </div>

          {/* Pravá strana — video */}
          {!isMobile && (
            <div className="flex items-center justify-center h-full">
              <div className="relative overflow-hidden border border-black/20 w-full max-w-sm" style={{ height: '420px' }}>
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-black/40 z-10"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-black/40 z-10"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-black/40 z-10"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-black/40 z-10"></div>
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
          )}
        </div>
      </section>

      {/* ── SEKCIA 3 — VYBRANÉ PRÁCE ── */}
      <section className={`bg-[#BAFF57] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative snap-start snap-always ${isMobile ? 'min-h-screen py-32 overflow-y-auto' : 'min-h-screen h-screen py-12 overflow-hidden'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full transition-all duration-700 ease-out" style={{ transform: `translateX(${-100 + section3Progress * 100}%)`, opacity: section3Progress * 0.8 }}>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="40" x2="40" y2="0" stroke="black" strokeWidth="0.2" opacity="0.5" />
              <line x1="0" y1="50" x2="50" y2="0" stroke="black" strokeWidth="0.2" opacity="0.45" />
            </svg>
          </div>
          <div className="absolute top-1/4 left-0 h-px bg-black transition-all duration-500 ease-out" style={{ width: `${section3Progress * 25}%`, opacity: section3Progress * 0.4 }}></div>
          <div className="absolute bottom-1/4 left-0 h-px bg-black transition-all duration-700 ease-out" style={{ width: `${section3Progress * 33}%`, opacity: section3Progress * 0.35 }}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl" style={{ opacity: section3Progress, transform: `translateY(${(1 - section3Progress) * 40}px)` }}>
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-[1px] bg-black/50"></div>
                <span className="text-black/50 text-xs uppercase tracking-widest font-mono">Vybrané práce</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Naše projekty</h2>
            </div>
            <Link href="/projekty" className="hidden sm:flex items-center gap-3 border border-black/40 px-5 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-[#BAFF57] transition-all duration-300">
              Všetky projekty
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full ${isMobile ? 'gap-10 my-4' : 'gap-4 sm:gap-6 md:gap-8'}`}>

            {/* Bombafasada */}
            <div className="group" style={{ transform: `translateY(${(1 - section3Progress) * 100}px)`, opacity: section3Progress, transition: 'transform 0.7s ease-out, opacity 0.7s ease-out' }}>
              <div className="relative overflow-hidden border border-black/20 group-hover:border-black/50 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-black/50 group-hover:w-8 group-hover:h-8 transition-all duration-300 z-10"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-black/50 group-hover:w-8 group-hover:h-8 transition-all duration-300 z-10"></div>
                <div className="relative overflow-hidden bg-black aspect-[4/5]">
                  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" src="https://akinb3uuwih4cf6s.public.blob.vercel-storage.com/bombafasada/video1.mp4" />
                </div>
              </div>
              <div className="mt-4 px-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-black/40 text-xs font-mono uppercase tracking-wider">Bombafasada</span>
                  <span className="w-1 h-1 bg-black/30 rounded-full"></span>
                  <span className="text-black/40 text-xs font-mono">Social Media</span>
                </div>
                <p className="text-black/70 text-sm font-light leading-relaxed">Profesionálna fasádna spoločnosť — brand na sieťach.</p>
              </div>
            </div>

            {/* Kavičká u Janíčka */}
            <div className="group" style={{ transform: `translateY(${(1 - section3Progress) * 150}px)`, opacity: section3Progress, transition: 'transform 0.7s ease-out 100ms, opacity 0.7s ease-out 100ms' }}>
              <div className="relative overflow-hidden border border-black/20 group-hover:border-black/50 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-black/50 group-hover:w-8 group-hover:h-8 transition-all duration-300 z-10"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-black/50 group-hover:w-8 group-hover:h-8 transition-all duration-300 z-10"></div>
                <div className="relative overflow-hidden aspect-[4/5]">
                  <Image src="/screenshots/janicko-post.png" alt="Kávička u Janíčka" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="mt-4 px-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-black/40 text-xs font-mono uppercase tracking-wider">Kávička u Janíčka</span>
                  <span className="w-1 h-1 bg-black/30 rounded-full"></span>
                  <span className="text-black/40 text-xs font-mono">Social Media</span>
                </div>
                <p className="text-black/70 text-sm font-light leading-relaxed">Kaviareň — video produkcia a správa profilu.</p>
              </div>
            </div>

            {/* New Era Microblading — Sisi */}
            <div className="group" style={{ transform: `translateY(${(1 - section3Progress) * 200}px)`, opacity: section3Progress, transition: 'transform 0.7s ease-out 200ms, opacity 0.7s ease-out 200ms' }}>
              <div className="relative overflow-hidden border border-black/20 group-hover:border-black/50 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-black/50 group-hover:w-8 group-hover:h-8 transition-all duration-300 z-10"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-black/50 group-hover:w-8 group-hover:h-8 transition-all duration-300 z-10"></div>
                <div className="relative overflow-hidden aspect-[4/5]">
                  <Image src="/screenshots/sisi-eshop.png" alt="New Era Microblading" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="mt-4 px-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-black/40 text-xs font-mono uppercase tracking-wider">New Era Microblading</span>
                  <span className="w-1 h-1 bg-black/30 rounded-full"></span>
                  <span className="text-black/40 text-xs font-mono">E-shop</span>
                </div>
                <p className="text-black/70 text-sm font-light leading-relaxed">E-shop pre kozmetické studio Beauty Institute.</p>
              </div>
            </div>

          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/projekty" className="flex items-center justify-center gap-3 border border-black/40 px-5 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-[#BAFF57] transition-all duration-300 w-full">
              Všetky projekty
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEKCIA 4 — ČO ROBÍME ── */}
      <section className={`bg-[#212121] relative snap-start snap-always overflow-hidden ${isMobile ? 'min-h-screen py-24 flex flex-col justify-center px-6' : 'min-h-screen h-screen flex items-center px-8 lg:px-24 xl:px-32'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-[#BAFF57]/15"></div>
          <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-[#BAFF57]/15"></div>
          <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-[#BAFF57]/15"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-[#BAFF57]/15"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto" style={{ opacity: section4Progress, transform: `translateY(${(1 - section4Progress) * 40}px)` }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#BAFF57]/40"></div>
            <span className="text-[#BAFF57]/40 text-xs uppercase tracking-widest font-mono">Čo robíme</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BAFF57] mb-4">
            Komplexná starostlivosť<br />o tvoju značku.
          </h2>
          <p className="text-[#BAFF57]/50 text-base font-light mb-12 max-w-xl">
            Nemusíš riešiť viacero dodávateľov. Produkciu, web aj dizajn zvládneme pod jednou strechou — od prvého nápadu až po výsledok.
          </p>

          <div className={`grid border border-[#BAFF57]/15 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {[
              {
                num: '01',
                title: 'Marketing',
                desc: 'Spravujeme sociálne siete, píšeme scenáre, natáčame a strihame videá. Každý post má zámer, každé video príbeh.',
                href: '/marketing',
              },
              {
                num: '02',
                title: 'Development',
                desc: 'Vyvíjame webové aplikácie, e-shopy a digitálne platformy na mieru. Od návrhu architektúry až po nasadenie.',
                href: '/development',
              },
              {
                num: '03',
                title: 'Design',
                desc: 'Tvoríme vizuálnu identitu, grafiku pre sociálne siete a UI/UX dizajn, ktorý vyzerá profesionálne a konvertuje.',
                href: '/design',
              },
            ].map((item, i) => (
              <a
                key={item.num}
                href={item.href}
                className={`group p-8 md:p-10 flex flex-col gap-6 border-[#BAFF57]/15 hover:bg-[#BAFF57]/5 transition-colors duration-300 ${isMobile ? 'border-b last:border-b-0' : i < 2 ? 'border-r' : ''}`}
              >
                <span className="text-[#BAFF57]/25 text-xs font-mono uppercase tracking-widest">{item.num}</span>
                <div>
                  <h3 className="text-[#BAFF57] text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-[#BAFF57]/50 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex items-center gap-3 text-[#BAFF57]/40 text-xs uppercase tracking-wider font-mono group-hover:text-[#BAFF57] transition-colors duration-200 mt-auto">
                  Zistiť viac
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEKCIA 5 — ČÍSLA & KLIENTI ── */}
      <section className={`bg-[#BAFF57] relative snap-start snap-always ${isMobile ? 'min-h-screen py-24 px-6 flex flex-col justify-center' : 'min-h-screen h-screen flex flex-col justify-center px-8 lg:px-24 xl:px-32 overflow-hidden'}`}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: section5Progress * 0.08 }}>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <line x1="0" y1="50" x2="100" y2="50" stroke="black" strokeWidth="0.05" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="black" strokeWidth="0.05" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto" style={{ opacity: section5Progress, transform: `translateY(${(1 - section5Progress) * 40}px)` }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-black/50"></div>
            <span className="text-black/50 text-xs uppercase tracking-widest font-mono">NextLayer v číslach</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16">Výsledky hovoria za nás.</h2>

          <div className={`grid gap-0 border border-black/15 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {[
              { number: '10+', label: 'Spokojných klientov', desc: 'Od živnostníkov po neziskovky' },
              { number: '50+', label: 'Videí vyrobených', desc: 'Produkcia, strih, titulky' },
              { number: '30+', label: 'Softvérové projekty', desc: 'E-shopy, platformy, webapky' },
              { number: '2', label: 'Roky na trhu', desc: 'Bratislava, Slovensko' },
            ].map((stat, i) => (
              <div key={i} className={`p-8 md:p-10 border-black/15 ${isMobile ? (i % 2 === 0 ? 'border-r' : '') + (i < 2 ? ' border-b' : '') : (i < 3 ? 'border-r' : '')}`}>
                <p className="text-5xl md:text-6xl font-bold leading-none mb-3">{stat.number}</p>
                <p className="text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-black/40 text-xs font-light">{stat.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12">
            <p className="text-black/30 text-xs uppercase tracking-widest font-mono mb-5">Dôverujú nám</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {clients.map((client, i) => (
                <a key={i} href={client.link} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-light text-black/50 hover:text-black transition-colors duration-200 uppercase tracking-wider">
                  {client.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCIA 6 — KONTAKT ── */}
      <section id="kontakt" className="min-h-screen h-screen bg-[#BAFF57] flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16 md:py-20 relative overflow-hidden snap-start snap-always">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 transition-all duration-700 ease-out" style={{ opacity: section6Progress * 0.15 }}>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="20" x2="100" y2="20" stroke="black" strokeWidth="0.05" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="black" strokeWidth="0.05" />
              <line x1="0" y1="60" x2="100" y2="60" stroke="black" strokeWidth="0.05" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="black" strokeWidth="0.05" />
              <line x1="20" y1="0" x2="20" y2="100" stroke="black" strokeWidth="0.05" />
              <line x1="40" y1="0" x2="40" y2="100" stroke="black" strokeWidth="0.05" />
              <line x1="60" y1="0" x2="60" y2="100" stroke="black" strokeWidth="0.05" />
              <line x1="80" y1="0" x2="80" y2="100" stroke="black" strokeWidth="0.05" />
            </svg>
          </div>
          <div className="absolute top-20 left-0 h-px bg-black transition-all duration-700 ease-out" style={{ width: `${section6Progress * 40}%`, opacity: section6Progress * 0.3 }}></div>
          <div className="absolute bottom-20 right-0 h-px bg-black transition-all duration-700 ease-out" style={{ width: `${section6Progress * 40}%`, opacity: section6Progress * 0.3 }}></div>
          <div className="absolute top-16 left-16 w-20 h-20 border border-black transition-all duration-700 ease-out" style={{ opacity: section6Progress * 0.2, transform: `rotate(${45 * section6Progress}deg) scale(${section6Progress})` }}></div>
          <div className="absolute bottom-16 right-16 w-16 h-16 border border-black transition-all duration-700 ease-out" style={{ opacity: section6Progress * 0.15, transform: `rotate(${-45 * section6Progress}deg) scale(${section6Progress})` }}></div>
        </div>

        <div className="w-full max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="transition-all duration-700 ease-out" style={{ transform: `translateX(${(1 - section6Progress) * -80}px)`, opacity: section6Progress }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Kontakt</h2>
            <div className="mb-8">
              <div className="text-sm uppercase tracking-wider mb-2 opacity-60">Telefón</div>
              <a href="tel:+421902238309" className="text-xl md:text-2xl font-normal hover:opacity-70 transition-opacity flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                +421 902 238 309
              </a>
            </div>
            <div className="mb-8">
              <div className="text-sm uppercase tracking-wider mb-2 opacity-60">Email</div>
              <a href="mailto:team@nextlayer.studio" className="text-xl md:text-2xl font-normal hover:opacity-70 transition-opacity flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                team@nextlayer.studio
              </a>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider mb-4 opacity-60">Sociálne siete</div>
              <div className="flex gap-6">
                <a href="https://instagram.com/nextlayerstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/30 rounded-sm flex items-center justify-center hover:bg-black hover:text-[#BAFF57] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://x.com/NextLayerStudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/30 rounded-sm flex items-center justify-center hover:bg-black hover:text-[#BAFF57] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/30 rounded-sm flex items-center justify-center hover:bg-black hover:text-[#BAFF57] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="https://www.tiktok.com/@nextlayerstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/30 rounded-sm flex items-center justify-center hover:bg-black hover:text-[#BAFF57] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="transition-all duration-700 ease-out" style={{ transform: `translateX(${(1 - section6Progress) * 80}px)`, opacity: section6Progress }}>
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-black/40"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-black/40"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-black/40"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-black/40"></div>
              <form ref={formRef} onSubmit={sendEmail} className="bg-black/5 backdrop-blur-sm p-8 md:p-10 space-y-6" noValidate>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2" htmlFor="user_name">Meno <span className="text-red-600">*</span></label>
                  <input type="text" name="user_name" id="user_name" required className={`w-full bg-transparent border-b-2 border-black/30 px-0 py-3 text-lg focus:outline-none focus:border-black transition-colors ${formErrors.name ? 'border-red-500' : ''}`} placeholder="Vaše meno" />
                  {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2" htmlFor="user_email">Email <span className="text-red-600">*</span></label>
                  <input type="email" name="user_email" id="user_email" required className={`w-full bg-transparent border-b-2 border-black/30 px-0 py-3 text-lg focus:outline-none focus:border-black transition-colors ${formErrors.email ? 'border-red-500' : ''}`} placeholder="vas@email.sk" />
                  {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider mb-2" htmlFor="message">Správa <span className="text-red-600">*</span></label>
                  <textarea name="message" id="message" rows={5} required className={`w-full bg-transparent border-b-2 border-black/30 px-0 py-3 text-lg focus:outline-none focus:border-black transition-colors resize-none ${formErrors.message ? 'border-red-500' : ''}`} placeholder="Napíšte nám vašu správu..." />
                  {formErrors.message && <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>}
                </div>
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-500/50 text-green-800 px-4 py-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Správa bola úspešne odoslaná!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-800 px-4 py-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    Nastala chyba. Skúste to znovu.
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="w-full bg-black text-[#BAFF57] py-4 text-lg uppercase tracking-wider font-normal hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Odosielam...</>
                  ) : 'Odoslať správu'}
                </button>
              </form>
            </div>
          </div>
        </div>

      </section>

      {/* ── PÄTIČKA ── */}
      <footer className={`bg-[#212121] snap-start snap-always flex flex-col px-8 lg:px-24 xl:px-32 ${isMobile ? 'min-h-screen py-20 justify-between' : 'min-h-screen h-screen py-16 justify-between'}`}>
        <div className="w-full max-w-6xl mx-auto">
          <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3 gap-16'}`}>

            {/* Logo + popis */}
            <div>
              <Image src="/fonts/Group.png" alt="NextLayer Studio" width={80} height={80} className="h-14 w-auto mb-6 brightness-0 invert" />
              <p className="text-[#BAFF57]/50 text-sm font-light leading-relaxed max-w-xs">
                Produkčné a marketingové štúdio z Bratislavy. Pomáhame firmám budovať profesionálnu prítomnosť online — od videa a sociálnych sietí až po weby a aplikácie.
              </p>
            </div>

            {/* Navigácia */}
            <div>
              <p className="text-[#BAFF57]/30 text-xs uppercase tracking-widest font-mono mb-6">Navigácia</p>
              <nav className="flex flex-col gap-4">
                {[
                  { label: 'Marketing', href: '/marketing' },
                  { label: 'Development', href: '/development' },
                  { label: 'Design', href: '/design' },
                  { label: 'Projekty', href: '/projekty' },
                ].map(({ label, href }) => (
                  <a key={href} href={href} className="text-[#BAFF57]/60 text-sm font-light hover:text-[#BAFF57] transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[#BAFF57] group-hover:w-4 transition-all duration-300"></span>
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Kontakt */}
            <div>
              <p className="text-[#BAFF57]/30 text-xs uppercase tracking-widest font-mono mb-6">Kontakt</p>
              <div className="flex flex-col gap-3 mb-8">
                <a href="mailto:team@nextlayer.studio" className="text-[#BAFF57]/60 text-sm font-light hover:text-[#BAFF57] transition-colors duration-200">
                  team@nextlayer.studio
                </a>
                <a href="tel:+421902238309" className="text-[#BAFF57]/60 text-sm font-light hover:text-[#BAFF57] transition-colors duration-200">
                  +421 902 238 309
                </a>
                <p className="text-[#BAFF57]/30 text-xs font-light pt-2">Bratislava, Slovensko</p>
              </div>
              <div className="flex gap-4">
                {[
                  { href: 'https://instagram.com/nextlayerstudio', label: 'IG' },
                  { href: 'https://x.com/NextLayerStudio', label: 'X' },
                  { href: 'https://www.tiktok.com/@nextlayerstudio', label: 'TT' },
                ].map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 border border-[#BAFF57]/20 flex items-center justify-center text-[#BAFF57]/40 text-xs font-mono hover:border-[#BAFF57]/60 hover:text-[#BAFF57] transition-all duration-200">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spodná lišta */}
        <div className="w-full max-w-6xl mx-auto pt-8 border-t border-[#BAFF57]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#BAFF57]/25 text-xs font-mono uppercase tracking-widest">© 2026 NextLayer Studio s.r.o. · IČO: 57141282 · Bratislava, SK</p>
          <div className="flex gap-5 text-[#BAFF57]/25 text-xs font-mono">
            <a href="/obchodne-podmienky" className="hover:text-[#BAFF57]/60 transition-colors">Obchodné podmienky</a>
            <a href="/ochrana-sukromia" className="hover:text-[#BAFF57]/60 transition-colors">Ochrana údajov</a>
            <a href="/informacie-o-firme" className="hover:text-[#BAFF57]/60 transition-colors">O firme</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
