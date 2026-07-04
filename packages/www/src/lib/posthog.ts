import posthog from "posthog-js"
import { PUBLIC_POSTHOG_PROJECT_TOKEN, PUBLIC_POSTHOG_HOST } from "$app/env/public"

let initialized = false

/**
 * Initialize posthog-js on the client. The token is a required env var, so
 * the empty-token guard below is purely defensive. Pageviews are captured
 * manually in the root layout's afterNavigate hook, so automatic capture is
 * disabled.
 */
export function initPosthog() {
	if (initialized || !PUBLIC_POSTHOG_PROJECT_TOKEN) return
	posthog.init(PUBLIC_POSTHOG_PROJECT_TOKEN, {
		api_host: PUBLIC_POSTHOG_HOST,
		defaults: "2026-01-30",
		// SvelteKit is an SPA after hydration — capture pageviews manually in
		// afterNavigate to cover client-side navigations without double counting.
		capture_pageview: false
	})
	initialized = true
}

/** Capture a $pageview event; no-op until posthog has been initialized. */
export function capturePageview() {
	if (!initialized) return
	posthog.capture("$pageview")
}

export { posthog }
