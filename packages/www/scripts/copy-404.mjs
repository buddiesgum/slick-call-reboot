/**
 * Post-build script: copy dist/404/index.html → dist/404.html
 *
 * Cloudflare Workers' `not_found_handling: "404-page"` looks for a flat
 * `404.html` file, but vite-react-ssg with `dirStyle: "nested"` emits the
 * 404 page as `dist/404/index.html`. This script bridges the gap without
 * changing the SSG output shape for all other routes.
 *
 * Safe to run on a clean (no dist/) tree — it exits 0 with a log message.
 */

import { copyFileSync, existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")
const src = resolve(root, "dist/404/index.html")
const dest = resolve(root, "dist/404.html")

if (!existsSync(src)) {
	console.warn("[copy-404] src not found, skipping:", src)
	process.exit(0)
}

copyFileSync(src, dest)
console.log("[copy-404] copied dist/404/index.html → dist/404.html")
