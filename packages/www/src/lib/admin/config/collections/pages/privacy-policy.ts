import type { CollectionFile } from "@sveltia/cms"
import { createSeoField } from "../../fields"

export const privacyPolicyPage = {
	name: "privacyPolicyPage",
	label: "Privacy Policy Page",
	file: "packages/www/src/lib/cms/privacy-policy-page.json",
	fields: [
		{
			name: "hero",
			label: "Hero Section",
			widget: "object",
			fields: [
				{
					name: "eyebrow",
					label: "Eyebrow",
					widget: "string",
					hint: 'Small label above the title, e.g. "Legal"'
				},
				{ name: "title", label: "Page Title", widget: "string" },
				{
					name: "effectiveDate",
					label: "Effective Date Line",
					widget: "string",
					hint: 'e.g. "Effective date: January 1, 2023"'
				}
			]
		},
		{
			name: "intro",
			label: "Intro (before first section)",
			widget: "markdown",
			required: false,
			hint: "Introductory paragraphs shown above the first section. Supports paragraphs, links, and lists.",
			buttons: ["bold", "italic", "link", "bulleted-list", "numbered-list"],
			editor_components: [],
			modes: ["rich-text"]
		},
		{
			name: "sections",
			label: "Sections",
			label_singular: "Section",
			widget: "list",
			fields: [
				{ name: "title", label: "Section Title", widget: "string" },
				{
					name: "intro",
					label: "Intro Text",
					widget: "markdown",
					required: false,
					hint: "Optional lead-in paragraphs (and/or bullet list) shown before the sub-sections.",
					buttons: ["bold", "italic", "link", "bulleted-list", "numbered-list"],
					editor_components: [],
					modes: ["rich-text"]
				},
				{
					name: "subSections",
					label: "Sub-Sections",
					label_singular: "Sub-Section",
					widget: "list",
					required: false,
					fields: [
						{ name: "title", label: "Sub-Section Title", widget: "string" },
						{
							name: "body",
							label: "Body",
							widget: "markdown",
							buttons: ["bold", "italic", "link", "bulleted-list", "numbered-list"],
							editor_components: [],
							modes: ["rich-text"]
						}
					]
				}
			]
		},
		createSeoField()
	]
} satisfies CollectionFile
