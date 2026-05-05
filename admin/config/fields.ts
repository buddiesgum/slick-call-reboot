import type { ObjectFieldWithSubFields } from "@sveltia/cms"

export const createProjectFiltersField = () =>
	({
		name: "projectFilters",
		label: "Project Filters (optional)",
		widget: "object",
		required: false,
		hint: "When set, the 'View Past Projects' button will open the projects page with these filters pre-selected.",
		fields: [
			{
				name: "major",
				label: "Major Tag",
				widget: "relation",
				collection: "pages",
				file: "projectsPage",
				dropdown_threshold: 0,
				multiple: false,
				required: false,
				value_field: "majorTags.*",
				display_fields: ["majorTags.*"],
				search_fields: ["majorTags.*"],
				hint: "Pre-select a major filter (e.g. Commercial, Residential). Leave blank for no pre-selection."
			},
			{
				name: "minor",
				label: "Minor Tag",
				widget: "relation",
				collection: "pages",
				file: "projectsPage",
				dropdown_threshold: 0,
				multiple: false,
				required: false,
				value_field: "minorTags.*",
				display_fields: ["minorTags.*"],
				search_fields: ["minorTags.*"],
				hint: "Pre-select a minor filter (e.g. Plumbing, Restoration). Leave blank for no pre-selection."
			}
		]
	}) satisfies ObjectFieldWithSubFields

export const createSeoField = () =>
	({
		name: "seo",
		label: "SEO",
		widget: "object",
		required: false,
		fields: [
			{ name: "title", label: "Page Title", widget: "string", required: false },
			{ name: "description", label: "Meta Description", widget: "text", required: false },
			{ name: "canonical", label: "Canonical URL Override", widget: "string", required: false },
			{ name: "ogImage", label: "OG Image Override", widget: "image", required: false },
			{ name: "ogImageAlt", label: "OG Image Alt Text", widget: "string", required: false },
			{
				name: "ogImageWidth",
				label: "OG Image Width (px)",
				widget: "number",
				value_type: "int",
				min: 1,
				required: false,
				hint: "Width of the OG image override in pixels"
			},
			{
				name: "ogImageHeight",
				label: "OG Image Height (px)",
				widget: "number",
				value_type: "int",
				min: 1,
				required: false,
				hint: "Height of the OG image override in pixels"
			}
		]
	}) satisfies ObjectFieldWithSubFields
