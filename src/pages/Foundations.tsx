import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react"
import { useLocationContext } from "@/context/LocationContext"

const Foundations = () => {
	const { selected } = useLocationContext()

	return (
		<Layout>
			<Seo route="/foundations" />
			<ServiceHero
				title="Leak Detection"
				subtitle="Pinpoint accuracy with state-of-the-art equipment — find leaks before they find your foundation."
				image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782420474-OGQP7Q1FGWXDAM7QLXRS/leak-detection.jpg"
			/>
			<section className="py-16 md:py-24">
				<div className="container space-y-20">
					<ServiceCard
						title="Why Professional Leak Detection"
						description="Leaks happen in older and newer properties alike — driven by climate, soil conditions, and construction quality. Catching them early avoids property damage, lowers operating costs, and prevents serious line breaks. Our specialists conduct comprehensive surveys for water and gas leaks, residential or commercial, above or below ground."
						items={[
							"Avoid property damage",
							"Reduce operating costs",
							"Prevent major line breaks",
							"Emergency response available"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782420474-OGQP7Q1FGWXDAM7QLXRS/leak-detection.jpg"
					/>
					<ServiceCard
						title="Water Line Leak Detection"
						description="When leaks strike — in pipes, slabs, driveways, or roads — our specialists deploy two proven techniques. Acoustic ground microphones detect the vibrations a leak creates underground. When acoustics aren't viable due to noise, depth, or leak size, we use tracer gas: an inert gas replaces the water in the line, escapes through the break, and is detected at the surface with a 'sniffer' unit."
						items={[
							"Acoustic ground microphones",
							"Tracer gas detection",
							"Slab & driveway leaks",
							"Residential & commercial"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782420474-OGQP7Q1FGWXDAM7QLXRS/leak-detection.jpg"
						reverse
					/>
					<ServiceCard
						title="Utility & Line Locating"
						description="State One-Call (811) marks public utilities — we locate the private ones beyond your service meter. Using state-of-the-art equipment, we map electric lines, gas service, communication lines, sanitary waste, water service, storm drains, and fuel systems for safe pre-excavation and site planning."
						items={[
							"Electric & landscape lighting",
							"Gas service to outbuildings",
							"Cable & telephone lines",
							"Sanitary & septic lines",
							"Water & irrigation",
							"Storm drains & buried tanks"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782420474-OGQP7Q1FGWXDAM7QLXRS/leak-detection.jpg"
					/>
					<ServiceCard
						title="Camera & Video Inspection"
						description="Our high-resolution camera snake delivers visual confirmation inside buried pipes — spotting obstructions, disconnected fittings, cracks, and root intrusion, or verifying that a line is sound. We inspect sewers, stormwater lines, manholes, vaults, and monitoring wells up to 300 feet in each direction. Footage available on DVD or digital media on request."
						items={[
							"High-resolution color camera",
							"Up to 300 ft of inspection",
							"Sewer, storm & monitoring wells",
							"Recorded footage available"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782420474-OGQP7Q1FGWXDAM7QLXRS/leak-detection.jpg"
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

export default Foundations
