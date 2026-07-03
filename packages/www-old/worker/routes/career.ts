import { careerSchema, validateResumeFile } from "@/lib/schemas/career"
import emailSettings from "@/cms/email-settings.json"
import seo from "@/cms/seo.json"
import { escapeHtml } from "../lib/html"
import { safeSend } from "../lib/email"
import { captureServerEvent } from "../lib/posthog"

export async function handleCareer(request: Request, env: Env): Promise<Response> {
	const contentType = request.headers.get("content-type") ?? ""
	if (!contentType.includes("multipart/form-data")) {
		return Response.json({ ok: false, error: "Unsupported Media Type" }, { status: 415 })
	}

	let formData: FormData
	try {
		formData = await request.formData()
	} catch {
		return Response.json({ ok: false, error: "Invalid form data" }, { status: 400 })
	}

	// Parse text fields
	const result = careerSchema.safeParse({
		firstName: formData.get("firstName"),
		lastName: formData.get("lastName"),
		email: formData.get("email"),
		message: formData.get("message"),
		updates: formData.get("updates") === "true"
	})
	if (!result.success) {
		return Response.json({ ok: false, errors: result.error.flatten() }, { status: 400 })
	}

	const { firstName, lastName, email, message, updates } = result.data

	// Parse and validate resume file (optional)
	const resumeEntry = formData.get("resume")
	let resumeAttachment: { content: ArrayBuffer; filename: string; type: string } | null = null

	if (resumeEntry instanceof File && resumeEntry.size > 0) {
		const fileError = validateResumeFile(resumeEntry)
		if (fileError) {
			return Response.json({ ok: false, errors: { resume: [fileError] } }, { status: 400 })
		}
		resumeAttachment = {
			content: await resumeEntry.arrayBuffer(),
			filename: resumeEntry.name,
			type: resumeEntry.type
		}
	}

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
				<p><strong>Resume:</strong> ${resumeAttachment ? "Yes — see attachment" : "No resume submitted"}</p>
				<p><strong>Job updates opt-in:</strong> ${updates ? "Yes" : "No"}</p>
				<p><strong>Message:</strong></p>
				<p>${escapeHtml(message)}</p>
			`,
			attachments:
				resumeAttachment ?
					[
						{
							content: resumeAttachment.content,
							filename: resumeAttachment.filename,
							type: resumeAttachment.type,
							disposition: "attachment"
						}
					]
				:	undefined
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

	const distinctId = request.headers.get("x-posthog-distinct-id") ?? "server"
	const sessionId = request.headers.get("x-posthog-session-id")
	await captureServerEvent(env.POSTHOG_PROJECT_TOKEN, "career_application_received", distinctId, {
		resume_attached: resumeAttachment !== null,
		...(sessionId ? { $session_id: sessionId } : {})
	})

	return Response.json({ ok: true })
}
