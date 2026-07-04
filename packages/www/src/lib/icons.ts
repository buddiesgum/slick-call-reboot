/**
 * Master icon registry — single source of truth for every Lucide icon
 * exposed to the CMS.
 *
 * To add an icon:
 *   1. Import it from @lucide/svelte.
 *   2. Add it to iconMap.
 *   That's it — ICON_NAMES and all CMS select fields are derived automatically.
 */

import {
	AlertTriangle,
	Award,
	BadgeCheck,
	Bath,
	Briefcase,
	Building,
	Building2,
	Calendar,
	CheckCircle2,
	Clock,
	CloudRain,
	Construction,
	Drill,
	Droplet,
	Droplets,
	Eye,
	Factory,
	Flame,
	Hammer,
	HandHeart,
	Handshake,
	HardHat,
	Heart,
	Home,
	Landmark,
	Lightbulb,
	Mail,
	MapPin,
	Mountain,
	Phone,
	Pickaxe,
	Pipette,
	Scale,
	Search,
	Settings,
	Shield,
	ShieldCheck,
	ShowerHead,
	Snowflake,
	Sparkles,
	Star,
	Sun,
	Target,
	Thermometer,
	ThumbsUp,
	Timer,
	Trees,
	Truck,
	Users,
	Wallet,
	Warehouse,
	Waves,
	Wind,
	Wrench,
	Zap,
	type LucideIcon
} from "@lucide/svelte"

// ─── Map ──────────────────────────────────────────────────────────────────────

export const iconMap = {
	AlertTriangle,
	Award,
	BadgeCheck,
	Bath,
	Briefcase,
	Building,
	Building2,
	Calendar,
	CheckCircle2,
	Clock,
	CloudRain,
	Construction,
	Drill,
	Droplet,
	Droplets,
	Eye,
	Factory,
	Flame,
	Hammer,
	HandHeart,
	Handshake,
	HardHat,
	Heart,
	Home,
	Landmark,
	Lightbulb,
	Mail,
	MapPin,
	Mountain,
	Phone,
	Pickaxe,
	Pipette,
	Scale,
	Search,
	Settings,
	Shield,
	ShieldCheck,
	ShowerHead,
	Snowflake,
	Sparkles,
	Star,
	Sun,
	Target,
	Thermometer,
	ThumbsUp,
	Timer,
	Trees,
	Truck,
	Users,
	Wallet,
	Warehouse,
	Waves,
	Wind,
	Wrench,
	Zap
} as const satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconMap
export const ICON_NAMES = Object.keys(iconMap) as ReadonlyArray<IconName>

export const DEFAULT_ICON: LucideIcon = Wrench

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Resolve a CMS icon-name string to its Lucide component, with fallback. */
export function getIcon(name: string | undefined): LucideIcon {
	if (name && name in iconMap) return iconMap[name as IconName]
	return DEFAULT_ICON
}
