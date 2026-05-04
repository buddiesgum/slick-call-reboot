import type { PageSeoData } from "@/components/seo-types"
import type { ComplexIconName } from "@/components/complex-service-icons"

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
			icon: ComplexIconName
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

// ── Top-level record (slug/title/seo are layout-agnostic) ────────────────────

export type ServicePageContent = {
	slug: string
	title: string
	seo?: PageSeoData
	layout: ServiceLayout
}

const modules = import.meta.glob<ServicePageContent>("@/cms/service-pages/*.json", {
	eager: true,
	import: "default"
})

// Slug is derived from the filename at runtime. The in-file `slug` field is written by
// Sveltia (via `"slug": "{{fields.slug}}"` in public/admin/config.json), so the filename
// and field stay in lockstep — but the filename is what the router keys off of, and we
// read it here rather than the field to keep the runtime contract with App.tsx explicit.
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
