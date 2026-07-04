import { Buffer } from "node:buffer"
import { RESEND_API_KEY } from "$app/env/private"

export interface EmailAttachment {
	content: ArrayBuffer
	filename: string
	type: string
}

export interface EmailMessage {
	to: string
	from: string
	subject: string
	html: string
	replyTo?: string
	attachments?: EmailAttachment[]
}

type SendResult = { ok: true } | { ok: false; error: unknown }

/**
 * Sends a single email through the Resend REST API.
 * https://resend.com/docs/api-reference/emails/send-email
 *
 * Failures are caught and logged without propagating — use `label` to
 * distinguish sends in the Vercel function logs. Returns { ok: false } on any
 * error (unverified destination, misconfigured key, transient Resend error).
 */
export async function safeSend(message: EmailMessage, label: string): Promise<SendResult> {
	try {
		if (!RESEND_API_KEY) {
			throw new Error("Resend API key is not configured")
		}

		const body = {
			to: message.to,
			from: message.from,
			subject: message.subject,
			html: message.html,
			reply_to: message.replyTo,
			attachments: message.attachments?.map(attachment => ({
				content: Buffer.from(new Uint8Array(attachment.content)).toString("base64"),
				filename: attachment.filename,
				content_type: attachment.type
			}))
		}

		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})

		const result = (await response.json()) as { id?: string; message?: string; name?: string }
		if (!response.ok || !result.id) {
			throw new Error(`Resend API ${response.status}: ${result.name ?? ""} ${result.message ?? ""}`)
		}

		return { ok: true }
	} catch (error) {
		console.error(`[email:${label}] send failed`, error)
		return { ok: false, error }
	}
}
