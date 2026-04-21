import { motion } from "framer-motion"

interface ServiceHeroProps {
	title: string
	subtitle?: string
	image: string
}

const ServiceHero = ({ title, subtitle, image }: ServiceHeroProps) => (
	<section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
		<div
			className="absolute inset-0 bg-cover bg-center"
			style={{ backgroundImage: `url(${image})` }}
		/>
		<div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/50" />
		<div className="container relative z-10">
			<motion.h1
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground"
			>
				{title}
			</motion.h1>
			{subtitle && (
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-4 text-lg md:text-xl text-primary-foreground/70 max-w-2xl"
				>
					{subtitle}
				</motion.p>
			)}
		</div>
	</section>
)

export default ServiceHero
