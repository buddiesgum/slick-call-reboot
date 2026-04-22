import { useState, ReactNode } from "react"
import { LocationContext, locations } from "@/context/location-context"

export const LocationProvider = ({ children }: { children: ReactNode }) => {
	const [selected, setSelected] = useState(locations[0])
	return (
		<LocationContext.Provider value={{ selected, setSelected }}>
			{children}
		</LocationContext.Provider>
	)
}
