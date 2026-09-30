import { ERR_IMG } from "./consts";

const imageModules = import.meta.glob(
  "../images/**/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" },
) as Record<string, string>;

const normalize = (s: string) => s.toLowerCase().replace(/[-_]/g, " ");
const IMAGES_DIR = "../images/";

const imagesById: Record<string, ProjectImage[]> = {};
for (const [path, src] of Object.entries(imageModules).sort()) {
  const rel = path.slice(IMAGES_DIR.length); // "hobbies/hiking/summit.jpg"
  const slash = rel.lastIndexOf("/");
  if (slash === -1) continue; // loose files directly in images/ have no id

  const id = rel.slice(0, slash); // "hobbies/hiking"
  const file = rel.slice(slash + 1); // "summit.jpg"
  const name = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  (imagesById[id] ??= []).push({ src, name });
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

const opts = { eager: true, import: "default" } as const;
const originals = import.meta.glob<string>(
  "/src/images/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);
const blurred = import.meta.glob<string>(
  "/src/images_blurred/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);

const blurredBySrc = new Map<string, string>();
for (const [path, url] of Object.entries(originals)) {
  const b = blurred[path.replace("/src/images/", "/src/images_blurred/")];
  if (b) blurredBySrc.set(url, b);
}

/** URL of the blurred sibling of an image, if one exists. */
export const blurredFor = (src?: string) =>
  src ? blurredBySrc.get(src) : undefined;
