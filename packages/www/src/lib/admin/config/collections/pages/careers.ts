import type { CollectionFile } from "@sveltia/cms"
import { ICON_NAMES } from "$lib/icons"
import { createSeoField } from "../../fields"

export const careersPage = {
	name: "careersPage",
	label: "Careers Page",
	file: "packages/www/src/lib/cms/careers-page.json",
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
					hint: 'Small line above the heading, e.g. "Now Hiring"'
				},
				{
					name: "title",
					label: "Title (before accent)",
					widget: "string",
					hint: 'e.g. "Build a"'
				},
				{
					name: "titleAccent",
					label: "Title Accent Word",
					widget: "string",
					hint: 'Displayed in the primary color, e.g. "Career"'
				},
				{
					name: "titleSuffix",
					label: "Title Suffix (after accent)",
					widget: "string",
					hint: 'e.g. "with Purpose"'
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
			name: "trades",
			label: "Trades Section",
			widget: "object",
			fields: [
				{
					name: "items",
					label: "Trades",
					label_singular: "Trade",
					widget: "list",
					max: 4,
					hint: "Up to 4 trade specialties shown in the icon grid.",
					fields: [
						{
							name: "icon",
							label: "Icon",
							widget: "select",
							options: [...ICON_NAMES],
							hint: "Lucide icon name. Add new icons in src/lib/icons.ts."
						},
						{ name: "label", label: "Label", widget: "string" }
					]
				}
			]
		},
		{
			name: "application",
			label: "Application Form Section",
			widget: "object",
			fields: [
				{
					name: "eyebrow",
					label: "Eyebrow Text",
					widget: "string",
					hint: 'e.g. "Application"'
				},
				{ name: "heading", label: "Section Heading", widget: "string" },
				{
					name: "firstName",
					label: "First Name Field",
					widget: "object",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{ name: "required", label: "Required", widget: "boolean", default: true }
					]
				},
				{
					name: "lastName",
					label: "Last Name Field",
					widget: "object",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{ name: "required", label: "Required", widget: "boolean", default: true }
					]
				},
				{
					name: "email",
					label: "Email Field",
					widget: "object",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{ name: "required", label: "Required", widget: "boolean", default: true }
					]
				},
				{
					name: "message",
					label: "Message Field",
					widget: "object",
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{ name: "required", label: "Required", widget: "boolean", default: true }
					]
				},
				{ name: "messagePlaceholder", label: "Message Placeholder", widget: "string" },
				{ name: "resumeLabel", label: "Resume Field Label", widget: "string" },
				{
					name: "resumeUploadHint",
					label: "Resume Upload Hint",
					widget: "string",
					hint: 'Displayed inside the file upload area, e.g. "Click to upload (PDF, DOC, DOCX)"'
				},
				{ name: "updatesLabel", label: "Updates Checkbox Label", widget: "string" },
				{ name: "submitLabel", label: "Submit Button Label", widget: "string" },
				{
					name: "submittingLabel",
					label: "Submit Button (submitting state)",
					widget: "string"
				},
				{ name: "successTitle", label: "Success Toast Title", widget: "string" },
				{ name: "successBody", label: "Success Toast Body", widget: "string" },
				{ name: "errorTitle", label: "Error Toast Title", widget: "string" },
				{ name: "errorBody", label: "Error Toast Body", widget: "text" }
			]
		},
		createSeoField()
	]
} satisfies CollectionFile
