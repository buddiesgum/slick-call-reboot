<script lang="ts">
	import { Phone, MapPin, Clock, Mail, Send } from "@lucide/svelte"
	import { toast } from "svelte-sonner"
	import Seo from "$lib/components/Seo.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { Checkbox } from "$lib/components/ui/checkbox"
	import { locations, getLocationContext } from "$lib/location/location.svelte"
	import { contactSchema } from "$lib/schemas/contact"
	import { allServices } from "$lib/services/services"
	import contactData from "$lib/cms/contact-page.json"
	import { posthog } from "$lib/posthog"
	import { submitContact } from "./contact.remote"

	const location = getLocationContext()
	const { form: f } = contactData

	const contactForm = submitContact.preflight(contactSchema)

	// bits-ui's Checkbox is not a native input, so mirror its checked state
	// locally and submit it through the hidden input via the field's name.
	let financing = $state(false)
	const financingName = contactForm.fields.financing.as("checkbox").name

	const inputClass =
		"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
</script>

<Seo route="/contact" seoBlock={contactData.seo} />

<!-- HERO -->
<section class="relative h-[40vh] min-h-[320px] flex items-center overflow-hidden">
	<img
		src={contactData.hero.image}
		alt={contactData.hero.imageAlt}
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
			{contactData.hero.eyebrow}
		</p>
		<h1
			{@attach reveal({ delay: 0.1, y: 30 })}
			class="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
		>
			{contactData.hero.title}
			<span class="text-primary">{contactData.hero.titleAccent}</span>
		</h1>
	</div>
</section>

