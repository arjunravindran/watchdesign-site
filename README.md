# Watch Design Self-Study Programme

A graduate-level self-study curriculum in watch design — 10 modules covering anatomy, brand strategy, mechanical movements, concept sketching, 2D rendering, 3D CAD, materials, visualisation, portfolio, and advanced topics.

**Live site:** deployed on Vercel

## Stack

- **Next.js 16** — App Router, static export (`output: 'export'`)
- **Tailwind CSS** — dark luxury design system defined in `tailwind.config.js`
- **Fuse.js** — client-side full-text search
- **Vercel Analytics** — page view tracking

No database, no server-side rendering, no API routes. All pages pre-render at build time to the `out/` directory.

## Local development

```bash
npm install
npm run dev      # localhost:3000
npm run build    # static export → out/
npm run lint
```

## Architecture

All curriculum data lives in `data/modules.js` — the single source of truth for every module, its metadata, and its slides. Each slide has a `type` field that maps to a React component in `components/slides/SlideViewer.js`.

Resources (books, videos, tools) are in `data/resources.js`, keyed by two-digit module number string.

See `CLAUDE.md` for full architecture notes including slide types, design tokens, and image conventions.

## Content editing

To add or edit a slide: update `data/modules.js`. To add a new slide type: write a component function in `SlideViewer.js`, wire it in the router block at the top of that file, then add slides of that type in the data file.

Images live in `public/images/` — generated illustrations under `generated/`, module-specific hand-drawn work under `m{NN}/`.
