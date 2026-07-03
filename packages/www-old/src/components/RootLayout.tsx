import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LocationProvider } from "@/context/LocationContext"
import posthog from "posthog-js"
import { PostHogErrorBoundary, PostHogProvider } from "@posthog/react"

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" })
	}, [pathname])

	return null
}

const RootLayout = () => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<PostHogProvider client={posthog}>
			<PostHogErrorBoundary>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider>
						<LocationProvider>
							<Toaster />
							<Sonner />
							<ScrollToTop />
							<Outlet />
						</LocationProvider>
					</TooltipProvider>
				</QueryClientProvider>
			</PostHogErrorBoundary>
		</PostHogProvider>
	)
}

export default RootLayout
