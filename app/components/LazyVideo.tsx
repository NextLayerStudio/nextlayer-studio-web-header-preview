"use client";

import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "../../lib/media";

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Load and play when intersecting (default true) */
  playWhenVisible?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
};

export default function LazyVideo({
  src,
  poster,
  className = "",
  style,
  playWhenVisible = true,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const resolvedSrc = mediaUrl(src);
  const resolvedPoster = poster ? mediaUrl(poster) : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (playWhenVisible && autoPlay) {
            el.play().catch(() => {});
          }
        } else if (playWhenVisible) {
          el.pause();
        }
      },
      { rootMargin: "240px", threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay, playWhenVisible]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad || !autoPlay || !playWhenVisible) return;
    el.play().catch(() => {});
  }, [shouldLoad, autoPlay, playWhenVisible, resolvedSrc]);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={shouldLoad ? resolvedSrc : undefined}
      poster={resolvedPoster}
      preload="none"
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={false}
    />
  );
}
