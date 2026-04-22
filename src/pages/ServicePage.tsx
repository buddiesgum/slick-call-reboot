import { useParams } from "react-router-dom"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import ServiceEmergencyCta from "@/components/ServiceEmergencyCta"
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
			<Seo
				route={`/${slug}`}
				title={content.seo?.title ?? content.title}
				description={content.seo?.description}
				canonical={content.seo?.canonical}
				ogImage={content.seo?.ogImage}
				ogImageAlt={content.seo?.ogImageAlt}
				ogImageWidth={content.seo?.ogImageWidth}
				ogImageHeight={content.seo?.ogImageHeight}
			/>
			<ServiceHero
				title={content.hero.title}
				subtitle={content.hero.subtitle}
				image={content.hero.image}
				imageAlt={content.hero.imageAlt}
			/>
			<section className="py-16 md:py-24">
				<div className="container space-y-20">
					{content.cards.map((card) => (
						<ServiceCard
							key={card.title}
							title={card.title}
							description={card.description}
							items={card.items}
							image={card.image}
							imageAlt={card.imageAlt}
							reverse={card.reverse}
						/>
					))}
				</div>
			</section>
			<ServiceEmergencyCta />
		</Layout>
	)
}

export default ServicePage
