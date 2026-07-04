import type { EntryCollection } from "@sveltia/cms"
import { ICON_NAMES } from "$lib/icons"
import { createProjectFiltersField, createSeoField, createSlugField } from "../fields"

export const servicesCollection = {
	name: "services",
	label: "Services",
	label_singular: "Service",
	folder: "packages/www/src/lib/cms/service-pages",
	format: "json",
	extension: "json",
	identifier_field: "slug",
	slug: "{{fields.slug}}",
	media_folder: "/packages/www/static/media/service-pages/{{fields.slug}}",
	public_folder: "/media/service-pages/{{fields.slug}}",
	sortable_fields: ["title"],
	fields: [
		{
			name: "tile",
			label: "Service Tile",
			widget: "object",
			required: false,
			hint: "Controls how this service appears on the Home page and All Services grid.",
			fields: [
				{
					name: "icon",
					label: "Icon",
					widget: "select",
					options: [...ICON_NAMES],
					hint: "Lucide icon displayed on the tile card. Add new icons in src/lib/icons.ts."
				},
				{
					name: "description",
					label: "Short Description",
					widget: "text",
					hint: "One-line blurb shown beneath the title on tile cards."
				},
				{
					name: "image",
					label: "Tile Image",
					widget: "image",
					hint: "Background image for the tile card."
				},
				{
					name: "imageAlt",
					label: "Image Alt Text",
					widget: "string"
				},
				{
					name: "path",
					label: "Custom Link Path (optional)",
					widget: "string",
					required: false,
					pattern: ["^\\/", "Must be a relative path starting with /"],
					hint: "Override the default /<slug> link. Leave empty to use the service page. Use /contact for CTA-only tiles."
				},
				{
					name: "featured",
					label: "Featured (Home Page)",
					widget: "boolean",
					default: false,
					hint: "When enabled, this tile appears on the Home page services grid."
				},
				{
					name: "order",
					label: "Display Order",
					widget: "number",
					value_type: "int",
					min: 1,
					default: 99,
					hint: "Lower numbers appear first. Controls position in both the Home and All Services grids."
				}
			]
		},
		createSlugField({
			name: "slug",
			label: "Slug",
			purpose: "URL path for this service page — e.g. 'plumbing' becomes /plumbing.",
			consequence:
				"Renaming changes the live URL on the next deploy. The old URL will 404 — external links and Google search results pointing to it will break. After renaming, manually update: Header → Navigation, Footer → Services Column, and any service tiles / CTAs in Home. Existing uploaded images keep their original folder; new uploads go under the new slug."
		}),
		{ name: "title", label: "Page Title (admin label)", widget: "string" },
		{
			name: "layout",
			label: "Page Layout",
			widget: "object",
			types: [
				{
					name: "simple",
					label: "Simple (Cards)",
					widget: "object",
					fields: [
						{
							name: "hero",
							label: "Hero Section",
							widget: "object",
							fields: [
								{ name: "title", label: "Hero Title", widget: "string" },
								{ name: "subtitle", label: "Subtitle", widget: "text", required: false },
								{
									name: "image",
									label: "Background Image",
									widget: "image",
									hint: "Displayed as the hero background."
								},
								{
									name: "imageAlt",
									label: "Image Alt Text",
									widget: "string",
									required: false
								},
								{
									name: "cta",
									label: "Hero CTA Button (optional)",
									widget: "object",
									required: false,
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
							name: "cards",
							label: "Content Cards",
							label_singular: "Card",
							widget: "list",
							fields: [
								{ name: "title", label: "Card Title", widget: "string" },
								{ name: "description", label: "Description", widget: "text" },
								{
									name: "items",
									label: "Bullet Items",
									label_singular: "Item",
									widget: "list",
									required: false,
									field: { name: "item", label: "Item", widget: "string" }
								},
								{
									name: "image",
									label: "Card Image",
									widget: "image"
								},
								{ name: "imageAlt", label: "Image Alt Text", widget: "string" },
								{
									name: "reverse",
									label: "Reverse Layout",
									widget: "boolean",
									default: false,
									hint: "When enabled, the image appears on the left and text on the right."
								}
							]
						}
					]
				},
				{
					name: "complex",
					label: "Complex (Featured)",
					widget: "object",
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
									required: false,
									hint: 'Small label above the heading, e.g. "Commercial Plumbing"'
								},
								{
									name: "title",
									label: "Title (before accent)",
									widget: "string",
									hint: 'e.g. "Big Problems Need"'
								},
								{
									name: "titleAccent",
									label: "Title Accent",
									widget: "string",
									required: false,
									hint: 'Displayed in the primary color, e.g. "Big Crews."'
								},
								{ name: "subtitle", label: "Subtitle", widget: "text", required: false },
								{
									name: "image",
									label: "Background Image",
									widget: "image",
									hint: "Displayed as the hero background at 35% opacity."
								},
								{
									name: "imageAlt",
									label: "Image Alt Text",
									widget: "string",
									required: false
								},
								{
									name: "primaryCta",
									label: "Primary CTA Button (optional)",
									widget: "object",
									required: false,
									fields: [
										{ name: "label", label: "Button Label", widget: "string" },
										{
											name: "path",
											label: "Link Path",
											widget: "string",
											hint: 'e.g. "/contact"',
											pattern: ["^\\/", "Must be a relative path starting with /"]
										}
									]
								},
								{
									name: "secondaryCta",
									label: "Secondary CTA Button (optional)",
									widget: "object",
									required: false,
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
							name: "scale",
							label: "Scale Section (optional)",
							widget: "object",
							required: false,
							fields: [
								{
									name: "eyebrow",
									label: "Eyebrow Text",
									widget: "string",
									required: false
								},
								{ name: "heading", label: "Heading", widget: "string" },
								{ name: "body", label: "Body Text", widget: "text", required: false },
								{
									name: "items",
									label: "Scale Points",
									label_singular: "Point",
									widget: "list",
									max: 4,
									hint: "Up to 4 capability highlights shown in the icon card grid.",
									fields: [
										{
											name: "icon",
											label: "Icon",
											widget: "select",
											options: [...ICON_NAMES],
											hint: "Lucide icon name. Add new icons in src/lib/icons.ts."
										},
										{ name: "label", label: "Label", widget: "string" },
										{ name: "text", label: "Description", widget: "text" }
									]
								}
							]
						},
						{
							name: "capabilities",
							label: "Capabilities Section (optional)",
							widget: "object",
							required: false,
							fields: [
								{
									name: "eyebrow",
									label: "Eyebrow Text",
									widget: "string",
									required: false
								},
								{ name: "heading", label: "Heading", widget: "string" },
								{
									name: "items",
									label: "Capability Items",
									label_singular: "Item",
									widget: "list",
									field: { name: "item", label: "Item", widget: "string" }
								}
							]
						}
					]
				}
			]
		},
		createSeoField()
	]
} satisfies EntryCollection
