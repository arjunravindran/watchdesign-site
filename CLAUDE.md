# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Static export to out/
npm run lint     # ESLint via Next.js
```

There are no tests. The `scratch/` directory contains one-off utility scripts (not production code) — ignore it unless explicitly working on data migration.

## Architecture

### Overview
Next.js 14 App Router site configured as a **static export** (`output: 'export'`, `trailingSlash: true`). All pages are pre-rendered at build time to the `out/` directory. There is no server-side rendering or API routes.

### Pages
- `/` — curriculum homepage with module grid
- `/modules/[slug]/` — individual module page; `generateStaticParams()` pre-renders all slugs from `data/modules.js`
- `/search/` — client-side full-text search using Fuse.js; must be wrapped in `<Suspense>` because it uses `useSearchParams()`

### Data layer
All curriculum data lives in two files:

- **`data/modules.js`** — exports `modules` (array) and `buildSearchIndex()`. This is the single source of truth for every module, its metadata, and its slides. Adding a new module means appending to this array. Slides are inline objects inside each module's `slides: []` array.
- **`data/resources.js`** — exports `resourcesByModule` keyed by two-digit module number string (`'01'`, `'02'`, …). Each value is an array of `{ title, source, type, tier, url }` objects where `tier` is `'Essential'` or `'Recommended'`.

### Slide type system
Each slide object has a `type` field. `SlideViewer.js` maps every `type` string to a dedicated React component. `SlideLayout` is a shared wrapper that automatically creates a 12-column split (content left, image right) when `slide.image` is present.

Current types: `hero`, `overview`, `content`, `grid`, `list`, `callout`, `compare`, `sequence`, `assignment`, `summary`, `resources`, `endcard`, `flow`, `table`, `pricing-table`, `movement-selection`, `movements-grid`, `dimensional-stack`, `crown-positions`, `case-shapes`, `dial-zones`, `illustrator-tools`, `cad-timeline`, `cad-errors`, `case-materials`, `lume-harmony`, `light-physics`, `trend-compass`, `pricing-calc`, `startup-roadmap`.

To add a new slide type: (1) write the React component in `SlideViewer.js`, (2) add a condition in the `SlideViewer` render block, (3) add slides of that type in `data/modules.js`.

Interactive slides (`flow`, and the hands grid on `m01-s08`) use `useState` for hover state — these must remain in `SlideViewer.js` which is already a client component. `SlideDeck.js` is explicitly `'use client'`; `SlideViewer.js` implicitly inherits client context through it.

### Design system
Dark luxury palette defined in `tailwind.config.js`:
- Background hierarchy: `bg` (#0D0D0A) → `card` (#1A1A14) → `rule` (#2E2C24)
- Accent: `gold` (#C8A96E), `gold-dim` (#8A6E3C)
- Text hierarchy: `mist` (headings) → `ivory` → `grey` (body)

Typography: `font-serif` = Playfair Display, `font-sans` = Inter (both loaded via Google Fonts in `globals.css`).

Shared component classes defined in `globals.css`: `.eyebrow` (small-caps gold label), `.slide-card` (dark card with border), `.module-card` (card with hover gold border).

### Static images
Module images are served from `/public/images/`. Generated illustrations live under `/public/images/generated/` (named `m{NN}_s{NN}_*.png`). Module-specific hand-drawn illustrations are under `/public/images/m{NN}/`.

### Search
`buildSearchIndex()` flattens all modules and their slides into a flat array. Fuse.js uses this with weighted keys (`title`, `tag`, `body`) and a 0.35 threshold. The Fuse instance is lazily created and cached at module scope in the search page.
