"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProjektyPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

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

  const projects = [
    // Home page projects
    {
      id: 1,
      title: "Karin Art",
      category: "development",
      description: "Profesionálne tetovanie Bratislava",
      tag: "Web Development",
      image: "/fonts/karinart.png",
      link: "https://www.karinart.sk",
      year: "2024"
    },
    {
      id: 2,
      title: "Beauty Institute",
      category: "development",
      description: "Permanent Beauty Institute Bratislava",
      tag: "Web Development",
      image: "/fonts/sisi.png",
      link: "https://www.sisikovacsova.com",
      year: "2024"
    },
    {
      id: 3,
      title: "Natus Volare",
      category: "development",
      description: "Profesionálne dronové služby",
      tag: "Web Development",
      image: "/fonts/natus.png",
      link: "https://misk0o.github.io/Michal-Pipa-X-Natus-Volare/sluzby.html",
      year: "2024"
    },
    // Development page projects
    {
      id: 4,
      title: "Dashboard",
      category: "development",
      description: "Cloud Storage & Project Management",
      tag: "Saas Dashboard System",
      image: "/fonts/dashboard.png",
      link: "https://dashboard-blue-alpha.vercel.app",
      year: "2024"
    },
    {
      id: 5,
      title: "Invoice Generator",
      category: "development",
      description: "PBSQ Invoice Generator",
      tag: "Automatization",
      image: "/fonts/invoice.png",
      link: "https://next-js-invoice-generator-six.vercel.app/login",
      year: "2024"
    },
    {
      id: 6,
      title: "Name Sorting Tool",
      category: "development",
      description: "My Contacts App",
      tag: "Aplication Development",
      image: "/fonts/name.png",
      link: "https://name-sorting-tool.vercel.app",
      year: "2024"
    },
    {
      id: 14,
      title: "Michal Kurka",
      category: "development",
      description: "Web pre finančného poradcu",
      tag: "Web Development",
      image: "/image copy 5.png",
      link: "https://michal-kurka-web.vercel.app/domov",
      year: "2024"
    },
    {
      id: 15,
      title: "Karolína Pifflová",
      category: "development",
      description: "Portfólio umelkyňe",
      tag: "Web Development",
      image: "/image copy 6.png",
      link: "https://www.karolinaromanapifflova.com/",
      year: "2024"
    },
    {
      id: 16,
      title: "Účtovníctvo App",
      category: "development",
      description: "Aplikácia na zjednodušenie vedenia účtovníctva",
      tag: "Automatization",
      image: "/image copy 7.png",
      link: null,
      year: "2024"
    },
    {
      id: 17,
      title: "Andrej Paulička",
      category: "development",
      description: "Osobné portfólio developera",
      tag: "Web Development",
      image: "/image copy 8.png",
      link: "https://www.andrejpaulicka.com",
      year: "2024"
    },
    {
      id: 23,
      title: "New Era Microblading",
      category: "development",
      description: "E-shop pre kozmetické studio Beauty Institute",
      tag: "E-shop Development",
      image: "/screenshots/sisi-eshop.png",
      link: "https://www.sisikovacsova.com",
      year: "2026"
    },
    // Marketing projects
    {
      id: 18,
      title: "Bombafasada",
      category: "marketing",
      description: "Profesionálna fasádna spoločnosť — brand na sociálnych sieťach",
      tag: "Social Media Production",
      image: "/logos/bombafasada.png",
      link: "https://www.instagram.com/bombafasada",
      year: "2026"
    },
    {
      id: 19,
      title: "Kávička u Janíčka",
      category: "marketing",
      description: "Kaviareň — video produkcia a správa profilu",
      tag: "Social Media Production",
      image: "/screenshots/janicko-post.png",
      link: "https://www.instagram.com/kavicka_u_janicka",
      year: "2026"
    },
    // New development projects
    {
      id: 20,
      title: "Know3D",
      category: "development",
      description: "E-shop pre 3D tlač a filament",
      tag: "E-shop Development",
      image: "/screenshots/know3d.png",
      link: "https://www.know3d.sk",
      year: "2026"
    },
    {
      id: 21,
      title: "JVD Cars",
      category: "development",
      description: "Web pre autobazár a autoslužby",
      tag: "Web Development",
      image: "/screenshots/jvd-cars.png",
      link: "https://www.jvdcars.sk/",
      year: "2026"
    },
    // Design page projects
    {
      id: 22,
      title: "NIE RAKOVINE — Redesign",
      category: "design",
      description: "Redesign webu pre onkologické združenie",
      tag: "Web Design",
      image: "/screenshots/nie-rakovine-redesign.png",
      link: "https://onkoklub.sk",
      year: "2026"
    },
    {
      id: 7,
      title: "Hlavičkový papier",
      category: "design",
      description: "ukážka moderného technologického dizajnu",
      tag: "Brand Identity",
      image: "/fonts/Screenshot 2026-01-25 at 16.50.43.png",
      link: null,
      year: "2024"
    },
    {
      id: 8,
      title: "Dizajn letáčiku",
      category: "design",
      description: "jednoduchý a prehladný dizajn",
      tag: "BRAND IDENTITY",
      image: "/fonts/Screenshot 2026-01-25 at 16.51.43.png",
      link: null,
      year: "2024"
    },
    {
      id: 9,
      title: "Voucher dizajn",
      category: "design",
      description: "jednoduchý dizajn pre zľavovú kartičku",
      tag: "BRAND IDENTITY",
      image: "/fonts/Screenshot 2026-01-25 at 16.51.14.png",
      link: null,
      year: "2024"
    },
    {
      id: 10,
      title: "New Era eshop",
      category: "design",
      description: "dizajn nového eshopu",
      tag: "WEB DESIGN",
      image: "/fonts/Screenshot 2026-01-25 at 16.53.00.png",
      link: null,
      year: "2024"
    },
    {
      id: 11,
      title: "Autoškola Zvyky",
      category: "design",
      description: "Dizajn webstránky pre autoškolu",
      tag: "WEB DESIGN",
      image: "/fonts/Screenshot 2026-01-25 at 16.53.32.png",
      link: null,
      year: "2024"
    },
    {
      id: 12,
      title: "QR eshop",
      category: "design",
      description: "Dizajn moderného eshopu a identity značky",
      tag: "WEB DESIGN",
      image: "/fonts/Screenshot 2026-01-25 at 16.55.23.png",
      link: null,
      year: "2024"
    },
    {
      id: 13,
      title: "Visual Identity",
      category: "design",
      description: "Komplexná vizuálna identita značky",
      tag: "Brand Design",
      image: "/fonts/Screenshot 2026-01-25 at 16.56.20 1.png",
      link: null,
      year: "2024"
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "development": return "border-blue-400/50 text-blue-400";
      case "design": return "border-purple-400/50 text-purple-400";
      case "marketing": return "border-orange-400/50 text-orange-400";
      default: return "border-[#BAFF57]/50 text-[#BAFF57]";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case "development": return "Development";
      case "design": return "Design";
      case "marketing": return "Marketing";
      default: return category;
    }
  };

  return (
    <div ref={containerRef} className="bg-[#212121] h-screen overflow-y-scroll">
      
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
          
          <div className="group flex items-center gap-6 transition-all duration-300">
            <span className="text-[#BAFF57]/40 text-sm font-light">05</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.2em] text-[#BAFF57]/50">Projekty</span>
            <span className="w-4 h-[1px] bg-[#BAFF57]/50"></span>
          </div>
          
          <div className="absolute bottom-12 left-12 md:left-24 lg:left-32 text-[#BAFF57]/50 text-sm font-light">
            <p>team@nextlayer.studio</p>
            <p>+421 902 238 309</p>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 pt-12 sm:pt-16 md:pt-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 border border-[#BAFF57]/10 rotate-45"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-[#BAFF57]/10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#BAFF57]/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#BAFF57]/50"></div>
            <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest">Portfólio</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#BAFF57] mb-8 leading-tight">
            Naše projekty
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-[#BAFF57]/70 max-w-2xl leading-relaxed font-light">
            Prezrite si výber našich najlepších prác z oblasti vývoja, dizajnu a marketingu.
            Každý projekt je príbeh úspechu.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-4 sm:py-6 md:py-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#BAFF57]/50 text-sm uppercase tracking-widest mr-4">Filter:</span>
          
          <button 
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "all" 
                ? "bg-[#BAFF57] text-[#212121]" 
                : "border border-[#BAFF57]/30 text-[#BAFF57]/70 hover:border-[#BAFF57]/60"
            }`}
          >
            Všetky
          </button>
          
          <button 
            onClick={() => setActiveFilter("development")}
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "development" 
                ? "bg-[#BAFF57] text-[#212121]" 
                : "border border-[#BAFF57]/30 text-[#BAFF57]/70 hover:border-[#BAFF57]/60"
            }`}
          >
            Development
          </button>
          
          <button 
            onClick={() => setActiveFilter("design")}
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "design" 
                ? "bg-[#BAFF57] text-[#212121]" 
                : "border border-[#BAFF57]/30 text-[#BAFF57]/70 hover:border-[#BAFF57]/60"
            }`}
          >
            Design
          </button>
          
          <button 
            onClick={() => setActiveFilter("marketing")}
            className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
              activeFilter === "marketing" 
                ? "bg-[#BAFF57] text-[#212121]" 
                : "border border-[#BAFF57]/30 text-[#BAFF57]/70 hover:border-[#BAFF57]/60"
            }`}
          >
            Marketing
          </button>
          
          <span className="ml-auto text-[#BAFF57]/40 text-sm">
            {filteredProjects.length} {filteredProjects.length === 1 ? "projekt" : filteredProjects.length < 5 ? "projekty" : "projektov"}
          </span>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project) => {
            const cardContent = (
              <div className="group relative transition-all duration-700 ease-out h-full">
                {/* Card container */}
                <div className="relative border border-[#BAFF57]/20 bg-[#BAFF57]/5 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                  {/* Image container - top part */}
                  <div className={`relative aspect-[4/3] overflow-hidden ${
                    project.category === "design" && (project.id === 7 || project.id === 8) ? "bg-[#212121]/20" : ""
                  }`}>
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill
                      className={`transition-transform duration-700 group-hover:scale-110 ${
                        project.category === "design" && (project.id === 7 || project.id === 8) 
                          ? "object-contain p-2" 
                          : "object-cover"
                      }`}
                    />
                    {/* Corner accents on image */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#BAFF57]/50 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]"></div>
                  </div>
                  
                  {/* Content - bottom part */}
                  <div className={`p-6 bg-[#212121]/80 ${project.category === "design" && (project.id === 7 || project.id === 8) ? "flex-1 flex flex-col" : ""}`}>
                    <span className="text-[#BAFF57]/40 text-xs font-mono uppercase tracking-wider">{project.tag}</span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#BAFF57] mt-2">{project.title}</h3>
                    <p className="text-[#BAFF57]/60 text-sm mt-2 font-light">{project.description}</p>
                    
                    {project.link && (
                      <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-[#BAFF57] text-[#212121] text-sm uppercase tracking-wider font-medium">
                        {project.category === "marketing" ? "Navštíviť sociálne siete" : "Navštíviť web"}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom corner accents */}
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#BAFF57]/30 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:border-[#BAFF57]/60"></div>
                </div>
              </div>
            );

            return project.link ? (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {cardContent}
              </a>
            ) : (
              <div key={project.id}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#BAFF57]/10 rotate-45"></div>
        </div>

        <div className="text-center relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#BAFF57] mb-4 sm:mb-6">
            Máte projekt na mysli?
          </h2>
          <p className="text-lg text-[#BAFF57]/60 mb-8 font-light">
            Radi by sme aj váš projekt pridali do nášho portfólia. Kontaktujte nás a poďme spolupracovať.
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
