import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react"
import { useLocationContext } from "@/context/LocationContext"

const LeakDetection = () => {
	const { selected } = useLocationContext()

	return (
		<Layout>
			<Seo route="/leak-detection" />
			<ServiceHero
				title="Foundations"
				subtitle="Foundation issues can affect the safety, appearance and value of your home."
				image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/d9fa939c-c14f-4244-8f3d-8815ffcdffef/foundations-page.jpg"
			/>
			<section className="py-16 md:py-24">
				<div className="container space-y-20">
					<ServiceCard
						title="Foundation Repair"
						description="If your foundation has been affected by water damage, age, poor construction or other factors, Hukill's Foundation Systems can help. We have trained professionals and use top grade products to make these repairs."
						items={["Push Piers", "Helical Pre-Construction Piers", "Wall Stabilizing"]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/d9fa939c-c14f-4244-8f3d-8815ffcdffef/foundations-page.jpg"
					/>
					<ServiceCard
						title="Crawl Space"
						description="Crawl spaces can have unknown issues affecting the inside of your house. Hukills Foundation Systems can make necessary repairs including water damage, structural issues, and moisture problems."
						items={[
							"Sump Pumps",
							"Encapsulations",
							"Vapor Barrier",
							"Drainage Systems",
							"Earthquake Retrofitting"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/4f9e4459-31d8-406f-afb7-639b41324a7c/crawl-space-page-1.jpg"
						reverse
					/>
					<ServiceCard
						title="Basement Repair"
						description="Ground level leaks, musty smells or damp walls are indicators that your basement may need waterproofing. Hukills Foundation Systems provides products and services to solve your basement problems."
						items={[
							"Waterproofing",
							"Wall Stabilization",
							"Interior Perimeter Drainage",
							"Sump Pumps",
							"Floor Crack Repairs",
							"Window Well Drains"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/81f27b07-f3e2-44a1-9a18-ca1bc5baa1a3/basement-page.jpg"
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

export default LeakDetection
