import { getRequestEvent } from "$app/server"
import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_PROJECT_TOKEN } from "$app/env/public"

/**
 * Send a single event to PostHog via the Capture API. Fire-and-forget:
 * errors are logged but do not fail the request. The token is a required env
 * var, so the empty-token guard is purely defensive.
 */
export async function captureServerEvent(
	event: string,
	distinctId: string,
	properties: Record<string, unknown> = {}
): Promise<void> {
	if (!PUBLIC_POSTHOG_PROJECT_TOKEN) return
	const host = PUBLIC_POSTHOG_HOST
	try {
		await fetch(`${host}/capture/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				api_key: PUBLIC_POSTHOG_PROJECT_TOKEN,
				event,
				distinct_id: distinctId,
				properties
			})
		})
	} catch (err) {
		console.error("[posthog] captureServerEvent failed", err)
	}
}

export interface PosthogIds {
	distinctId: string
	sessionId: string | null
}

/**
 * Reads the posthog-js cookie (`ph_<token>_posthog`) from the current request
 * to recover the browser's distinct id and session id. Falls back to "server"
 * when the cookie is missing or unparseable (e.g. cookieless/blocked clients).
 */
export function getPosthogIds(): PosthogIds {
	const fallback: PosthogIds = { distinctId: "server", sessionId: null }
	if (!PUBLIC_POSTHOG_PROJECT_TOKEN) return fallback
	try {
		const { cookies } = getRequestEvent()
		const raw = cookies.get(`ph_${PUBLIC_POSTHOG_PROJECT_TOKEN}_posthog`)
		if (!raw) return fallback
		const parsed = JSON.parse(raw) as { distinct_id?: unknown; $sesid?: unknown }
		const distinctId = typeof parsed.distinct_id === "string" ? parsed.distinct_id : "server"
		const sessionId =
			Array.isArray(parsed.$sesid) && typeof parsed.$sesid[1] === "string" ? parsed.$sesid[1] : null
		return { distinctId, sessionId }
	} catch {
		return fallback
	}
}
