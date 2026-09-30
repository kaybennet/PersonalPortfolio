import { imageModules, imagesById } from "./images";

for (const [path, src] of Object.entries(imageModules).sort()) {
  const rel = path.slice(IMAGES_DIR.length); // "hobbies/hiking/summit.jpg"
  const slash = rel.lastIndexOf("/");
  if (slash === -1) continue; // loose files directly in images/ have no id

  const id = rel.slice(0, slash); // "hobbies/hiking"
  const file = rel.slice(slash + 1); // "summit.jpg"
  const name = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  (imagesById[id] ??= []).push({ src, name });
}
