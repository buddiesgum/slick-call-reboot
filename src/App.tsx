import type { RouteRecord } from "vite-react-ssg"
import RootLayout from "@/components/RootLayout"
import Index from "./pages/Index.tsx"
import AllServices from "./pages/AllServices.tsx"
import ServicePage from "./pages/ServicePage.tsx"
import { servicePageSlugs } from "./pages/service-pages"
import CommercialPlumbing from "./pages/CommercialPlumbing.tsx"
import Projects from "./pages/Projects.tsx"
import About from "./pages/About.tsx"
import Careers from "./pages/Careers.tsx"
import Contact from "./pages/Contact.tsx"
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx"
import NotFound from "./pages/NotFound.tsx"

export const routes: RouteRecord[] = [
	{
		path: "/",
		element: <RootLayout />,
		entry: "src/components/RootLayout.tsx",
		children: [
			{ index: true, Component: Index },
			{ path: "all-services", Component: AllServices },
			{ path: "commercial-plumbing", Component: CommercialPlumbing },
			{ path: "projects", Component: Projects },
			{ path: "about", Component: About },
			{ path: "careers", Component: Careers },
			{ path: "contact", Component: Contact },
			{ path: "call-us", Component: Contact },
			{ path: "privacy-policy", Component: PrivacyPolicy },
			{ path: "404", Component: NotFound },
			// Dynamic service-page route. React Router ranks siblings by specificity so order
			// doesn't affect runtime matching, but keeping this below static siblings makes the
			// "static first, dynamic last" intent clear. getStaticPaths emits only known slugs;
			// unknown single-segment paths fall through to ServicePage's inline NotFound (see
			// that file) in SPA / dev mode.
			{
				path: ":slug",
				Component: ServicePage,
				entry: "src/pages/ServicePage.tsx",
				getStaticPaths: () => servicePageSlugs
			},
			{ path: "*", Component: NotFound }
		]
	}
]
