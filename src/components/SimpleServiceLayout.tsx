import type { SimpleLayout } from "@/pages/service-pages"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import ServiceEmergencyCta from "@/components/ServiceEmergencyCta"

interface SimpleServiceLayoutProps {
	content: SimpleLayout
}

const SimpleServiceLayout = ({ content }: SimpleServiceLayoutProps) => (
	<>
		<ServiceHero
			title={content.hero.title}
			subtitle={content.hero.subtitle}
			image={content.hero.image}
			imageAlt={content.hero.imageAlt}
			cta={content.hero.cta}
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
	</>
)

export default SimpleServiceLayout
