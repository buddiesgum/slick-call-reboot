import { ViteReactSSG } from "vite-react-ssg"
import { routes } from "./App.tsx"
import "./index.css"

import posthog from "posthog-js"

if (typeof window !== "undefined") {
	posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN, {
		api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
		defaults: "2026-01-30"
	})
}

export const createRoot = ViteReactSSG({ routes })
