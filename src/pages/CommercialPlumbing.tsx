import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import content from "@/cms/commercial-plumbing-page.json"
import { motion } from "framer-motion"
import { ArrowRight, Building2, Droplets, HardHat, ShieldCheck, Waves } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
	HardHat,
	Waves,
	Droplets,
	ShieldCheck
}

const CommercialPlumbing = () => {
	return (
		<Layout>
			<Seo route="/commercial-plumbing" seoBlock={content.seo} />
			<section className="relative min-h-[640px] flex items-center overflow-hidden section-dark">
				<img
					src={content.hero.image}
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
							{content.hero.subtitle}
						</p>
						<a
							href={content.hero.ctaPath}
							className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-display uppercase text-sm tracking-wider rounded-sm hover:bg-primary/90 transition-colors"
						>
							{content.hero.ctaLabel} <ArrowRight className="w-4 h-4" />
						</a>
					</motion.div>
				</div>
			</section>

			<section className="py-20 md:py-28 bg-background">
				<div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.6 }}
					>
						<div className="flex items-center gap-3 mb-4">
							<Building2 className="w-6 h-6 text-primary" />
							<span className="font-display uppercase tracking-[0.25em] text-sm text-primary">
								{content.scale.eyebrow}
							</span>
						</div>
						<h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight">
							{content.scale.heading}
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed">{content.scale.body}</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{content.scale.items.map((point, index) => {
							const Icon = iconMap[point.icon] ?? Building2
							return (
								<motion.div
									key={point.label}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-60px" }}
									transition={{ duration: 0.45, delay: index * 0.08 }}
									className="border border-border bg-card p-6 hover:border-primary transition-colors"
								>
									<Icon className="w-8 h-8 text-primary mb-5" />
									<h3 className="font-display uppercase tracking-tight text-2xl mb-3">
										{point.label}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
								</motion.div>
							)
						})}
					</div>
				</div>
			</section>

			<section className="section-dark py-20 md:py-28 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
				<div className="container relative z-10">
					<div className="max-w-3xl mb-12">
						<p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
							{content.capabilities.eyebrow}
						</p>
						<h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground leading-tight">
							{content.capabilities.heading}
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10">
						{content.capabilities.items.map((item) => (
							<div key={item} className="bg-secondary/90 p-6 min-h-32 flex items-end">
								<p className="font-display uppercase tracking-tight text-xl text-primary-foreground">
									{item}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default CommercialPlumbing
