# AGENTS.md

pnpm-workspace monorepo for Hukill's Plumbing, Drain Cleaning, Restoration, Leak
Detection, Renovation, Water Mitigation, Mold Remediation and Remodels company.

**Migration in progress:** starting from a monorepo restructure, then converting
the site to Svelte, then moving hosting to the Svelte app. Cloudflare's Email
Sending service is retained across the transition.

## Repo layout

- Root is the pnpm workspace (no app code, no scripts). Package manager is
  **pnpm 11.5.2**, pinned via `mise.toml`. Workspace globs live in
  `pnpm-workspace.yaml` (`packages/*`); its `allowBuilds` block whitelists
  post-install build scripts (`@swc/core`, `esbuild`, `sharp`, `workerd` → true).
- `packages/www/` — the current site: **Vite + React 18 + TS SPA** (shadcn/ui,
  Tailwind) prerendered with `vite-react-ssg`, plus a Cloudflare **Worker**
  (`worker/`) serving `/api/*` and static assets. This is where all commands
  below run.
- Prettier config is **per-package** (`packages/www/.prettierrc`,
  `packages/www/.prettierignore`); there is no root prettier setup.

## Commands

Run from `packages/www` (or `pnpm --filter www <script>` from the root). **`pnpm
deploy` is a pnpm built-in — always use `pnpm run deploy` for the app script.**

- `pnpm dev` — Vite dev server on **:8080** (host `::`); HMR overlay disabled.
  **`/api/*` is NOT served here** — use `pnpm worker:dev` (see Worker section).
