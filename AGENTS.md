# AGENTS.md

Vite + React 18 + TS SPA (shadcn/ui, Tailwind) for Hukill's Plumbing, Drain Cleaning, Restoration, Leak Detection, Renovation, Water Mitigation, Mold Remediation and Remodels company. Marketing
site only — no backend, no env vars required.

## Commands (pnpm only; pinned via mise.toml)

- `pnpm dev` — Vite dev server on **:8080** (host `::`); HMR overlay disabled. **`/api/*` is NOT served by `pnpm dev`** — use `pnpm worker:dev` for that (see Worker section below).
- `pnpm build` / `pnpm build:dev` — static-site build via `vite-react-ssg build`; outputs per-route nested HTML into `dist/`. Also runs `scripts/copy-404.mjs` to copy `dist/404/index.html` → `dist/404.html` (required by Cloudflare's `404-page` handler — see Deploy section below).
- `pnpm preview` — Vite preview of the built `dist/` output.
- `pnpm check` — type-check all three project references: `tsconfig.app.json` (`src/` + `admin/`), `tsconfig.node.json` (`vite.config.ts`), and `worker/tsconfig.json` (`worker/`). `vite-react-ssg build` also does an implicit type check on `src/`, but this is the dedicated standalone command.
- `pnpm worker:dev` — `wrangler dev`; serves the Worker + static assets locally. **Requires a fresh `dist/` first — run `pnpm build` before this.** Only needed when testing `/api/*` routes; pure SPA work can use `pnpm dev` as before.
- `pnpm worker:types` — regenerate `worker-configuration.d.ts` from `wrangler.jsonc` bindings. Re-run after any binding change; commit the output file.
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
- `src/context/location-context.ts` — exports the `Location` type, the
  `locations` array (loaded eagerly from `src/cms/locations/*.json` via
  `import.meta.glob` and sorted by `order` then `id`), `LOCATION_STORAGE_KEY`,
  `nearestLocation()` (haversine nearest-neighbour), `LocationContext`, and the
  `useLocationContext()` hook. Phone numbers, addresses, and coordinates are
  CMS-managed — edit them under Locations in `/admin`, not in this file. A
  `FALLBACK_LOCATION` is used if zero JSON entries exist. Consumers import from
  this file.
- `src/context/LocationContext.tsx` — exports only `LocationProvider`. Imports
  `LocationContext` and `locations` from `./location-context`. `RootLayout.tsx`
  imports `LocationProvider` from here. The split keeps Vite fast-refresh happy
  (`react-refresh/only-export-components` requires `.tsx` files to export only
  components).
- `src/components/ui/*` — shadcn/ui primitives; add via shadcn CLI.
  `components.json` aliases: `@/components`, `@/components/ui`, `@/lib/utils`,
  `@/hooks`. Base color `slate`, style `default`.
- `src/data/services.ts` — shared service content referenced by pages.
- `admin/` — Sveltia CMS admin entry; processed by Vite as a separate build
  input (not part of SSG routing). Outputs to `dist/admin/` at build time.

## Content (Sveltia CMS)

- Admin UI: `/admin` served from `admin/index.html` (Vite entry). The CMS is
  installed as an npm package (`@sveltia/cms`) and manually initialised in
  `admin/main.ts` via `init({ config })`.
- Config: `admin/config.ts` — exported `CmsConfig` object (`satisfies CmsConfig`
  from `@sveltia/cms`). Sets `load_config_file: false` so no separate JSON file
  is loaded at runtime. Contains GitHub backend (`repo`, `base_url` for auth
  worker), singletons, collections, and media transformation settings.
- Version pin: `@sveltia/cms` in `package.json` (`dependencies`) is the single
  source of truth. Bump it there only when upgrading.
- CMS-managed content lives under `src/cms/` (currently just `seo.json`);
  import these files using `@/cms/<name>.json` — not relative paths.
- `src/cms/seo.json` shape: a `default` block (siteName, title, description,
  `canonicalBase`, `ogImage`, ogImageAlt/Width/Height) and a `routes` array of
  objects keyed by `path`. `Seo.tsx` resolves per-route values with fallback to
  defaults. OG image ships from `public/media/og.webp`.
- Media: stored under `public/media/`, referenced in content as `/media/...`
  (the `public_folder` prefix), not as `@/` aliases.
- To add a managed content file: add a singleton or collection entry to
  `admin/config.ts`, then import the resulting JSON from `src/cms/<name>.json`.

## Conventions & gotchas

- Import alias `@/*` → `src/*` (vite, vitest, tsconfig, components.json all
  agree — use `@/` everywhere, never relative paths across directories).
- TS is **loose**: `strict`, `strictNullChecks`, `noImplicitAny`,
  `noUnusedLocals/Params` all disabled. Don't rely on strict-mode diagnostics.
- ESLint has `@typescript-eslint/no-unused-vars` **off**. The
  `react-refresh/only-export-components` rule is active as a warning — if it
  fires on a `.tsx` file, fix it by moving non-component exports (types,
  constants, hooks) into a sibling `.ts` file and updating consumer imports.
  See `src/context/` for the established pattern.
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

## Worker / API routes

Entry: `worker/index.ts` — `export default { fetch }` handler. Routes dispatch
on `URL(request.url).pathname`; every other path delegates to `env.ASSETS.fetch(request)`
so the static asset router keeps handling SPA pages and the 404 page.

**Current routes:**

| Method | Path           | Handler                    |
| ------ | -------------- | -------------------------- |
| POST   | `/api/contact` | `worker/routes/contact.ts` |
| POST   | `/api/career`  | `worker/routes/career.ts`  |

**Adding a new route:**

1. Create `worker/routes/<name>.ts` — export `async function handle<Name>(request: Request): Promise<Response>`.
2. Add a `case "/api/<name>":` block in `worker/index.ts`.
3. Run `pnpm check` to verify types.

**Shared schemas:** Form validation schemas live in `src/lib/schemas/` and are
imported by both the React pages and the Worker. Add new schemas there; never
duplicate schema logic between client and server.

**Submission destination:** Each handler currently stubs with `console.log` +
`200 OK`. The `// TODO: wire submission destination` comment marks the swap
point. Wire to Resend, MailChannels, or a webhook in a follow-up PR.

**Binding types:** `worker-configuration.d.ts` at the repo root is generated by
`pnpm worker:types`. Commit it after any `wrangler.jsonc` binding change.

**Gotcha — naming collision:** Cloudflare's asset router wins when a real file
exists in `dist/`. Avoid creating a page named `api` under `src/pages/` — it
would shadow the Worker's `/api` namespace.

**Local dev:**

```sh
pnpm build          # must run first; produces dist/
pnpm worker:dev     # wrangler dev serves dist/ + Worker on localhost
```

`pnpm dev` (Vite) still works for pure SPA work — `/api/*` calls will 404 there.

**Live SSG rebuild (`pnpm build:watch`):**

Run in a second terminal alongside `pnpm worker:dev` to auto-rebuild `dist/` on
source changes:

```sh
pnpm worker:dev     # terminal 1 — wrangler dev serves dist/ + Worker
pnpm build:watch    # terminal 2 — chokidar runs an initial build, then re-runs
                    #              `pnpm build:dev` on save (500 ms debounce)
```

Watcher scope: `src/**`, `admin/**`, `public/**`, `index.html`. Edits to
`worker/`, root configs (`vite.config.ts`, `tailwind.config.ts`, `tsconfig*.json`,
`wrangler.jsonc`), or doc/lockfile churn do **not** trigger an SSG rebuild —
restart `build:watch` if you change one of those.

- Each rebuild prerenders every route → expect ~5–10 s feedback latency per save
  (vs sub-second HMR with `pnpm dev`).
- `wrangler dev --live-reload` reloads the browser when `dist/*.html` is rewritten,
  so the two terminals coordinate via the filesystem — no orchestrator needed.
- Use this mode to validate prerendered HTML, the `404-page` handler, or
  `auto-trailing-slash` resolution. For day-to-day SPA work, prefer `pnpm dev`.
- `worker/**` is intentionally excluded — wrangler hot-reloads the Worker itself;
  rebuilding the SPA on Worker edits would be wasted work.

## Deploy (Cloudflare Workers Static Assets)

Config: `wrangler.jsonc` at repo root. Worker name: `hukills`. The `main` field
points to `worker/index.ts`; the Worker handles `/api/*` routes and delegates
everything else to the asset binding.

- `not_found_handling: "404-page"` — unknown paths get `dist/404.html` with a
  404 status. This file is created by `scripts/copy-404.mjs` at build time (see
  Commands above). **Do not delete that script.**
- `html_handling: "auto-trailing-slash"` — resolves folder-index files
  (`dist/about/index.html` → `/about/`) automatically.

### First-time setup

```sh
pnpm dlx wrangler login   # opens browser OAuth; stores token in ~/.wrangler/
```

### Deploy

```sh
pnpm build && pnpm deploy
# dry-run (no upload) to validate config:
pnpm deploy:dryrun
```

First deploy URL: `https://hukills.<your-subdomain>.workers.dev`

### Custom domains

Managed in the Cloudflare dashboard (not in `wrangler.jsonc`):
Workers & Pages → hukills → Settings → Domains → Add Custom Domain.
Add both `hukills.com` and `www.hukills.com`; CF provisions TLS automatically
if the zone is in your account. Apex → www redirect can be handled with a
Cloudflare Redirect Rule.

## Misc

- Vitest is the sole test runner; no Playwright setup exists.
- `dist/` is a stale build artifact (git-ignored); safe to delete and rebuild.
- `.nova/Configuration.json` pins the OpenCode devx port to `13261`.
- `pnpm format` uses `@prettier/plugin-oxc` (listed in devDependencies) but no other Prettier plugins are active.
