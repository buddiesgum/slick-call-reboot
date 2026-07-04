import type { CollectionFile } from "@sveltia/cms"
import { createSeoField } from "../../fields"

export const homePage = {
	name: "homePage",
	label: "Home Page",
	file: "packages/www/src/lib/cms/home-page.json",
	fields: [
		{
			name: "hero",
			label: "Hero Section",
			widget: "object",
			fields: [
				{
					name: "title",
					label: "Title",
					widget: "string",
					hint: 'First line of the large hero heading, e.g. "One Call"'
				},
				{
					name: "titleAccent",
					label: "Title Accent",
					widget: "string",
					hint: 'Second line displayed in the primary color, e.g. "Does It All"'
				},
				{ name: "description", label: "Hero Description", widget: "text" },
				{
					name: "image",
					label: "Hero Background Image",
					widget: "image",
					hint: "Displayed as the full-bleed hero background."
				},
				{
					name: "primaryCtaLabel",
					label: "Primary CTA Label",
					widget: "string",
					hint: 'Label for the phone call button, e.g. "Call Now"'
				},
				{
					name: "textCtaLabel",
					label: "Text CTA Label",
					widget: "string",
					hint: 'Label for the SMS text button, e.g. "Text Us"'
				},
				{
					name: "secondaryCta",
					label: "Secondary CTA",
					widget: "object",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{
							name: "path",
							label: "Path",
							widget: "string",
							hint: 'e.g. "/plumbing"',
							pattern: ["^\\/", "Must be a relative path starting with /"]
						}
					]
				}
			]
		},
		{
			name: "services",
			label: "Services Grid Section",
			widget: "object",
			fields: [
				{
					name: "heading",
					label: "Heading",
					widget: "string",
					hint: 'First part of the section heading, e.g. "What We"'
				},
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: 'Accent word displayed in the primary color, e.g. "Do"'
				},
				{ name: "description", label: "Description", widget: "text" },
				{
					name: "cta",
					label: "CTA Button",
					widget: "object",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{
							name: "path",
							label: "Path",
							widget: "string",
							hint: 'e.g. "/all-services"',
							pattern: ["^\\/", "Must be a relative path starting with /"]
						}
					]
				}
			]
		},
		{
			name: "team",
			label: "Team Section",
			widget: "object",
			fields: [
				{
					name: "heading",
					label: "Heading",
					widget: "string",
					hint: 'First part of the section heading, e.g. "Our Amazing"'
				},
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: 'Accent word displayed in the primary color, e.g. "Team"'
				},
				{ name: "body", label: "Body Text", widget: "text" },
				{
					name: "bullets",
					label: "Bullet Points",
					label_singular: "Bullet",
					widget: "list",
					field: { name: "item", label: "Item", widget: "string" }
				},
				{
					name: "ctaLabel",
					label: "CTA Label",
					widget: "string",
					hint: 'Label for the phone call button, e.g. "Get In Touch"'
				},
				{
					name: "image",
					label: "Team Photo",
					widget: "image",
					hint: "Photo displayed on the right side of the team section."
				},
				{ name: "imageAlt", label: "Team Photo Alt Text", widget: "string" }
			]
		},
		{
			name: "closingCta",
			label: "Closing CTA Section",
			widget: "object",
			fields: [
				{ name: "heading", label: "Heading", widget: "string" },
				{ name: "description", label: "Description", widget: "text" },
				{
					name: "buttonLabel",
					label: "Button Label",
					widget: "string",
					hint: 'Label for the phone call button, e.g. "Call Hukill\'s Now"'
				}
			]
		},
		createSeoField()
	]
} satisfies CollectionFile
