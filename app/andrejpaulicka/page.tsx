"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AndrejPaulickaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const showHamburger = !isMenuOpen;

  // Generate vCard and trigger download
  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Paulička;Andrej;;;
FN:NextLayer Studio - Andrej Paulička
ORG:NextLayer Studio
TITLE:Sales & Communications Manager
TEL;TYPE=CELL:+421 902 238 309
EMAIL:andrejpaulicka@gmail.com
URL:https://www.nextlayer.studio
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NextLayer_Studio_Andrej_Paulicka.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={containerRef} className="bg-[#212121] min-h-screen overflow-y-auto">
      
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
          
          <Link href="/design" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">03</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Design</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <Link href="/marketing" className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">04</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#BAFF57] group-hover:tracking-[0.2em] sm:group-hover:tracking-[0.3em] transition-all duration-300">Marketing</span>
            <span className="w-0 h-[1px] bg-[#BAFF57] group-hover:w-12 transition-all duration-300"></span>
          </Link>
          
          <Link href="/projekty" className="group flex items-center gap-6 transition-all duration-300">
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

      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#BAFF57]/10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-px h-40 bg-gradient-to-b from-transparent via-[#BAFF57]/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-[#BAFF57]/20 to-transparent"></div>
          
          {/* Grid lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-[#BAFF57]/5"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-[#BAFF57]/5"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-[#BAFF57]/5"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-[#BAFF57]/5"></div>
        </div>

        {/* Business Card */}
        <div className="relative z-10 w-full max-w-lg -mt-8 sm:-mt-10 md:-mt-12">
          {/* Card container */}
          <div className="group relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#BAFF57]/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#BAFF57]/50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#BAFF57]/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#BAFF57]/50"></div>

            {/* Header with logo */}
            <div className="p-6 sm:p-8 border-b border-[#BAFF57]/20 flex items-center justify-between">
              <Image 
                src="/fonts/logoajksn.png" 
                alt="NextLayer Studio Logo" 
                width={60}
                height={60}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
              <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Business Card</span>
            </div>
            
            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Name and position */}
              <div className="mb-8">
                <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Meno</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#BAFF57] mt-2">
                  Andrej Paulička
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#BAFF57]/50"></div>
                  <span className="text-[#BAFF57]/70 text-sm sm:text-base font-light">
                    Sales & Communications Manager
                  </span>
                </div>
              </div>

              {/* Contact information */}
              <div className="space-y-6">
                {/* Email */}
                <a 
                  href="mailto:andrejpaulicka@gmail.com"
                  className="block cursor-pointer"
                >
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Email</span>
                  <div className="mt-2 flex items-center gap-3 text-[#BAFF57] hover:text-[#BAFF57]/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-lg sm:text-xl font-normal">andrejpaulicka@gmail.com</span>
                  </div>
                </a>

                {/* Phone */}
                <div>
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Telefón</span>
                  <a 
                    href="tel:+421902238309" 
                    className="mt-2 flex items-center gap-3 text-[#BAFF57] hover:text-[#BAFF57]/80 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-lg sm:text-xl font-normal">+421 902 238 309</span>
                  </a>
                </div>

                {/* Website */}
                <div>
                  <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">Web</span>
                  <a 
                    href="https://www.nextlayer.studio" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-3 text-[#BAFF57] hover:text-[#BAFF57]/80 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg sm:text-xl font-normal">nextlayer.studio</span>
                  </a>
                </div>
              </div>

              {/* Add to contacts button */}
              <button 
                onClick={downloadVCard}
                className="mt-10 w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#BAFF57] text-[#212121] text-sm sm:text-base uppercase tracking-wider font-medium hover:bg-[#BAFF57]/90 active:bg-[#BAFF57]/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Uložiť kontakt
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