- `pnpm build` / `pnpm build:dev` — static-site build via `vite-react-ssg
  build`; outputs per-route nested HTML into `dist/`. Also runs
  `scripts/copy-404.mjs` to copy `dist/404/index.html` → `dist/404.html`
  (required by Cloudflare's `404-page` handler — see Deploy section).
- `pnpm preview` — Vite preview of the built `dist/` output.
- `pnpm check` — type-check all three project references: `tsconfig.app.json`
  (`src/` + `admin/`), `tsconfig.node.json` (`vite.config.ts`), and
  `worker/tsconfig.json` (`worker/`).
- `pnpm worker:dev` — `wrangler dev`; serves the Worker + static assets locally.
  **Requires a fresh `dist/` — run `pnpm build` first.** Only needed for `/api/*`
  routes; pure SPA work can use `pnpm dev`.
- `pnpm worker:types` — regenerate `worker-configuration.d.ts` from
  `wrangler.jsonc` bindings. Re-run after any binding change; commit the output.
- `pnpm format` — Prettier across the package (tabs, no semis, `printWidth:
  100`, `experimentalTernaries`). Run before committing.
- `pnpm lint` — ESLint flat config (`eslint.config.js`).
- `pnpm test` — Vitest run once; `pnpm test:watch` for watch mode. Single test:
  `pnpm test path/to/file.test.ts` or add `-t "<test name>"`.

## Environment variables

`packages/www/.env` (git-ignored) holds Vite public vars consumed by the client:

- `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN`, `VITE_PUBLIC_POSTHOG_HOST` — read in
  `src/main.tsx` to init PostHog. Vite's envDir is the package root, so this file
  MUST live in `packages/www/`, not at the repo root.

## Layout (`packages/www/src`)

- `App.tsx` — exports `routes: RouteRecord[]` (vite-react-ssg typed API). Add new
  pages to both `src/pages/` and the `routes` array as a child of the root
  `RootLayout` record.
- `main.tsx` — exports `createRoot = ViteReactSSG({ routes })`; no manual
  `ReactDOM.createRoot` or `<BrowserRouter>` — the SSG runner owns those.
- `components/RootLayout.tsx` — top-level layout for every route. Mounts all
  providers (`QueryClientProvider > TooltipProvider > LocationProvider >
  Toaster/Sonner > ScrollToTop`) then `<Outlet />`. The `entry` field in
  `App.tsx` points here.
- `components/Seo.tsx` — renders `<Head>` tags (vite-react-ssg). Pages use `<Seo
  route="/path" />` to inject per-page title/description/OG tags; values resolve
  from `src/cms/seo.json` with a global `default` fallback.
- `context/location-context.ts` — exports the `Location` type, the `locations`
  array (loaded eagerly from `src/cms/locations/*.json` via `import.meta.glob`,
  sorted by `order` then `id`), `LOCATION_STORAGE_KEY`, `nearestLocation()`
  (haversine nearest-neighbour), `LocationContext`, and `useLocationContext()`.
  Phone numbers, addresses, and coordinates are CMS-managed — edit under
  Locations in `/admin`, not here. `FALLBACK_LOCATION` covers zero JSON entries.
- `context/LocationContext.tsx` — exports only `LocationProvider`. Imports
  `LocationContext`/`locations` from `./location-context`. The split keeps Vite
  fast-refresh happy (`react-refresh/only-export-components` needs `.tsx` files
  to export only components).
- `components/ui/*` — shadcn/ui primitives; add via shadcn CLI.
  `components.json` aliases: `@/components`, `@/components/ui`, `@/lib/utils`,
  `@/hooks`. Base color `slate`, style `default`.
- `data/services.ts` — shared service content referenced by pages.
- `admin/` — Sveltia CMS admin entry; a separate Vite build input (not part of
  SSG routing). Outputs to `dist/admin/` at build time.

## Content (Sveltia CMS)

- Admin UI: `/admin` served from `admin/index.html` (Vite entry). CMS is the
  `@sveltia/cms` npm package, manually initialised in `admin/main.ts` via
  `init({ config })`.
- Config: `admin/config.ts` — exported `CmsConfig` object (`satisfies CmsConfig`).
  Sets `load_config_file: false`. Contains GitHub backend (`repo`, `base_url` for
  auth worker), singletons, collections, and media transformation settings.
- Version pin: `@sveltia/cms` in `packages/www/package.json` is the single source
  of truth. Bump it there only when upgrading.
- CMS-managed content lives under `src/cms/`; import via `@/cms/<name>.json` —
  not relative paths.
- `src/cms/seo.json` shape: a `default` block (siteName, title, description,
  `canonicalBase`, `ogImage`, ogImageAlt/Width/Height) and a `routes` array keyed
  by `path`. `Seo.tsx` resolves per-route values with fallback to defaults. OG
  image ships from `public/media/og.webp`.
- Media: stored under `public/media/`, referenced in content as `/media/...`
  (the `public_folder` prefix), not as `@/` aliases.
- To add managed content: add a singleton/collection entry to `admin/config.ts`,
  then import the resulting JSON from `src/cms/<name>.json`.

## Conventions & gotchas

- Import alias `@/*` → `packages/www/src/*` (vite, vitest, tsconfig,
  components.json all agree) — use `@/` everywhere, never relative paths across
  directories.
- TS is **loose**: `strict`, `strictNullChecks`, `noImplicitAny`,
  `noUnusedLocals/Params` all disabled. Don't rely on strict-mode diagnostics.
- ESLint has `@typescript-eslint/no-unused-vars` **off**. The
  `react-refresh/only-export-components` rule is a warning — if it fires on a
  `.tsx` file, move non-component exports (types, constants, hooks) into a sibling
  `.ts` file and update consumers. See `src/context/` for the pattern.
- Fonts: `font-display` = Oswald, `font-body` = Inter (Tailwind theme extends).
- Prettier config (`.prettierrc`): tabs, no semis, double quotes off,
  `printWidth: 100`, `experimentalTernaries: true`. Run `pnpm format` before
  committing.
- Tailwind plugins: `tailwindcss-animate` only.

## Testing

- Vitest + Testing Library + jsdom; globals enabled (`vitest/globals` in
  `tsconfig.app.json` types). Setup: `src/test/setup.ts` (mocks `matchMedia`).
- Test glob: `src/**/*.{test,spec}.{ts,tsx}`.

## Worker / API routes

Entry: `worker/index.ts` — `export default { fetch }` handler. Routes dispatch on
`URL(request.url).pathname`; every other path delegates to
`env.ASSETS.fetch(request)` so the static asset router keeps handling SPA pages
and the 404 page.

**Current routes:**

| Method | Path           | Handler                    |
| ------ | -------------- | -------------------------- |
| POST   | `/api/contact` | `worker/routes/contact.ts` |
| POST   | `/api/career`  | `worker/routes/career.ts`  |

**Adding a new route:**

1. Create `worker/routes/<name>.ts` — export `async function
   handle<Name>(request: Request, env: Env): Promise<Response>`.
2. Add a `case "/api/<name>":` block in `worker/index.ts` (method-guard as above).
3. Run `pnpm check` to verify types.

**Shared schemas:** Form validation schemas live in `src/lib/schemas/`
(`contact.ts`, `career.ts`) and are imported by both the React pages and the
Worker. Add new schemas there; never duplicate schema logic across client/server.

**Worker helpers:** `worker/lib/` holds shared Worker code — `email.ts`
(Cloudflare Email Sending via the `EMAIL` binding), `html.ts` (email body
rendering), `posthog.ts` (server-side event capture). Submissions are delivered
through the Email Sending binding, not stubbed.

**Binding types:** `worker-configuration.d.ts` in `packages/www/` is generated by
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
pnpm build:watch    # terminal 2 — chokidar initial build, then re-runs
                    #              `pnpm build:dev` on save (500 ms debounce)
```

Watcher scope: `src/**`, `admin/**`, `public/**`, `index.html`. Edits to
`worker/`, root configs, or doc/lockfile churn do **not** trigger an SSG rebuild
— restart `build:watch` if you change one of those.

- Each rebuild prerenders every route → expect ~5–10 s feedback latency per save
  (vs sub-second HMR with `pnpm dev`).
- `wrangler dev --live-reload` reloads the browser when `dist/*.html` is
  rewritten, so the two terminals coordinate via the filesystem.
- Use this mode to validate prerendered HTML, the `404-page` handler, or
  `auto-trailing-slash` resolution. For day-to-day SPA work, prefer `pnpm dev`.

## Deploy (Cloudflare Workers Static Assets)

Config: `packages/www/wrangler.jsonc`. Worker name: `hukills`. `main` points to
`worker/index.ts`; the Worker handles `/api/*` and delegates everything else to
the asset binding.

- `not_found_handling: "404-page"` — unknown paths get `dist/404.html` with a 404
  status. Created by `scripts/copy-404.mjs` at build time. **Do not delete it.**
- `html_handling: "auto-trailing-slash"` — resolves folder-index files
  (`dist/about/index.html` → `/about/`) automatically.

### First-time setup

```sh
pnpm dlx wrangler login   # opens browser OAuth; stores token in ~/.wrangler/
```

### Deploy

```sh
pnpm build && pnpm run deploy   # note: `pnpm run deploy`, not `pnpm deploy`
# dry-run (no upload) to validate config:
pnpm run deploy:dryrun
```

First deploy URL: `https://hukills.<your-subdomain>.workers.dev`

### Custom domains

Managed in the Cloudflare dashboard (not in `wrangler.jsonc`): Workers & Pages →
hukills → Settings → Domains → Add Custom Domain. Add both `hukills.com` and
`www.hukills.com`; CF provisions TLS automatically if the zone is in your
account. Apex → www redirect via a Cloudflare Redirect Rule.

## Misc

- Vitest is the sole test runner; no Playwright setup exists.
- `dist/` is a stale build artifact (git-ignored); safe to delete and rebuild.
- `.nova/Configuration.json` pins the OpenCode devx port to `13261`.
- `@prettier/plugin-oxc` is in devDependencies but not referenced in
  `.prettierrc` — no Prettier plugins are currently active.
