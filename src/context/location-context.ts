import { createContext, useContext } from "react"

export interface Location {
	id: string
	label: string
	short: string
	address: string
	phone: string
	phoneDisplay: string
}

export const locations: Location[] = [
	{
		id: "fort-worth",
		label: "Fort Worth, TX",
		short: "Fort Worth",
		address: "3310 Lackland Rd, Fort Worth, TX 76116",
		phone: "tel:+18176727555",
		phoneDisplay: "(817) 672-7555"
	},
	{
		id: "medford",
		label: "Medford, OR",
		short: "Medford",
		address: "3650 Crater Lake Ave, Medford, OR 97504",
		phone: "tel:+15417349000",
		phoneDisplay: "(541) 734-9000"
	}
]

interface LocationContextType {
	selected: Location
	setSelected: (loc: Location) => void
}

export const LocationContext = createContext<LocationContextType>({
	selected: locations[0],
	setSelected: () => {}
})

export const useLocationContext = () => useContext(LocationContext)
