import { ERR_IMG } from "./consts";

const imageModules = import.meta.glob(
  "../routes/ProjectsPage/images/*/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" },
) as Record<string, string>;

const normalize = (s: string) => s.toLowerCase().replace(/[-_]/g, " ");

const imagesById: Record<string, ProjectImage[]> = {};
for (const [path, src] of Object.entries(imageModules).sort()) {
  const parts = path.split("/");
  const id = parts.at(-2)!;
  const file = parts.at(-1)!;
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
