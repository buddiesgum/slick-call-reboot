import { getContext, setContext } from "svelte"
import { browser } from "$app/env"

export interface Location {
	id: string
	order: number
	label: string
	short: string
	address: string
	phone: string
	phoneDisplay: string
	lat: number
	lng: number
}

const locationModules = import.meta.glob<Location>("$lib/cms/locations/*.json", {
	eager: true,
	import: "default"
})

export const FALLBACK_LOCATION: Location = {
	id: "unknown",
	order: 0,
	label: "Location unavailable",
	short: "Location unavailable",
	address: "",
	phone: "",
	phoneDisplay: "",
	lat: 0,
	lng: 0
}

const sortedLocations = Object.values(locationModules).sort(
	(a, b) => a.order - b.order || a.id.localeCompare(b.id)
)

export const locations: Location[] =
	sortedLocations.length > 0 ? sortedLocations : [FALLBACK_LOCATION]

/** localStorage key used to persist the user's manually chosen location id. */
export const LOCATION_STORAGE_KEY = "hukills.selectedLocation"

/**
 * Returns the location in `locs` whose coordinates are closest to the
 * supplied latitude/longitude using the haversine formula.
 */
export function nearestLocation(userLat: number, userLng: number, locs: Location[]): Location {
	if (locs.length === 1) return locs[0]

	const toRad = (deg: number) => (deg * Math.PI) / 180
	const R = 6371 // Earth radius in km

	let nearest = locs[0]
	let minDist = Infinity

	for (const loc of locs) {
		const dLat = toRad(loc.lat - userLat)
		const dLng = toRad(loc.lng - userLng)
		const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos(toRad(userLat)) * Math.cos(toRad(loc.lat)) * Math.sin(dLng / 2) ** 2
		const dist = 2 * R * Math.asin(Math.sqrt(a))
		if (dist < minDist) {
			minDist = dist
			nearest = loc
		}
	}

	return nearest
}

export class LocationState {
	selected = $state<Location>(locations[0])

	/**
	 * Manual selection: persist the choice to localStorage so subsequent visits
	 * skip geolocation and restore immediately.
	 */
	setLocation(loc: Location) {
		this.selected = loc
		try {
			localStorage.setItem(LOCATION_STORAGE_KEY, loc.id)
		} catch {
			// private-mode or storage quota — silently ignore
		}
	}

	/**
	 * Browser-only initialization: restore a stored manual selection, else
	 * auto-detect the nearest location via the Geolocation API. Call from
	 * onMount/$effect in the (site) layout (no-op on the server).
	 */
	init() {
		if (!browser) return

		// 1. Restore a previously stored manual selection.
		try {
			const stored = localStorage.getItem(LOCATION_STORAGE_KEY)
			if (stored) {
				const match = locations.find(l => l.id === stored)
				if (match) {
					this.selected = match
					return // skip geolocation — user already chose
				}
			}
		} catch {
			// localStorage inaccessible — fall through to geolocation
		}

		// 2. Auto-detect via Geolocation API.
		if (!("geolocation" in navigator)) return

		navigator.geolocation.getCurrentPosition(
			position => {
				// Assign directly so this geo-derived selection does NOT get
				// written to localStorage (only manual picks should persist).
				this.selected = nearestLocation(
					position.coords.latitude,
					position.coords.longitude,
					locations
				)
			},
			() => {
				// Denied, unavailable, or timed out — silently keep default.
			},
			{ timeout: 8000, maximumAge: 600_000, enableHighAccuracy: false }
		)
	}
}

const LOCATION_CONTEXT_KEY = Symbol("hukills.location")

export function setLocationContext(state: LocationState): LocationState {
	return setContext(LOCATION_CONTEXT_KEY, state)
}

export function getLocationContext(): LocationState {
	const ctx = getContext<LocationState | undefined>(LOCATION_CONTEXT_KEY)
	if (!ctx) throw new Error("Location context not found — did the (site) layout set it?")
	return ctx
}
