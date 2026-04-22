import { createContext, useContext } from "react"

export interface Location {
	id: string
	order: number
	label: string
	short: string
	address: string
	phone: string
	phoneDisplay: string
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
	phoneDisplay: ""
}

const sortedLocations = Object.values(locationModules).sort(
	(a, b) => a.order - b.order || a.id.localeCompare(b.id)
)

export const locations: Location[] =
	sortedLocations.length > 0 ? sortedLocations : [FALLBACK_LOCATION]

interface LocationContextType {
	selected: Location
	setSelected: (loc: Location) => void
}

export const LocationContext = createContext<LocationContextType>({
	selected: locations[0],
	setSelected: () => {}
})

export const useLocationContext = () => useContext(LocationContext)
