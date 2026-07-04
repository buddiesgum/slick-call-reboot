import type { CollectionFile } from "@sveltia/cms"

export const serviceCtaSingleton = {
	name: "serviceCta",
	label: "Service CTA",
	file: "packages/www/src/lib/cms/service-cta.json",
	fields: [
		{
			name: "heading",
			label: "Heading (before accent)",
			widget: "string",
			hint: 'e.g. "Available 24/7 for"'
		},
		{
			name: "headingAccent",
			label: "Heading Accent",
			widget: "string",
			hint: 'Displayed in the primary color, e.g. "Emergencies"'
		},
		{ name: "description", label: "Body Text", widget: "text" },
		{
			name: "phoneCtaLabel",
			label: "Phone CTA Label",
			widget: "string",
			hint: 'The location short name is appended automatically, e.g. "Call" → "Call Fort Worth"'
		},
		{ name: "quoteCtaLabel", label: "Quote CTA Label", widget: "string" },
		{
			name: "quotePath",
			label: "Quote CTA Path",
			widget: "string",
			hint: 'e.g. "/contact"',
			pattern: ["^\\/", "Must be a relative path starting with /"]
		},
		{
			name: "locationPrefix",
			label: "Location Prefix",
			widget: "string",
			hint: 'Text before the location name, e.g. "Serving"'
		}
	]
} satisfies CollectionFile
