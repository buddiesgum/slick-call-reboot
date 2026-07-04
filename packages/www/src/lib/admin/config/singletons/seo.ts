import type { CollectionFile } from "@sveltia/cms"

export const seoSingleton = {
	name: "seo",
	label: "SEO",
	file: "packages/www/src/lib/cms/seo.json",
	fields: [
		{
			name: "default",
			label: "Site Defaults",
			widget: "object",
			fields: [
				{ name: "siteName", label: "Site Name", widget: "string" },
				{ name: "title", label: "Default Page Title", widget: "string" },
				{ name: "description", label: "Default Meta Description", widget: "text" },
				{ name: "canonicalBase", label: "Canonical Base URL", widget: "string" },
				{ name: "ogImage", label: "Default OG Image", widget: "image" },
				{ name: "ogImageAlt", label: "OG Image Alt Text", widget: "string" },
				{
					name: "ogImageWidth",
					label: "OG Image Width (px)",
					widget: "number",
					value_type: "int",
					min: 1,
					hint: "Width of the default OG image in pixels, e.g. 1920"
				},
				{
					name: "ogImageHeight",
					label: "OG Image Height (px)",
					widget: "number",
					value_type: "int",
					min: 1,
					hint: "Height of the default OG image in pixels, e.g. 1024"
				}
			]
		}
	]
} satisfies CollectionFile
