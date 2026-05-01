import { contactSchema } from "@/lib/schemas/contact"
import emailSettings from "@/cms/email-settings.json"
import seo from "@/cms/seo.json"
import { escapeHtml } from "../lib/html"
import { safeSend } from "../lib/email"

export async function handleContact(request: Request, env: Env): Promise<Response> {
	if (!request.headers.get("content-type")?.includes("application/json")) {
		return Response.json({ ok: false, error: "Unsupported Media Type" }, { status: 415 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
	}

	const result = contactSchema.safeParse(body)
	if (!result.success) {
		return Response.json({ ok: false, errors: result.error.flatten() }, { status: 400 })
	}

	const { firstName, lastName, email, phone, propertyType, service, message, financing } =
		result.data

	const companyName = seo.default.siteName
	const fromAddr = emailSettings.fromAddress

	/** Substitute {{firstName}}, {{service}}, {{companyName}} in CMS-managed templates. */
	const render = (tpl: string) =>
		tpl
			.replaceAll("{{firstName}}", escapeHtml(firstName))
			.replaceAll("{{service}}", escapeHtml(service))
			.replaceAll("{{companyName}}", escapeHtml(companyName))

	// Staff notification is the critical path — send first.
	const staffResult = await safeSend(
		env.EMAIL,
		{
			to: emailSettings.leadEmail,
			from: fromAddr,
			subject: `New ${escapeHtml(propertyType)} lead: ${escapeHtml(service)} — ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
			html: `
				<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
				<p><strong>Property type:</strong> ${escapeHtml(propertyType)}</p>
				<p><strong>Service:</strong> ${escapeHtml(service)}</p>
				<p><strong>Financing interest:</strong> ${financing ? "Yes" : "No"}</p>
				<p><strong>Message:</strong></p>
				<p>${escapeHtml(message)}</p>
			`
		},
		"staff-notification"
	)

	if (!staffResult.ok) {
		// Lead data is in the wrangler tail log via safeSend. Return 500 so the
		// caller knows the submission did not reach staff.
		return Response.json({ ok: false, error: "Failed to send" }, { status: 500 })
	}

	// Auto-reply to the customer — expected to fail when the submitter's address
	// is not a verified Email Routing destination. Log via safeSend; do not fail
	// the request.
	await safeSend(
		env.EMAIL,
		{
			to: email,
			from: fromAddr,
			subject: render(emailSettings.autoReplySubject),
			html: render(emailSettings.autoReplyBody)
		},
		"customer-auto-reply"
	)

	return Response.json({ ok: true })
}
