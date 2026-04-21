import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"

interface Project {
	id: string
	title: string
	category: string
	market: "Residential" | "Commercial"
	heroImage: string
	gallery: string[]
	videoUrl?: string
	description: string
	location: string
}

const projects: Project[] = [
	{
		id: "foundation-repair-fw",
		title: "Foundation Repair — Fort Worth Residence",
		category: "Foundations",
		market: "Residential",
		heroImage:
			"https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/da9697e4-24db-4628-b0f3-72f5b525cdb3/Screenshot+2025-08-04+at+2.32.46%E2%80%AFPM.png",
		gallery: [
			"https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/da9697e4-24db-4628-b0f3-72f5b525cdb3/Screenshot+2025-08-04+at+2.32.46%E2%80%AFPM.png",
			"https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/536b13a7-fe1e-4895-8c56-787d7e5594c7/Hukills-Group_2.png"
		],
		description:
			"Complete push-pier installation on a 2,400 sq ft residential property experiencing severe settling. Our team stabilized the foundation using 14 steel push piers, restoring the home to near-original elevation. The project was completed in just 5 days with minimal disruption to the homeowner.",
		location: "Fort Worth, TX"
	},
	{
		id: "water-restoration-medford",
		title: "Water Damage Restoration — Medford Office",
		category: "Restoration",
		market: "Commercial",
		heroImage:
			"https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/536b13a7-fe1e-4895-8c56-787d7e5594c7/Hukills-Group_2.png",
		gallery: [
			"https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/536b13a7-fe1e-4895-8c56-787d7e5594c7/Hukills-Group_2.png"
		],
		description:
			"Emergency response to a burst pipe that flooded a 5,000 sq ft commercial office. We deployed industrial dehumidifiers and performed full drywall, flooring, and paint restoration within 2 weeks. Zero mold growth reported at the 90-day follow-up.",
		location: "Medford, OR"
	},
	{
		id: "kitchen-remodel-fw",
		title: "Full Kitchen Remodel — Historic Fort Worth Home",
		category: "Remodels",
		market: "Residential",
		heroImage:
			"https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/da9697e4-24db-4628-b0f3-72f5b525cdb3/Screenshot+2025-08-04+at+2.32.46%E2%80%AFPM.png",
		gallery: [
			"https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/da9697e4-24db-4628-b0f3-72f5b525cdb3/Screenshot+2025-08-04+at+2.32.46%E2%80%AFPM.png"
		],
		description:
			"A top-to-bottom kitchen transformation including custom cabinetry, quartz countertops, new plumbing fixtures, and modern lighting. We preserved the original character of this 1940s bungalow while delivering a fully contemporary kitchen.",
		location: "Fort Worth, TX"
	}
]

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
const markets = ["All", "Residential", "Commercial"] as const

