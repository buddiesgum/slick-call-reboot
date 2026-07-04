<script lang="ts">
	import { Upload, Check } from "@lucide/svelte"
	import { toast } from "svelte-sonner"
	import Seo from "$lib/components/Seo.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { getIcon } from "$lib/icons"
	import { Button } from "$lib/components/ui/button"
	import { Input } from "$lib/components/ui/input"
	import { Textarea } from "$lib/components/ui/textarea"
	import { Label } from "$lib/components/ui/label"
	import { Checkbox } from "$lib/components/ui/checkbox"
	import { careerSchema, validateResumeFile, RESUME_ERROR_MESSAGES } from "$lib/schemas/career"
	import careersData from "$lib/cms/careers-page.json"
	import { posthog } from "$lib/posthog"
	import { submitApplication } from "./career.remote"

	const app = careersData.application

	const careerForm = submitApplication.preflight(careerSchema)

	// bits-ui's Checkbox is not a native input, so mirror its checked state
	// locally and submit it through the hidden input via the field's name.
	let updates = $state(false)
	const updatesName = careerForm.fields.updates.as("checkbox").name

	let fileName = $state("")

	function onResumeChange(e: Event) {
		const input = e.currentTarget as HTMLInputElement
		const file = input.files?.[0] ?? null
		if (!file) {
			fileName = ""
			return
		}
		const fileError = validateResumeFile(file)
		if (fileError) {
			const description =
				fileError === "size" ? app.fileTooLargeError
				: fileError === "empty" ? RESUME_ERROR_MESSAGES.empty
				: app.fileTypeError
			toast.error(app.errorTitle, { description })
			input.value = ""
			fileName = ""
			return
		}
		fileName = file.name
	}
</script>

<Seo route="/careers" seoBlock={careersData.seo} />

<!-- HERO -->
<section class="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
	<img
		src={careersData.hero.image}
		alt={careersData.hero.imageAlt}
		class="absolute inset-0 w-full h-full object-cover"
	/>
	<div
		class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/40"
	></div>
	<div class="container relative z-10">
		<p
			{@attach reveal({ y: 20 })}
			class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4"
		>
			{careersData.hero.eyebrow}
		</p>
		<h1
			{@attach reveal({ delay: 0.1, y: 30 })}
			class="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
		>
			{careersData.hero.title}
			<span class="text-primary">{careersData.hero.titleAccent}</span>
			{careersData.hero.titleSuffix}
		</h1>
		<p
			{@attach reveal({ delay: 0.25, y: 20 })}
			class="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
		>
			{careersData.hero.description}
		</p>
	</div>
</section>

