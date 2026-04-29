import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Phone, ArrowRight, ShieldCheck, Clock, Wallet } from "lucide-react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { useLocationContext } from "@/context/location-context"
import data from "@/cms/financing-page.json"

/*
 * pulled almost directly from https://www.enhancify.com/paymentcalculatorwidget/
 */
function loadPaymentCalculatorWidget(container: HTMLElement, signal: AbortSignal): void {
	let xhr = new XMLHttpRequest()
	signal.addEventListener("abort", () => xhr.abort())
	let params =
		"&defaultScheme=" +
		encodeURIComponent(container.dataset.defaultscheme) +
		"&color1=" +
		encodeURIComponent(container.dataset.color1) +
		"&color2=" +
		encodeURIComponent(container.dataset.color2) +
		"&coBrandedColor=" +
		encodeURIComponent(container.dataset.cobrandedcolor) +
		"&page=" +
		encodeURIComponent(container.dataset.page) +
		"&border=" +
		encodeURIComponent(container.dataset.border) +
		"&hideLink=" +
		encodeURIComponent(container.dataset.hidelink)
	let s = document.createElement("script")
	s.type = "text/javascript"
	s.src = "https://www.enhancify.com/build/js/paymentcalculatorwidget.js"
	container.append(s)
	let style = document.createElement("style")
	style.innerText =
		"@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;700;900&display=swap');"
	container.append(style)
	s.onload = function () {
		if (signal.aborted) return
		xhr.open("GET", "https://www.enhancify.com?siteaction=paymentcalculatorwidget" + params)
		xhr.send()
		xhr.onload = function () {
			if (signal.aborted) return
			if (xhr.status == 200) {
				let script_tag = document.createElement("script")
				script_tag.type = "text/javascript"
				script_tag.text = xhr.response
				container.append(script_tag)
			}
		}
	}
}

// Map icon name strings from CMS to Lucide components
const iconMap: Record<string, React.ElementType> = {
	Wallet,
	Clock,
	ShieldCheck
}

const Financing = () => {
	const { selected: currentLocation } = useLocationContext()
	const widgetRef = useRef<HTMLDivElement>(null)
	const loadedRef = useRef(false)
	const { hero, benefits, calculator, cta } = data

	useEffect(() => {
		if (loadedRef.current) return
		const widgetEl = widgetRef.current
		if (!widgetEl) return
		loadedRef.current = true
		const controller = new AbortController()
		loadPaymentCalculatorWidget(widgetEl, controller.signal)
		return () => {
			controller.abort()
			// intentionally do not reset loadedRef.current — keeps StrictMode safe
		}
	}, [])

	return (
		<Layout>
			<Seo route="/financing" seoBlock={data.seo} />

			{/* HERO */}
			<section className="relative min-h-[55vh] flex items-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${hero.image})` }}
					role="img"
					aria-label={hero.imageAlt}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40" />
				<div className="container relative z-10 py-20">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-2xl"
					>
						<span className="inline-block text-primary font-display uppercase tracking-wider text-sm mb-4">
							{hero.eyebrow}
						</span>
						<h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
							{hero.title} <span className="text-primary">{hero.titleAccent}</span>
						</h1>
						<p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-lg">
							{hero.description}
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<a
								href={currentLocation.phone}
								className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
							>
								<Phone className="w-5 h-5" />
								{hero.primaryCta.label}
							</a>
							<Link
								to={hero.secondaryCta.path}
								className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
							>
								{hero.secondaryCta.label} <ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			{/* BENEFITS */}
			<section className="py-16 md:py-20 bg-background">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{benefits.items.map((b, i) => {
							const Icon = iconMap[b.icon] ?? Wallet
							return (
								<motion.div
									key={b.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: i * 0.08 }}
									className="border border-border bg-card p-8 rounded-sm"
								>
									<Icon className="w-8 h-8 text-primary mb-4" />
									<h3 className="font-display uppercase text-lg tracking-wider text-foreground mb-2">
										{b.title}
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">{b.copy}</p>
								</motion.div>
							)
						})}
					</div>
				</div>
			</section>

			{/* CALCULATOR WIDGET */}
			<section className="py-16 md:py-24 section-dark">
				<div className="container">
					<div className="max-w-3xl mx-auto text-center mb-10">
						<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight">
							{calculator.heading} <span className="text-primary">{calculator.headingAccent}</span>
						</h2>
						<p className="mt-4 text-primary-foreground/70">{calculator.description}</p>
					</div>
					<div className="max-w-3xl mx-auto bg-background rounded-sm p-4 md:p-6 shadow-xl">
						<div
							ref={widgetRef}
							id="paymentcalculatorwidget"
							data-defaultscheme="false"
							data-color1={calculator.color1}
							data-color2={calculator.color2}
							data-cobrandedcolor={calculator.coBrandedColor}
							data-border={String(calculator.border)}
							data-page={calculator.page}
							data-hidelink={calculator.hideLink}
						/>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-primary">
				<div className="container text-center">
					<h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4">
						{cta.heading}
					</h2>
					<p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">{cta.description}</p>
					<Link
						to={cta.path}
						className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
					>
						{cta.label} <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</section>
		</Layout>
	)
}

export default Financing
