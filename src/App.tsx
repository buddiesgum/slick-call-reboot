import type { RouteRecord } from "vite-react-ssg"
import RootLayout from "@/components/RootLayout"
import Index from "./pages/Index.tsx"
import AllServices from "./pages/AllServices.tsx"
import Plumbing from "./pages/Plumbing.tsx"
import DrainCleaning from "./pages/DrainCleaning.tsx"
import LeakDetection from "./pages/LeakDetection.tsx"
import WaterHeaters from "./pages/WaterHeaters.tsx"
import SepticServices from "./pages/SepticServices.tsx"
import NewBuildPlumbing from "./pages/NewBuildPlumbing.tsx"
import CommercialPlumbing from "./pages/CommercialPlumbing.tsx"
import Excavation from "./pages/Excavation.tsx"
import Restoration from "./pages/Restoration.tsx"
import Remodels from "./pages/Remodels.tsx"
import Foundations from "./pages/Foundations.tsx"
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
			{ path: "plumbing", Component: Plumbing },
			{ path: "drain-cleaning", Component: DrainCleaning },
			{ path: "leak-detection", Component: LeakDetection },
			{ path: "water-heaters", Component: WaterHeaters },
			{ path: "septic-services", Component: SepticServices },
			{ path: "new-build-plumbing", Component: NewBuildPlumbing },
			{ path: "commercial-plumbing", Component: CommercialPlumbing },
			{ path: "excavation", Component: Excavation },
			{ path: "restoration", Component: Restoration },
			{ path: "remodels", Component: Remodels },
			{ path: "foundations", Component: Foundations },
			{ path: "projects", Component: Projects },
			{ path: "about", Component: About },
			{ path: "careers", Component: Careers },
			{ path: "contact", Component: Contact },
			{ path: "call-us", Component: Contact },
			{ path: "privacy-policy", Component: PrivacyPolicy },
			{ path: "404", Component: NotFound },
			{ path: "*", Component: NotFound }
		]
	}
]
