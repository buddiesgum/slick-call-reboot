import { error } from "@sveltejs/kit"
import { servicePagesBySlug, servicePageSlugs } from "$lib/services/service-pages"
import type { EntryGenerator, PageLoad } from "./$types"

export const load: PageLoad = ({ params }) => {
	const content = servicePagesBySlug[params.slug]
	if (!content) error(404, "Not Found")
	return { slug: params.slug, content }
}

export const entries: EntryGenerator = () => servicePageSlugs.map(slug => ({ slug }))
