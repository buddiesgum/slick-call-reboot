import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { motion } from "framer-motion"
import { Award, Heart, Users, HandHeart, Target, Eye, Scale } from "lucide-react"
import aboutHero from "@/assets/about-hero.jpg"
import aboutMission from "@/assets/about-mission.jpg"
import aboutValues from "@/assets/about-values.jpg"
import aboutVision from "@/assets/about-vision.jpg"

const values = [
	{
		icon: Award,
		title: "Excellence",
		description:
			"We pursue the highest standards in all of our work. We believe excellence is a habit, not a destination."
	},
	{
		icon: Scale,
		title: "Integrity",
		description:
			"We act with honesty and fairness in everything we do, ensuring our actions align with our words. We uphold the highest ethical standards and foster an environment of trust and respect."
	},
	{
		icon: Users,
		title: "Teamwork",
		description:
			"We understand that success is built on collaboration. We value the unique strengths everyone brings to the table."
	},
	{
		icon: HandHeart,
		title: "Servant-Hearted",
		description:
			"We lead by serving. We aim to ensure our work not only brings prosperity but also blesses the customers we serve."
	}
]

const About = () => (
	<Layout>
		<Seo route="/about" />
		{/* HERO */}
		<section className="relative h-[60vh] min-h-[420px] flex items-center overflow-hidden">
			<img
				src={aboutHero}
				alt="The Hukill's crew on a job site at golden hour"
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
					Est. 1979 — Faith. Family. Craft.
				</motion.p>
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
				>
					Built on a <span className="text-primary">Higher</span> Standard
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.25 }}
					className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
				>
					We're a team of craftsmen, problem-solvers, and people of faith — committed to doing
					honest work that lasts.
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
							src={aboutMission}
							alt="Craftsman's hands working on copper pipe"
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
							Our Mission
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight">
						Diligence, Integrity, <span className="text-primary">Faith.</span>
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed mb-6">
						Our mission is to create an environment where every individual has the opportunity to
						succeed through diligence, integrity, and faith. By putting Jesus Christ first, we trust
						that success and prosperity will follow.
					</p>
					<div className="space-y-4 border-l-2 border-primary pl-6">
						<div>
							<h3 className="font-display uppercase tracking-wider text-sm text-foreground mb-1">
								Execution
							</h3>
							<p className="text-muted-foreground text-sm">
								High-quality services and products. Strong relationships. Leading by example.
							</p>
						</div>
						<div>
							<h3 className="font-display uppercase tracking-wider text-sm text-foreground mb-1">
								Success
							</h3>
							<p className="text-muted-foreground text-sm">
								True success is found in a life dedicated to faith, hard work, and unwavering
								principles.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>

		{/* VALUES */}
		<section className="section-dark py-20 md:py-28 relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-15 bg-cover bg-center"
				style={{ backgroundImage: `url(${aboutValues})` }}
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
							Our Values
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground leading-tight">
						What We Stand <span className="text-primary">For</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{values.map((value, i) => (
						<motion.div
							key={value.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="group relative bg-background/5 backdrop-blur-sm border border-primary-foreground/10 p-8 hover:border-primary transition-all duration-300 hover:bg-background/10"
						>
							<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
								<value.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
							</div>
							<h3 className="text-2xl font-display uppercase tracking-tight text-primary-foreground mb-3">
								{value.title}
							</h3>
							<p className="text-primary-foreground/70 leading-relaxed">{value.description}</p>
						</motion.div>
					))}
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
							src={aboutVision}
							alt="Construction cranes silhouetted at sunrise"
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
							Our Vision
						</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight">
						Measured by <span className="text-primary">Impact.</span>
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed mb-6">
						Our vision is to build a company where success isn't measured only by achievements, but
						by the impact we have on others. We strive to be a reflection of Jesus Christ in all
						that we do — so that everyone we encounter, employees, customers, and partners alike,
						can witness His love and transforming power.
					</p>
					<p className="font-display uppercase tracking-wider text-sm text-foreground mb-4">
						Through faith, integrity, excellence, and hard work, we will:
					</p>
					<ul className="space-y-3">
						{["Inspire change", "Foster growth", "Glorify God in every aspect of our business"].map(
							(item) => (
								<li key={item} className="flex items-start gap-3">
									<span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
									<span className="text-muted-foreground">{item}</span>
								</li>
							)
						)}
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
						— Accountability Statement —
					</span>
					<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground leading-tight mb-8">
						We Hold Each Other to a Higher Standard.
					</h2>
					<p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
						As a company, we commit to holding one another accountable to these principles. If we,
						individually or as a team, fall short of these values, we will encourage and correct
						each other with honesty, grace, and humility. Together, we will strive to stay true to
						our faith, integrity, and mission — ensuring that our actions always reflect the love of
						Jesus Christ.
					</p>
				</motion.div>
			</div>
		</section>
	</Layout>
)

export default About
