# AGENTS.md

pnpm-workspace monorepo for Hukill's Plumbing, Drain Cleaning, Restoration, Leak
Detection, Renovation, Water Mitigation, Mold Remediation and Remodels company.

The site is a **SvelteKit 2 + Svelte 5** app deployed to **Vercel**; transactional
email is sent via the **Resend REST API** from SvelteKit server code.

## Repo layout

- Root is the pnpm workspace. Package manager is **pnpm 11.5.2** and Node is
  **24**, both pinned via `mise.toml`. Workspace globs live in
  `pnpm-workspace.yaml` (`packages/*`).
- `packages/www/` — the site: **SvelteKit 2 + Svelte 5 (runes) + Tailwind
  4**, deployed to Vercel via `@sveltejs/adapter-vercel`. All pages are
  prerendered; the only server code is remote functions for the two forms. This
  is where all commands below run.
- **All dependency versions in `packages/www/package.json` are pinned exactly**
  (no `^`/`~`). Remote functions are experimental; treat `@sveltejs/kit` and
  `svelte` upgrades as deliberate, tested events, never routine bumps.

## Commands

Run from `packages/www` (or `pnpm --filter www <script>` from the root). Prefix
with `mise exec --` if node/pnpm are not already on PATH.

- `pnpm dev` — Vite dev server. Remote functions run in dev, so `/contact` and
  `/careers` submissions work locally (email only sends when `RESEND_API_KEY`
  is set).
- `pnpm build` — SvelteKit production build; prerenders every route (21 pages:
  8 static + 12 service `[slug]` pages + `/admin` shell) and emits the Vercel
  adapter output. Fails on broken prerender links — keep nav/footer targets real.
- `pnpm preview` — serve the built output locally.
- `pnpm check` — `svelte-kit sync` + `svelte-check`. Must stay at 0 errors / 0
  warnings.
- `pnpm format` — Prettier (tabs, no semis, double quotes, `printWidth: 100`).
  Run before committing.
- `pnpm lint` — ESLint flat config.

## Environment variables

Declared explicitly in `src/env.ts` via `defineEnvVars` (the
`experimental.explicitEnvironmentVariables` flag is on). Local values live in
`packages/www/.env` (git-ignored); production values are set in the Vercel
project settings.

- `PUBLIC_POSTHOG_PROJECT_TOKEN`, `PUBLIC_POSTHOG_HOST` — public, imported from
  `$app/env/public`; used by `src/lib/posthog.ts` (client) and
  `src/lib/server/posthog.ts` (server capture). Both are **required** — their
  `src/env.ts` schemas reject empty values, so `pnpm dev`/`build`/`preview` fail
  fast when either is unset (set them in `.env` locally and in Vercel).
- `RESEND_API_KEY` — private, imported from `$app/env/private`; used by
  `src/lib/server/email.ts` to call the Resend REST API. Scope it to sending
  access on the account that owns the verified `send.hukills.com` domain.

Because `experimental.explicitEnvironmentVariables` is on (`vite.config.ts`),
always import env vars from `$app/env/public` / `$app/env/private` — never the
legacy `$env/static/*` or `$env/dynamic/*` modules. New vars must be declared in
`src/env.ts` (via `defineEnvVars`) first, or the import won't exist. `$app/env`
also replaces `$app/environment` as the source for `dev` / `browser` /
`building` / `version` — import those from `$app/env` for consistency, as the
existing code does.

## Layout (`packages/www/src`)

- `routes/+layout.svelte` — global root: imports `layout.css`, sets the location
  context, inits PostHog, captures pageviews in `afterNavigate`. No visual
  chrome, so `/admin` can render clean.
- `routes/+layout.ts` — `export const prerender = true` (applies site-wide).
- `routes/(site)/` — a route group (no URL segment) whose `+layout.svelte` mounts
  the marketing chrome (`TooltipProvider > Toaster > Header / main / Footer`).
  Every public page and `+error.svelte` (the 404) live here.
