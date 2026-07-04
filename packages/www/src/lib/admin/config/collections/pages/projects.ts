import type { CollectionFile } from "@sveltia/cms"
import { createSeoField } from "../../fields"

export const projectsPage = {
	name: "projectsPage",
	label: "Projects Page",
	file: "packages/www/src/lib/cms/projects-page.json",
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
					hint: 'Small word before the accented title, e.g. "Our"'
				},
				{
					name: "titleAccent",
					label: "Title Accent Word",
					widget: "string",
					hint: 'Accent word displayed in primary color, e.g. "Projects"'
				},
				{
					name: "description",
					label: "Hero Description",
					widget: "text",
					hint: "Subheading paragraph shown below the hero title."
				},
				{
					name: "image",
					label: "Hero Background Image",
					widget: "image",
					hint: "Displayed as the hero background at 20% opacity."
				}
			]
		},
		{
			name: "filters",
			label: "Filter Pills",
			widget: "object",
			fields: [
				{
					name: "majorTagAllLabel",
					label: "Major Tag 'All' Label",
					widget: "string",
					hint: "Label for the 'All' pill in the major tag filter row, e.g. \"All Projects\""
				},
				{
					name: "minorTagAllLabel",
					label: "Minor Tag 'All' Label",
					widget: "string",
					hint: "Label for the 'All' pill in the minor tag filter row, e.g. \"All\""
				}
			]
		},
		{
			name: "card",
			label: "Project Card",
			widget: "object",
			fields: [
				{
					name: "ctaLabel",
					label: "Card CTA Text",
					widget: "string",
					hint: 'Link text shown on each project card, e.g. "View Project"'
				}
			]
		},
		{
			name: "modal",
			label: "Project Modal",
			widget: "object",
			fields: [
				{
					name: "galleryHeading",
					label: "Gallery Section Heading",
					widget: "string",
					hint: 'Heading shown above the image gallery in the project detail modal, e.g. "Gallery"'
				}
			]
		},
		{
			name: "emptyState",
			label: "Empty State (when filter has no matches)",
			widget: "object",
			fields: [
				{
					name: "heading",
					label: "Heading",
					widget: "string",
					hint: 'e.g. "No projects yet in this category"'
				},
				{
					name: "body",
					label: "Body Text",
					widget: "text",
					hint: "Shown when a filter matches no projects. The full portfolio is displayed below this message."
				}
			]
		},
		{
			name: "majorTags",
			label: "Major Project Tags",
			label_singular: "Tag",
			widget: "list",
			required: false,
			hint: "Top-level filter tags. Add or rename entries here; the available options in each project's Major Tags field update automatically.",
			field: { name: "tag", label: "Tag", widget: "string" }
		},
		{
			name: "minorTags",
			label: "Minor Project Tags",
			label_singular: "Tag",
			widget: "list",
			required: false,
			hint: "Secondary filter tags. Add or rename entries here; the available options in each project's Minor Tags field update automatically.",
			field: { name: "tag", label: "Tag", widget: "string" }
		},
		createSeoField()
	]
} satisfies CollectionFile
