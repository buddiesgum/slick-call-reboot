import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { motion } from "framer-motion"
import { Award, Heart, Users, HandHeart, Target, Eye, Scale, type LucideIcon } from "lucide-react"
import aboutData from "@/cms/about-page.json"

const iconMap: Record<string, LucideIcon> = {
	Award,
	Heart,
	Users,
	HandHeart,
	Target,
	Eye,
	Scale,
}

const About = () => (
	<Layout>
		<Seo route="/about" />
		{/* HERO */}
		<section className="relative h-[60vh] min-h-[420px] flex items-center overflow-hidden">
			<img
				src={aboutData.hero.image}
				alt={aboutData.hero.imageAlt}
				className="absolute inset-0 w-full h-full object-cover"
				width={1920}
				height={1024}
			/>
			<div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-secondary/30" />
			<div className="container relative z-10">
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4"
				>
					{aboutData.hero.eyebrow}
				</motion.p>
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
				>
					{aboutData.hero.title} <span className="text-primary">{aboutData.hero.titleAccent}</span>{" "}
					{aboutData.hero.titleSuffix}
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.25 }}
					className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
				>
					{aboutData.hero.description}
				</motion.p>
			</div>
		</section>

		{/* MISSION */}
		<section className="py-20 md:py-28">
			<div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6 }}
				>
					<div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
						<img
							src={aboutData.mission.image}
							alt={aboutData.mission.imageAlt}
							className="w-full h-full object-cover"
							loading="lazy"
							width={1280}
							height={960}
						/>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex items-center gap-3 mb-4">
						<Target className="w-6 h-6 text-primary" />
						<span className="font-display uppercase tracking-[0.25em] text-sm text-primary">
							{aboutData.mission.eyebrow}
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight">
						{aboutData.mission.heading}{" "}
						<span className="text-primary">{aboutData.mission.headingAccent}</span>
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed mb-6">{aboutData.mission.body}</p>
					<div className="space-y-4 border-l-2 border-primary pl-6">
						{aboutData.mission.points.map((point) => (
							<div key={point.heading}>
								<h3 className="font-display uppercase tracking-wider text-sm text-foreground mb-1">
									{point.heading}
								</h3>
								<p className="text-muted-foreground text-sm">{point.body}</p>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>

		{/* VALUES */}
		<section className="section-dark py-20 md:py-28 relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-15 bg-cover bg-center"
				style={{ backgroundImage: `url(${aboutData.values.backgroundImage})` }}
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary" />
			<div className="container relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="max-w-2xl mb-16"
				>
					<div className="flex items-center gap-3 mb-4">
						<Heart className="w-6 h-6 text-primary" />
						<span className="font-display uppercase tracking-[0.25em] text-sm text-primary">
							{aboutData.values.eyebrow}
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground leading-tight">
						{aboutData.values.heading}{" "}
						<span className="text-primary">{aboutData.values.headingAccent}</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{aboutData.values.items.map((value, i) => {
						const Icon = iconMap[value.icon] ?? Award
						return (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="group relative bg-background/5 backdrop-blur-sm border border-primary-foreground/10 p-8 hover:border-primary transition-all duration-300 hover:bg-background/10"
							>
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
									<Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
								</div>
								<h3 className="text-2xl font-display uppercase tracking-tight text-primary-foreground mb-3">
									{value.title}
								</h3>
								<p className="text-primary-foreground/70 leading-relaxed">{value.description}</p>
							</motion.div>
						)
					})}
				</div>
			</div>
		</section>

		{/* VISION */}
		<section className="py-20 md:py-28">
			<div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6 }}
					className="lg:order-2"
				>
					<div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
						<img
							src={aboutData.vision.image}
							alt={aboutData.vision.imageAlt}
							className="w-full h-full object-cover"
							loading="lazy"
							width={1280}
							height={960}
						/>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6 }}
					className="lg:order-1"
				>
					<div className="flex items-center gap-3 mb-4">
						<Eye className="w-6 h-6 text-primary" />
						<span className="font-display uppercase tracking-[0.25em] text-sm text-primary">
							{aboutData.vision.eyebrow}
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight">
						{aboutData.vision.heading}{" "}
						<span className="text-primary">{aboutData.vision.headingAccent}</span>
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed mb-6">{aboutData.vision.body}</p>
					<p className="font-display uppercase tracking-wider text-sm text-foreground mb-4">
						{aboutData.vision.bulletsLeadIn}
					</p>
					<ul className="space-y-3">
						{aboutData.vision.bullets.map((item) => (
							<li key={item} className="flex items-start gap-3">
								<span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
								<span className="text-muted-foreground">{item}</span>
							</li>
						))}
					</ul>
				</motion.div>
			</div>
		</section>

		{/* ACCOUNTABILITY */}
		<section className="relative py-20 md:py-28 bg-primary overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
				<div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
			</div>
			<div className="container relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="max-w-4xl mx-auto text-center"
				>
					<span className="inline-block font-display uppercase tracking-[0.3em] text-sm text-primary-foreground/80 mb-6">
						{aboutData.accountability.eyebrow}
					</span>
					<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground leading-tight mb-8">
						{aboutData.accountability.heading}
					</h2>
					<p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
						{aboutData.accountability.body}
					</p>
				</motion.div>
			</div>
		</section>
	</Layout>
)

export default About
