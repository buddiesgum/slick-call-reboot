import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceHero from "@/components/ServiceHero"
import ServiceCard from "@/components/ServiceCard"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react"
import { useLocationContext } from "@/context/LocationContext"

const SepticServices = () => {
	const { selected } = useLocationContext()

	return (
		<Layout>
			<Seo route="/septic-services" />
			<ServiceHero
				title="Septic Services"
				subtitle="Pumping, installation, and repair — keep your system running clean, safe, and trouble-free."
				image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1558ab56-4173-4f20-8067-eb28ac0ad8d3/P1660752.jpg"
			/>
			<section className="py-16 md:py-24">
				<div className="container space-y-20">
					<ServiceCard
						title="Septic Tank Pumping"
						description="Regular pumping is the single best way to keep your septic system running efficiently and avoid costly problems down the line. We remove built-up waste, prevent backups, and extend the life of your system. Whether it's routine maintenance or an urgent issue, our team handles residential and commercial systems with a clean, safe, and stress-free process from start to finish."
						items={[
							"Routine maintenance pumping",
							"Emergency response",
							"Residential & commercial",
							"Clean, mess-free service"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/aeba162f-76c2-4be4-bde3-b4e53ea11397/Screenshot+2025-04-07+at+4.02.13+PM.png"
					/>
					<ServiceCard
						title="Installation & Repair"
						description="Building new, upgrading an outdated system, or facing a septic emergency — Hukill's has you covered. From system design and permitting to excavation and final hookup, we handle every step with precision. If your existing system shows signs of failure — slow drains, odors, or standing water — we diagnose the issue and provide reliable, cost-effective repairs."
						items={[
							"New system design & permitting",
							"Excavation & final hookup",
							"Failure diagnosis (odors, slow drains, standing water)",
							"Cost-effective repairs"
						]}
						image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1558ab56-4173-4f20-8067-eb28ac0ad8d3/P1660752.jpg"
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

export default SepticServices
