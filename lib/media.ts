/**
 * Resolves site media paths to Vercel Blob CDN when NEXT_PUBLIC_BLOB_BASE_URL is set.
 * Paths like /kampane/... or /site/... stay as-is when env is missing (local public/).
 */

const BLOB_BASE = process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/$/, "");

export function mediaUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!BLOB_BASE) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (
    normalized.startsWith("/kampane/") ||
    normalized.startsWith("/site/") ||
    normalized.startsWith("/marketing/")
  ) {
    return `${BLOB_BASE}${normalized}`;
  }

  return path;
}
