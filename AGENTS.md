# AGENTS.md

Vite + React 18 + TS SPA (shadcn/ui, Tailwind) for Jones Plumbing. Marketing
site only — no backend, no env vars required.

## Commands (pnpm only; pinned via mise.toml)

- `pnpm dev` — Vite dev server on **:8080** (host `::`); HMR overlay disabled.
- `pnpm build` / `pnpm build:dev` — production / development-mode build.
- `pnpm lint` — ESLint flat config (`eslint.config.js`).
- `pnpm test` — Vitest run once; `pnpm test:watch` for watch mode.
- Single test: `pnpm test path/to/file.test.ts` or add `-t "<test name>"`.
- No `typecheck` script — types are only checked implicitly during `vite build`.

## Layout

- `src/App.tsx` — all routes registered here (react-router-dom). Add new pages
  to both `src/pages/` and the `<Routes>` block.
- `src/context/LocationContext.tsx` — two-location state (Fort Worth TX,
  Medford OR); consume via `useLocationContext()`. Phone numbers and addresses
  live here, not scattered across pages.
- `src/components/ui/*` — shadcn/ui primitives; add via shadcn CLI.
  `components.json` aliases: `@/components`, `@/components/ui`, `@/lib/utils`,
  `@/hooks`. Base color `slate`, style `default`.
- `src/data/services.ts` — shared service content referenced by pages.
- `public/admin/index.html` — standalone Sveltia CMS admin page; not part of SPA routing (see **Content** below).

## Content (Sveltia CMS)

- Admin UI: `/admin` served from `public/admin/index.html`, which loads
  `@sveltia/cms@0.151.1` from unpkg.
- Config: `public/admin/config.json` — GitHub backend (`repo`, `base_url` for
  auth worker), singletons/collections list, and media transformation settings.
- CMS-managed content lives under `src/cms/` (currently just `seo.json`);
  import these files using `@/cms/<name>.json` — not relative paths.
- Media: stored under `public/media/`, referenced in content as `/media/...`
  (the `public_folder` prefix), not as `@/` aliases.
- To add a managed content file: add a singleton or collection entry to
  `config.json`, then import the resulting JSON from `src/cms/<name>.json`.
- Version pin: the unpkg script URL in `index.html` and the `$schema` URL in
  `config.json` both hardcode `0.151.1` — bump both together when upgrading.

## Conventions & gotchas

- Import alias `@/*` → `src/*` (vite, vitest, tsconfig, components.json all
  agree — use `@/` everywhere, never relative paths across directories).
- TS is **loose**: `strict`, `strictNullChecks`, `noImplicitAny`,
  `noUnusedLocals/Params` all disabled. Don't rely on strict-mode diagnostics.
- ESLint has `@typescript-eslint/no-unused-vars` **off** and
  `react-refresh/only-export-components` as a warning — don't try to fix these.
- Fonts: `font-display` = Oswald, `font-body` = Inter (Tailwind theme extends).
- Provider order in `App.tsx` matters: `QueryClientProvider > TooltipProvider >
LocationProvider > Toaster/Sonner > BrowserRouter`. `<ScrollToTop />` inside
  BrowserRouter resets scroll position on every route change.

## Testing

- Vitest + Testing Library + jsdom; globals enabled (`vitest/globals` in
  `tsconfig.app.json` types). Setup: `src/test/setup.ts` (mocks `matchMedia`).
- Test glob: `src/**/*.{test,spec}.{ts,tsx}`.

## Misc

- Vitest is the sole test runner; no Playwright setup exists.
- `dist/` is a stale build artifact (git-ignored); safe to delete and rebuild.
- `.nova/Configuration.json` pins the OpenCode devx port to `13261`.
