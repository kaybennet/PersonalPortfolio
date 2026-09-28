import noCoverSrc from "../routes/ProjectsPage/images/no_cover.png";

// Load every image in images/<id>/ at build time and group by folder name.
const imageModules = import.meta.glob(
  "../routes/ProjectsPage/images/*/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" },
) as Record<string, string>;

export type ProjectImage = { src: string; name: string };

const normalize = (s: string) => s.toLowerCase().replace(/[-_]/g, " ");

const imagesById: Record<string, ProjectImage[]> = {};
for (const [path, src] of Object.entries(imageModules).sort()) {
  const parts = path.split("/");
  const id = parts.at(-2)!;
  const file = parts.at(-1)!;
  const name = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  (imagesById[id] ??= []).push({ src, name });
}

const noCover: ProjectImage = { src: noCoverSrc, name: "no cover" };

export const getImages = (id: string): ProjectImage[] => imagesById[id] ?? [];

const findImage = (id: string, name: string) =>
  getImages(id).find((img) => normalize(img.name) === normalize(name));

export const getCover = (id: string): ProjectImage =>
  findImage(id, "cover") ?? noCover;

export const getMainCover = (id: string): ProjectImage =>
  findImage(id, "cover_main") ?? getCover(id);

export const formatStarted = (d: Date) =>
  d.toLocaleDateString("en", { month: "short", year: "numeric" });
