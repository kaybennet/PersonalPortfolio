import { ERR_IMG } from "./consts";

const IMAGES_DIR = "/src/assets/images/";
const BLURRED_DIR = "/src/assets/images_blurred/";

const originals = import.meta.glob<string>(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" },
);
const blurred = import.meta.glob<string>(
  "/src/assets/images_blurred/**/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" },
);

const normalize = (s: string) => s.toLowerCase().replace(/[-_]/g, " ");

const imagesById: Record<string, ProjectImage[]> = {};
const blurredBySrc = new Map<string, string>();

for (const [path, src] of Object.entries(originals).sort()) {
  const rel = path.slice(IMAGES_DIR.length);
  const slash = rel.lastIndexOf("/");
  if (slash === -1) continue;

  const id = rel.slice(0, slash);
  const name = rel
    .slice(slash + 1)
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ");

  const blur = blurred[BLURRED_DIR + rel];
  if (blur) blurredBySrc.set(src, blur);

  (imagesById[id] ??= []).push({ src, name, alt: name });
}

const RESERVED = new Set(["cover", "header", "cover_main"].map(normalize));

export const getImages = (id: string, getAll = false): ProjectImage[] =>
  (imagesById[id] ?? []).filter(
    (img) => getAll || !RESERVED.has(normalize(img.name)),
  );

const findImage = (id: string, name: string) =>
  getImages(id, true).find((img) => normalize(img.name) === normalize(name));

export const getCover = (id: string): ProjectImage =>
  findImage(id, "cover") ?? ERR_IMG;

export const getHeaderPic = (id: string): ProjectImage =>
  findImage(id, "header") ?? ERR_IMG;

export const getMainCover = (id: string): ProjectImage =>
  findImage(id, "cover_main") ?? getCover(id);

export const formatStarted = (d: Date) =>
  d.toLocaleDateString("en", { month: "short", year: "numeric" });

export const blurredFor = (src?: string) =>
  src ? blurredBySrc.get(src) : undefined;
