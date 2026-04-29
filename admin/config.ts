import type { CmsConfig, ObjectFieldWithSubFields } from "@sveltia/cms"

const createProjectFiltersField = () =>
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

const createSeoField = () =>
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

export const config = {
	load_config_file: false,
	backend: {
		name: "github",
		repo: "tomatrow/slick-call-reboot",
		base_url: "https://sveltia-cms-auth.tomatrow.workers.dev"
	},
	media_folder: "public/media",
	public_folder: "/media",
	media_libraries: {
		stock_assets: { providers: [] },
		default: {
			config: {
				transformations: {
					raster_image: { format: "webp", quality: 85, width: 2048, height: 2048 },
					svg: { optimize: true }
				}
			}
		}
	},
	collections: [
		{
			name: "services",
			label: "Services",
			label_singular: "Service",
			folder: "src/cms/service-pages",
			format: "json",
			extension: "json",
			identifier_field: "slug",
			slug: "{{fields.slug}}",
			media_folder: "/public/media/service-pages/{{fields.slug}}",
			public_folder: "/media/service-pages/{{fields.slug}}",
			sortable_fields: ["title"],
			fields: [
				{
					name: "slug",
					label: "Slug",
					widget: "string",
					hint: "Matches the route path (e.g. 'plumbing'). Do not change — requires a code update.",
					pattern: ["^[a-z0-9-]+$", "Slug must be lowercase letters, numbers, and hyphens only"]
				},
				{ name: "title", label: "Page Title (admin label)", widget: "string" },
				createSeoField(),
				{
					name: "hero",
					label: "Hero Section",
					widget: "object",
					fields: [
						{ name: "title", label: "Hero Title", widget: "string" },
						{ name: "subtitle", label: "Subtitle", widget: "text" },
						{
							name: "image",
							label: "Background Image",
							widget: "string",
							hint: "URL or upload path. Displayed as the hero background."
						},
						{ name: "imageAlt", label: "Image Alt Text", widget: "string" },
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
							widget: "string",
							hint: "URL or upload path."
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
		},
		{
			name: "locations",
			label: "Locations",
			label_singular: "Location",
			folder: "src/cms/locations",
			format: "json",
			extension: "json",
			identifier_field: "id",
			slug: "{{id}}",
			sortable_fields: ["order", "label"],
			fields: [
				{
					name: "id",
					label: "ID (slug)",
					widget: "string",
					pattern: [
						"^[a-z0-9]+(?:-[a-z0-9]+)*$",
						"Lowercase letters, digits, and single hyphens only (e.g. 'fort-worth')"
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
		},
		{
			name: "pages",
			label: "Pages",
			files: [
				// ── 1. Home ──────────────────────────────────────────────────────────
				{
					name: "homePage",
					label: "Home Page",
					file: "src/cms/home-page.json",
					fields: [
						createSeoField(),
						{
							name: "hero",
							label: "Hero Section",
							widget: "object",
							fields: [
								{
									name: "title",
									label: "Title",
									widget: "string",
									hint: 'First line of the large hero heading, e.g. "One Call"'
								},
								{
									name: "titleAccent",
									label: "Title Accent",
									widget: "string",
									hint: 'Second line displayed in the primary color, e.g. "Does It All"'
								},
								{ name: "description", label: "Hero Description", widget: "text" },
								{
									name: "image",
									label: "Hero Background Image",
									widget: "image",
									hint: "Displayed as the full-bleed hero background."
								},
								{
									name: "primaryCtaLabel",
									label: "Primary CTA Label",
									widget: "string",
									hint: 'Label for the phone call button, e.g. "Call Now"'
								},
								{
									name: "textCtaLabel",
									label: "Text CTA Label",
									widget: "string",
									hint: 'Label for the SMS text button, e.g. "Text Us"'
								},
								{
									name: "secondaryCta",
									label: "Secondary CTA",
									widget: "object",
									fields: [
										{ name: "label", label: "Label", widget: "string" },
										{
											name: "path",
											label: "Path",
											widget: "string",
											hint: 'e.g. "/plumbing"',
											pattern: ["^\\/", "Must be a relative path starting with /"]
										}
									]
								}
							]
						},
						{
							name: "services",
							label: "Services Grid Section",
							widget: "object",
							fields: [
								{
									name: "heading",
									label: "Heading",
									widget: "string",
									hint: 'First part of the section heading, e.g. "What We"'
								},
								{
									name: "headingAccent",
									label: "Heading Accent",
									widget: "string",
									hint: 'Accent word displayed in the primary color, e.g. "Do"'
								},
								{ name: "description", label: "Description", widget: "text" },
								{
									name: "cta",
									label: "CTA Button",
									widget: "object",
									fields: [
										{ name: "label", label: "Label", widget: "string" },
										{
											name: "path",
											label: "Path",
											widget: "string",
											hint: 'e.g. "/all-services"',
											pattern: ["^\\/", "Must be a relative path starting with /"]
										}
									]
								}
							]
						},
						{
							name: "team",
							label: "Team Section",
							widget: "object",
							fields: [
								{
									name: "heading",
									label: "Heading",
									widget: "string",
									hint: 'First part of the section heading, e.g. "Our Amazing"'
								},
								{
									name: "headingAccent",
									label: "Heading Accent",
									widget: "string",
									hint: 'Accent word displayed in the primary color, e.g. "Team"'
								},
								{ name: "body", label: "Body Text", widget: "text" },
								{
									name: "bullets",
									label: "Bullet Points",
									label_singular: "Bullet",
									widget: "list",
									field: { name: "item", label: "Item", widget: "string" }
								},
								{
									name: "ctaLabel",
									label: "CTA Label",
									widget: "string",
									hint: 'Label for the phone call button, e.g. "Get In Touch"'
								},
								{
									name: "image",
									label: "Team Photo",
									widget: "image",
									hint: "Photo displayed on the right side of the team section."
								},
								{ name: "imageAlt", label: "Team Photo Alt Text", widget: "string" }
							]
						},
						{
							name: "closingCta",
							label: "Closing CTA Section",
							widget: "object",
							fields: [
								{ name: "heading", label: "Heading", widget: "string" },
								{ name: "description", label: "Description", widget: "text" },
								{
									name: "buttonLabel",
									label: "Button Label",
									widget: "string",
									hint: 'Label for the phone call button, e.g. "Call Hukill\'s Now"'
								}
							]
						}
					]
				},
				// ── 2. About ─────────────────────────────────────────────────────────
				{
					name: "aboutPage",
					label: "About Page",
					file: "src/cms/about-page.json",
					fields: [
						createSeoField(),
						{
							name: "hero",
							label: "Hero Section",
							widget: "object",
							fields: [
								{
									name: "eyebrow",
									label: "Eyebrow Text",
									widget: "string",
									hint: 'Small line above the heading, e.g. "Est. 1979 — Faith. Family. Craft."'
								},
								{
									name: "title",
									label: "Title (before accent)",
									widget: "string",
									hint: 'e.g. "Built on a"'
								},
								{
									name: "titleAccent",
									label: "Title Accent Word",
									widget: "string",
									hint: 'Displayed in the primary color, e.g. "Higher"'
								},
								{
									name: "titleSuffix",
									label: "Title Suffix (after accent)",
									widget: "string",
									hint: 'e.g. "Standard"'
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
							name: "mission",
							label: "Mission Section",
							widget: "object",
							fields: [
								{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
								{
									name: "heading",
									label: "Heading (before accent)",
									widget: "string",
									hint: 'e.g. "Diligence, Integrity,"'
								},
								{
									name: "headingAccent",
									label: "Heading Accent",
									widget: "string",
									hint: 'Displayed in the primary color, e.g. "Faith."'
								},
								{ name: "body", label: "Body Text", widget: "text" },
								{
									name: "image",
									label: "Mission Image",
									widget: "image",
									hint: "Displayed on the left side of the mission section."
								},
								{ name: "imageAlt", label: "Image Alt Text", widget: "string" },
								{
									name: "points",
									label: "Sub-Points",
									label_singular: "Point",
									widget: "list",
									fields: [
										{ name: "heading", label: "Point Heading", widget: "string" },
										{ name: "body", label: "Point Body", widget: "text" }
									]
								}
							]
						},
						{
							name: "values",
							label: "Values Section",
							widget: "object",
							fields: [
								{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
								{
									name: "heading",
									label: "Heading (before accent)",
									widget: "string",
									hint: 'e.g. "What We Stand"'
								},
								{
									name: "headingAccent",
									label: "Heading Accent",
									widget: "string",
									hint: 'e.g. "For"'
								},
								{
									name: "backgroundImage",
									label: "Background Image",
									widget: "image",
									hint: "Displayed at low opacity behind the values cards."
								},
								{
									name: "items",
									label: "Values",
									label_singular: "Value",
									widget: "list",
									fields: [
										{
											name: "icon",
											label: "Icon",
											widget: "select",
											options: ["Award", "Heart", "Users", "HandHeart", "Target", "Eye", "Scale"],
											hint: "Lucide icon name. Adding new options requires a code change."
										},
										{ name: "title", label: "Title", widget: "string" },
										{ name: "description", label: "Description", widget: "text" }
									]
								}
							]
						},
						{
							name: "vision",
							label: "Vision Section",
							widget: "object",
							fields: [
								{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
								{
									name: "heading",
									label: "Heading (before accent)",
									widget: "string",
									hint: 'e.g. "Measured by"'
								},
								{
									name: "headingAccent",
									label: "Heading Accent",
									widget: "string",
									hint: 'e.g. "Impact."'
								},
								{ name: "body", label: "Body Text", widget: "text" },
								{
									name: "bulletsLeadIn",
									label: "Bullets Lead-In",
									widget: "string",
									hint: "Sentence introducing the bullet list."
								},
								{
									name: "bullets",
									label: "Bullet Points",
									label_singular: "Bullet",
									widget: "list",
									field: { name: "item", label: "Item", widget: "string" }
								},
								{
									name: "image",
									label: "Vision Image",
									widget: "image",
									hint: "Displayed on the right side of the vision section."
								},
								{ name: "imageAlt", label: "Image Alt Text", widget: "string" }
							]
						},
						{
							name: "accountability",
							label: "Accountability Statement Section",
							widget: "object",
							fields: [
								{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
								{ name: "heading", label: "Heading", widget: "string" },
								{ name: "body", label: "Body Text", widget: "text" }
							]
						}
					]
				},
				// ── 3. All Services ──────────────────────────────────────────────────
				{
					name: "allServicesPage",
					label: "All Services Page",
					file: "src/cms/all-services-page.json",
					fields: [
						createSeoField(),
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
						}
					]
				},
				// ── 4. Commercial Plumbing ───────────────────────────────────────────
				{
					name: "commercialPlumbingPage",
					label: "Commercial Plumbing Page",
					file: "src/cms/commercial-plumbing-page.json",
					fields: [
						createSeoField(),
						{
							name: "hero",
							label: "Hero Section",
							widget: "object",
							fields: [
								{
									name: "eyebrow",
									label: "Eyebrow Text",
									widget: "string",
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
									hint: 'Displayed in the primary color, e.g. "Big Crews."'
								},
								{ name: "subtitle", label: "Subtitle", widget: "text" },
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
									required: true
								},
								{
									name: "primaryCta",
									label: "Primary CTA Button",
									widget: "object",
									fields: [
										{ name: "label", label: "Button Label", widget: "string", required: true },
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
									label: "Secondary CTA Button",
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
							name: "scale",
							label: "Scale Section",
							widget: "object",
							fields: [
								{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
								{ name: "heading", label: "Heading", widget: "string", required: true },
								{ name: "body", label: "Body Text", widget: "text" },
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
											options: ["HardHat", "Waves", "Droplets", "ShieldCheck"],
											hint: "Lucide icon name. Adding new options requires a code change."
										},
										{ name: "label", label: "Label", widget: "string", required: true },
										{ name: "text", label: "Description", widget: "text", required: true }
									]
								}
							]
						},
						{
							name: "capabilities",
							label: "Capabilities Section",
							widget: "object",
							fields: [
								{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
								{ name: "heading", label: "Heading", widget: "string", required: true },
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
				},
				// ── 5. Projects ──────────────────────────────────────────────────────
				{
					name: "projectsPage",
					label: "Projects Page",
					file: "src/cms/projects-page.json",
					fields: [
						createSeoField(),
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
						}
					]
				},
				// ── 6. Careers ───────────────────────────────────────────────────────
				{
					name: "careersPage",
					label: "Careers Page",
					file: "src/cms/careers-page.json",
					fields: [
						createSeoField(),
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
											options: ["Wrench", "HardHat", "Hammer", "Briefcase"],
											hint: "Lucide icon name. Adding new options requires a code change."
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
								{ name: "successBody", label: "Success Toast Body", widget: "string" }
							]
						}
					]
				},
				// ── 7. Contact ───────────────────────────────────────────────────────
				{
					name: "contactPage",
					label: "Contact Page",
					file: "src/cms/contact-page.json",
					fields: [
						createSeoField(),
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
						}
					]
				},
				// ── 8. Financing Page ────────────────────────────────────────────────
				{
					name: "financingPage",
					label: "Financing Page",
					file: "src/cms/financing-page.json",
					fields: [
						createSeoField(),
						{
							name: "hero",
							label: "Hero Section",
							widget: "object",
							fields: [
								{ name: "eyebrow", label: "Eyebrow Text", widget: "string" },
								{ name: "title", label: "Title (before accent)", widget: "string" },
								{ name: "titleAccent", label: "Title Accent", widget: "string" },
								{ name: "description", label: "Description", widget: "text" },
								{ name: "image", label: "Hero Background Image", widget: "image" },
								{ name: "imageAlt", label: "Image Alt Text", widget: "string" },
								{
									name: "primaryCta",
									label: "Primary CTA",
									widget: "object",
									fields: [
										{ name: "label", label: "Button Label", widget: "string" },
										{ name: "path", label: "Link Path", widget: "string" }
									]
								},
								{
									name: "secondaryCta",
									label: "Secondary CTA (scrolls to calculator section)",
									widget: "object",
									fields: [{ name: "label", label: "Button Label", widget: "string" }]
								}
							]
						},
						{
							name: "benefits",
							label: "Benefits Section",
							widget: "object",
							fields: [
								{
									name: "items",
									label: "Benefit Cards",
									widget: "list",
									fields: [
										{
											name: "icon",
											label: "Icon",
											widget: "select",
											options: ["Wallet", "Clock", "ShieldCheck"]
										},
										{ name: "title", label: "Title", widget: "string" },
										{ name: "copy", label: "Body Text", widget: "text" }
									]
								}
							]
						},
						{
							name: "calculator",
							label: "Calculator Widget",
							widget: "object",
							fields: [
								{ name: "heading", label: "Heading (before accent)", widget: "string" },
								{ name: "headingAccent", label: "Heading Accent", widget: "string" },
								{ name: "description", label: "Description", widget: "text" },
								{
									name: "page",
									label: "Enhancify Page ID",
									widget: "string",
									hint: "The data-page attribute value provided by Enhancify"
								},
								{ name: "color1", label: "Brand Color 1 (hex)", widget: "string" },
								{ name: "color2", label: "Brand Color 2 (hex)", widget: "string" },
								{
									name: "coBrandedColor",
									label: "Co-branded Color (hex)",
									widget: "string"
								},
								{
									name: "border",
									label: "Show Border",
									widget: "boolean",
									default: true
								},
								{ name: "hideLink", label: "Hide Link (0 = show)", widget: "string" }
							]
						},
						{
							name: "cta",
							label: "Bottom CTA Section",
							widget: "object",
							fields: [
								{ name: "heading", label: "Heading", widget: "string" },
								{ name: "description", label: "Description", widget: "text" },
								{ name: "label", label: "Button Label", widget: "string" },
								{ name: "path", label: "Button Path", widget: "string" }
							]
						}
					]
				},
				// ── 9. Privacy Policy ────────────────────────────────────────────────
				{
					name: "privacyPolicyPage",
					label: "Privacy Policy Page",
					file: "src/cms/privacy-policy-page.json",
					fields: [
						createSeoField(),
						{
							name: "hero",
							label: "Hero Section",
							widget: "object",
							fields: [
								{
									name: "eyebrow",
									label: "Eyebrow",
									widget: "string",
									hint: 'Small label above the title, e.g. "Legal"'
								},
								{ name: "title", label: "Page Title", widget: "string" },
								{
									name: "effectiveDate",
									label: "Effective Date Line",
									widget: "string",
									hint: 'e.g. "Effective date: January 1, 2023"'
								}
							]
						},
						{
							name: "intro",
							label: "Intro (before first section)",
							widget: "markdown",
							required: false,
							hint: "Introductory paragraphs shown above the first section. Supports paragraphs, links, and lists.",
							buttons: ["bold", "italic", "link", "bulleted-list", "numbered-list"],
							editor_components: [],
							modes: ["rich-text"]
						},
						{
							name: "sections",
							label: "Sections",
							label_singular: "Section",
							widget: "list",
							fields: [
								{ name: "title", label: "Section Title", widget: "string" },
								{
									name: "intro",
									label: "Intro Text",
									widget: "markdown",
									required: false,
									hint: "Optional lead-in paragraphs (and/or bullet list) shown before the sub-sections.",
									buttons: ["bold", "italic", "link", "bulleted-list", "numbered-list"],
									editor_components: [],
									modes: ["rich-text"]
								},
								{
									name: "subSections",
									label: "Sub-Sections",
									label_singular: "Sub-Section",
									widget: "list",
									required: false,
									fields: [
										{ name: "title", label: "Sub-Section Title", widget: "string" },
										{
											name: "body",
											label: "Body",
											widget: "markdown",
											buttons: ["bold", "italic", "link", "bulleted-list", "numbered-list"],
											editor_components: [],
											modes: ["rich-text"]
										}
									]
								}
							]
						}
					]
				}
			]
		}
	],
	singletons: [
		{
			name: "serviceCta",
			label: "Service Pages — Emergency CTA",
			file: "src/cms/service-cta.json",
			fields: [
				{
					name: "heading",
					label: "Heading (before accent)",
					widget: "string",
					hint: 'e.g. "Available 24/7 for"'
				},
				{
					name: "headingAccent",
					label: "Heading Accent",
					widget: "string",
					hint: 'Displayed in the primary color, e.g. "Emergencies"'
				},
				{ name: "description", label: "Body Text", widget: "text" },
				{
					name: "phoneCtaLabel",
					label: "Phone CTA Label",
					widget: "string",
					hint: 'The location short name is appended automatically, e.g. "Call" → "Call Fort Worth"'
				},
				{ name: "quoteCtaLabel", label: "Quote CTA Label", widget: "string" },
				{
					name: "quotePath",
					label: "Quote CTA Path",
					widget: "string",
					hint: 'e.g. "/contact"',
					pattern: ["^\\/", "Must be a relative path starting with /"]
				},
				{
					name: "locationPrefix",
					label: "Location Prefix",
					widget: "string",
					hint: 'Text before the location name, e.g. "Serving"'
				}
			]
		},
		{
			name: "footer",
			label: "Footer",
			file: "src/cms/footer.json",
			fields: [
				{
					name: "logo",
					label: "Logo",
					widget: "object",
					fields: [
						{ name: "image", label: "Logo Image", widget: "image" },
						{ name: "alt", label: "Alt Text", widget: "string" }
					]
				},
				{ name: "tagline", label: "Tagline", widget: "text" },
				{
					name: "services",
					label: "Services Column",
					widget: "object",
					fields: [
						{ name: "heading", label: "Column Heading", widget: "string" },
						{
							name: "links",
							label: "Links",
							label_singular: "Link",
							widget: "list",
							fields: [
								{ name: "label", label: "Label", widget: "string" },
								{ name: "path", label: "Path", widget: "string" }
							]
						}
					]
				},
				{
					name: "company",
					label: "Company Column",
					widget: "object",
					fields: [
						{ name: "heading", label: "Column Heading", widget: "string" },
						{
							name: "links",
							label: "Links",
							label_singular: "Link",
							widget: "list",
							fields: [
								{ name: "label", label: "Label", widget: "string" },
								{ name: "path", label: "Path", widget: "string" }
							]
						}
					]
				},
				{
					name: "contact",
					label: "Contact Column",
					widget: "object",
					hint: 'Rendered as "{heading} — {Location}", e.g. "Contact — Fort Worth". The location name is appended automatically; do not include it here.',
					fields: [{ name: "heading", label: "Column Heading", widget: "string" }]
				},
				{
					name: "copyrightPrefix",
					label: "Copyright Prefix",
					widget: "string",
					hint: 'Displayed before the current year, e.g. "©"'
				},
				{
					name: "copyrightSuffix",
					label: "Copyright Suffix",
					widget: "string",
					hint: 'Displayed after the current year, e.g. "Hukill\'s Inc. All rights reserved."'
				}
			]
		},
		{
			name: "header",
			label: "Header",
			file: "src/cms/header.json",
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
		},
		{
			name: "seo",
			label: "SEO",
			file: "src/cms/seo.json",
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
		}
	]
} satisfies CmsConfig
