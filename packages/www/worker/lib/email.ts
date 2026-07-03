type SendResult = { ok: true } | { ok: false; error: unknown }

/**
 * Wraps a single env.EMAIL.send() call so failures are caught and logged
 * without propagating. Use `label` to distinguish sends in wrangler tail output.
 *
 * Returns { ok: false } when the binding throws (e.g. unverified destination
 * address, misconfigured zone, transient CF error).
 */
export async function safeSend(
	email: SendEmail,
	message: Parameters<SendEmail["send"]>[0],
	label: string
): Promise<SendResult> {
	try {
		await email.send(message)
		return { ok: true }
	} catch (error) {
		console.error(`[email:${label}] send failed`, error)
		return { ok: false, error }
	}
}
