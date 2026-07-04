<script lang="ts">
	import { Phone, ArrowRight, Clock, MapPin } from "@lucide/svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { getLocationContext } from "$lib/location/location.svelte"
	import { posthog } from "$lib/posthog"
	import ctaData from "$lib/cms/service-cta.json"

	const location = getLocationContext()
</script>

<section class="section-dark py-20 md:py-28 relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20"></div>
	<div class="container relative z-10">
		<div class="max-w-3xl mx-auto text-center">
			<div {@attach reveal({ y: 20 })}>
				<Clock class="w-10 h-10 text-primary mx-auto mb-4" />
				<h2
					class="text-4xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4"
				>
					{ctaData.heading} <span class="text-primary">{ctaData.headingAccent}</span>
				</h2>
				<p class="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
					{ctaData.description}
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href={location.selected.phone}
						onclick={() => posthog.capture("emergency_phone_clicked")}
						class="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
					>
						<Phone class="w-4 h-4" />
						{ctaData.phoneCtaLabel}
						{location.selected.short}
					</a>
					<a
						href={ctaData.quotePath}
						onclick={() => posthog.capture("emergency_quote_clicked")}
						class="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:border-primary hover:text-primary transition-colors rounded-sm"
					>
						{ctaData.quoteCtaLabel}
						<ArrowRight class="w-4 h-4" />
					</a>
				</div>
				<div class="mt-6 flex items-center justify-center gap-2 text-sm text-primary-foreground/50">
					<MapPin class="w-4 h-4" />
					<span>
						{ctaData.locationPrefix}
						{location.selected.label}
					</span>
				</div>
			</div>
		</div>
	</div>
</section>
