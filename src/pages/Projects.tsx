import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { projects, type Project } from "@/cms/projects"
import projectsPage from "@/cms/projects-page.json"

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
			<Seo route="/projects" seoBlock={projectsPage.seo} />
			{/* Hero */}
			<section className="relative py-24 md:py-32 overflow-hidden">
				<div className="absolute inset-0 bg-secondary" />
				<div
					className="absolute inset-0 opacity-20 bg-cover bg-center"
					style={{ backgroundImage: `url('${projectsPage.hero.image}')` }}
				/>
				<div className="container relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
							{projectsPage.hero.eyebrow}{" "}
							<span className="text-primary">{projectsPage.hero.titleAccent}</span>
						</h1>
						<p className="mt-4 text-lg text-primary-foreground/60 max-w-xl">
							{projectsPage.hero.description}
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
								{market === "All" ? projectsPage.filters.marketAllLabel : market}
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
								{cat === "All" ? projectsPage.filters.categoryAllLabel : cat}
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
											{projectsPage.card.ctaLabel} <ArrowRight className="w-3 h-3" />
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

								{/* Video */}
								{selectedProject.videoUrl && (
									<div className="mb-8 aspect-video rounded-lg overflow-hidden bg-muted">
										<iframe
											src={selectedProject.videoUrl}
											title={`${selectedProject.title} video`}
											className="w-full h-full"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen
											loading="lazy"
										/>
									</div>
								)}

								{/* Gallery */}
								{selectedProject.gallery.length > 0 && (
									<div>
										<h4 className="font-display uppercase text-sm tracking-wider mb-4">
											{projectsPage.modal.galleryHeading}
										</h4>
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
