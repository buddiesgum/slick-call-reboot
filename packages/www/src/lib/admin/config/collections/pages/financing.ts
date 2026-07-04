import type { CollectionFile } from "@sveltia/cms"
import { ICON_NAMES } from "$lib/icons"
import { createSeoField } from "../../fields"

export const financingPage = {
	name: "financingPage",
	label: "Financing Page",
	file: "packages/www/src/lib/cms/financing-page.json",
	fields: [
		{
			name: "hero",
			label: "Hero Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{ name: "title", label: "Title (before accent)", widget: "string" },
				{ name: "titleAccent", label: "Title Accent", widget: "string" },
				{ name: "description", label: "Description", widget: "text" },
				{ name: "image", label: "Hero Background Image", widget: "image" },
				{ name: "imageAlt", label: "Image Alt Text", widget: "string" },
				{
					name: "primaryCta",
					label: "Primary CTA",
					widget: "object",
					fields: [
						{ name: "label", label: "Button Label", widget: "string" },
						{ name: "path", label: "Link Path", widget: "string" }
					]
				},
				{
					name: "secondaryCta",
					label: "Secondary CTA (scrolls to calculator section)",
					widget: "object",
					fields: [{ name: "label", label: "Button Label", widget: "string" }]
				}
			]
		},
		{
			name: "benefits",
			label: "Benefits Section",
			widget: "object",
			fields: [
				{
					name: "items",
					label: "Benefit Cards",
					widget: "list",
					fields: [
						{
							name: "icon",
							label: "Icon",
							widget: "select",
							options: [...ICON_NAMES],
							hint: "Lucide icon name. Add new icons in src/lib/icons.ts."
						},
						{ name: "title", label: "Title", widget: "string" },
						{ name: "copy", label: "Body Text", widget: "text" }
					]
				}
			]
		},
		{
			name: "calculator",
			label: "Calculator Widget",
			widget: "object",
			fields: [
				{ name: "heading", label: "Heading (before accent)", widget: "string" },
				{ name: "headingAccent", label: "Heading Accent", widget: "string" },
				{ name: "description", label: "Description", widget: "text" },
				{
					name: "page",
					label: "Enhancify Page ID",
					widget: "string",
					hint: "The data-page attribute value provided by Enhancify"
				},
				{ name: "color1", label: "Brand Color 1 (hex)", widget: "string" },
				{ name: "color2", label: "Brand Color 2 (hex)", widget: "string" },
				{
					name: "coBrandedColor",
					label: "Co-branded Color (hex)",
					widget: "string"
				},
				{
					name: "border",
					label: "Show Border",
					widget: "boolean",
					default: true
				},
				{ name: "hideLink", label: "Hide Link (0 = show)", widget: "string" }
			]
		},
		{
			name: "cta",
			label: "Bottom CTA Section",
			widget: "object",
			fields: [
				{ name: "heading", label: "Heading", widget: "string" },
				{ name: "description", label: "Description", widget: "text" },
				{ name: "label", label: "Button Label", widget: "string" },
				{ name: "path", label: "Button Path", widget: "string" }
			]
		},
		createSeoField()
	]
} satisfies CollectionFile
