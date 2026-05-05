import {
	Building2,
	Droplets,
	Flame,
	Hammer,
	HardHat,
	Home,
	Landmark,
	Mountain,
	Search,
	Shield,
	ShowerHead,
	Wrench,
	type LucideIcon
} from "lucide-react"

export const SERVICE_TILE_ICON_NAMES = [
	"Wrench",
	"Building2",
	"Mountain",
	"Shield",
	"Home",
	"Landmark",
	"ShowerHead",
	"Search",
	"Flame",
	"Droplets",
	"HardHat",
	"Hammer"
] as const

export type ServiceTileIconName = (typeof SERVICE_TILE_ICON_NAMES)[number]

export const serviceTileIconMap: Record<ServiceTileIconName, LucideIcon> = {
	Wrench,
	Building2,
	Mountain,
	Shield,
	Home,
	Landmark,
	ShowerHead,
	Search,
	Flame,
	Droplets,
	HardHat,
	Hammer
}
