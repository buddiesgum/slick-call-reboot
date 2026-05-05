import type { FileCollection } from "@sveltia/cms"
import { aboutPage } from "./about"
import { allServicesPage } from "./all-services"
import { careersPage } from "./careers"
import { contactPage } from "./contact"
import { financingPage } from "./financing"
import { homePage } from "./home"
import { privacyPolicyPage } from "./privacy-policy"
import { projectsPage } from "./projects"

export const pagesCollection = {
	name: "pages",
	label: "Pages",
	files: [
		homePage,
		aboutPage,
		allServicesPage,
		projectsPage,
		careersPage,
		contactPage,
		financingPage,
		privacyPolicyPage
	]
} satisfies FileCollection
