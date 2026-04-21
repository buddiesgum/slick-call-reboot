import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { ServiceTile } from "@/data/services"

const ServiceImageGrid = ({ services }: { services: ServiceTile[] }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		{services.map((service, i) => (
			<motion.div
				key={service.title}
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4, delay: i * 0.06 }}
			>
				<Link
					to={service.path}
					className="group relative flex min-h-72 overflow-hidden border border-primary-foreground/10 hover:border-primary transition-all duration-300"
				>
					<img
						src={service.image}
						alt={`${service.title} services`}
						className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						loading="lazy"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/75 to-secondary/25" />
					<div className="relative z-10 flex h-full flex-col justify-end p-7">
						<service.icon className="w-10 h-10 text-primary mb-5 group-hover:scale-110 transition-transform" />
						<h3 className="text-2xl font-display uppercase tracking-tight mb-3 text-primary-foreground">
							{service.title}
						</h3>
						<p className="text-sm text-primary-foreground/75 leading-relaxed">{service.desc}</p>
					</div>
				</Link>
			</motion.div>
		))}
	</div>
)

export default ServiceImageGrid
