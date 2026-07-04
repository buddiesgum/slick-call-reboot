import { error } from "@sveltejs/kit"
import { dev } from "$app/env"
import { form } from "$app/server"
import { contactSchema } from "$lib/schemas/contact"
import emailSettings from "$lib/cms/email-settings.json"
import seo from "$lib/cms/seo.json"
import { escapeHtml } from "$lib/server/html"
import { safeSend } from "$lib/server/email"
import { captureServerEvent, getPosthogIds } from "$lib/server/posthog"

export const submitContact = form(contactSchema, async data => {
	const { firstName, lastName, email, phone, propertyType, service, message, financing } = data

	// In dev, hardcode the verified @mail.ajcaldwell.dev addresses so local
	// submissions send through the dev Resend account without emailing real
	// staff. Production uses the CMS-managed values.
	const fromAddress = dev ? "hello@mail.ajcaldwell.dev" : emailSettings.fromAddress
	const leadEmail = dev ? "hukills_contact@ajcaldwell.dev" : emailSettings.leadEmail

	const companyName = seo.default.siteName
	const fromAddr = `${companyName} <${fromAddress}>`

	/** Substitute {{firstName}}, {{service}}, {{companyName}} in CMS-managed templates. */
	const render = (tpl: string) =>
		tpl
			.replaceAll("{{firstName}}", escapeHtml(firstName))
			.replaceAll("{{service}}", escapeHtml(service))
			.replaceAll("{{companyName}}", escapeHtml(companyName))

	// Staff notification is the critical path — send first.
	const staffResult = await safeSend(
		{
			to: leadEmail,
			from: fromAddr,
			replyTo: email,
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
		// Lead data is in the function logs via safeSend. Surface a 500 so the
		// caller knows the submission did not reach staff.
		error(500, "Failed to send")
	}

	// Auto-reply to the customer — may fail for unverifiable addresses.
	// Logged via safeSend; does not fail the request.
	await safeSend(
		{
			to: email,
			from: fromAddr,
			replyTo: leadEmail,
			subject: render(emailSettings.autoReplySubject),
			html: render(emailSettings.autoReplyBody)
		},
		"customer-auto-reply"
	)

	const { distinctId, sessionId } = getPosthogIds()
	await captureServerEvent("contact_lead_received", distinctId, {
		...(sessionId ? { $session_id: sessionId } : {})
	})

	return { success: true }
})
