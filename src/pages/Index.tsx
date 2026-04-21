import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, MessageSquare, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import ServiceImageGrid from "@/components/ServiceImageGrid"
import { featuredServices } from "@/data/services"

const PHONE_NUMBER = "tel:+15555555555"

const fadeUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 }
}

const Index = () => {
	return (
		<Layout>
			<Seo route="/" />
			{/* Hero */}
			<section className="relative min-h-[85vh] flex items-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage:
							"url(https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/536b13a7-fe1e-4895-8c56-787d7e5594c7/Hukills-Group_2.png)"
					}}
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
							One Call
							<br />
							<span className="text-primary">Does It All</span>
						</h1>
						<p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-lg">
							Plumbing · Restoration · Excavation · Remodels · Foundations — serving communities for
							over 40 years.
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<a
								href={PHONE_NUMBER}
								className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
							>
								<Phone className="w-5 h-5" />
								Call Now
							</a>
							<a
								href={`sms:${PHONE_NUMBER.replace("tel:", "")}`}
								className="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors rounded-sm"
							>
								<MessageSquare className="w-5 h-5" />
								Text Us
							</a>
							<Link
								to="/plumbing"
								className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
							>
								Our Services
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
							What We <span className="text-primary">Do</span>
						</h2>
						<p className="mt-4 text-muted-foreground max-w-xl mx-auto">
							From emergency repairs to complete renovations, our experienced team handles it all.
						</p>
						<Link
							to="/all-services"
							className="mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
						>
							All Services <ArrowRight className="w-4 h-4" />
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
								Our Amazing <span className="text-primary">Team</span>
							</h2>
							<p className="text-primary-foreground/70 leading-relaxed mb-6">
								Hukill's is a family-owned company that has been serving communities for over 40
								years. Over the years we have grown and transformed into a multi-faceted company
								covering Plumbing, Drain Cleaning, Restoration, Leak Detection, Renovation, Water
								Mitigation, Mold Remediation and Remodels.
							</p>
							<ul className="space-y-3">
								{[
									"Knowledgeable and Dependable Crew Members",
									"Friendly and Professional Office Staff",
									"Unprecedented Customer Service"
								].map((item) => (
									<li key={item} className="flex items-center gap-3 text-primary-foreground/80">
										<span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
										{item}
									</li>
								))}
							</ul>
							<a
								href={PHONE_NUMBER}
								className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
							>
								<Phone className="w-5 h-5" />
								Get In Touch
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
								src="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/da9697e4-24db-4628-b0f3-72f5b525cdb3/Screenshot+2025-08-04+at+2.32.46%E2%80%AFPM.png"
								alt="Hukill's team fleet at sunset"
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
							Ready to Get Started?
						</h2>
						<p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
							Whether it's an emergency or a planned project, our team is here to help. One call
							does it all.
						</p>
						<a
							href={PHONE_NUMBER}
							className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
						>
							<Phone className="w-5 h-5" />
							Call Hukill's Now
						</a>
					</motion.div>
				</div>
			</section>
		</Layout>
	)
}

export default Index
