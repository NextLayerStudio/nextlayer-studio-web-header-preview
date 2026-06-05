"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DevelopmentPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  // Show hamburger menu
  const showHamburger = !isMenuOpen;

  // Scroll to section function
  const scrollToSection = (sectionIndex: number) => {
    if (containerRef.current) {
      const sectionHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: sectionIndex * sectionHeight,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  // Navigate to contact form on home page
  const navigateToContact = () => {
    router.push('/#kontakt');
    // After navigation, scroll to contact section
    setTimeout(() => {
      const contactElement = document.getElementById('kontakt');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#BAFF57]"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#BAFF57]"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#BAFF57]"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#BAFF57]"></div>
            {/* Lines */}
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
        {/* Background */}
        <div className="absolute inset-0 bg-[#212121]"></div>
        
        {/* Minimal animated lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute h-[1px] bg-[#BAFF57]/20 animate-float-slow-1"
            style={{ top: '30%', left: '0', width: '100%' }}
          ></div>
          <div 
            className="absolute h-[1px] bg-[#BAFF57]/15 animate-float-slow-3"
            style={{ top: '70%', left: '0', width: '100%' }}
          ></div>
          <div 
            className="absolute w-[1px] bg-[#BAFF57]/15 animate-float-vertical-1"
            style={{ left: '20%', top: '0', height: '100%' }}
          ></div>
          <div 
            className="absolute w-[1px] bg-[#BAFF57]/10 animate-float-vertical-3"
            style={{ right: '25%', top: '0', height: '100%' }}
          ></div>
          
          {/* Corner frame */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#BAFF57]/30"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#BAFF57]/30"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#BAFF57]/30"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#BAFF57]/30"></div>
        </div>
        
        {/* Close button */}
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
        
        {/* Menu content */}
        <nav className="relative z-10 h-full flex flex-col items-start justify-center pl-12 md:pl-24 lg:pl-32 gap-4">
          <Link 
            href="/"
            className="group flex items-center gap-6 transition-all duration-300"
          >
            <span className="text-[#BAFF57]/40 text-sm font-light">01</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">
              Home
            </span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <div className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">02</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.2em] text-[#BAFF57]/50">
              Development
            </span>
            <span className="w-4 h-[1px] bg-[#BAFF57]/50"></span>
          </div>
          
          <Link 
            href="/design"
            onClick={() => setIsMenuOpen(false)}
            className="group flex items-center gap-6 transition-all duration-300"
          >
            <span className="text-[#BAFF57]/40 text-sm font-light">03</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">
              Design
            </span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <Link 
            href="/marketing"
            onClick={() => setIsMenuOpen(false)}
            className="group flex items-center gap-6 transition-all duration-300"
          >
            <span className="text-[#BAFF57]/40 text-sm font-light">04</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">
              Marketing
            </span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <Link 
            href="/projekty"
            onClick={() => setIsMenuOpen(false)}
            className="group flex items-center gap-6 transition-all duration-300"
          >
            <span className="text-[#BAFF57]/40 text-sm font-light">05</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">
              Projekty
            </span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          {/* Contact info at bottom */}
          <div className="absolute bottom-12 left-12 md:left-24 lg:left-32 text-[#BAFF57]/50 text-sm font-light">
            <p>team@nextlayer.studio</p>
            <p>+421 902 238 309</p>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 border border-[#BAFF57]/10"></div>
          <div className="absolute top-1/3 right-1/4 w-px h-40 bg-gradient-to-b from-transparent via-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-[#BAFF57]/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Služby</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#BAFF57] mb-8 leading-tight">
            Development
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-[#BAFF57]/70 max-w-2xl leading-relaxed font-light">
            Vytvárame moderné webové aplikácie, e-shopy a digitálne riešenia na mieru. 
            Používame najnovšie technológie pre maximálny výkon a škálovateľnosť.
          </p>
          
          <div className="mt-12 flex items-center gap-4">
            <span className="text-[#BAFF57]/30 text-sm">Scroll</span>
            <div className="w-8 h-12 border border-[#BAFF57]/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-[#BAFF57]/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`snap-start snap-always flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative ${
        isMobile 
          ? 'min-h-screen py-40 overflow-y-auto' 
          : 'min-h-screen h-screen overflow-hidden'
      }`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 right-0 w-1/3 h-px bg-gradient-to-l from-[#BAFF57]/20 to-transparent"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
            isMobile ? 'gap-8 my-8' : 'gap-8'
          }`}>
            {/* Service Card 1 */}
            <div className="group relative p-8 border border-[#BAFF57]/20 hover:border-[#BAFF57]/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#BAFF57]/50 -translate-x-px -translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#BAFF57]/50 translate-x-px translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              
              <span className="text-[#BAFF57]/30 text-sm">01</span>
              <h3 className="text-2xl font-bold text-[#BAFF57] mt-4 mb-4">Webové aplikácie</h3>
              <p className="text-[#BAFF57]/60 font-light leading-relaxed">
                Vyvíjame komplexné webové aplikácie s modernými frameworkami ako Next.js, React a Node.js.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="group relative p-8 border border-[#BAFF57]/20 hover:border-[#BAFF57]/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#BAFF57]/50 -translate-x-px -translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#BAFF57]/50 translate-x-px translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              
              <span className="text-[#BAFF57]/30 text-sm">02</span>
              <h3 className="text-2xl font-bold text-[#BAFF57] mt-4 mb-4">E-commerce riešenia</h3>
              <p className="text-[#BAFF57]/60 font-light leading-relaxed">
                Tvoríme e-shopy na mieru s intuitívnym UX, bezpečnými platbami a efektívnou správou produktov.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="group relative p-8 border border-[#BAFF57]/20 hover:border-[#BAFF57]/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#BAFF57]/50 -translate-x-px -translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#BAFF57]/50 translate-x-px translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              
              <span className="text-[#BAFF57]/30 text-sm">03</span>
              <h3 className="text-2xl font-bold text-[#BAFF57] mt-4 mb-4">API & Backend</h3>
              <p className="text-[#BAFF57]/60 font-light leading-relaxed">
                Navrhujeme a implementujeme robustné API rozhrania a backendové systémy pre vaše projekty.
              </p>
            </div>

            {/* Service Card 4 */}
            <div className="group relative p-8 border border-[#BAFF57]/20 hover:border-[#BAFF57]/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#BAFF57]/50 -translate-x-px -translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#BAFF57]/50 translate-x-px translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              
              <span className="text-[#BAFF57]/30 text-sm">04</span>
              <h3 className="text-2xl font-bold text-[#BAFF57] mt-4 mb-4">CMS integrácia</h3>
              <p className="text-[#BAFF57]/60 font-light leading-relaxed">
                Integrujeme moderné CMS systémy pre jednoduchú správu obsahu bez potreby programovania.
              </p>
            </div>

            {/* Service Card 5 */}
            <div className="group relative p-8 border border-[#BAFF57]/20 hover:border-[#BAFF57]/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#BAFF57]/50 -translate-x-px -translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#BAFF57]/50 translate-x-px translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              
              <span className="text-[#BAFF57]/30 text-sm">05</span>
              <h3 className="text-2xl font-bold text-[#BAFF57] mt-4 mb-4">Optimalizácia</h3>
              <p className="text-[#BAFF57]/60 font-light leading-relaxed">
                Zrýchľujeme existujúce weby, optimalizujeme výkon a zlepšujeme SEO pre lepšie výsledky.
              </p>
            </div>

            {/* Service Card 6 */}
            <div className="group relative p-8 border border-[#BAFF57]/20 hover:border-[#BAFF57]/50 transition-all duration-500">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#BAFF57]/50 -translate-x-px -translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#BAFF57]/50 translate-x-px translate-y-px group-hover:w-6 group-hover:h-6 transition-all duration-300"></div>
              
              <span className="text-[#BAFF57]/30 text-sm">06</span>
              <h3 className="text-2xl font-bold text-[#BAFF57] mt-4 mb-4">Údržba & Podpora</h3>
              <p className="text-[#BAFF57]/60 font-light leading-relaxed">
                Poskytujeme dlhodobú údržbu, aktualizácie a technickú podporu pre vaše digitálne produkty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className={`snap-start snap-always flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 relative ${
        isMobile 
          ? 'min-h-screen py-40 overflow-y-auto' 
          : 'min-h-screen h-screen overflow-hidden'
      }`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-16 w-20 h-20 border border-[#BAFF57]/10 rotate-12"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border border-[#BAFF57]/10 -rotate-12"></div>
          <div className="absolute top-1/2 right-0 w-1/4 h-px bg-gradient-to-l from-[#BAFF57]/20 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Naše projekty</span>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
            isMobile ? 'gap-8 my-8' : 'gap-4 sm:gap-6 md:gap-8'
          }`}>
            {/* Dashboard Card */}
            <div className="group relative transition-all duration-700 ease-out">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/dashboard.png" 
                    alt="Dashboard Project" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Saas Dashboard System</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Dashboard</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">Cloud Storage & Project Management</p>
                  
                  <a 
                    href="https://dashboard-blue-alpha.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-[#BAFF57] text-[#212121] text-sm uppercase tracking-wider font-medium hover:bg-[#BAFF57]/80 transition-colors"
                  >
                    Navštíviť web
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Invoice Generator Card */}
            <div className="group relative transition-all duration-700 ease-out">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/invoice.png" 
                    alt="Invoice Generator Project" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Automatization</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Invoice Generator</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">PBSQ Invoice Generator</p>
                  
                  <a 
                    href="https://next-js-invoice-generator-six.vercel.app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-[#BAFF57] text-[#212121] text-sm uppercase tracking-wider font-medium hover:bg-[#BAFF57]/80 transition-colors"
                  >
                    Navštíviť web
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
                
                {/* Bottom corner accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
              </div>
            </div>

            {/* Name Sorting Tool Card */}
            <div className="group relative transition-all duration-700 ease-out">
              {/* Card container */}
              <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden">
                {/* Image container - top part */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/fonts/name.png" 
                    alt="Name Sorting Tool Project" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Corner accents on image */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                </div>
                
                {/* Content - bottom part */}
                <div className="p-6 bg-[#212121]/80">
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Aplication Development</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">Name Sorting Tool</h3>
                  <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">My Contacts App</p>
                  
                  <a 
                    href="https://name-sorting-tool.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-[#BAFF57] text-[#212121] text-sm uppercase tracking-wider font-medium hover:bg-[#BAFF57]/80 transition-colors"
                  >
                    Navštíviť web
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#BAFF57] mb-6 sm:mb-8">
            Máte projekt na mysli?
          </h2>
          <p className="text-lg md:text-xl text-[#BAFF57]/60 mb-12 max-w-xl mx-auto font-light">
            Poďme spolu premeniť vašu víziu na realitu. Kontaktujte nás a začnime spolupracovať.
          </p>
          <button 
            onClick={navigateToContact}
            className="inline-flex items-center gap-4 px-8 py-4 bg-[#BAFF57] text-[#212121] font-medium uppercase tracking-wider hover:bg-[#BAFF57]/90 transition-colors"
          >
            Kontaktujte nás
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
