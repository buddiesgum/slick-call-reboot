import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, MessageSquare, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceImageGrid from "@/components/ServiceImageGrid"
import { featuredServices } from "@/data/services"
import { useLocationContext } from "@/context/location-context"
import homeData from "@/cms/home-page.json"
import { usePostHog } from "@posthog/react"

const fadeUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 }
}

const Index = () => {
	const { selected } = useLocationContext()
	const posthog = usePostHog()
	return (
		<Layout>
			<Seo route="/" seoBlock={homeData.seo} />
			{/* Hero */}
			<section className="relative min-h-[85vh] flex items-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${homeData.hero.image})` }}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40" />
				<div className="container relative z-10 py-20">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						className="max-w-2xl"
					>
						<h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
							{homeData.hero.title}
							<br />
							<span className="text-primary">{homeData.hero.titleAccent}</span>
						</h1>
						<p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-lg">
							{homeData.hero.description}
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<a
								href={selected.phone}
								onClick={() => posthog?.capture("hero_phone_clicked")}
								className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
							>
								<Phone className="w-5 h-5" />
								{homeData.hero.primaryCtaLabel}
							</a>
							<a
								href={`sms:${selected.phone.replace("tel:", "")}`}
								onClick={() => posthog?.capture("hero_sms_clicked")}
								className="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors rounded-sm"
							>
								<MessageSquare className="w-5 h-5" />
								{homeData.hero.textCtaLabel}
							</a>
							<Link
								to={homeData.hero.secondaryCta.path}
								className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
							>
								{homeData.hero.secondaryCta.label}
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Services Grid */}
			<section className="py-20 md:py-28 bg-background">
				<div className="container">
					<motion.div
						{...fadeUp}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						whileInView="animate"
						initial="initial"
						className="text-center mb-14"
					>
						<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-foreground">
							{homeData.services.heading}{" "}
							<span className="text-primary">{homeData.services.headingAccent}</span>
						</h2>
						<p className="mt-4 text-muted-foreground max-w-xl mx-auto">
							{homeData.services.description}
						</p>
						<Link
							to={homeData.services.cta.path}
							className="mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
						>
							{homeData.services.cta.label} <ArrowRight className="w-4 h-4" />
						</Link>
					</motion.div>

					<ServiceImageGrid services={featuredServices} />
				</div>
			</section>

			{/* About / Team Section */}
			<section className="section-dark py-20 md:py-28">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight mb-6">
								{homeData.team.heading}{" "}
								<span className="text-primary">{homeData.team.headingAccent}</span>
							</h2>
							<p className="text-primary-foreground/70 leading-relaxed mb-6">
								{homeData.team.body}
							</p>
							<ul className="space-y-3">
								{homeData.team.bullets.map((b) => (
									<li key={b} className="flex items-center gap-3 text-primary-foreground/80">
										<span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
										{b}
									</li>
								))}
							</ul>
							<a
								href={selected.phone}
								className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
							>
								<Phone className="w-5 h-5" />
								{homeData.team.ctaLabel}
							</a>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="aspect-[4/3] rounded-lg overflow-hidden"
						>
							<img
								src={homeData.team.image}
								alt={homeData.team.imageAlt}
								className="w-full h-full object-cover"
							/>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 md:py-28 bg-primary">
				<div className="container text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4">
							{homeData.closingCta.heading}
						</h2>
						<p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
							{homeData.closingCta.description}
						</p>
						<a
							href={selected.phone}
							className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
						>
							<Phone className="w-5 h-5" />
							{homeData.closingCta.buttonLabel}
						</a>
					</motion.div>
				</div>
			</section>
		</Layout>
	)
}

export default Index
