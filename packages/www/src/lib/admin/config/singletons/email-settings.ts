import type { CollectionFile } from "@sveltia/cms"

export const emailSettingsSingleton = {
	name: "emailSettings",
	label: "Email Settings",
	file: "packages/www/src/lib/cms/email-settings.json",
	fields: [
		{
			name: "fromAddress",
			label: "From Address",
			widget: "string",
			hint: "Full email address used as the From: header (e.g. noreply@hukills.com). Must be a verified sender in Cloudflare Email Sending.",
			pattern: ["^\\S+@\\S+\\.\\S+$", "Must be a valid email address"]
		},
		{
			name: "leadEmail",
			label: "Contact Form Lead Recipient",
			widget: "string",
			hint: "Address that receives new contact form submissions.",
			pattern: ["^\\S+@\\S+\\.\\S+$", "Must be a valid email address"]
		},
		{
			name: "autoReplySubject",
			label: "Contact Auto-Reply Subject",
			widget: "string",
			hint: "Subject line sent to the customer after they submit the contact form."
		},
		{
			name: "autoReplyBody",
			label: "Contact Auto-Reply Body (HTML)",
			widget: "text",
			hint: "HTML body for the customer auto-reply. Supported placeholders: {{firstName}}, {{service}}, {{companyName}}."
		},
		{
			name: "careerLeadEmail",
			label: "Career Application Recipient",
			widget: "string",
			hint: "Address that receives new career applications.",
			pattern: ["^\\S+@\\S+\\.\\S+$", "Must be a valid email address"]
		},
		{
			name: "careerAutoReplySubject",
			label: "Career Auto-Reply Subject",
			widget: "string",
			hint: "Subject line sent to the applicant after they submit the careers form."
		},
		{
			name: "careerAutoReplyBody",
			label: "Career Auto-Reply Body (HTML)",
			widget: "text",
			hint: "HTML body for the applicant auto-reply. Supported placeholders: {{firstName}}, {{companyName}}."
		}
	]
} satisfies CollectionFile
