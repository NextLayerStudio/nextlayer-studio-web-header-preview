/**
 * Builds lightweight grid previews (`*-preview.mp4`) and poster frames for every
 * campaign reel, then uploads them to the public Blob store.
 *
 * Usage: npm run previews:blob   (requires ffmpeg + BLOB_READ_WRITE_TOKEN)
 */

import { put } from "@vercel/blob";
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const KAMPANE_DIR = path.join(ROOT, "public", "kampane");
const OUT_DIR = path.join(ROOT, ".previews");
const LEGACY_BASE = "https://akinb3uuwih4cf6s.public.blob.vercel-storage.com";

/** Reels that only exist on the legacy CDN */
const REMOTE_SOURCES = [
  { url: `${LEGACY_BASE}/bombafasada/video1.mp4`, pathname: "kampane/bombafasada/video1.mp4" },
  { url: `${LEGACY_BASE}/bombafasada/video2.mp4`, pathname: "kampane/bombafasada/video2.mp4" },
];

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

const token =
  process.env.BLOB_READ_WRITE_TOKEN ?? process.env.NLS_BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("Missing BLOB_READ_WRITE_TOKEN or NLS_BLOB_READ_WRITE_TOKEN.");
  process.exit(1);
}

function walkMp4(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMp4(full));
    else if (entry.name.endsWith(".mp4") && !entry.name.endsWith("-preview.mp4")) out.push(full);
  }
  return out;
}

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
}

async function upload(localPath, pathname, contentType) {
  const result = await put(pathname, fs.readFileSync(localPath), {
    access: "public",
    token,
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return result.url;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const sources = walkMp4(KAMPANE_DIR).map((file) => ({
    file,
    pathname: `kampane/${path.relative(KAMPANE_DIR, file).split(path.sep).join("/")}`,
  }));

  for (const remote of REMOTE_SOURCES) {
    const local = path.join(OUT_DIR, remote.pathname.replaceAll("/", "__"));
    if (!fs.existsSync(local)) {
      process.stdout.write(`Download ${remote.pathname}… `);
      const res = await fetch(remote.url);
      if (!res.ok) {
        console.log(`skipped (HTTP ${res.status})`);
        continue;
      }
      fs.writeFileSync(local, Buffer.from(await res.arrayBuffer()));
      console.log("ok");
    }
    sources.push({ file: local, pathname: remote.pathname });
  }

  for (const { file, pathname } of sources) {
    const base = pathname.replace(/\.mp4$/, "");
    const flat = base.replaceAll("/", "__");
    const previewOut = path.join(OUT_DIR, `${flat}-preview.mp4`);
    const posterOut = path.join(OUT_DIR, `${flat}.jpg`);

    process.stdout.write(`Preview ${pathname}… `);
    ffmpeg([
      "-i", file,
      "-t", "12",
      "-an",
      "-vf", "scale=360:-2,fps=24",
      "-c:v", "libx264",
      "-preset", "veryfast",
      "-crf", "30",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      previewOut,
    ]);
    ffmpeg(["-ss", "0.5", "-i", file, "-frames:v", "1", "-vf", "scale=540:-2", "-q:v", "4", posterOut]);

    await upload(previewOut, `${base}-preview.mp4`, "video/mp4");
    await upload(posterOut, `${base}.jpg`, "image/jpeg");
    const kb = Math.round(fs.statSync(previewOut).size / 1024);
    console.log(`ok (${kb} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
