import { error, invalid } from "@sveltejs/kit"
import { dev } from "$app/env"
import { form } from "$app/server"
import { careerSchema, validateResumeFile, RESUME_ERROR_MESSAGES } from "$lib/schemas/career"
import emailSettings from "$lib/cms/email-settings.json"
import seo from "$lib/cms/seo.json"
import { escapeHtml } from "$lib/server/html"
import { safeSend, type EmailAttachment } from "$lib/server/email"
import { captureServerEvent, getPosthogIds } from "$lib/server/posthog"

export const submitApplication = form(careerSchema, async (data, issue) => {
	const { firstName, lastName, email, message, updates, resume } = data

	// Resume is optional; an untouched file input can surface as an empty File.
	let resumeAttachment: EmailAttachment | null = null
	if (resume && resume.size > 0) {
		const fileError = validateResumeFile(resume)
		if (fileError) {
			invalid(issue.resume(RESUME_ERROR_MESSAGES[fileError]))
		}
		resumeAttachment = {
			content: await resume.arrayBuffer(),
			filename: resume.name,
			type: resume.type || "application/octet-stream"
		}
	}

	// In dev, hardcode the verified @mail.ajcaldwell.dev addresses so local
	// submissions send through the dev Resend account without emailing real
	// staff. Production uses the CMS-managed values.
	const fromAddress = dev ? "hello@mail.ajcaldwell.dev" : emailSettings.fromAddress
	const careerLeadEmail = dev ? "hukills_career@ajcaldwell.dev" : emailSettings.careerLeadEmail

	const companyName = seo.default.siteName
	const fromAddr = `${companyName} <${fromAddress}>`

	/** Substitute {{firstName}}, {{companyName}} in CMS-managed templates. */
	const render = (tpl: string) =>
		tpl
			.replaceAll("{{firstName}}", escapeHtml(firstName))
			.replaceAll("{{companyName}}", escapeHtml(companyName))

	// Staff notification is the critical path — send first.
	const staffResult = await safeSend(
		{
			to: careerLeadEmail,
			from: fromAddr,
			replyTo: email,
			subject: `New application: ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
			html: `
				<p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Resume:</strong> ${resumeAttachment ? "Yes — see attachment" : "No resume submitted"}</p>
				<p><strong>Job updates opt-in:</strong> ${updates ? "Yes" : "No"}</p>
				<p><strong>Message:</strong></p>
				<p>${escapeHtml(message)}</p>
			`,
			attachments: resumeAttachment ? [resumeAttachment] : undefined
		},
		"staff-notification"
	)

	if (!staffResult.ok) {
		// Application data is in the function logs via safeSend. Surface a 500 so
		// the caller knows the submission did not reach staff.
		error(500, "Failed to send")
	}

	// Auto-reply to the applicant — may fail for unverifiable addresses.
	// Logged via safeSend; does not fail the request.
	await safeSend(
		{
			to: email,
			from: fromAddr,
			replyTo: careerLeadEmail,
			subject: render(emailSettings.careerAutoReplySubject),
			html: render(emailSettings.careerAutoReplyBody)
		},
		"applicant-auto-reply"
	)

	const { distinctId, sessionId } = getPosthogIds()
	await captureServerEvent("career_application_received", distinctId, {
		resume_attached: resumeAttachment !== null,
		...(sessionId ? { $session_id: sessionId } : {})
	})

	return { success: true }
})
