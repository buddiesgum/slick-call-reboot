import type { CollectionFile } from "@sveltia/cms"
import { createSeoField } from "../../fields"

export const contactPage = {
	name: "contactPage",
	label: "Contact Page",
	file: "packages/www/src/lib/cms/contact-page.json",
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
					hint: 'Small line above the heading, e.g. "Get In Touch"'
				},
				{
					name: "title",
					label: "Title (before accent)",
					widget: "string",
					hint: 'e.g. "One Call"'
				},
				{
					name: "titleAccent",
					label: "Title Accent",
					widget: "string",
					hint: 'Displayed in the primary color, e.g. "Does It All."'
				},
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
			name: "locations",
			label: "Locations Section",
			widget: "object",
			fields: [
				{
					name: "selectedBadge",
					label: "'Selected' Badge Label",
					widget: "string",
					hint: 'e.g. "Selected"'
				},
				{
					name: "hoursLabel",
					label: "Hours Label",
					widget: "string",
					hint: 'e.g. "24/7 Emergency Service Available"'
				},
				{
					name: "callLabelPrefix",
					label: "Call Button Prefix",
					widget: "string",
					hint: 'Location short name is appended automatically, e.g. "Call" → "Call Fort Worth"'
				},
				{
					name: "setLocationLabel",
					label: "'Set As My Location' Button Label",
					widget: "string",
					hint: 'e.g. "Set as My Location"'
				}
			]
		},
		{
			name: "careersCta",
			label: "Careers CTA Section",
			widget: "object",
			fields: [
				{
					name: "heading",
					label: "Heading (before accent)",
					widget: "string",
					hint: 'e.g. "Looking to Join the"'
				},
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: 'Displayed in the primary color, e.g. "Team?"'
				},
				{ name: "body", label: "Body Text", widget: "text" },
				{ name: "ctaLabel", label: "CTA Button Label", widget: "string" },
				{
					name: "ctaPath",
					label: "CTA Button Path",
					widget: "string",
					hint: 'e.g. "/careers"',
					pattern: ["^\\/", "Must be a relative path starting with /"]
				}
			]
		},
		{
			name: "form",
			label: "Inquiry Form",
			widget: "object",
			fields: [
				{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
				{ name: "heading", label: "Heading (before accent)", widget: "string" },
				{ name: "headingAccent", label: "Heading Accent", widget: "string" },
				{ name: "description", label: "Description", widget: "text" },
				{
					name: "firstName",
					label: "First Name Field",
					widget: "object",
					fields: [{ name: "label", label: "Label", widget: "string" }]
				},
				{
					name: "lastName",
					label: "Last Name Field",
					widget: "object",
					fields: [{ name: "label", label: "Label", widget: "string" }]
				},
				{
					name: "phone",
					label: "Phone Field",
					widget: "object",
					fields: [{ name: "label", label: "Label", widget: "string" }]
				},
				{
					name: "email",
					label: "Email Field",
					widget: "object",
					fields: [{ name: "label", label: "Label", widget: "string" }]
				},
				{
					name: "propertyType",
					label: "Property Type Field",
					widget: "object",
					fields: [
						{ name: "label", label: "Field Label", widget: "string" },
						{
							name: "options",
							label: "Options",
							widget: "list",
							fields: [
								{ name: "value", label: "Value", widget: "string" },
								{ name: "label", label: "Display Label", widget: "string" }
							]
						}
					]
				},
				{
					name: "service",
					label: "Service Field",
					widget: "object",
					fields: [
						{ name: "label", label: "Field Label", widget: "string" },
						{ name: "placeholder", label: "Placeholder", widget: "string" },
						{ name: "fallbackLabel", label: "Other / Not Sure Label", widget: "string" }
					]
				},
				{
					name: "message",
					label: "Message Field",
					widget: "object",
					fields: [
						{ name: "label", label: "Field Label", widget: "string" },
						{ name: "placeholder", label: "Placeholder", widget: "string" }
					]
				},
				{
					name: "financing",
					label: "Financing Opt-in",
					widget: "object",
					fields: [
						{ name: "heading", label: "Checkbox Heading", widget: "string" },
						{ name: "label", label: "Checkbox Label", widget: "string" }
					]
				},
				{ name: "submitLabel", label: "Submit Button Label", widget: "string" },
				{
					name: "submittingLabel",
					label: "Submit Button Loading Label",
					widget: "string"
				},
				{ name: "successTitle", label: "Success Toast Title", widget: "string" },
				{ name: "successBody", label: "Success Toast Body", widget: "text" },
				{ name: "errorTitle", label: "Error Toast Title", widget: "string" },
				{ name: "errorBody", label: "Error Toast Body", widget: "text" }
			]
		},
		createSeoField()
	]
} satisfies CollectionFile
