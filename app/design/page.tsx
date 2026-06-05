"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DesignPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollY(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const showHamburger = !isMenuOpen;

  const scrollToContent = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} className="bg-[#212121] h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      
      {/* Hamburger Button */}
      {showHamburger && (
        <div 
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] cursor-pointer touch-manipulation"
          role="button"
          tabIndex={0}
          aria-label="Open menu"
        >
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

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
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
        
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 group z-50 cursor-pointer touch-manipulation"
          aria-label="Close menu"
        >
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
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Home</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <Link href="/development" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">02</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Development</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <div className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">03</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.2em] text-[#BAFF57]/50">Design</span>
            <span className="w-4 h-[1px] bg-[#BAFF57]/50"></span>
          </div>
          
          <Link href="/marketing" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">04</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Marketing</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <Link href="/projekty" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">05</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Projekty</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <div className="absolute bottom-12 left-12 md:left-24 lg:left-32 text-[#BAFF57]/50 text-sm font-light">
            <p>team@nextlayer.studio</p>
            <p>+421 902 238 309</p>
          </div>
        </nav>
      </div>

      {/* Hero Section with Logo */}
      <section className="min-h-screen h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden">
        {/* Design lines and numbers around the logo */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-[#BAFF57]/10"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-[#BAFF57]/10"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-[#BAFF57]/10"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-[#BAFF57]/10"></div>
          
          {/* Corner measurements */}
          <div className="absolute top-20 left-20">
            <div className="w-20 h-px bg-[#BAFF57]/30"></div>
            <div className="w-px h-20 bg-[#BAFF57]/30"></div>
            <span className="absolute top-2 left-2 text-[#BAFF57]/30 text-xs font-mono">x: 0</span>
          </div>
          <div className="absolute top-20 right-20">
            <div className="w-20 h-px bg-[#BAFF57]/30 ml-auto"></div>
            <div className="w-px h-20 bg-[#BAFF57]/30 ml-auto"></div>
            <span className="absolute top-2 right-2 text-[#BAFF57]/30 text-xs font-mono">y: 0</span>
          </div>
          <div className="absolute bottom-20 left-20">
            <div className="w-px h-20 bg-[#BAFF57]/30"></div>
            <div className="w-20 h-px bg-[#BAFF57]/30"></div>
            <span className="absolute bottom-2 left-2 text-[#BAFF57]/30 text-xs font-mono">1920</span>
          </div>
          <div className="absolute bottom-20 right-20">
            <div className="w-px h-20 bg-[#BAFF57]/30 ml-auto"></div>
            <div className="w-20 h-px bg-[#BAFF57]/30 ml-auto"></div>
            <span className="absolute bottom-2 right-2 text-[#BAFF57]/30 text-xs font-mono">1080</span>
          </div>
          
          {/* Floating design numbers */}
          <span className="absolute top-1/3 left-16 text-[#BAFF57]/20 text-6xl font-bold font-mono">01</span>
          <span className="absolute bottom-1/3 right-16 text-[#BAFF57]/20 text-6xl font-bold font-mono">02</span>
          <span className="absolute top-1/2 left-8 text-[#BAFF57]/15 text-4xl font-mono -rotate-90 origin-center">DESIGN</span>
          <span className="absolute top-1/2 right-8 text-[#BAFF57]/15 text-4xl font-mono rotate-90 origin-center">STUDIO</span>
          
          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#BAFF57]/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#BAFF57]/5 rounded-full"></div>
          
          {/* Small accent lines */}
          <div className="absolute top-1/2 left-32 w-16 h-px bg-gradient-to-r from-[#BAFF57]/40 to-transparent"></div>
          <div className="absolute top-1/2 right-32 w-16 h-px bg-gradient-to-l from-[#BAFF57]/40 to-transparent"></div>
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#BAFF57]/40 to-transparent"></div>
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-[#BAFF57]/40 to-transparent"></div>
        </div>

        {/* Logo and button container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <div 
            onClick={scrollToContent}
            className="cursor-pointer group relative"
          >
            {/* Logo frame */}
            <div className="absolute -inset-8 border border-[#BAFF57]/20 group-hover:border-[#BAFF57]/40 transition-colors duration-500"></div>
            <div className="absolute -inset-4 border border-[#BAFF57]/30 group-hover:border-[#BAFF57]/60 transition-colors duration-500"></div>
            
            {/* Corner brackets */}
            <div className="absolute -top-12 -left-12 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 group-hover:border-[#BAFF57] transition-colors duration-300"></div>
            <div className="absolute -top-12 -right-12 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 group-hover:border-[#BAFF57] transition-colors duration-300"></div>
            <div className="absolute -bottom-12 -left-12 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/50 group-hover:border-[#BAFF57] transition-colors duration-300"></div>
            <div className="absolute -bottom-12 -right-12 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/50 group-hover:border-[#BAFF57] transition-colors duration-300"></div>
            
            <Image 
              src="/fonts/logoajksn.png" 
              alt="Design Logo" 
              width={200}
              height={200}
              className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          
          {/* Button */}
          <button 
            onClick={scrollToContent}
            className="mt-16 px-8 py-4 border border-[#BAFF57]/50 text-[#BAFF57] uppercase tracking-widest text-sm hover:bg-[#BAFF57] hover:text-[#212121] transition-all duration-300 group"
          >
            <span className="flex items-center gap-3">
              Klikni
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-y-1 transition-transform duration-300">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* Content Section */}
      <section className="min-h-screen h-screen snap-start snap-always flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-[#BAFF57]/20 to-transparent"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">O dizajne</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#BAFF57] mb-6 sm:mb-8 leading-tight max-w-4xl">
            Dizajnujeme podľa najnovších trendov
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl text-[#BAFF57]/60 max-w-3xl leading-relaxed font-light mb-12">
            Napredujeme vo svete dizajnu a kreativity. Naše produkty razia cestu v modernom digitálnom svete.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[#BAFF57]/20 hover:border-[#BAFF57]/40 transition-colors">
              <span className="text-[#BAFF57]/30 text-sm">01</span>
              <h3 className="text-xl font-bold text-[#BAFF57] mt-2 mb-2">UI/UX Dizajn</h3>
              <p className="text-[#BAFF57]/50 text-sm font-light">Intuitívne rozhrania zamerané na používateľa</p>
            </div>
            <div className="p-6 border border-[#BAFF57]/20 hover:border-[#BAFF57]/40 transition-colors">
              <span className="text-[#BAFF57]/30 text-sm">02</span>
              <h3 className="text-xl font-bold text-[#BAFF57] mt-2 mb-2">Brand Identity</h3>
              <p className="text-[#BAFF57]/50 text-sm font-light">Vizuálna identita ktorá zaujme</p>
            </div>
            <div className="p-6 border border-[#BAFF57]/20 hover:border-[#BAFF57]/40 transition-colors">
              <span className="text-[#BAFF57]/30 text-sm">03</span>
              <h3 className="text-xl font-bold text-[#BAFF57] mt-2 mb-2">Graphic Design</h3>
              <p className="text-[#BAFF57]/50 text-sm font-light">vizuály, ktoré oživia váš projekt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className={`snap-start snap-always flex items-center justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative ${
        isMobile 
          ? 'min-h-screen py-40 overflow-y-auto' 
          : 'min-h-screen h-screen overflow-hidden'
      }`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-16 w-24 h-24 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 border border-[#BAFF57]/10 -rotate-12"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Naša paleta</span>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 ${
            isMobile ? 'gap-8 my-8' : 'gap-6 lg:gap-8'
          }`}>
            {/* Color 1 - Green */}
            <div className="group relative">
              <div className="aspect-[3/4] bg-[#BAFF57] relative overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#212121]/30 group-hover:w-12 group-hover:h-12 transition-all duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#212121]/30 group-hover:w-12 group-hover:h-12 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#212121]/20 to-transparent">
                  <span className="text-[#212121]/50 text-xs font-mono uppercase tracking-wider">Primary</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#212121] mt-1">Lime</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[#BAFF57] font-mono text-lg">#BAFF57</span>
                <span className="text-[#BAFF57]/50 text-sm">RGB 186, 255, 87</span>
              </div>
            </div>

            {/* Color 2 - Dark */}
            <div className="group relative">
              <div className="aspect-[3/4] bg-[#212121] border border-[#BAFF57]/30 relative overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#BAFF57]/30 group-hover:w-12 group-hover:h-12 group-hover:border-[#BAFF57]/60 transition-all duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#BAFF57]/30 group-hover:w-12 group-hover:h-12 group-hover:border-[#BAFF57]/60 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-wider">Background</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#BAFF57] mt-1">Dark</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[#BAFF57] font-mono text-lg">#212121</span>
                <span className="text-[#BAFF57]/50 text-sm">RGB 33, 33, 33</span>
              </div>
            </div>

            {/* Color 3 - White */}
            <div className="group relative">
              <div className="aspect-[3/4] bg-[#FFFFFF] relative overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#212121]/20 group-hover:w-12 group-hover:h-12 transition-all duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#212121]/20 group-hover:w-12 group-hover:h-12 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#212121]/10 to-transparent">
                  <span className="text-[#212121]/50 text-xs font-mono uppercase tracking-wider">Accent</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#212121] mt-1">White</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[#BAFF57] font-mono text-lg">#FFFFFF</span>
                <span className="text-[#BAFF57]/50 text-sm">RGB 255, 255, 255</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Projects Showcase */}
      <section className={`snap-start snap-always flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative ${
        isMobile 
          ? 'min-h-screen py-40 overflow-y-auto' 
          : 'min-h-screen py-8 sm:py-12 md:py-16 overflow-hidden'
      }`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 border border-[#BAFF57]/10 rotate-12"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#BAFF57]/10 -rotate-6"></div>
          <div className="absolute top-1/3 left-0 w-1/4 h-px bg-gradient-to-r from-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-[#BAFF57]/20 to-transparent"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Naše práce</span>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch ${
            isMobile ? 'gap-8 my-8' : 'gap-4 sm:gap-6 md:gap-8'
          }`}>
            {/* Project 1 */}
            <div className="group relative transition-all duration-700 ease-out h-full">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#212121]/20">
                  <Image 
                    src="/fonts/Screenshot 2026-01-25 at 16.50.43.png" 
                    alt="Design Project 1" 
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105 p-2"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80 flex-1 flex flex-col">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Brand Identity</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Hlavičkový papier</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">
                    ukážka moderného technologického dizajnu
                  </p>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative transition-all duration-700 ease-out h-full">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#212121]/20">
                  <Image 
                    src="/fonts/Screenshot 2026-01-25 at 16.51.43.png" 
                    alt="Design Project 2" 
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105 p-2"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">BRAND IDENTITY</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Dizajn letáčiku</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">
                    jednoduchý a prehladný dizajn
                  </p>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative transition-all duration-700 ease-out h-full">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/Screenshot 2026-01-25 at 16.51.14.png" 
                    alt="Design Project 3" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">BRAND IDENTITY</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Voucher dizajn</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">
                    jednoduchý dizajn pre zľavovú kartičku
                  </p>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group relative transition-all duration-700 ease-out h-full">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/Screenshot 2026-01-25 at 16.53.00.png" 
                    alt="Design Project 4" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">WEB DESIGN</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">New Era eshop</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">
                    dizajn nového eshopu
                  </p>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="group relative transition-all duration-700 ease-out h-full">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/Screenshot 2026-01-25 at 16.53.32.png" 
                    alt="Design Project 5" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">WEB DESIGN</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Autoškola Zvyky</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">
                    Dizajn webstránky pre autoškolu
                  </p>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Project 6 */}
            <div className="group relative transition-all duration-700 ease-out h-full">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/Screenshot 2026-01-25 at 16.55.23.png" 
                    alt="Design Project 6" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">WEB DESIGN</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">QR eshop</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">
                    Dizajn moderného eshopu a identity značky
                  </p>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Project 7 */}
            <div className="group relative transition-all duration-700 ease-out h-full">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/Screenshot 2026-01-25 at 16.56.20 1.png" 
                    alt="Design Project 7" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Brand Design</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Visual Identity</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">
                    Komplexná vizuálna identita značky
                  </p>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen h-screen snap-start snap-always flex items-center justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#BAFF57]/10"></div>
        </div>

        <div className="text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#BAFF57] mb-8">
            Poďme tvoriť spolu
          </h2>
          <p className="text-lg md:text-xl text-[#BAFF57]/60 mb-12 max-w-xl mx-auto font-light">
            Máte víziu? My ju pretvoríme na vizuálnu realitu. Kontaktujte nás.
          </p>
          <Link 
            href="/#kontakt"
            className="inline-flex items-center gap-4 px-8 py-4 bg-[#BAFF57] text-[#212121] font-medium uppercase tracking-wider hover:bg-[#BAFF57]/90 transition-colors"
          >
            Kontaktujte nás
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
