import { useState, useEffect, useCallback, ReactNode } from "react"
import {
	LocationContext,
	locations,
	nearestLocation,
	LOCATION_STORAGE_KEY
} from "@/context/location-context"

export const LocationProvider = ({ children }: { children: ReactNode }) => {
	const [selected, setSelectedState] = useState(locations[0])

	// Manual selection: persist the choice to localStorage so subsequent visits
	// skip geolocation and restore immediately.
	const setSelected = useCallback((loc: (typeof locations)[0]) => {
		setSelectedState(loc)
		try {
			localStorage.setItem(LOCATION_STORAGE_KEY, loc.id)
		} catch {
			// private-mode or storage quota — silently ignore
		}
	}, [])

	useEffect(() => {
		// 1. Restore a previously stored manual selection.
		try {
			const stored = localStorage.getItem(LOCATION_STORAGE_KEY)
			if (stored) {
				const match = locations.find((l) => l.id === stored)
				if (match) {
					setSelectedState(match)
					return // skip geolocation — user already chose
				}
			}
		} catch {
			// localStorage inaccessible — fall through to geolocation
		}

		// 2. Auto-detect via Geolocation API (no-op during SSG prerender since
		//    effects never run server-side).
		if (!("geolocation" in navigator)) return

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const nearest = nearestLocation(
					position.coords.latitude,
					position.coords.longitude,
					locations
				)
				// Use the internal setter so this geo-derived selection does NOT
				// get written to localStorage (only manual picks should persist).
				setSelectedState(nearest)
			},
			() => {
				// Denied, unavailable, or timed out — silently keep default.
			},
			{ timeout: 8000, maximumAge: 600_000, enableHighAccuracy: false }
		)
	}, [])

	return (
		<LocationContext.Provider value={{ selected, setSelected }}>
			{children}
		</LocationContext.Provider>
	)
}
