# AGENTS.md

Vite + React 18 + TS SPA (shadcn/ui, Tailwind) for Jones Plumbing. Marketing
site only — no backend, no env vars required.

## Commands (pnpm only; pinned via mise.toml)

- `pnpm dev` — Vite dev server on **:8080** (host `::`); HMR overlay disabled.
- `pnpm build` / `pnpm build:dev` — static-site build via `vite-react-ssg build`; outputs per-route nested HTML into `dist/`.
- `pnpm preview` — Vite preview of the built `dist/` output.
- `pnpm check` — `tsc -b --noEmit` across both project references (`tsconfig.app.json` for `src/`, `tsconfig.node.json` for `vite.config.ts`). `vite-react-ssg build` also does an implicit type check, but this is the dedicated standalone command.
- `pnpm format` — Prettier across the repo (tabs, no semis, `printWidth: 100`, `experimentalTernaries`; ignores `node_modules/`, `pnpm-lock.yaml`, `dist/`). Run before committing.
- `pnpm lint` — ESLint flat config (`eslint.config.js`).
- `pnpm test` — Vitest run once; `pnpm test:watch` for watch mode.
- Single test: `pnpm test path/to/file.test.ts` or add `-t "<test name>"`.

## Layout

- `src/App.tsx` — exports `routes: RouteRecord[]` (vite-react-ssg typed API).
  Add new pages to both `src/pages/` and the `routes` array as a child of the
  root `RootLayout` record.
- `src/main.tsx` — exports `createRoot = ViteReactSSG({ routes })`; no manual
  `ReactDOM.createRoot` or `<BrowserRouter>` — the SSG runner owns those.
- `src/components/RootLayout.tsx` — top-level layout rendered for every route.
  Mounts all providers (`QueryClientProvider > TooltipProvider > LocationProvider
  > Toaster/Sonner > ScrollToTop`) then `<Outlet />`. The `entry`field in`App.tsx` points here so the SSG runner can locate it.
- `src/components/Seo.tsx` — renders `<Head>` tags (vite-react-ssg). Pages use
  `<Seo route="/path" />` to inject per-page title/description/OG tags; values
  are resolved from `src/cms/seo.json` with a global `default` fallback.
- `src/context/LocationContext.tsx` — two-location state (Fort Worth TX,
  Medford OR); consume via `useLocationContext()`. Phone numbers and addresses
  live here, not scattered across pages.
- `src/components/ui/*` — shadcn/ui primitives; add via shadcn CLI.
  `components.json` aliases: `@/components`, `@/components/ui`, `@/lib/utils`,
  `@/hooks`. Base color `slate`, style `default`.
- `src/data/services.ts` — shared service content referenced by pages.
- `public/admin/index.html` — standalone Sveltia CMS admin page; not part of
  SSG routing (see **Content** below).

## Content (Sveltia CMS)

- Admin UI: `/admin` served from `public/admin/index.html`, which loads
  `@sveltia/cms@0.151.1` from unpkg.
- Config: `public/admin/config.json` — GitHub backend (`repo`, `base_url` for
  auth worker), singletons/collections list, and media transformation settings.
- CMS-managed content lives under `src/cms/` (currently just `seo.json`);
  import these files using `@/cms/<name>.json` — not relative paths.
- `src/cms/seo.json` shape: a `default` block (siteName, title, description,
  `canonicalBase`, `ogImage`, ogImageAlt/Width/Height) and a `routes` array of
  objects keyed by `path`. `Seo.tsx` resolves per-route values with fallback to
  defaults. OG image ships from `public/media/og.webp`.
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
- Provider order in `RootLayout.tsx`: `QueryClientProvider > TooltipProvider >
LocationProvider > Toaster/Sonner > ScrollToTop > Outlet`. No `<BrowserRouter>`
  in app code — the SSG runner (vite-react-ssg) owns the router.
- Prettier config (`.prettierrc`): tabs, no semis, double quotes off,
  `printWidth: 100`, `experimentalTernaries: true`. Run `pnpm format` before
  committing; `.prettierignore` excludes `node_modules/`, `pnpm-lock.yaml`,
  `dist/`.
- Tailwind plugins: `tailwindcss-animate` only (`prettier-plugin-tailwindcss`
  was removed — don't add it back without installing the package first).

## Testing

- Vitest + Testing Library + jsdom; globals enabled (`vitest/globals` in
  `tsconfig.app.json` types). Setup: `src/test/setup.ts` (mocks `matchMedia`).
- Test glob: `src/**/*.{test,spec}.{ts,tsx}`.

## Misc

- Vitest is the sole test runner; no Playwright setup exists.
- `dist/` is a stale build artifact (git-ignored); safe to delete and rebuild.
- `.nova/Configuration.json` pins the OpenCode devx port to `13261`.
- `pnpm format` uses `@prettier/plugin-oxc` (listed in devDependencies) but no other Prettier plugins are active.
