import type { CollectionFile } from "@sveltia/cms"
import { createProjectFiltersField, createSeoField } from "../../fields"

export const allServicesPage = {
	name: "allServicesPage",
	label: "All Services Page",
	file: "packages/www/src/lib/cms/all-services-page.json",
	fields: [
		{
			name: "hero",
			label: "Hero Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{ name: "title", label: "Title", widget: "string" },
				{
					name: "titleAccent",
					label: "Title Accent",
					widget: "string",
					hint: "Displayed in the primary color"
				},
				{ name: "description", label: "Description", widget: "text" },
				{
					name: "image",
					label: "Hero Background Image",
					widget: "image",
					required: false,
					hint: "Displayed as the full-bleed hero background."
				},
				{ name: "imageAlt", label: "Image Alt Text", widget: "string" },
				{ name: "primaryCtaLabel", label: "Call CTA Label", widget: "string" },
				{ name: "textCtaLabel", label: "Text CTA Label", widget: "string" },
				{
					name: "projectsCta",
					label: "Projects CTA Button",
					widget: "object",
					fields: [
						{
							name: "label",
							label: "Button Label",
							widget: "string",
							hint: 'Button label, e.g. "View Past Projects" — links to /projects'
						},
						createProjectFiltersField()
					]
				}
			]
		},
		{
			name: "locationPrompt",
			label: "Location Prompt Section",
			widget: "object",
			fields: [
				{
					name: "eyebrowPrefix",
					label: "Eyebrow Prefix",
					widget: "string",
					hint: 'Location name is appended automatically, e.g. "Serving"'
				},
				{ name: "body", label: "Body Text", widget: "text" }
			]
		},
		{
			name: "servicesGrid",
			label: "Services Grid Section",
			widget: "object",
			fields: [
				{ name: "heading", label: "Heading", widget: "string" },
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: "Displayed in the primary color"
				},
				{ name: "description", label: "Description", widget: "text" }
			]
		},
		{
			name: "video",
			label: "Video Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{ name: "heading", label: "Heading", widget: "string" },
				{ name: "body", label: "Body Text", widget: "text" },
				{ name: "ctaLabel", label: "CTA Label", widget: "string" },
				{
					name: "ctaPath",
					label: "CTA Path",
					widget: "string",
					pattern: ["^\\/", "Must be a relative path starting with /"]
				},
				{
					name: "videoUrl",
					label: "Video URL",
					widget: "string",
					required: false,
					hint: "Optional. Use the embed URL, not the share URL — e.g. 'https://www.youtube.com/embed/VIDEO_ID' or 'https://player.vimeo.com/video/VIDEO_ID'."
				},
				{
					name: "posterImage",
					label: "Video Poster Image",
					widget: "image",
					required: false
				},
				{ name: "posterAlt", label: "Poster Image Alt Text", widget: "string" }
			]
		},
		{
			name: "reviews",
			label: "Reviews Section",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{ name: "heading", label: "Heading", widget: "string" },
				{
					name: "items",
					label: "Reviews",
					label_singular: "Review",
					widget: "list",
					fields: [
						{ name: "name", label: "Reviewer Name / Source", widget: "string" },
						{ name: "text", label: "Review Text", widget: "text" }
					]
				}
			]
		},
		{
			name: "closingCta",
			label: "Closing CTA Section",
			widget: "object",
			fields: [
				{ name: "heading", label: "Heading", widget: "string" },
				{
					name: "bodyPrefix",
					label: "Body Text Prefix",
					widget: "text",
					hint: "The selected location name is appended automatically at the end."
				},
				{ name: "callLabel", label: "Call Button Label", widget: "string" },
				{ name: "textLabel", label: "Text Button Label", widget: "string" }
			]
		},
		createSeoField()
	]
} satisfies CollectionFile
