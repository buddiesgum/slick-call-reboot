import { useState, useRef } from "react"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { motion } from "framer-motion"
import { Briefcase, Hammer, HardHat, Wrench, Upload, Check, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
	careerSchema,
	type CareerFormState,
	initialCareerForm,
	validateResumeFile
} from "@/lib/schemas/career"
import careersData from "@/cms/careers-page.json"
import { usePostHog } from "@posthog/react"

const iconMap: Record<string, LucideIcon> = {
	Wrench,
	HardHat,
	Hammer,
	Briefcase
}

const Careers = () => {
	const { toast } = useToast()
	const posthog = usePostHog()
	const [submitting, setSubmitting] = useState(false)
	const [file, setFile] = useState<File | null>(null)
	const [form, setForm] = useState<CareerFormState>(initialCareerForm)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const update = <K extends keyof CareerFormState>(key: K, value: CareerFormState[K]) =>
		setForm((f) => ({ ...f, [key]: value }))

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Validate text fields
		const result = careerSchema.safeParse(form)
		if (!result.success) {
			toast({
				title: careersData.application.errorTitle,
				description: result.error.errors[0]?.message ?? careersData.application.errorBody,
				variant: "destructive"
			})
			return
		}

		// Validate the file if one was selected
		if (file) {
			const fileError = validateResumeFile(file)
			if (fileError) {
				const description =
					fileError === "size" ?
						careersData.application.fileTooLargeError
					:	careersData.application.fileTypeError
				toast({ title: careersData.application.errorTitle, description, variant: "destructive" })
				return
			}
		}

		setSubmitting(true)
		try {
			const fd = new FormData()
			fd.append("firstName", result.data.firstName)
			fd.append("lastName", result.data.lastName)
			fd.append("email", result.data.email)
			fd.append("message", result.data.message)
			fd.append("updates", result.data.updates ? "true" : "false")
			if (file) fd.append("resume", file)

			// No Content-Type header — browser sets multipart boundary automatically
			const res = await fetch("/api/career", {
				method: "POST",
				headers: {
					"X-POSTHOG-DISTINCT-ID": posthog?.get_distinct_id() ?? "",
					"X-POSTHOG-SESSION-ID": posthog?.get_session_id() ?? ""
				},
				body: fd
			})
			if (!res.ok) throw new Error(`HTTP ${res.status}`)

			setForm(initialCareerForm)
			setFile(null)
			if (fileInputRef.current) fileInputRef.current.value = ""
			posthog?.capture("career_application_submitted", { resume_attached: !!file })
			toast({
				title: careersData.application.successTitle,
				description: careersData.application.successBody
			})
		} catch (err) {
			posthog?.captureException(err)
			posthog?.capture("career_application_error")
			toast({
				title: careersData.application.errorTitle,
				description: careersData.application.errorBody,
				variant: "destructive"
			})
		} finally {
			setSubmitting(false)
		}
	}

	const fileName = file?.name ?? ""

	return (
		<Layout>
			<Seo route="/careers" seoBlock={careersData.seo} />
			{/* HERO */}
			<section className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
				<img
					src={careersData.hero.image}
					alt={careersData.hero.imageAlt}
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
						{careersData.hero.eyebrow}
					</motion.p>
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
					>
						{careersData.hero.title}{" "}
						<span className="text-primary">{careersData.hero.titleAccent}</span>{" "}
						{careersData.hero.titleSuffix}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.25 }}
						className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
					>
						{careersData.hero.description}
					</motion.p>
				</div>
			</section>

			{/* TRADES */}
			<section className="py-16 md:py-20">
				<div className="container">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
						{careersData.trades.items.map((trade, i) => {
							const Icon = iconMap[trade.icon] ?? Briefcase
							return (
								<motion.button
									type="button"
									key={trade.label}
									onClick={() => {
										posthog?.capture("career_trade_clicked", { trade: trade.label })
										document
											.getElementById("application")
											?.scrollIntoView({ behavior: "smooth", block: "start" })
									}}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: i * 0.08 }}
									className="group flex flex-col items-center text-center p-6 border border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
									aria-label={`Apply for ${trade.label} — jump to application form`}
								>
									<Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
									<span className="font-display uppercase tracking-wider text-sm text-foreground">
										{trade.label}
									</span>
								</motion.button>
							)
						})}
					</div>
				</div>
			</section>

			{/* APPLICATION FORM */}
			<section id="application" className="section-dark py-20 md:py-28 scroll-mt-24">
				<div className="container max-w-3xl">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="mb-10"
					>
						<span className="font-display uppercase tracking-[0.25em] text-sm text-primary">
							{careersData.application.eyebrow}
						</span>
						<h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-primary-foreground mt-2">
							{careersData.application.heading}
						</h2>
					</motion.div>

					<motion.form
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						onSubmit={handleSubmit}
						noValidate
						className="space-y-6 bg-background/5 backdrop-blur-sm border border-primary-foreground/10 p-6 md:p-10"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="firstName"
									className="text-primary-foreground/80 uppercase text-xs tracking-wider"
								>
									{careersData.application.firstName.label}
									{careersData.application.firstName.required && (
										<span className="text-primary ml-0.5" aria-hidden="true">
											*
										</span>
									)}
								</Label>
								<Input
									id="firstName"
									required={careersData.application.firstName.required}
									value={form.firstName}
									onChange={(e) => update("firstName", e.target.value)}
									className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
								/>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="lastName"
									className="text-primary-foreground/80 uppercase text-xs tracking-wider"
								>
									{careersData.application.lastName.label}
									{careersData.application.lastName.required && (
										<span className="text-primary ml-0.5" aria-hidden="true">
											*
										</span>
									)}
								</Label>
								<Input
									id="lastName"
									required={careersData.application.lastName.required}
									value={form.lastName}
									onChange={(e) => update("lastName", e.target.value)}
									className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="email"
								className="text-primary-foreground/80 uppercase text-xs tracking-wider"
							>
								{careersData.application.email.label}
								{careersData.application.email.required && (
									<span className="text-primary ml-0.5" aria-hidden="true">
										*
									</span>
								)}
							</Label>
							<Input
								id="email"
								type="email"
								required={careersData.application.email.required}
								value={form.email}
								onChange={(e) => update("email", e.target.value)}
								className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="message"
								className="text-primary-foreground/80 uppercase text-xs tracking-wider"
							>
								{careersData.application.message.label}
								{careersData.application.message.required && (
									<span className="text-primary ml-0.5" aria-hidden="true">
										*
									</span>
								)}
							</Label>
							<Textarea
								id="message"
								rows={5}
								required={careersData.application.message.required}
								placeholder={careersData.application.messagePlaceholder}
								value={form.message}
								onChange={(e) => update("message", e.target.value)}
								className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 resize-none"
							/>
						</div>

						<div className="space-y-2">
							<Label className="text-primary-foreground/80 uppercase text-xs tracking-wider">
								{careersData.application.resumeLabel}
							</Label>
							<label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-primary-foreground/20 hover:border-primary cursor-pointer transition-colors">
								{fileName ?
									<>
										<Check className="w-5 h-5 text-primary" />
										<span className="text-sm text-primary-foreground/90">{fileName}</span>
									</>
								:	<>
										<Upload className="w-5 h-5 text-primary-foreground/60" />
										<span className="text-sm text-primary-foreground/60">
											{careersData.application.resumeUploadHint}
										</span>
									</>
								}
								<input
									ref={fileInputRef}
									type="file"
									accept=".pdf,.doc,.docx"
									className="hidden"
									disabled={submitting}
									onChange={(e) => setFile(e.target.files?.[0] ?? null)}
								/>
							</label>
						</div>

						<div className="flex items-start gap-2">
							<Checkbox
								id="updates"
								checked={form.updates}
								onCheckedChange={(v) => update("updates", v === true)}
								className="mt-0.5 border-primary-foreground/40"
							/>
							<Label
								htmlFor="updates"
								className="text-sm text-primary-foreground/70 cursor-pointer leading-relaxed"
							>
								{careersData.application.updatesLabel}
							</Label>
						</div>

						<Button
							type="submit"
							disabled={submitting}
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display uppercase tracking-wider py-6"
						>
							{submitting ?
								careersData.application.submittingLabel
							:	careersData.application.submitLabel}
						</Button>
					</motion.form>
				</div>
			</section>
		</Layout>
	)
}

export default Careers
