/**
 * Uploads local public/kampane assets and mirrors legacy Vercel Blob files
 * into the store configured via BLOB_READ_WRITE_TOKEN.
 *
 * Usage: node scripts/sync-blob-media.mjs
 * Writes lib/blob-base-url.txt and updates NEXT_PUBLIC_BLOB_BASE_URL hint.
 */

import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const KAMPANE_DIR = path.join(ROOT, "public", "kampane");

function loadEnvFile() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile();

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in environment or .env.");
  process.exit(1);
}

const LEGACY_BASE = "https://akinb3uuwih4cf6s.public.blob.vercel-storage.com";
const REMOTE_MIRRORS = [
  { url: `${LEGACY_BASE}/andrej.mp4`, pathname: "site/andrej.mp4" },
  { url: `${LEGACY_BASE}/andrej2.mp4`, pathname: "site/andrej2.mp4" },
  { url: `${LEGACY_BASE}/andrej3.mp4`, pathname: "site/andrej3.mp4" },
  { url: `${LEGACY_BASE}/bombafasada/video1.mp4`, pathname: "kampane/bombafasada/video1.mp4" },
  { url: `${LEGACY_BASE}/bombafasada/video2.mp4`, pathname: "kampane/bombafasada/video2.mp4" },
  { url: `${LEGACY_BASE}/janicko/video1.mp4`, pathname: "marketing/janicko/video1.mp4" },
];

function walkFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out;
}

async function uploadFile(localPath, pathname) {
  const body = fs.readFileSync(localPath);
  const contentType = localPath.endsWith(".mp4")
    ? "video/mp4"
    : localPath.endsWith(".jpg") || localPath.endsWith(".jpeg")
      ? "image/jpeg"
      : localPath.endsWith(".png")
        ? "image/png"
        : undefined;

  const result = await put(pathname, body, {
    access: "public",
    token,
    contentType,
    addRandomSuffix: false,
  });
  return result;
}

async function mirrorRemote({ url, pathname }) {
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Skip remote (HTTP ${res.status}): ${url}`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") ?? "video/mp4";
  return put(pathname, buffer, {
    access: "public",
    token,
    contentType,
    addRandomSuffix: false,
  });
}

function blobOrigin(url) {
  return new URL(url).origin;
}

async function main() {
  const uploaded = [];

  const localFiles = walkFiles(KAMPANE_DIR).filter((f) => /\.(mp4|jpe?g|png|webp)$/i.test(f));
  for (const file of localFiles) {
    const rel = path.relative(KAMPANE_DIR, file).split(path.sep).join("/");
    const pathname = `kampane/${rel}`;
    process.stdout.write(`Upload ${pathname}… `);
    const result = await uploadFile(file, pathname);
    uploaded.push(result);
    console.log("ok");
  }

  for (const item of REMOTE_MIRRORS) {
    process.stdout.write(`Mirror ${item.pathname}… `);
    const result = await mirrorRemote(item);
    if (result) {
      uploaded.push(result);
      console.log("ok");
    } else {
      console.log("skipped");
    }
  }

  if (uploaded.length === 0) {
    console.error("Nothing uploaded.");
    process.exit(1);
  }

  const baseUrl = blobOrigin(uploaded[0].url);
  const baseFile = path.join(ROOT, "lib", "blob-base-url.txt");
  fs.writeFileSync(baseFile, `${baseUrl}\n`, "utf8");
  console.log(`\nBlob public base URL:\n${baseUrl}`);
  console.log(`\nAdd to .env and Vercel:\nNEXT_PUBLIC_BLOB_BASE_URL=${baseUrl}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
