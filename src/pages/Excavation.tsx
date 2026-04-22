import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import ServiceEmergencyCta from "@/components/ServiceEmergencyCta"
import content from "@/cms/service-pages/excavation.json"

const Excavation = () => (
	<Layout>
		<Seo route="/excavation" />
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

export default Excavation