- `routes/[slug]/` is inside `(site)`: `+page.ts` resolves the slug from
  `servicePagesBySlug`, `error(404)` on miss, and exports an `entries` generator
  so all service pages prerender.
- `routes/admin/` — Sveltia CMS. `+page.ts` sets `ssr = false` + `prerender =
  true`; `+page.svelte` dynamically imports `@sveltia/cms` and calls
  `init({ config })` on mount. It sits outside `(site)`, so it gets no header/
  footer.
- `lib/components/` — `Header`, `Footer`, `LocationSelector`, `Seo`, `Icon`, the
  service layout components, and `ui/` (shadcn-svelte primitives: button, input,
  textarea, label, checkbox, toggle, skeleton, separator, sheet, dialog, tooltip,
  sonner). Add more via `pnpm dlx shadcn-svelte@latest add <name>`.
- `lib/components/Seo.svelte` — renders `<svelte:head>` tags; pages pass
  `<Seo route="/path" seoBlock={...} />` resolving against `src/lib/cms/seo.json`
  with a `default` fallback. Exports the `PageSeoData` type.
- `lib/location/location.svelte.ts` — `Location` type, `locations` (eager glob of
  `$lib/cms/locations/*.json`), `LocationState` runes class (localStorage key
  `hukills.selectedLocation`, haversine `nearestLocation`, geolocation
  auto-detect), and `set/getLocationContext()`. Phone numbers, addresses, and
  coordinates are CMS-managed — edit under Locations in `/admin`.
- `lib/attachments/reveal.ts` — IntersectionObserver scroll-reveal attachment
  (`{@attach reveal({ delay, y })}`), the replacement for framer-motion
  `whileInView`. Animations otherwise use Svelte `transition:`/`in:`/`out:`.
- `lib/icons.ts` — `@lucide/svelte` registry (`iconMap`, `getIcon`, `IconName`);
  single source of truth for CMS-selectable icons.
- `lib/services/` — `service-pages.ts` (glob of `$lib/cms/service-pages/*.json`,
  `servicePagesBySlug`, `servicePageSlugs`, layout types) and `services.ts`
  (`featuredServices`, `allServices` tile lists for the grids).

## Content (Sveltia CMS)

- Admin UI at `/admin`, mounted client-side from the `@sveltia/cms` npm package
  (pinned in `package.json`).
- Config lives in `src/lib/admin/` — `config.ts` plus `config/collections/*` and
  `config/singletons/*` modules. GitHub backend (`repo: tomatrow/hukills-www`,
  auth via `base_url: https://sveltia-cms-auth.tomatrow.workers.dev` — a small
  Cloudflare Worker on `workers.dev`).
- Collection/singleton `folder`/`file` paths point at
  `packages/www/src/lib/cms/...`; `media_folder` is `packages/www/static/media`
  with `public_folder: /media`. Media transforms: webp q85, 2048px max.
- CMS-managed JSON lives under `src/lib/cms/`; import via `$lib/cms/<name>.json`.
- Sveltia commits to the repo's default branch (`main`); Vercel auto-deploys from
  `main`. A CMS save therefore publishes automatically — no manual deploy step.

## Forms & email (remote functions)

- Form validation schemas are shared client/server in `src/lib/schemas/`
  (`contact.ts`, `career.ts`); they are Standard Schema (zod) objects passed to
  both the remote `form()` and the client `preflight()`.
- `src/routes/(site)/contact/contact.remote.ts` (`submitContact`) and
  `src/routes/(site)/careers/career.remote.ts` (`submitApplication`) are SvelteKit
  remote form functions. Pages spread `{...submitContact}`, render fields via
  `fields.X.as(...)`, show `issues()`, and use `enhance()` for toasts.
- `src/lib/server/email.ts` (`safeSend`) sends via the **Resend REST API**
  (base64 attachments, optional `reply_to`). Both remote functions send from
  `Hukill's Inc. <hello@send.hukills.com>` and set `replyTo` so staff
  notifications reply straight to the lead and auto-replies route back to the
  lead mailbox. `html.ts` escapes user input; `server/posthog.ts` does
  server-side capture and recovers distinct/session ids from the `ph_*` cookie
  via `getRequestEvent()`.
