"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { DesignWork } from "../projekty/designWorks";

type DesignGalleryProps = {
  works: DesignWork[];
  onOpenChange?: (open: boolean) => void;
};

export default function DesignGallery({ works, onOpenChange }: DesignGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;
  const current = open ? works[active] : null;

  const close = useCallback(() => {
    setActive(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const show = useCallback(
    (index: number) => {
      setActive(index);
      onOpenChange?.(true);
    },
    [onOpenChange]
  );

  const step = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => {
        if (i === null || works.length === 0) return i;
        return (i + dir + works.length) % works.length;
      });
    },
    [works.length]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        {works.map((work, i) => (
          <button
            key={work.id}
            type="button"
            onClick={() => show(i)}
            className="group relative mb-3 md:mb-4 w-full break-inside-avoid overflow-hidden bg-[#212121] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label={`Otvoriť ${work.title}`}
          >
            <div className={`relative ${work.aspect === "landscape" ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 transition-all duration-300">
                {work.client && (
                  <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-[#BAFF57]">{work.client}</p>
                )}
                <p className="mt-0.5 text-sm md:text-base font-bold text-white leading-tight">{work.title}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {open && current && (
        <div
          className="fixed inset-0 z-[80] bg-[#212121]/92 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 md:px-8 py-4 shrink-0">
            <p className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-widest">
              {String((active ?? 0) + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={close}
              className="w-11 h-11 bg-[#BAFF57] text-black flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Zavrieť"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-12 md:px-24 pb-6 min-h-0">
            {works.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#BAFF57]/30 text-[#BAFF57] flex items-center justify-center hover:bg-[#BAFF57] hover:text-black transition-colors"
                  aria-label="Predošlý"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#BAFF57]/30 text-[#BAFF57] flex items-center justify-center hover:bg-[#BAFF57] hover:text-black transition-colors"
                  aria-label="Ďalší"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative w-full h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 90vw, 768px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="shrink-0 px-5 md:px-8 pb-6 md:pb-8 text-center" onClick={(e) => e.stopPropagation()}>
            {current.client && (
              <p className="text-[#BAFF57]/50 text-[10px] font-mono uppercase tracking-widest">{current.client}</p>
            )}
            <p className="mt-1 text-lg md:text-2xl font-bold text-[#BAFF57]">{current.title}</p>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[#BAFF57]/40">
              {current.tag}
              <span className="mx-2">·</span>
              {current.year}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
