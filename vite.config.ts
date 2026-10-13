import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { parse as parseToml } from "smol-toml";

/** Turns `import x from "./file.toml"` into a plain JSON module (parsed at build time). */
const toml = (): Plugin => ({
  name: "toml",
  transform(code, id) {
    if (!id.endsWith(".toml")) return null;
    const json = JSON.stringify(parseToml(code), (_, v) =>
      v instanceof Date ? v.toISOString().slice(0, 10) : v,
    );
    return { code: `export default ${json};`, map: null };
  },
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    toml(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
