<script lang="ts">
	import { ArrowRight, MapPin, MessageSquare, Phone, Star } from "@lucide/svelte"
	import Seo from "$lib/components/Seo.svelte"
	import LocationSelector from "$lib/components/LocationSelector.svelte"
	import ServiceImageGrid from "$lib/components/ServiceImageGrid.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { getLocationContext } from "$lib/location/location.svelte"
	import { allServices } from "$lib/services/services"
	import content from "$lib/cms/all-services-page.json"

	const location = getLocationContext()

	const aboutHero = "/media/about/hero.webp"
	const smsHref = $derived(`sms:${location.selected.phone.replace("tel:", "")}`)
	const heroBg = content.hero.image || aboutHero
	const videoPoster = content.video.posterImage || aboutHero
</script>

<Seo route="/all-services" seoBlock={content.seo} />

<section class="relative min-h-[560px] flex items-center overflow-hidden section-dark">
	<img
		src={heroBg}
		alt={content.hero.imageAlt}
		class="absolute inset-0 w-full h-full object-cover opacity-35"
	/>
	<div
		class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40"
	></div>
	<div class="container relative z-10 py-24">
		<div {@attach reveal({ y: 30 })} class="max-w-4xl">
			<p class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-5">
				{content.hero.eyebrow}
			</p>
			<h1
				class="text-5xl md:text-8xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]"
			>
				{content.hero.title} <span class="text-primary">{content.hero.titleAccent}</span>
			</h1>
			<p class="mt-8 text-lg md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
				{content.hero.description}
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href={location.selected.phone}
					class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
				>
					<Phone class="w-5 h-5" />
					{content.hero.primaryCtaLabel}
					{location.selected.phoneDisplay}
				</a>
				<a
					href={smsHref}
					class="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors rounded-sm"
				>
					<MessageSquare class="w-5 h-5" />
					{content.hero.textCtaLabel}
				</a>
				<a
					href="/projects"
					class="inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground hover:text-secondary transition-colors rounded-sm"
				>
					{content.hero.projectsCta.label}
					<ArrowRight class="w-5 h-5" />
				</a>
			</div>
		</div>
	</div>
</section>

<section class="py-12 bg-background border-b border-border">
	<div class="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
		<div>
			<div class="flex items-center gap-3 mb-2">
				<MapPin class="w-5 h-5 text-primary" />
				<span class="font-display uppercase tracking-[0.2em] text-sm text-primary">
					{content.locationPrompt.eyebrowPrefix}
					{location.selected.label}
				</span>
			</div>
			<p class="text-muted-foreground max-w-2xl">{content.locationPrompt.body}</p>
		</div>
		<div class="bg-secondary text-secondary-foreground px-5 py-4 rounded-sm inline-flex">
			<LocationSelector />
		</div>
	</div>
</section>

<section class="py-20 md:py-28 bg-background">
	<div class="container">
		<div class="text-center mb-14">
			<h2 class="text-3xl md:text-5xl font-display uppercase tracking-tight text-foreground">
				{content.servicesGrid.heading}
				<span class="text-primary">{content.servicesGrid.headingAccent}</span>
			</h2>
			<p class="mt-4 text-muted-foreground max-w-2xl mx-auto">
				{content.servicesGrid.description}
			</p>
		</div>
		<ServiceImageGrid services={allServices} />
	</div>
</section>

<section class="section-dark py-20 md:py-28">
	<div class="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
		<div>
			<p class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
				{content.video.eyebrow}
			</p>
			<h2
				class="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground leading-tight mb-6"
			>
				{content.video.heading}
			</h2>
			<p class="text-primary-foreground/70 leading-relaxed mb-8">{content.video.body}</p>
			<a
				href={content.video.ctaPath}
				class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
			>
				{content.video.ctaLabel}
			</a>
		</div>
		<div
			class="relative aspect-video border border-primary-foreground/15 bg-background/5 overflow-hidden flex items-center justify-center"
		>
			{#if content.video.videoUrl}
				<iframe
					src={content.video.videoUrl}
					title={content.video.heading}
					class="absolute inset-0 w-full h-full"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
					loading="lazy"
				></iframe>
			{:else}
				<img
					src={videoPoster}
					alt={content.video.posterAlt}
					class="absolute inset-0 w-full h-full object-cover"
				/>
			{/if}
		</div>
	</div>
</section>

<section class="py-20 md:py-28 bg-background">
	<div class="container">
		<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
			<div>
				<p class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
					{content.reviews.eyebrow}
				</p>
				<h2 class="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground">
					{content.reviews.heading}
				</h2>
			</div>
			<div class="flex gap-1 text-primary">
				{#each Array.from({ length: 5 }) as _, i (i)}
					<Star class="w-6 h-6 fill-current" />
				{/each}
			</div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
			{#each content.reviews.items as review (review.text)}
				<div class="border border-border bg-card p-7">
					<div class="flex gap-1 text-primary mb-5">
						{#each Array.from({ length: 5 }) as _, i (i)}
							<Star class="w-4 h-4 fill-current" />
						{/each}
					</div>
					<p class="text-muted-foreground leading-relaxed mb-6">"{review.text}"</p>
					<p class="font-display uppercase tracking-wider text-sm text-foreground">
						{review.name}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-20 md:py-28 bg-primary">
	<div class="container text-center">
		<h2
			class="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground mb-5"
		>
			{content.closingCta.heading}
		</h2>
		<p class="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
			{content.closingCta.bodyPrefix}
			{location.selected.label}.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a
				href={location.selected.phone}
				class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
			>
				<Phone class="w-5 h-5" />
				{content.closingCta.callLabel}
			</a>
			<a
				href={smsHref}
				class="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
			>
				<MessageSquare class="w-5 h-5" />
				{content.closingCta.textLabel}
			</a>
		</div>
	</div>
</section>
