"use client";

import Image from "next/image";
import { mediaUrl } from "../../lib/media";
import LazyVideo from "./LazyVideo";
import type { CampaignAd } from "../projekty/kampane/data";

type CampaignAdMediaProps = {
  ad: CampaignAd;
  sizes?: string;
};

export default function CampaignAdMedia({ ad, sizes = "(max-width: 768px) 50vw, 25vw" }: CampaignAdMediaProps) {
  if (ad.type === "video") {
    return (
      <LazyVideo
        src={ad.src}
        poster={ad.poster}
        className="absolute inset-0 w-full h-full object-cover"
        playWhenVisible
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <Image
      src={mediaUrl(ad.src)}
      alt={ad.title}
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
}
