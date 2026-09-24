// Load every image in ./images/<id>/ at build time and group by folder name.
const imageModules = import.meta.glob(
  "./images/*/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, import: "default" },
) as Record<string, string>;

export type ProjectImage = { src: string; name: string };

const imagesById: Record<string, ProjectImage[]> = {};
for (const [path, src] of Object.entries(imageModules).sort()) {
  const [, , id, file] = path.split("/");
  const name = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  (imagesById[id] ??= []).push({ src, name });
}

export const getImages = (id: string): ProjectImage[] => imagesById[id] ?? [];

export const formatStarted = (d: Date) =>
  d.toLocaleDateString("en", { month: "short", year: "numeric" });