const Projects = () => {
	const [activeCategory, setActiveCategory] = useState("All")
	const [activeMarket, setActiveMarket] = useState<(typeof markets)[number]>("All")
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)
	const [lightboxImg, setLightboxImg] = useState<string | null>(null)

	const filtered = projects.filter((project) => {
		const matchesCategory = activeCategory === "All" || project.category === activeCategory
		const matchesMarket = activeMarket === "All" || project.market === activeMarket

		return matchesCategory && matchesMarket
	})

	return (
		<Layout>
			<Seo route="/projects" />
			{/* Hero */}
			<section className="relative py-24 md:py-32 overflow-hidden">
				<div className="absolute inset-0 bg-secondary" />
				<div className="absolute inset-0 opacity-20 bg-[url('https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/da9697e4-24db-4628-b0f3-72f5b525cdb3/Screenshot+2025-08-04+at+2.32.46%E2%80%AFPM.png')] bg-cover bg-center" />
				<div className="container relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
							Our <span className="text-primary">Projects</span>
						</h1>
						<p className="mt-4 text-lg text-primary-foreground/60 max-w-xl">
							Browse our portfolio of completed work across plumbing, restoration, excavation,
							remodels, and foundations.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Filters */}
			<section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
				<div className="container flex flex-wrap items-center gap-2 py-3">
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
						{markets.map((market) => (
							<button
								key={market}
								onClick={() => setActiveMarket(market)}
								className={`px-4 py-1.5 rounded-full text-xs font-display uppercase tracking-wider whitespace-nowrap transition-colors ${
									activeMarket === market ?
										"bg-primary text-primary-foreground"
									:	"bg-muted text-muted-foreground hover:text-foreground"
								}`}
							>
								{market === "All" ? "All Projects" : market}
							</button>
						))}
					</div>
					<div className="h-6 w-px bg-border hidden sm:block" />
					<div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setActiveCategory(cat)}
								className={`px-4 py-1.5 rounded-full text-xs font-display uppercase tracking-wider whitespace-nowrap transition-colors ${
									activeCategory === cat ?
										"bg-primary text-primary-foreground"
									:	"bg-muted text-muted-foreground hover:text-foreground"
								}`}
							>
								{cat}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Project Grid */}
			<section className="py-16 md:py-24">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<AnimatePresence mode="popLayout">
							{filtered.map((project) => (
								<motion.div
									key={project.id}
									layout
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3 }}
									onClick={() => setSelectedProject(project)}
									className="group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
								>
									<div className="aspect-[16/10] overflow-hidden">
										<img
											src={project.heroImage}
											alt={project.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<div className="p-5">
										<span className="text-[10px] font-display uppercase tracking-widest text-primary">
											{project.category}
										</span>
										<h3 className="text-lg font-display uppercase tracking-tight mt-1 mb-2 group-hover:text-primary transition-colors">
											{project.title}
										</h3>
										<p className="text-sm text-muted-foreground line-clamp-2">
											{project.description}
										</p>
										<div className="mt-4 flex items-center gap-1 text-xs text-primary font-display uppercase tracking-wider">
											View Project <ArrowRight className="w-3 h-3" />
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</section>

			{/* Project Detail Modal */}
			<AnimatePresence>
				{selectedProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[100] bg-secondary/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
						onClick={() => setSelectedProject(null)}
					>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 40 }}
							transition={{ duration: 0.3 }}
							className="bg-background rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Modal Hero */}
							<div className="relative aspect-[21/9] overflow-hidden">
								<img
									src={selectedProject.heroImage}
									alt={selectedProject.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
								<button
									onClick={() => setSelectedProject(null)}
									className="absolute top-4 right-4 bg-secondary/60 backdrop-blur-sm text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							<div className="p-6 md:p-10">
								<span className="text-[10px] font-display uppercase tracking-widest text-primary">
									{selectedProject.category} · {selectedProject.location}
								</span>
								<h2 className="text-2xl md:text-4xl font-display uppercase tracking-tight mt-2 mb-6">
									{selectedProject.title}
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-8">
									{selectedProject.description}
								</p>

								{/* Video Placeholder */}
								{selectedProject.videoUrl && (
									<div className="mb-8 aspect-video bg-muted rounded-lg flex items-center justify-center">
										<Play className="w-12 h-12 text-primary" />
									</div>
								)}

								{/* Gallery */}
								{selectedProject.gallery.length > 0 && (
									<div>
										<h4 className="font-display uppercase text-sm tracking-wider mb-4">Gallery</h4>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
											{selectedProject.gallery.map((img, i) => (
												<button
													key={i}
													onClick={() => setLightboxImg(img)}
													className="aspect-[4/3] rounded-md overflow-hidden hover:ring-2 ring-primary transition-all"
												>
													<img
														src={img}
														alt={`${selectedProject.title} gallery ${i + 1}`}
														className="w-full h-full object-cover"
													/>
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Lightbox */}
			<AnimatePresence>
				{lightboxImg && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4"
						onClick={() => setLightboxImg(null)}
					>
						<button
							onClick={() => setLightboxImg(null)}
							className="absolute top-4 right-4 text-white/80 hover:text-white"
						>
							<X className="w-8 h-8" />
						</button>
						<img
							src={lightboxImg}
							alt="Full size"
							className="max-w-full max-h-[90vh] object-contain rounded-md"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</Layout>
	)
}

export default Projects
