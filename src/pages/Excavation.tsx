import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react"
import { useLocationContext } from "@/context/LocationContext"

const Excavation = () => {
	const { selected } = useLocationContext()

	return (
		<Layout>
			<Seo route="/excavation" />
			<ServiceHero
				title="Excavation"
				subtitle="Our fleet of excavators, backhoes, and dump trucks ensures swift and efficient completion of your projects."
				image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782422988-2BWY8ZI0XSMDN8KEJSIX/IMG_4911.jpg"
			/>
			<section className="py-16 md:py-24">
				<div className="container space-y-20">
					<ServiceCard
						title="Excavation & Underground"
						description="Our comprehensive excavation services encompass trench digging, asphalt cutting and removal, septic site preparation, tank replacement and system installation, water and sewer line replacement, and general demolition."
						items={[
							"Trench Digging",
							"Asphalt Cutting & Removal",
							"Septic Site Preparation",
							"Tank Replacement & Installation",
							"Water & Sewer Line Replacement",
							"General Demolition"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782422988-2BWY8ZI0XSMDN8KEJSIX/IMG_4911.jpg"
					/>
					<ServiceCard
						title="Full Project Coordination"
						description="From utility locating to excavation and backfilling, we coordinate every aspect of your project seamlessly. Our team handles everything so you don't have to."
						items={["Utility Locating", "Excavation & Backfilling", "Project Coordination"]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782422991-3YLCP5O2VSWUQX6EUX5D/P1690284.jpg"
						reverse
					/>
				</div>
			</section>

			{/* Contact CTA Section */}
			<section className="section-dark py-20 md:py-28 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
				<div className="container relative z-10">
					<div className="max-w-3xl mx-auto text-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<Clock className="w-10 h-10 text-primary mx-auto mb-4" />
							<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4">
								Available 24/7 for <span className="text-primary">Emergencies</span>
							</h2>
							<p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
								Don't wait for a small problem to become a major disaster. Our team is ready to
								respond day or night.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<a
									href={selected.phone}
									className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
								>
									<Phone className="w-4 h-4" />
									Call {selected.short}
								</a>
								<Link
									to="/contact"
									className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:border-primary hover:text-primary transition-colors rounded-sm"
								>
									Get a Quote <ArrowRight className="w-4 h-4" />
								</Link>
							</div>
							<div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-foreground/50">
								<MapPin className="w-4 h-4" />
								<span>Serving {selected.label}</span>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default Excavation
