import { useState } from "react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { motion } from "framer-motion"
import { Phone, MapPin, Clock, Mail, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { locations, useLocationContext } from "@/context/location-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { allServices } from "@/data/services"
import contactData from "@/cms/contact-page.json"

// ---------------------------------------------------------------------------
// Form schema + state
// ---------------------------------------------------------------------------

const contactSchema = z.object({
	firstName: z.string().trim().min(1, "First name is required").max(60),
	lastName: z.string().trim().min(1, "Last name is required").max(60),
	phone: z.string().trim().min(7, "Valid phone required").max(20),
	email: z.string().trim().email("Invalid email").max(160),
	propertyType: z.enum(["residential", "commercial"], {
		errorMap: () => ({ message: "Select property type" })
	}),
	service: z.string().trim().min(1, "Select a service"),
	message: z.string().trim().min(1, "Message is required").max(1000),
	financing: z.boolean().optional()
})

type ContactFormState = {
	firstName: string
	lastName: string
	phone: string
	email: string
	propertyType: "residential" | "commercial" | ""
	service: string
	message: string
	financing: boolean
}

const initialForm: ContactFormState = {
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	propertyType: "",
	service: "",
	message: "",
	financing: false
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

const Contact = () => {
	const { selected, setSelected } = useLocationContext()
	const { toast } = useToast()
	const [form, setForm] = useState<ContactFormState>(initialForm)
	const [submitting, setSubmitting] = useState(false)

	const update = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) =>
		setForm((f) => ({ ...f, [key]: value }))

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const result = contactSchema.safeParse(form)
		if (!result.success) {
			toast({
				title: contactData.form.errorTitle,
				description: result.error.errors[0]?.message ?? contactData.form.errorBody,
				variant: "destructive"
			})
			return
		}
		setSubmitting(true)
		// Placeholder submit — replace with backend wiring later.
		setTimeout(() => {
			setSubmitting(false)
			setForm(initialForm)
			toast({
				title: contactData.form.successTitle,
				description: contactData.form.successBody
			})
		}, 600)
	}

	const { form: f } = contactData

	return (
		<Layout>
			<Seo route="/contact" seoBlock={contactData.seo} />

			{/* HERO */}
			<section className="relative h-[40vh] min-h-[320px] flex items-center overflow-hidden">
				<img
					src={contactData.hero.image}
					alt={contactData.hero.imageAlt}
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/40" />
				<div className="container relative z-10">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4"
					>
						{contactData.hero.eyebrow}
					</motion.p>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
					>
						{contactData.hero.title}{" "}
						<span className="text-primary">{contactData.hero.titleAccent}</span>
					</motion.h1>
				</div>
			</section>

			{/* LOCATIONS */}
			<section className="py-16 md:py-24">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
						{locations.map((loc, i) => {
							const isActive = selected.id === loc.id
							return (
								<motion.div
									key={loc.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: i * 0.1 }}
									className={`group relative border-2 p-8 md:p-10 transition-all ${
										isActive ?
											"border-primary bg-card shadow-2xl"
										:	"border-border bg-card/50 hover:border-primary/50"
									}`}
								>
									{isActive && (
										<span className="absolute top-4 right-4 text-[10px] font-display uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-sm">
											{contactData.locations.selectedBadge}
										</span>
									)}
									<div className="flex items-center gap-3 mb-6">
										<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
											<MapPin className="w-5 h-5 text-primary" />
										</div>
										<h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-foreground">
											{loc.label}
										</h2>
									</div>

									<div className="space-y-4 mb-8">
										<div className="flex items-start gap-3 text-muted-foreground">
											<MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
											<span>{loc.address}</span>
										</div>
										<a
											href={loc.phone}
											className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
										>
											<Phone className="w-4 h-4 text-primary flex-shrink-0" />
											<span className="font-display text-xl tracking-tight">
												{loc.phoneDisplay}
											</span>
										</a>
										<div className="flex items-start gap-3 text-muted-foreground text-sm">
											<Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
											<span>{contactData.locations.hoursLabel}</span>
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-3">
										<a
											href={loc.phone}
											className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
										>
											<Phone className="w-4 h-4" />
											{contactData.locations.callLabelPrefix} {loc.short}
										</a>
										{!isActive && (
											<button
												onClick={() => setSelected(loc)}
												className="flex-1 inline-flex items-center justify-center gap-2 border border-border px-5 py-3 font-display uppercase text-sm tracking-wider hover:border-primary hover:text-primary transition-colors rounded-sm"
											>
												{contactData.locations.setLocationLabel}
											</button>
										)}
									</div>
								</motion.div>
							)
						})}
					</div>
				</div>
			</section>

			{/* INQUIRY FORM */}
			<section className="py-16 md:py-24 bg-muted/30">
				<div className="container">
					<div className="max-w-3xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="text-center mb-10"
						>
							<p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-3">
								{f.eyebrow}
							</p>
							<h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground">
								{f.heading} <span className="text-primary">{f.headingAccent}</span>
							</h2>
							<p className="mt-4 text-muted-foreground">{f.description}</p>
						</motion.div>

						<motion.form
							onSubmit={handleSubmit}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="bg-card border-2 border-border p-6 md:p-10 space-y-6 shadow-xl"
						>
							{/* Name + contact fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div>
									<label className="block font-display uppercase text-xs tracking-widest text-foreground mb-2">
										{f.firstName.label}
									</label>
									<Input
										value={form.firstName}
										onChange={(e) => update("firstName", e.target.value)}
										maxLength={60}
										required
									/>
								</div>
								<div>
									<label className="block font-display uppercase text-xs tracking-widest text-foreground mb-2">
										{f.lastName.label}
									</label>
									<Input
										value={form.lastName}
										onChange={(e) => update("lastName", e.target.value)}
										maxLength={60}
										required
									/>
								</div>
								<div>
									<label className="block font-display uppercase text-xs tracking-widest text-foreground mb-2">
										{f.phone.label}
									</label>
									<Input
										type="tel"
										value={form.phone}
										onChange={(e) => update("phone", e.target.value)}
										maxLength={20}
										required
									/>
								</div>
								<div>
									<label className="block font-display uppercase text-xs tracking-widest text-foreground mb-2">
										{f.email.label}
									</label>
									<Input
										type="email"
										value={form.email}
										onChange={(e) => update("email", e.target.value)}
										maxLength={160}
										required
									/>
								</div>
							</div>

							{/* Property type */}
							<div>
								<label className="block font-display uppercase text-xs tracking-widest text-foreground mb-3">
									{f.propertyType.label}
								</label>
								<div className="grid grid-cols-2 gap-3">
									{f.propertyType.options.map((opt) => {
										const active = form.propertyType === opt.value
										return (
											<button
												type="button"
												key={opt.value}
												onClick={() =>
													update("propertyType", opt.value as "residential" | "commercial")
												}
												className={`px-5 py-3 font-display uppercase text-sm tracking-wider border-2 transition-colors rounded-sm ${
													active ?
														"border-primary bg-primary text-primary-foreground"
													:	"border-border bg-background hover:border-primary/60"
												}`}
											>
												{opt.label}
											</button>
										)
									})}
								</div>
							</div>

							{/* Service select */}
							<div>
								<label
									htmlFor="contact-service"
									className="block font-display uppercase text-xs tracking-widest text-foreground mb-2"
								>
									{f.service.label}
								</label>
								<select
									id="contact-service"
									value={form.service}
									onChange={(e) => update("service", e.target.value)}
									required
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								>
									<option value="">{f.service.placeholder}</option>
									{allServices.map((s) => (
										<option key={s.title} value={s.title}>
											{s.title}
										</option>
									))}
									<option value={f.service.fallbackLabel}>{f.service.fallbackLabel}</option>
								</select>
							</div>

							{/* Message */}
							<div>
								<label className="block font-display uppercase text-xs tracking-widest text-foreground mb-2">
									{f.message.label}
								</label>
								<Textarea
									value={form.message}
									onChange={(e) => update("message", e.target.value)}
									maxLength={1000}
									rows={5}
									placeholder={f.message.placeholder}
									required
								/>
							</div>

							{/* Financing opt-in */}
							<div className="flex items-start gap-3 border-t border-border pt-5">
								<Checkbox
									id="contact-financing"
									checked={form.financing}
									onCheckedChange={(v) => update("financing", v === true)}
									className="mt-1"
								/>
								<label
									htmlFor="contact-financing"
									className="text-sm text-foreground leading-relaxed cursor-pointer"
								>
									<span className="font-display uppercase tracking-wider text-xs block mb-1">
										{f.financing.heading}
									</span>
									{f.financing.label}
								</label>
							</div>

							<button
								type="submit"
								disabled={submitting}
								className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm disabled:opacity-60"
							>
								<Send className="w-4 h-4" />
								{submitting ? f.submittingLabel : f.submitLabel}
							</button>
						</motion.form>
					</div>
				</div>
			</section>

			{/* CAREERS CTA */}
			<section className="section-dark py-16 md:py-20">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center max-w-2xl mx-auto"
					>
						<Mail className="w-10 h-10 text-primary mx-auto mb-4" />
						<h3 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-primary-foreground mb-4">
							{contactData.careersCta.heading}{" "}
							<span className="text-primary">{contactData.careersCta.headingAccent}</span>
						</h3>
						<p className="text-primary-foreground/70 mb-8">{contactData.careersCta.body}</p>
						<Link
							to={contactData.careersCta.ctaPath}
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
						>
							{contactData.careersCta.ctaLabel}
						</Link>
					</motion.div>
				</div>
			</section>
		</Layout>
	)
}

export default Contact
