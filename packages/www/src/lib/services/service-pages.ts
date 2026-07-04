import type { PageSeoData } from "$lib/components/Seo.svelte"
import type { IconName } from "$lib/icons"

export type { PageSeoData }

// ── Layout variants ───────────────────────────────────────────────────────────

export type SimpleLayout = {
	type: "simple"
	hero: {
		title: string
		subtitle?: string
		image: string
		imageAlt?: string
		cta?: {
			label: string
			projectFilters?: { major?: string; minor?: string }
		}
	}
	cards: Array<{
		title: string
		description: string
		items?: string[]
		image: string
		imageAlt?: string
		reverse?: boolean
	}>
}

export type ComplexLayout = {
	type: "complex"
	hero: {
		eyebrow?: string
		title: string
		titleAccent?: string
		subtitle?: string
		image: string
		imageAlt?: string
		primaryCta?: { label: string; path: string }
		secondaryCta?: {
			label: string
			projectFilters?: { major?: string; minor?: string }
		}
	}
	scale?: {
		eyebrow?: string
		heading: string
		body?: string
		items: Array<{
			icon: IconName
			label: string
			text: string
		}>
	}
	capabilities?: {
		eyebrow?: string
		heading: string
		items: string[]
	}
}

export type ServiceLayout = SimpleLayout | ComplexLayout

// ── Tile metadata (home & all-services grids) ─────────────────────────────────

export type ServiceTileMeta = {
	icon: IconName
	description: string
	image: string
	imageAlt: string
	/** Override the auto-derived `/{slug}` link target. Use for tiles that should
	 *  link elsewhere (e.g. a contact CTA) rather than to the service's own page. */
	path?: string
	featured: boolean
	order: number
}

// ── Top-level record (slug/title/seo are layout-agnostic) ────────────────────

export type ServicePageContent = {
	slug: string
	title: string
	seo?: PageSeoData
	layout: ServiceLayout
	tile?: ServiceTileMeta
}

const modules = import.meta.glob<ServicePageContent>("$lib/cms/service-pages/*.json", {
	eager: true,
	import: "default"
})

// Slug is derived from the filename at runtime. The in-file `slug` field is written by
// Sveltia, so the filename and field stay in lockstep — but the filename is what the
// router keys off of, and we read it here to keep the contract with the [slug] route
// explicit.
export const servicePagesBySlug: Record<string, ServicePageContent> = Object.fromEntries(
	Object.entries(modules).map(([path, mod]) => [
		path
			.split("/")
			.pop()!
			.replace(/\.json$/, ""),
		mod
	])
)

export const servicePageSlugs: string[] = Object.keys(servicePagesBySlug).sort()
