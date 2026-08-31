import Image from "next/image";
import Link from "next/link";

export default function PageFooter() {
  return (
    <footer className="relative bg-[#212121] text-[#BAFF57] snap-start snap-always flex flex-col justify-between overflow-hidden min-h-screen md:h-screen py-16 px-5 md:py-12 md:px-12 lg:px-16">
      <div className="flex items-start justify-between gap-8">
        <Link href="/">
          <Image src="/fonts/Group.png" alt="NextLayer Studio" width={80} height={80} className="h-12 w-auto brightness-0 invert" />
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-sm">
          <Link href="/marketing" className="hover:text-white transition-colors">Marketing</Link>
          <Link href="/development" className="hover:text-white transition-colors">Development</Link>
          <Link href="/design" className="hover:text-white transition-colors">Design</Link>
          <Link href="/projekty" className="hover:text-white transition-colors">Projekty</Link>
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
          <Link href="/obchodne-podmienky" className="hover:text-white">Podmienky</Link>
          <Link href="/ochrana-sukromia" className="hover:text-white">Údaje</Link>
          <Link href="/informacie-o-firme" className="hover:text-white">O firme</Link>
        </div>
      </div>
    </footer>
  );
}
