<script lang="ts">
	import { Phone, MessageSquare, ArrowRight } from "@lucide/svelte"
	import Seo from "$lib/components/Seo.svelte"
	import ServiceImageGrid from "$lib/components/ServiceImageGrid.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { featuredServices } from "$lib/services/services"
	import { getLocationContext } from "$lib/location/location.svelte"
	import { posthog } from "$lib/posthog"
	import homeData from "$lib/cms/home-page.json"

	const location = getLocationContext()
</script>

<Seo route="/" seoBlock={homeData.seo} />

<!-- Hero -->
<section class="relative min-h-[85vh] flex items-center overflow-hidden">
	<div
		class="absolute inset-0 bg-cover bg-center"
		style={`background-image: url(${homeData.hero.image})`}
	></div>
	<div
		class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40"
	></div>
	<div class="container relative z-10 py-20">
		<div {@attach reveal({ y: 40 })} class="max-w-2xl">
			<h1
				class="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]"
			>
				{homeData.hero.title}
				<br />
				<span class="text-primary">{homeData.hero.titleAccent}</span>
			</h1>
			<p class="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-lg">
				{homeData.hero.description}
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href={location.selected.phone}
					onclick={() => posthog.capture("hero_phone_clicked")}
					class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
				>
					<Phone class="w-5 h-5" />
					{homeData.hero.primaryCtaLabel}
				</a>
				<a
					href={`sms:${location.selected.phone.replace("tel:", "")}`}
					onclick={() => posthog.capture("hero_sms_clicked")}
					class="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors rounded-sm"
				>
					<MessageSquare class="w-5 h-5" />
					{homeData.hero.textCtaLabel}
				</a>
				<a
					href={homeData.hero.secondaryCta.path}
					class="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
				>
					{homeData.hero.secondaryCta.label}
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Services Grid -->
<section class="py-20 md:py-28 bg-background">
	<div class="container">
		<div {@attach reveal({ y: 30 })} class="text-center mb-14">
			<h2 class="text-3xl md:text-5xl font-display uppercase tracking-tight text-foreground">
				{homeData.services.heading}
				<span class="text-primary">{homeData.services.headingAccent}</span>
			</h2>
			<p class="mt-4 text-muted-foreground max-w-xl mx-auto">
				{homeData.services.description}
			</p>
			<a
				href={homeData.services.cta.path}
				class="mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
			>
				{homeData.services.cta.label}
				<ArrowRight class="w-4 h-4" />
			</a>
		</div>

		<ServiceImageGrid services={featuredServices} />
	</div>
</section>

<!-- About / Team Section -->
<section class="section-dark py-20 md:py-28">
	<div class="container">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div {@attach reveal({ y: 0 })}>
				<h2 class="text-3xl md:text-5xl font-display uppercase tracking-tight mb-6">
					{homeData.team.heading}
					<span class="text-primary">{homeData.team.headingAccent}</span>
				</h2>
				<p class="text-primary-foreground/70 leading-relaxed mb-6">
					{homeData.team.body}
				</p>
				<ul class="space-y-3">
					{#each homeData.team.bullets as b (b)}
						<li class="flex items-center gap-3 text-primary-foreground/80">
							<span class="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
							{b}
						</li>
					{/each}
				</ul>
				<a
					href={location.selected.phone}
					class="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
				>
					<Phone class="w-5 h-5" />
					{homeData.team.ctaLabel}
				</a>
			</div>
			<div {@attach reveal({ y: 0 })} class="aspect-[4/3] rounded-lg overflow-hidden">
				<img
					src={homeData.team.image}
					alt={homeData.team.imageAlt}
					class="w-full h-full object-cover"
				/>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-20 md:py-28 bg-primary">
	<div class="container text-center">
		<div {@attach reveal({ y: 0 })}>
			<h2
				class="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4"
			>
				{homeData.closingCta.heading}
			</h2>
			<p class="text-primary-foreground/80 max-w-xl mx-auto mb-8">
				{homeData.closingCta.description}
			</p>
			<a
				href={location.selected.phone}
				class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
			>
				<Phone class="w-5 h-5" />
				{homeData.closingCta.buttonLabel}
			</a>
		</div>
	</div>
</section>
