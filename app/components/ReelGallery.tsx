"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mediaUrl } from "../../lib/media";
import LazyVideo from "./LazyVideo";

export type GalleryReel = {
  src: string;
  poster?: string;
  title: string;
  client: string;
  tag?: string;
};

type ReelGalleryProps = {
  reels: GalleryReel[];
  onOpenChange?: (open: boolean) => void;
};

/** Poster while the MP4 buffers (Bombafasáda reels have no JPG in data yet) */
function gridPoster(reel: GalleryReel): string | undefined {
  if (reel.poster) return reel.poster;
  if (reel.src.includes("/bombafasada/")) return "/logos/bombafasada-clean.png";
  return undefined;
}

export default function ReelGallery({ reels, onOpenChange }: ReelGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lightboxReady, setLightboxReady] = useState(false);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const open = active !== null;
  const current = open ? reels[active] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

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
        if (i === null || reels.length === 0) return i;
        return (i + dir + reels.length) % reels.length;
      });
    },
    [reels.length]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  useEffect(() => {
    if (!open || active === null || !current) {
      setLightboxReady(false);
      return;
    }

    const video = lightboxVideoRef.current;
    if (!video) return;

    setLightboxReady(false);
    const url = mediaUrl(current.src);
    video.src = url;
    video.poster = current.poster ? mediaUrl(current.poster) : "";
    video.load();

    const onCanPlay = () => {
      setLightboxReady(true);
      video.play().catch(() => {});
    };
    video.addEventListener("canplay", onCanPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.pause();
    };
  }, [open, active, current]);

  const dialog =
    open && current && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] bg-[#212121]/95 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={close}
          >
            <div className="flex items-center justify-between px-5 md:px-8 py-4 shrink-0">
              <p className="text-[#BAFF57]/50 text-xs font-mono uppercase tracking-widest">
                {String((active ?? 0) + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="w-11 h-11 bg-[#BAFF57] text-black flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Zavrieť"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center px-4 sm:px-14 md:px-24 pb-4 min-h-0">
              {reels.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 border border-[#BAFF57]/30 text-[#BAFF57] flex items-center justify-center hover:bg-[#BAFF57] hover:text-black transition-colors"
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
                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 border border-[#BAFF57]/30 text-[#BAFF57] flex items-center justify-center hover:bg-[#BAFF57] hover:text-black transition-colors"
                    aria-label="Ďalší"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}

              <div
                className="relative h-[min(72vh,720px)] w-auto aspect-[9/16] max-w-[min(92vw,420px)] bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                {!lightboxReady && (
                  <div className="absolute inset-0 flex items-center justify-center z-[1] bg-black/80">
                    <span className="w-8 h-8 border-2 border-[#BAFF57]/30 border-t-[#BAFF57] rounded-full animate-spin" />
                  </div>
                )}
                <video
                  ref={lightboxVideoRef}
                  className="absolute inset-0 w-full h-full object-contain"
                  muted
                  loop
                  playsInline
                  autoPlay
                  controls
                  preload="auto"
                />
              </div>
            </div>

            <div className="shrink-0 px-5 md:px-8 pb-6 md:pb-8 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-[#BAFF57]/50 text-[10px] font-mono uppercase tracking-widest">{current.client}</p>
              <p className="mt-1 text-lg md:text-2xl font-bold text-[#BAFF57]">{current.title}</p>
              {current.tag && (
                <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[#BAFF57]/40">{current.tag}</p>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {reels.map((reel, i) => (
          <button
            key={reel.src}
            type="button"
            onClick={() => show(i)}
            className="group relative aspect-[9/16] overflow-hidden bg-black text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black [content-visibility:auto]"
            aria-label={`Otvoriť reel: ${reel.title}`}
          >
            <LazyVideo
              src={reel.src}
              poster={gridPoster(reel)}
              playWhenVisible
              autoPlay
              unloadWhenHidden
              visibilityThreshold={0.35}
              rootMargin="48px"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <span className="absolute inset-x-0 bottom-0 p-3 md:p-4 pointer-events-none">
              <span className="block text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-[#BAFF57]">
                {reel.client}
                {reel.tag ? ` · ${reel.tag}` : ""}
              </span>
              <span className="mt-0.5 block text-sm md:text-base font-bold text-white leading-tight">{reel.title}</span>
            </span>
          </button>
        ))}
      </div>
      {dialog}
    </>
  );
}
