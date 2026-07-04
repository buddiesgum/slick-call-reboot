import type { LucideIcon } from "@lucide/svelte"
import { servicePagesBySlug } from "$lib/services/service-pages"
import { iconMap } from "$lib/icons"

export type ServiceTile = {
	icon: LucideIcon
	title: string
	desc: string
	path: string
	image: string
	imageAlt: string
}

type IndexedTile = ServiceTile & { order: number; featured: boolean }

/**
 * Services without a `tile` block are intentionally omitted from both
 * `featuredServices` and `allServices`. Editors who want a service to appear
 * in grids must populate the tile block via the CMS. Dynamic page routing is
 * unaffected — the page still prerenders even if the tile is absent.
 */
const indexed: IndexedTile[] = Object.entries(servicePagesBySlug)
	.filter(([slug, page]) => {
		if (page.tile == null) return false
		if (!(page.tile.icon in iconMap)) {
			console.warn(`[services] Skipping "${slug}": unknown tile icon "${page.tile.icon}".`)
			return false
		}
		return true
	})
	.map(([slug, page]) => ({
		icon: iconMap[page.tile!.icon as keyof typeof iconMap],
		title: page.title,
		desc: page.tile!.description,
		path: page.tile!.path || `/${slug}`, // sveltia writes ""
		image: page.tile!.image,
		imageAlt: page.tile!.imageAlt,
		order: page.tile!.order,
		featured: page.tile!.featured
	}))

const byOrder = (a: IndexedTile, b: IndexedTile) =>
	a.order - b.order || a.title.localeCompare(b.title)

const strip = ({ order: _order, featured: _featured, ...tile }: IndexedTile): ServiceTile => tile

export const featuredServices: ServiceTile[] = indexed
	.filter(t => t.featured)
	.sort(byOrder)
	.map(strip)

export const allServices: ServiceTile[] = indexed.slice().sort(byOrder).map(strip)