<!-- TRADES -->
<section class="py-16 md:py-20">
	<div class="container">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
			{#each careersData.trades.items as trade, i (trade.label)}
				{const TradeIcon = getIcon(trade.icon)}
				<button
					type="button"
					onclick={() => {
						posthog.capture("career_trade_clicked", { trade: trade.label })
						document
							.getElementById("application")
							?.scrollIntoView({ behavior: "smooth", block: "start" })
					}}
					{@attach reveal({ delay: i * 0.08, y: 20 })}
					class="group flex flex-col items-center text-center p-6 border border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
					aria-label={`Apply for ${trade.label} — jump to application form`}
				>
					<TradeIcon class="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
					<span class="font-display uppercase tracking-wider text-sm text-foreground">
						{trade.label}
					</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- APPLICATION FORM -->
<section id="application" class="section-dark py-20 md:py-28 scroll-mt-24">
	<div class="container max-w-3xl">
		<div {@attach reveal({ y: 30 })} class="mb-10">
			<span class="font-display uppercase tracking-[0.25em] text-sm text-primary">
				{app.eyebrow}
			</span>
			<h2
				class="text-3xl md:text-4xl font-display uppercase tracking-tight text-primary-foreground mt-2"
			>
				{app.heading}
			</h2>
		</div>

		<form
			{...careerForm.enhance(async form => {
				try {
					if (await form.submit()) {
						const resumeAttached = fileName !== ""
						form.element.reset()
						updates = false
						fileName = ""
						posthog.capture("career_application_submitted", { resume_attached: resumeAttached })
						toast.success(app.successTitle, { description: app.successBody })
					} else {
						const issues = form.fields.allIssues()
						console.log("[issues]", { issues })
						toast.error(app.errorTitle, {
							description: issues?.[0]?.message ?? app.errorBody
						})
					}
				} catch (err) {
					posthog.captureException(err)
					posthog.capture("career_application_error")
					toast.error(app.errorTitle, { description: app.errorBody })
				}
			})}
			enctype="multipart/form-data"
			novalidate
			{@attach reveal({ delay: 0.1, y: 20 })}
			class="space-y-6 bg-background/5 backdrop-blur-sm border border-primary-foreground/10 p-6 md:p-10"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label
						for="firstName"
						class="text-primary-foreground/80 uppercase text-xs tracking-wider"
					>
						{app.firstName.label}
						{#if app.firstName.required}
							<span class="text-primary ml-0.5" aria-hidden="true">*</span>
						{/if}
					</Label>
					<Input
						{...careerForm.fields.firstName.as("text")}
						id="firstName"
						required={app.firstName.required}
						class="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
					/>
					{#each careerForm.fields.firstName.issues() ?? [] as issue (issue.message)}
						<p class="text-sm text-destructive">{issue.message}</p>
					{/each}
				</div>
				<div class="space-y-2">
					<Label for="lastName" class="text-primary-foreground/80 uppercase text-xs tracking-wider">
						{app.lastName.label}
						{#if app.lastName.required}
							<span class="text-primary ml-0.5" aria-hidden="true">*</span>
						{/if}
					</Label>
					<Input
						{...careerForm.fields.lastName.as("text")}
						id="lastName"
						required={app.lastName.required}
						class="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
					/>
					{#each careerForm.fields.lastName.issues() ?? [] as issue (issue.message)}
						<p class="text-sm text-destructive">{issue.message}</p>
					{/each}
				</div>
			</div>

			<div class="space-y-2">
				<Label for="email" class="text-primary-foreground/80 uppercase text-xs tracking-wider">
					{app.email.label}
					{#if app.email.required}
						<span class="text-primary ml-0.5" aria-hidden="true">*</span>
					{/if}
				</Label>
				<Input
					{...careerForm.fields.email.as("email")}
					id="email"
					required={app.email.required}
					class="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
				/>
				{#each careerForm.fields.email.issues() ?? [] as issue (issue.message)}
					<p class="text-sm text-destructive">{issue.message}</p>
				{/each}
			</div>

			<div class="space-y-2">
				<Label for="message" class="text-primary-foreground/80 uppercase text-xs tracking-wider">
					{app.message.label}
					{#if app.message.required}
						<span class="text-primary ml-0.5" aria-hidden="true">*</span>
					{/if}
				</Label>
				<Textarea
					{...careerForm.fields.message.as("text")}
					id="message"
					rows={5}
					required={app.message.required}
					placeholder={careersData.application.messagePlaceholder}
					class="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 resize-none"
				/>
				{#each careerForm.fields.message.issues() ?? [] as issue (issue.message)}
					<p class="text-sm text-destructive">{issue.message}</p>
				{/each}
			</div>

			<div class="space-y-2">
				<span
					class="text-primary-foreground/80 uppercase text-xs tracking-wider text-sm font-medium leading-none"
				>
					{app.resumeLabel}
				</span>
				<label
					class="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-primary-foreground/20 hover:border-primary cursor-pointer transition-colors"
				>
					{#if fileName}
						<Check class="w-5 h-5 text-primary" />
						<span class="text-sm text-primary-foreground/90">{fileName}</span>
					{:else}
						<Upload class="w-5 h-5 text-primary-foreground/60" />
						<span class="text-sm text-primary-foreground/60">
							{app.resumeUploadHint}
						</span>
					{/if}
					<input
						{...careerForm.fields.resume.as("file")}
						accept=".pdf,.doc,.docx"
						class="hidden"
						disabled={!!careerForm.pending}
						onchange={onResumeChange}
					/>
				</label>
				{#each careerForm.fields.resume.issues() ?? [] as issue (issue.message)}
					<p class="text-sm text-destructive">{issue.message}</p>
				{/each}
			</div>

			<div class="flex items-start gap-2">
				<Checkbox
					id="updates"
					name={updatesName}
					value="on"
					bind:checked={updates}
					class="mt-0.5 border-primary-foreground/40"
				/>
				<Label
					for="updates"
					class="text-sm text-primary-foreground/70 cursor-pointer leading-relaxed"
				>
					{app.updatesLabel}
				</Label>
			</div>

			<Button
				type="submit"
				disabled={!!careerForm.pending}
				class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display uppercase tracking-wider py-6"
			>
				{careerForm.pending ? app.submittingLabel : app.submitLabel}
			</Button>
		</form>
	</div>
</section>
