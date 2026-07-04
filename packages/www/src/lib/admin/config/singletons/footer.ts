import type { CollectionFile } from "@sveltia/cms"

export const footerSingleton = {
	name: "footer",
	label: "Footer",
	file: "packages/www/src/lib/cms/footer.json",
	fields: [
		{
			name: "logo",
			label: "Logo",
			widget: "object",
			fields: [
				{ name: "image", label: "Logo Image", widget: "image" },
				{ name: "alt", label: "Alt Text", widget: "string" }
			]
		},
		{ name: "tagline", label: "Tagline", widget: "text" },
		{
			name: "services",
			label: "Services Column",
			widget: "object",
			fields: [
				{ name: "heading", label: "Column Heading", widget: "string" },
				{
					name: "links",
					label: "Links",
					label_singular: "Link",
					widget: "list",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{ name: "path", label: "Path", widget: "string" }
					]
				}
			]
		},
		{
			name: "company",
			label: "Company Column",
			widget: "object",
			fields: [
				{ name: "heading", label: "Column Heading", widget: "string" },
				{
					name: "links",
					label: "Links",
					label_singular: "Link",
					widget: "list",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{ name: "path", label: "Path", widget: "string" }
					]
				}
			]
		},
		{
			name: "contact",
			label: "Contact Column",
			widget: "object",
			hint: 'Rendered as "{heading} — {Location}", e.g. "Contact — Fort Worth". The location name is appended automatically; do not include it here.',
			fields: [{ name: "heading", label: "Column Heading", widget: "string" }]
		},
		{
			name: "copyrightPrefix",
			label: "Copyright Prefix",
			widget: "string",
			hint: 'Displayed before the current year, e.g. "©"'
		},
		{
			name: "copyrightSuffix",
			label: "Copyright Suffix",
			widget: "string",
			hint: 'Displayed after the current year, e.g. "Hukill\'s Inc. All rights reserved."'
		}
	]
} satisfies CollectionFile