- **Dev vs. prod addresses:** both remote   functions gate on `dev` from
  `$app/env`. In dev, the from address and lead recipients are hardcoded
  to the verified `@mail.ajcaldwell.dev` account (`hello@mail.ajcaldwell.dev`,
  `contact_leads_address@…`, `career_leads_address@…`) so local submissions send
  through the dev Resend key without emailing real staff. The CMS values in
  `email-settings.json` (`fromAddress` = `hello@send.hukills.com`, `leadEmail`,
  `careerLeadEmail`) are production-only. Note `pnpm preview` has `dev = false`,
  so previewing locally uses the prod from address and won't send with a dev key.
- **Vercel serverless bodies are capped at 4.5 MB**, so resume uploads are capped
  at **4 MB** in `src/lib/schemas/career.ts` (`MAX_RESUME_BYTES`), enforced on
  both client and server.

## Conventions & gotchas

- Import alias `$lib/*` → `packages/www/src/lib/*`. Use `$lib` everywhere, never
  relative paths across directories.
- Svelte 5 runes are forced on (`vite.config.ts`). Runes only: `$state`,
  `$derived`, `$props`, `$effect`; snippets + `{@render}` (no slots); `onclick`
  (no `on:` directives). Attachments via `{@attach}` (no `use:` where an
  attachment fits).
- **Markup locals use declaration tags, never legacy `{@const}`.** Svelte 5.56+
  supports `{const x = …}` / `{let x = …}` anywhere in markup. Prefer them over
  `{@const}`. A plain `{const x = …}` evaluates **once** at block creation — if
  the expression depends on reactive state (`$state`, `$derived`, `page`, a
  `SvelteSet`, a form field `.value()`, etc.), wrap it as
  `{const x = $derived(…)}` so it stays reactive (this is the true equivalent of
  the old reactive `{@const}`). Plain `{const}` is correct only for static data
  (e.g. `getIcon(item.icon)` over CMS JSON in an `{#each}`).
- Fonts: `font-display` = Oswald, `font-body` = Inter, loaded via a Google Fonts
  `@import` at the top of `layout.css`; exposed through Tailwind 4 `@theme`.
  Design tokens are HSL CSS variables in `layout.css` with a `container` utility
  and `tw-animate-css` for the shadcn animations.
- Prettier: tabs, no semis, double quotes, `printWidth: 100`. Run `pnpm format`
  before committing.
- When editing Svelte, use the Svelte MCP tools (`svelte-autofixer`, docs) and
  the `svelte-file-editor` agent.
- **CMS empty strings — use `||`, not `??`, for CMS-field fallbacks.** Sveltia
  writes `""` (not `null`/absent) for blank _optional string_ fields, so `??`
  does NOT trigger the fallback — an empty field silently renders `""` (e.g. a
  self-linking `href=""`, an empty `alt`/`aria-label`, or a page title that
  drops through to the global SEO default). Guard any CMS string that needs a
  fallback with `value || fallback`, or normalize via `emptyToUndefined()` (see
  `Seo.svelte`) before chaining `??`. Blank _number_ fields emit `null`, so
  `?? undefined` is correct for those (see `PageSeoData.ogImageWidth`).

## Deploy (Vercel)

- Vercel project root directory is `packages/www`; the SvelteKit build +
  `adapter-vercel` produce the deployment. Node 24, pnpm 11.5.2.
- Set the three env vars above in Vercel project settings (production +
  preview). Add `RESEND_API_KEY` from the Resend account that owns the verified
  `send.hukills.com` domain.
- Custom domains (`hukills.com`, `www.hukills.com`) are attached in the Vercel
  dashboard via DNS records — no nameserver move required (which is why the app
  is on Vercel rather than Cloudflare Workers).
- `static/robots.txt` ships as-is; `+error.svelte` provides the 404.

## Misc

- Vitest is not yet configured; verification is manual. Add it if automated
  tests are wanted.
- `packages/www/.svelte-kit/` and Vercel output are build artifacts (git-ignored).
