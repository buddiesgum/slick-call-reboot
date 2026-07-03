import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react"
import { useLocationContext } from "@/context/location-context"
import ctaData from "@/cms/service-cta.json"
import { usePostHog } from "@posthog/react"

const ServiceEmergencyCta = () => {
	const { selected } = useLocationContext()
	const posthog = usePostHog()

	return (
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
							{ctaData.heading} <span className="text-primary">{ctaData.headingAccent}</span>
						</h2>
						<p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
							{ctaData.description}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href={selected.phone}
								onClick={() => posthog?.capture("emergency_phone_clicked")}
								className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
							>
								<Phone className="w-4 h-4" />
								{ctaData.phoneCtaLabel} {selected.short}
							</a>
							<Link
								to={ctaData.quotePath}
								onClick={() => posthog?.capture("emergency_quote_clicked")}
								className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:border-primary hover:text-primary transition-colors rounded-sm"
							>
								{ctaData.quoteCtaLabel} <ArrowRight className="w-4 h-4" />
							</Link>
						</div>
						<div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-foreground/50">
							<MapPin className="w-4 h-4" />
							<span>
								{ctaData.locationPrefix} {selected.label}
							</span>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

export default ServiceEmergencyCta
