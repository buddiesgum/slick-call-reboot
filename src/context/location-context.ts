import { createContext, useContext } from "react"

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

const locationModules = import.meta.glob<Location>("../cms/locations/*.json", {
	eager: true,
	import: "default"
})

const FALLBACK_LOCATION: Location = {
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

interface LocationContextType {
	selected: Location
	setSelected: (loc: Location) => void
}

export const LocationContext = createContext<LocationContextType>({
	selected: locations[0],
	setSelected: () => {}
})

export const useLocationContext = () => useContext(LocationContext)
