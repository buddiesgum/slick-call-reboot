import type { CmsConfig } from "@sveltia/cms"
import { locationsCollection } from "./config/collections/locations"
import { pagesCollection } from "./config/collections/pages"
import { projectsCollection } from "./config/collections/projects"
import { servicesCollection } from "./config/collections/services"
import { emailSettingsSingleton } from "./config/singletons/email-settings"
import { footerSingleton } from "./config/singletons/footer"
import { headerSingleton } from "./config/singletons/header"
import { serviceCtaSingleton } from "./config/singletons/service-cta"
import { seoSingleton } from "./config/singletons/seo"

export const config = {
	load_config_file: false,
	backend: {
		name: "github",
		repo: "tomatrow/hukills-www",
		base_url: "https://sveltia-cms-auth.tomatrow.workers.dev"
	},
	media_folder: "packages/www/static/media",
	public_folder: "/media",
	output: {
		json: {
			indent_style: "tab",
			indent_size: 1
		}
	},
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
		locationsCollection,
		pagesCollection,
		{ divider: true },
		servicesCollection,
		projectsCollection
	],
	singletons: [
		headerSingleton,
		footerSingleton,
		{ divider: true },
		serviceCtaSingleton,
		emailSettingsSingleton,
		seoSingleton
	]
} satisfies CmsConfig
