import type { PageSeoData } from "@/components/seo-types"

export type { PageSeoData }

export type ServicePageContent = {
	slug: string
	title: string
	seo?: PageSeoData
	hero: {
		title: string
		subtitle?: string
		image: string
		imageAlt?: string
		cta?: { label: string; path: string }
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
