/** Send a single event to PostHog via the Capture API. Fire-and-forget: errors are logged but do not fail the request. */
export async function captureServerEvent(
	token: string,
	event: string,
	distinctId: string,
	properties: Record<string, unknown> = {}
): Promise<void> {
	try {
		await fetch("https://us.i.posthog.com/capture/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ api_key: token, event, distinct_id: distinctId, properties })
		})
	} catch (err) {
		console.error("[posthog] captureServerEvent failed", err)
	}
}
