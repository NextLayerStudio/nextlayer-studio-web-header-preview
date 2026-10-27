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
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (playWhenVisible && autoPlay) {
            el.play().catch(() => {});
          }
        } else if (playWhenVisible) {
          el.pause();
        }
      },
      { rootMargin: "320px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlay, playWhenVisible]);

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
      preload={shouldLoad ? "metadata" : "none"}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      autoPlay={false}
      onError={handleError}
    />
  );
}
