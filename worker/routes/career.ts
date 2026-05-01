import { careerSchema } from "@/lib/schemas/career"
import emailSettings from "@/cms/email-settings.json"
import seo from "@/cms/seo.json"
import { escapeHtml } from "../lib/html"
import { safeSend } from "../lib/email"

export async function handleCareer(request: Request, env: Env): Promise<Response> {
	if (!request.headers.get("content-type")?.includes("application/json")) {
		return Response.json({ ok: false, error: "Unsupported Media Type" }, { status: 415 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
	}

	const result = careerSchema.safeParse(body)
	if (!result.success) {
		return Response.json({ ok: false, errors: result.error.flatten() }, { status: 400 })
	}

	const { firstName, lastName, email, message, updates, hasResume } = result.data

	const companyName = seo.default.siteName
	const fromAddr = emailSettings.fromAddress

	/** Substitute {{firstName}}, {{companyName}} in CMS-managed templates. */
	const render = (tpl: string) =>
		tpl
			.replaceAll("{{firstName}}", escapeHtml(firstName))
			.replaceAll("{{companyName}}", escapeHtml(companyName))

	// Staff notification is the critical path — send first.
	const staffResult = await safeSend(
		env.EMAIL,
		{
			to: emailSettings.careerLeadEmail,
			from: fromAddr,
			subject: `New application: ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
			html: `
				<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Resume attached:</strong> ${hasResume ? "Yes (upload pending — see TODO in career.ts)" : "No"}</p>
				<p><strong>Job updates opt-in:</strong> ${updates ? "Yes" : "No"}</p>
				<p><strong>Message:</strong></p>
				<p>${escapeHtml(message)}</p>
			`
		},
		"staff-notification"
	)

	if (!staffResult.ok) {
		// Application data is in the wrangler tail log via safeSend. Return 500 so
		// the caller knows the submission did not reach staff.
		return Response.json({ ok: false, error: "Failed to send" }, { status: 500 })
	}

	// Auto-reply to the applicant — expected to fail when the submitter's address
	// is not a verified Email Routing destination. Log via safeSend; do not fail
	// the request.
	await safeSend(
		env.EMAIL,
		{
			to: email,
			from: fromAddr,
			subject: render(emailSettings.careerAutoReplySubject),
			html: render(emailSettings.careerAutoReplyBody)
		},
		"applicant-auto-reply"
	)

	return Response.json({ ok: true })
}
