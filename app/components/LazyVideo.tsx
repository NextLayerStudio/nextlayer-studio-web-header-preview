"use client";

import { useEffect, useRef, useState } from "react";
import { legacyMediaUrl, mediaUrl } from "../../lib/media";

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Load and play when intersecting (default true) */
  playWhenVisible?: boolean;
  /** Load src immediately (homepage hero reels) */
  priority?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  /** Drop `src` when off-screen to free decoders (gallery grids) */
  unloadWhenHidden?: boolean;
  /** Min visible fraction before play (0–1) */
  visibilityThreshold?: number;
  rootMargin?: string;
};

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
}

export default function LazyVideo({
  src,
  poster,
  className = "",
  style,
  playWhenVisible = true,
  priority = false,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  unloadWhenHidden = false,
  visibilityThreshold = 0.15,
  rootMargin = "80px",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [resolvedSrc, setResolvedSrc] = useState(() => mediaUrl(src));
  const resolvedPoster = poster ? mediaUrl(poster) : undefined;

  useEffect(() => {
    setResolvedSrc(mediaUrl(src));
  }, [src]);

  useEffect(() => {
    if (priority) setShouldLoad(true);
  }, [priority]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isInViewport(el)) setShouldLoad(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const visibleEnough =
          entry.isIntersecting && ratio >= visibilityThreshold;

        if (visibleEnough) {
          setShouldLoad(true);
          if (playWhenVisible && autoPlay) {
            el.play().catch(() => {});
          }
        } else {
          el.pause();
          if (unloadWhenHidden && !entry.isIntersecting) {
            setShouldLoad(false);
          }
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.35, 0.5, 0.75, 1],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay, playWhenVisible, unloadWhenHidden, visibilityThreshold, rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad || !autoPlay || !playWhenVisible) return;
    el.play().catch(() => {});
  }, [shouldLoad, autoPlay, playWhenVisible, resolvedSrc]);

  const handleError = () => {
    const legacy = legacyMediaUrl(src);
    if (legacy && resolvedSrc !== legacy) {
      setResolvedSrc(legacy);
      setShouldLoad(true);
    }
  };

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={shouldLoad ? resolvedSrc : undefined}
      poster={resolvedPoster}
      preload={shouldLoad ? "auto" : "none"}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={false}
      onError={handleError}
    />
  );
}
