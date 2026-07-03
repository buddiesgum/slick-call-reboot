import { useParams } from "react-router-dom"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import SimpleServiceLayout from "@/components/SimpleServiceLayout"
import ComplexServiceLayout from "@/components/ComplexServiceLayout"
import { servicePagesBySlug } from "./service-pages"
import NotFound from "./NotFound"

const ServicePage = () => {
	const { slug } = useParams<{ slug: string }>()
	const content = slug ? servicePagesBySlug[slug] : undefined
	// Unknown slugs won't have pre-rendered HTML (getStaticPaths only emits known service
	// slugs), so on a correctly-configured static host the CDN 404s before this runs.
	// This inline NotFound covers SPA client-side navigation and `pnpm dev`, where the
	// :slug route still matches first before the top-level * catch-all.
	if (!content) return <NotFound />

	return (
		<Layout>
			{/* Explicit `title` prop applies the `content.title` fallback when `content.seo.title` is unset. */}
			<Seo route={`/${slug}`} title={content.seo?.title ?? content.title} seoBlock={content.seo} />
			{content.layout.type === "complex" ?
				<ComplexServiceLayout content={content.layout} />
			:	<SimpleServiceLayout content={content.layout} />}
		</Layout>
	)
}

export default ServicePage
