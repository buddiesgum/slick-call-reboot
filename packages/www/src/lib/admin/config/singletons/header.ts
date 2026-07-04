import type { CollectionFile } from "@sveltia/cms"

export const headerSingleton = {
	name: "header",
	label: "Header",
	file: "packages/www/src/lib/cms/header.json",
	fields: [
		{
			name: "banner",
			label: "Top Banner",
			widget: "object",
			fields: [
				{ name: "enabled", label: "Show Banner", widget: "boolean", default: true },
				{ name: "text", label: "Banner Text", widget: "string" }
			]
		},
		{
			name: "logo",
			label: "Logo",
			widget: "object",
			fields: [
				{ name: "image", label: "Logo Image", widget: "image" },
				{ name: "alt", label: "Alt Text", widget: "string" }
			]
		},
		{
			name: "nav",
			label: "Navigation",
			label_singular: "Nav Item",
			widget: "list",
			fields: [
				{ name: "label", label: "Label", widget: "string" },
				{ name: "path", label: "Path", widget: "string" },
				{
					name: "children",
					label: "Submenu",
					label_singular: "Submenu Item",
					widget: "list",
					required: false,
					fields: [
						{ name: "label", label: "Label", widget: "string" },
						{ name: "path", label: "Path", widget: "string" },
						{
							name: "children",
							label: "Nested Submenu",
							label_singular: "Nested Item",
							widget: "list",
							required: false,
							fields: [
								{ name: "label", label: "Label", widget: "string" },
								{ name: "path", label: "Path", widget: "string" }
							]
						}
					]
				}
			]
		},
		{
			name: "cta",
			label: "Header CTA Button (primary)",
			widget: "object",
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
			label: "Header CTA Button (secondary / outline)",
			widget: "object",
			fields: [
				{ name: "label", label: "Button Label", widget: "string", required: true },
				{
					name: "path",
					label: "Link Path",
					widget: "string",
					hint: 'e.g. "/financing"',
					pattern: ["^\\/", "Must be a relative path starting with /"]
				}
			]
		}
	]
} satisfies CollectionFile
