import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react"
import { useLocationContext } from "@/context/LocationContext"

const WaterHeaters = () => {
	const { selected } = useLocationContext()

	return (
		<Layout>
			<Seo route="/water-heaters" />
			<ServiceHero
				title="Water Heaters"
				subtitle="Service, install, and repair — tank and tankless. Our team helps you choose what's right for your home."
				image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782430522-GO0ZSN821GXI1DS95FNQ/P1660312+2.jpg"
			/>
			<section className="py-16 md:py-24">
				<div className="container space-y-20">
					<ServiceCard
						title="Tank-Style Water Heaters"
						description="Cold water enters through a dip tube to the bottom of the tank, while hot water is drawn off the top — so you get full-temperature water until most of the tank is used. We can also install a mixing valve on your existing unit to deliver up to 50% more hot water by mixing it with cold downstream of the tank, reducing strain on the heater."
						items={[
							"Repair & replacement",
							"New installs",
							"Mixing valve upgrades for 50% more hot water",
							"Honest repair-or-replace guidance"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782430522-GO0ZSN821GXI1DS95FNQ/P1660312+2.jpg"
					/>
					<ServiceCard
						title="Tankless Water Heaters"
						description="Tankless systems heat water on demand instead of constantly heating a stored tank. The right candidate can save substantially on monthly bills, conserve natural gas, and enjoy unlimited hot water. Tankless units also last 5–10 years longer than tank heaters and take up far less space."
						items={[
							"On-demand hot water",
							"Lower monthly utility bills",
							"5–10 years longer lifespan",
							"Compact, space-saving install"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782430519-0OWQJL4UQDU8HBXDU52O/tankless.jpg"
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

export default WaterHeaters
