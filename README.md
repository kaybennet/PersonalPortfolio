# Personal Portfolio

My personal portfolio site, showing my projects, background and studies.

**Live:** https://personalportfolio-kayabennas-projects.vercel.app/

## Tech

- React + TypeScript, built with Vite (React Compiler enabled)
- Tailwind CSS v4 with light/dark theme tokens
- MUI for a few components (e.g. tooltips)
- Oxlint for linting
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the build locally
```

## Project images

Images are picked up automatically from `src/assets/images/<project-id>/`:

- `cover.*` – card thumbnail
- `cover_main.*` – optional larger cover (falls back to `cover`)
- `header.*` – project page header
- anything else – shown in the project's gallery

Blurred placeholders live in `src/assets/images_blurred/` with the same structure. Regenerate them with:

```bash
python blur.py
```

## License

© Kay Bennet Städing. All rights reserved.
