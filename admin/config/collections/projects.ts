import type { EntryCollection } from "@sveltia/cms"

export const projectsCollection = {
	name: "projects",
	label: "Projects",
	label_singular: "Project",
	folder: "src/cms/projects",
	format: "json",
	extension: "json",
	identifier_field: "id",
	slug: "{{id}}",
	media_folder: "/public/media/projects/{{fields.id}}",
	public_folder: "/media/projects/{{fields.id}}",
	sortable_fields: ["order", "title"],
	fields: [
		{
			name: "id",
			label: "ID (slug)",
			widget: "string",
			pattern: [
				"^[a-z0-9]+(?:-[a-z0-9]+)*$",
				"Lowercase letters, digits, and single hyphens only (e.g. 'kitchen-remodel-fw')"
			],
			hint: "Used as the file slug and as a stable key in code. Cannot be changed without a code update."
		},
		{
			name: "order",
			label: "Display Order",
			widget: "number",
			min: 0,
			step: 1,
			value_type: "int",
			hint: "Lower numbers appear first."
		},
		{ name: "title", label: "Title", widget: "string" },
		{
			name: "majorTags",
			label: "Major Tags",
			widget: "relation",
			collection: "pages",
			file: "projectsPage",
			dropdown_threshold: 0,
			multiple: true,
			required: false,
			value_field: "majorTags.*",
			display_fields: ["majorTags.*"],
			search_fields: ["majorTags.*"],
			hint: "Edit the available options under Pages → Projects Page → Major Project Tags."
		},
		{
			name: "minorTags",
			label: "Minor Tags",
			widget: "relation",
			collection: "pages",
			file: "projectsPage",
			dropdown_threshold: 0,
			multiple: true,
			required: false,
			value_field: "minorTags.*",
			display_fields: ["minorTags.*"],
			search_fields: ["minorTags.*"],
			hint: "Edit the available options under Pages → Projects Page → Minor Project Tags."
		},
		{
			name: "location",
			label: "Location",
			widget: "string",
			hint: "e.g. 'Fort Worth, TX'"
		},
		{ name: "description", label: "Description", widget: "text" },
		{ name: "heroImage", label: "Hero Image", widget: "image" },
		{
			name: "gallery",
			label: "Gallery",
			label_singular: "Image",
			widget: "list",
			field: { name: "image", label: "Image", widget: "image" }
		},
		{
			name: "videoUrl",
			label: "Video URL",
			widget: "string",
			required: false,
			hint: "Optional. Use the embed URL, not the share URL — e.g. 'https://www.youtube.com/embed/VIDEO_ID' or 'https://player.vimeo.com/video/VIDEO_ID'."
		}
	]
} satisfies EntryCollection
