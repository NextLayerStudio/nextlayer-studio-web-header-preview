/**
 * Resolves reel / campaign media URLs for production.
 *
 * - Karin, Kvety, Zvyky MP4s live in `public/kampane/` → same-origin on Vercel.
 * - Bombafasáda, homepage about reels, Janíčko → legacy Blob CDN (not in repo).
 * - After `npm run sync:blob`, set NEXT_PUBLIC_BLOB_BASE_URL to serve those from your store too.
 */

const BLOB_BASE = process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/$/, "");

/** Previous project Blob — still hosts bombafasáda / about / janicko until sync completes */
export const LEGACY_BLOB_CDN = "https://akinb3uuwih4cf6s.public.blob.vercel-storage.com";

/** Shipped with the Next.js deployment (do not rewrite to a possibly empty new Blob store) */
const LOCAL_KAMPANE_PREFIXES = ["/kampane/karin-art/", "/kampane/kvety/", "/kampane/zvyky/"];

function normalize(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

/** Assets that are not in `public/` — map to legacy CDN path layout */
export function legacyMediaUrl(path: string): string | null {
  const n = normalize(path);
  if (n.startsWith("/site/")) {
    return `${LEGACY_BLOB_CDN}/${n.slice("/site/".length)}`;
  }
  if (n.startsWith("/kampane/bombafasada/")) {
    return `${LEGACY_BLOB_CDN}/bombafasada/${n.slice("/kampane/bombafasada/".length)}`;
  }
  if (n.startsWith("/marketing/janicko/")) {
    return `${LEGACY_BLOB_CDN}/janicko/${n.slice("/marketing/janicko/".length)}`;
  }
  return null;
}

export function mediaUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const n = normalize(path);

  if (LOCAL_KAMPANE_PREFIXES.some((prefix) => n.startsWith(prefix))) {
    return n;
  }

  const legacy = legacyMediaUrl(n);
  if (legacy) return legacy;

  if (
    BLOB_BASE &&
    (n.startsWith("/kampane/") || n.startsWith("/site/") || n.startsWith("/marketing/"))
  ) {
    return `${BLOB_BASE}${n}`;
  }

  return n;
}
