import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, MessageSquare, Phone, Play, Star } from "lucide-react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import LocationSelector from "@/components/LocationSelector"
import ServiceImageGrid from "@/components/ServiceImageGrid"
import { useLocationContext } from "@/context/location-context"
import { allServices } from "@/data/services"
import content from "@/cms/all-services-page.json"
import aboutHero from "@/assets/about-hero.jpg"

const AllServices = () => {
	const { selected } = useLocationContext()
	const smsHref = `sms:${selected.phone.replace("tel:", "")}`
	const heroBg = content.hero.image || aboutHero
	const videoPoster = content.video.posterImage || aboutHero

	return (
		<Layout>
			<Seo route="/all-services" />
			<section className="relative min-h-[560px] flex items-center overflow-hidden section-dark">
				<img
					src={heroBg}
					alt={content.hero.imageAlt}
					className="absolute inset-0 w-full h-full object-cover opacity-35"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40" />
				<div className="container relative z-10 py-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-4xl"
					>
						<p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-5">
							{content.hero.eyebrow}
						</p>
						<h1 className="text-5xl md:text-8xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
							{content.hero.title} <span className="text-primary">{content.hero.titleAccent}</span>
						</h1>
						<p className="mt-8 text-lg md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
							{content.hero.description}
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<a
								href={selected.phone}
								className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
							>
								<Phone className="w-5 h-5" /> {content.hero.primaryCtaLabel} {selected.phoneDisplay}
							</a>
							<a
								href={smsHref}
								className="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors rounded-sm"
							>
								<MessageSquare className="w-5 h-5" /> {content.hero.textCtaLabel}
							</a>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="py-12 bg-background border-b border-border">
				<div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					<div>
						<div className="flex items-center gap-3 mb-2">
							<MapPin className="w-5 h-5 text-primary" />
							<span className="font-display uppercase tracking-[0.2em] text-sm text-primary">
								{content.locationPrompt.eyebrowPrefix} {selected.label}
							</span>
						</div>
						<p className="text-muted-foreground max-w-2xl">{content.locationPrompt.body}</p>
					</div>
					<div className="bg-secondary text-secondary-foreground px-5 py-4 rounded-sm inline-flex">
						<LocationSelector />
					</div>
				</div>
			</section>

			<section className="py-20 md:py-28 bg-background">
				<div className="container">
					<div className="text-center mb-14">
						<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-foreground">
							{content.servicesGrid.heading}{" "}
							<span className="text-primary">{content.servicesGrid.headingAccent}</span>
						</h2>
						<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
							{content.servicesGrid.description}
						</p>
					</div>
					<ServiceImageGrid services={allServices} />
				</div>
			</section>

			<section className="section-dark py-20 md:py-28">
				<div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
							{content.video.eyebrow}
						</p>
						<h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground leading-tight mb-6">
							{content.video.heading}
						</h2>
						<p className="text-primary-foreground/70 leading-relaxed mb-8">{content.video.body}</p>
						<Link
							to={content.video.ctaPath}
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
						>
							{content.video.ctaLabel}
						</Link>
					</div>
					<div className="relative aspect-video border border-primary-foreground/15 bg-background/5 overflow-hidden flex items-center justify-center">
						<img
							src={videoPoster}
							alt={content.video.posterAlt}
							className="absolute inset-0 w-full h-full object-cover opacity-45"
						/>
						<div className="absolute inset-0 bg-secondary/60" />
						<div className="relative z-10 w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
							<Play className="w-9 h-9 ml-1" />
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 md:py-28 bg-background">
				<div className="container">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
						<div>
							<p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
								{content.reviews.eyebrow}
							</p>
							<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground">
								{content.reviews.heading}
							</h2>
						</div>
						<div className="flex gap-1 text-primary">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star key={i} className="w-6 h-6 fill-current" />
							))}
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{content.reviews.items.map((review) => (
							<div key={review.text} className="border border-border bg-card p-7">
								<div className="flex gap-1 text-primary mb-5">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star key={i} className="w-4 h-4 fill-current" />
									))}
								</div>
								<p className="text-muted-foreground leading-relaxed mb-6">"{review.text}"</p>
								<p className="font-display uppercase tracking-wider text-sm text-foreground">
									{review.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 md:py-28 bg-primary">
				<div className="container text-center">
					<h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground mb-5">
						{content.closingCta.heading}
					</h2>
					<p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
						{content.closingCta.bodyPrefix} {selected.label}.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<a
							href={selected.phone}
							className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
						>
							<Phone className="w-5 h-5" /> {content.closingCta.callLabel}
						</a>
						<a
							href={smsHref}
							className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
						>
							<MessageSquare className="w-5 h-5" /> {content.closingCta.textLabel}
						</a>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default AllServices
