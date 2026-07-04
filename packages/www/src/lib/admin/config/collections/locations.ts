import type { EntryCollection } from "@sveltia/cms"
import { createSlugField } from "../fields"

export const locationsCollection = {
	name: "locations",
	label: "Locations",
	label_singular: "Location",
	folder: "packages/www/src/lib/cms/locations",
	format: "json",
	extension: "json",
	identifier_field: "id",
	slug: "{{id}}",
	sortable_fields: ["order", "label"],
	fields: [
		createSlugField({
			name: "id",
			label: "ID (slug)",
			purpose: "Stable identifier used as the file slug and as a key in code — e.g. 'fort-worth'.",
			consequence:
				"Renaming changes the JSON filename. Users who manually picked this location lose their saved choice (selection is keyed by id in localStorage) and will fall back to geolocation auto-detect on their next visit."
		}),
		{
			name: "order",
			label: "Display Order",
			widget: "number",
			min: 0,
			step: 1,
			value_type: "int",
			hint: "Lower numbers appear first. The first location (lowest order) is the default selected location."
		},
		{
			name: "label",
			label: "Full Label",
			widget: "string",
			hint: "e.g. 'Fort Worth, TX'"
		},
		{ name: "short", label: "Short Name", widget: "string", hint: "e.g. 'Fort Worth'" },
		{ name: "address", label: "Street Address", widget: "string" },
		{
			name: "phone",
			label: "Phone (tel: URL)",
			widget: "string",
			pattern: [
				"^tel:\\+?[0-9]+$",
				"Must be a tel: URL like 'tel:+18176727555' (digits only, optional leading +)"
			]
		},
		{
			name: "phoneDisplay",
			label: "Phone (display format)",
			widget: "string",
			hint: "e.g. '(817) 672-7555'"
		},
		{
			name: "lat",
			label: "Latitude",
			widget: "number",
			value_type: "float",
			step: 0.0001,
			hint: "Decimal degrees, e.g. 32.7555 (positive = north). Used to auto-select this location based on visitor geolocation."
		},
		{
			name: "lng",
			label: "Longitude",
			widget: "number",
			value_type: "float",
			step: 0.0001,
			hint: "Decimal degrees, e.g. -97.3308 (negative = west). Used to auto-select this location based on visitor geolocation."
		}
	]
} satisfies EntryCollection
