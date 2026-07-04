import type { CollectionFile } from "@sveltia/cms"
import { ICON_NAMES } from "$lib/icons"
import { createSeoField } from "../../fields"

export const aboutPage = {
	name: "aboutPage",
	label: "About Page",
	file: "packages/www/src/lib/cms/about-page.json",
	fields: [
		{
			name: "hero",
			label: "Hero Section",
			widget: "object",
			fields: [
				{
					name: "eyebrow",
					label: "Eyebrow Text",
					widget: "string",
					hint: 'Small line above the heading, e.g. "Est. 1979 — Faith. Family. Craft."'
				},
				{
					name: "title",
					label: "Title (before accent)",
					widget: "string",
					hint: 'e.g. "Built on a"'
				},
				{
					name: "titleAccent",
					label: "Title Accent Word",
					widget: "string",
					hint: 'Displayed in the primary color, e.g. "Higher"'
				},
				{
					name: "titleSuffix",
					label: "Title Suffix (after accent)",
					widget: "string",
					hint: 'e.g. "Standard"'
				},
				{ name: "description", label: "Hero Description", widget: "text" },
				{
					name: "image",
					label: "Hero Background Image",
					widget: "image",
					hint: "Displayed as the full-bleed hero background."
				},
				{ name: "imageAlt", label: "Image Alt Text", widget: "string" }
			]
		},
		{
			name: "mission",
			label: "Mission Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{
					name: "heading",
					label: "Heading (before accent)",
					widget: "string",
					hint: 'e.g. "Diligence, Integrity,"'
				},
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: 'Displayed in the primary color, e.g. "Faith."'
				},
				{ name: "body", label: "Body Text", widget: "text" },
				{
					name: "image",
					label: "Mission Image",
					widget: "image",
					hint: "Displayed on the left side of the mission section."
				},
				{ name: "imageAlt", label: "Image Alt Text", widget: "string" },
				{
					name: "points",
					label: "Sub-Points",
					label_singular: "Point",
					widget: "list",
					fields: [
						{ name: "heading", label: "Point Heading", widget: "string" },
						{ name: "body", label: "Point Body", widget: "text" }
					]
				}
			]
		},
		{
			name: "values",
			label: "Values Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{
					name: "heading",
					label: "Heading (before accent)",
					widget: "string",
					hint: 'e.g. "What We Stand"'
				},
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: 'e.g. "For"'
				},
				{
					name: "backgroundImage",
					label: "Background Image",
					widget: "image",
					hint: "Displayed at low opacity behind the values cards."
				},
				{
					name: "items",
					label: "Values",
					label_singular: "Value",
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
						{ name: "description", label: "Description", widget: "text" }
					]
				}
			]
		},
		{
			name: "vision",
			label: "Vision Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{
					name: "heading",
					label: "Heading (before accent)",
					widget: "string",
					hint: 'e.g. "Measured by"'
				},
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: 'e.g. "Impact."'
				},
				{ name: "body", label: "Body Text", widget: "text" },
				{
					name: "bulletsLeadIn",
					label: "Bullets Lead-In",
					widget: "string",
					hint: "Sentence introducing the bullet list."
				},
				{
					name: "bullets",
					label: "Bullet Points",
					label_singular: "Bullet",
					widget: "list",
					field: { name: "item", label: "Item", widget: "string" }
				},
				{
					name: "image",
					label: "Vision Image",
					widget: "image",
					hint: "Displayed on the right side of the vision section."
				},
				{ name: "imageAlt", label: "Image Alt Text", widget: "string" }
			]
		},
		{
			name: "accountability",
			label: "Accountability Statement Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{ name: "heading", label: "Heading", widget: "string" },
				{ name: "body", label: "Body Text", widget: "text" }
			]
		},
		createSeoField()
	]
} satisfies CollectionFile