<!-- LOCATIONS -->
<section class="py-16 md:py-24">
	<div class="container">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
			{#each locations as loc, i (loc.id)}
				{const isActive = $derived(location.selected.id === loc.id)}
				<div
					{@attach reveal({ delay: i * 0.1, y: 30 })}
					class={`group relative border-2 p-8 md:p-10 transition-all ${
						isActive ?
							"border-primary bg-card shadow-2xl"
						:	"border-border bg-card/50 hover:border-primary/50"
					}`}
				>
					{#if isActive}
						<span
							class="absolute top-4 right-4 text-[10px] font-display uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-sm"
						>
							{contactData.locations.selectedBadge}
						</span>
					{/if}
					<div class="flex items-center gap-3 mb-6">
						<div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<MapPin class="w-5 h-5 text-primary" />
						</div>
						<h2 class="text-2xl md:text-3xl font-display uppercase tracking-tight text-foreground">
							{loc.label}
						</h2>
					</div>

					<div class="space-y-4 mb-8">
						<div class="flex items-start gap-3 text-muted-foreground">
							<MapPin class="w-4 h-4 mt-1 text-primary flex-shrink-0" />
							<span>{loc.address}</span>
						</div>
						<a
							href={loc.phone}
							onclick={() =>
								posthog.capture("contact_phone_clicked", {
									location: loc.label,
									source: "info_link"
								})}
							class="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
						>
							<Phone class="w-4 h-4 text-primary flex-shrink-0" />
							<span class="font-display text-xl tracking-tight">
								{loc.phoneDisplay}
							</span>
						</a>
						<div class="flex items-start gap-3 text-muted-foreground text-sm">
							<Clock class="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
							<span>{contactData.locations.hoursLabel}</span>
						</div>
					</div>

					<div class="flex flex-col sm:flex-row gap-3">
						<a
							href={loc.phone}
							onclick={() =>
								posthog.capture("contact_phone_clicked", {
									location: loc.label,
									source: "call_button"
								})}
							class="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
						>
							<Phone class="w-4 h-4" />
							{contactData.locations.callLabelPrefix}
							{loc.short}
						</a>
						{#if !isActive}
							<button
								onclick={() => {
									location.setLocation(loc)
									posthog.capture("contact_location_selected", {
										location: loc.label
									})
								}}
								class="flex-1 inline-flex items-center justify-center gap-2 border border-border px-5 py-3 font-display uppercase text-sm tracking-wider hover:border-primary hover:text-primary transition-colors rounded-sm"
							>
								{contactData.locations.setLocationLabel}
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- INQUIRY FORM -->
<section class="py-16 md:py-24 bg-muted/30">
	<div class="container">
		<div class="max-w-3xl mx-auto">
			<div {@attach reveal({ y: 20 })} class="text-center mb-10">
				<p class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-3">
					{f.eyebrow}
				</p>
				<h2 class="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground">
					{f.heading} <span class="text-primary">{f.headingAccent}</span>
				</h2>
				<p class="mt-4 text-muted-foreground">{f.description}</p>
			</div>

			<form
				{...contactForm.enhance(async form => {
					try {
						if (await form.submit()) {
							form.element.reset()
							financing = false
							posthog.capture("contact_form_submitted")
							toast.success(f.successTitle, { description: f.successBody })
						} else {
							toast.error(f.errorTitle, {
								description: form.fields.allIssues()?.[0]?.message ?? f.errorBody
							})
						}
					} catch (err) {
						posthog.captureException(err)
						posthog.capture("contact_form_error")
						toast.error(f.errorTitle, { description: f.errorBody })
					}
				})}
				novalidate
				{@attach reveal({ delay: 0.1, y: 30 })}
				class="bg-card border-2 border-border p-6 md:p-10 space-y-6 shadow-xl"
			>
				<!-- Name + contact fields -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div>
						<label
							class="block font-display uppercase text-xs tracking-widest text-foreground mb-2"
						>
							{f.firstName.label}
							<input
								{...contactForm.fields.firstName.as("text")}
								maxlength={60}
								required
								class={`${inputClass} mt-2 normal-case tracking-normal font-body`}
							/>
						</label>
						{#each contactForm.fields.firstName.issues() ?? [] as issue (issue.message)}
							<p class="mt-1 text-sm text-destructive">{issue.message}</p>
						{/each}
					</div>
					<div>
						<label
							class="block font-display uppercase text-xs tracking-widest text-foreground mb-2"
						>
							{f.lastName.label}
							<input
								{...contactForm.fields.lastName.as("text")}
								maxlength={60}
								required
								class={`${inputClass} mt-2 normal-case tracking-normal font-body`}
							/>
						</label>
						{#each contactForm.fields.lastName.issues() ?? [] as issue (issue.message)}
							<p class="mt-1 text-sm text-destructive">{issue.message}</p>
						{/each}
					</div>
					<div>
						<label
							class="block font-display uppercase text-xs tracking-widest text-foreground mb-2"
						>
							{f.phone.label}
							<input
								{...contactForm.fields.phone.as("tel")}
								maxlength={20}
								required
								class={`${inputClass} mt-2 normal-case tracking-normal font-body`}
							/>
						</label>
						{#each contactForm.fields.phone.issues() ?? [] as issue (issue.message)}
							<p class="mt-1 text-sm text-destructive">{issue.message}</p>
						{/each}
					</div>
					<div>
						<label
							class="block font-display uppercase text-xs tracking-widest text-foreground mb-2"
						>
							{f.email.label}
							<input
								{...contactForm.fields.email.as("email")}
								maxlength={160}
								required
								class={`${inputClass} mt-2 normal-case tracking-normal font-body`}
							/>
						</label>
						{#each contactForm.fields.email.issues() ?? [] as issue (issue.message)}
							<p class="mt-1 text-sm text-destructive">{issue.message}</p>
						{/each}
					</div>
				</div>

				<!-- Property type -->
				<div>
					<span class="block font-display uppercase text-xs tracking-widest text-foreground mb-3">
						{f.propertyType.label}
					</span>
					<div class="grid grid-cols-2 gap-3">
						{#each f.propertyType.options as opt (opt.value)}
							{const active = $derived(contactForm.fields.propertyType.value() === opt.value)}
							<label
								class={`px-5 py-3 font-display uppercase text-sm tracking-wider border-2 transition-colors rounded-sm text-center cursor-pointer ${
									active ?
										"border-primary bg-primary text-primary-foreground"
									:	"border-border bg-background hover:border-primary/60"
								}`}
							>
								<input
									{...contactForm.fields.propertyType.as("radio", opt.value)}
									class="sr-only"
								/>
								{opt.label}
							</label>
						{/each}
					</div>
					{#each contactForm.fields.propertyType.issues() ?? [] as issue (issue.message)}
						<p class="mt-1 text-sm text-destructive">{issue.message}</p>
					{/each}
				</div>

				<!-- Service select -->
				<div>
					<label
						for="contact-service"
						class="block font-display uppercase text-xs tracking-widest text-foreground mb-2"
					>
						{f.service.label}
					</label>
					<select
						{...contactForm.fields.service.as("select")}
						id="contact-service"
						required
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						<option value="">{f.service.placeholder}</option>
						{#each allServices as s (s.title)}
							<option value={s.title}>{s.title}</option>
						{/each}
						<option value={f.service.fallbackLabel}>{f.service.fallbackLabel}</option>
					</select>
					{#each contactForm.fields.service.issues() ?? [] as issue (issue.message)}
						<p class="mt-1 text-sm text-destructive">{issue.message}</p>
					{/each}
				</div>

				<!-- Message -->
				<div>
					<label
						for="contact-message"
						class="block font-display uppercase text-xs tracking-widest text-foreground mb-2"
					>
						{f.message.label}
					</label>
					<textarea
						{...contactForm.fields.message.as("text")}
						id="contact-message"
						maxlength={1000}
						rows={5}
						placeholder={f.message.placeholder}
						required
						class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					></textarea>
					{#each contactForm.fields.message.issues() ?? [] as issue (issue.message)}
						<p class="mt-1 text-sm text-destructive">{issue.message}</p>
					{/each}
				</div>

				<!-- Financing opt-in -->
				<div class="flex items-start gap-3 border-t border-border pt-5">
					<Checkbox
						id="contact-financing"
						name={financingName}
						value="on"
						bind:checked={financing}
						class="mt-1"
					/>
					<label
						for="contact-financing"
						class="text-sm text-foreground leading-relaxed cursor-pointer"
					>
						<span class="font-display uppercase tracking-wider text-xs block mb-1">
							{f.financing.heading}
						</span>
						{f.financing.label}
					</label>
				</div>

				<button
					type="submit"
					disabled={!!contactForm.pending}
					class="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm disabled:opacity-60"
				>
					<Send class="w-4 h-4" />
					{contactForm.pending ? f.submittingLabel : f.submitLabel}
				</button>
			</form>
		</div>
	</div>
</section>

<!-- CAREERS CTA -->
<section class="section-dark py-16 md:py-20">
	<div class="container">
		<div {@attach reveal({ y: 20 })} class="text-center max-w-2xl mx-auto">
			<Mail class="w-10 h-10 text-primary mx-auto mb-4" />
			<h3
				class="text-3xl md:text-4xl font-display uppercase tracking-tight text-primary-foreground mb-4"
			>
				{contactData.careersCta.heading}
				<span class="text-primary">{contactData.careersCta.headingAccent}</span>
			</h3>
			<p class="text-primary-foreground/70 mb-8">{contactData.careersCta.body}</p>
			<a
				href={contactData.careersCta.ctaPath}
				class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
			>
				{contactData.careersCta.ctaLabel}
			</a>
		</div>
	</div>
</section>
