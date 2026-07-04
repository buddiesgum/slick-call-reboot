<script lang="ts">
	import { Eye, Heart, Target } from "@lucide/svelte"
	import Seo from "$lib/components/Seo.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { getIcon } from "$lib/icons"
	import aboutData from "$lib/cms/about-page.json"
</script>

<Seo route="/about" seoBlock={aboutData.seo} />

<!-- HERO -->
<section class="relative h-[60vh] min-h-[420px] flex items-center overflow-hidden">
	<img
		src={aboutData.hero.image}
		alt={aboutData.hero.imageAlt}
		class="absolute inset-0 w-full h-full object-cover"
		width={1920}
		height={1024}
	/>
	<div
		class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-secondary/30"
	></div>
	<div class="container relative z-10">
		<p
			{@attach reveal({ y: 20 })}
			class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4"
		>
			{aboutData.hero.eyebrow}
		</p>
		<h1
			{@attach reveal({ delay: 0.1, y: 30 })}
			class="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
		>
			{aboutData.hero.title}
			<span class="text-primary">{aboutData.hero.titleAccent}</span>
			{aboutData.hero.titleSuffix}
		</h1>
		<p
			{@attach reveal({ delay: 0.25, y: 20 })}
			class="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
		>
			{aboutData.hero.description}
		</p>
	</div>
</section>

<!-- MISSION -->
<section class="py-20 md:py-28">
	<div class="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
		<div {@attach reveal()}>
			<div class="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
				<img
					src={aboutData.mission.image}
					alt={aboutData.mission.imageAlt}
					class="w-full h-full object-cover"
					loading="lazy"
					width={1280}
					height={960}
				/>
			</div>
		</div>
		<div {@attach reveal()}>
			<div class="flex items-center gap-3 mb-4">
				<Target class="w-6 h-6 text-primary" />
				<span class="font-display uppercase tracking-[0.25em] text-sm text-primary">
					{aboutData.mission.eyebrow}
				</span>
			</div>
			<h2
				class="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight"
			>
				{aboutData.mission.heading}
				<span class="text-primary">{aboutData.mission.headingAccent}</span>
			</h2>
			<p class="text-lg text-muted-foreground leading-relaxed mb-6">
				{aboutData.mission.body}
			</p>
			<div class="space-y-4 border-l-2 border-primary pl-6">
				{#each aboutData.mission.points as point (point.heading)}
					<div>
						<h3 class="font-display uppercase tracking-wider text-sm text-foreground mb-1">
							{point.heading}
						</h3>
						<p class="text-muted-foreground text-sm">{point.body}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- VALUES -->
<section class="section-dark py-20 md:py-28 relative overflow-hidden">
	<div
		class="absolute inset-0 opacity-15 bg-cover bg-center"
		style="background-image: url({aboutData.values.backgroundImage})"
	></div>
	<div class="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary"></div>
	<div class="container relative z-10">
		<div {@attach reveal({ y: 30 })} class="max-w-2xl mb-16">
			<div class="flex items-center gap-3 mb-4">
				<Heart class="w-6 h-6 text-primary" />
				<span class="font-display uppercase tracking-[0.25em] text-sm text-primary">
					{aboutData.values.eyebrow}
				</span>
			</div>
			<h2
				class="text-4xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground leading-tight"
			>
				{aboutData.values.heading}
				<span class="text-primary">{aboutData.values.headingAccent}</span>
			</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
			{#each aboutData.values.items as value, i (value.title)}
				{const ValueIcon = getIcon(value.icon)}
				<div
					{@attach reveal({ delay: i * 0.1, y: 30 })}
					class="group relative bg-background/5 backdrop-blur-sm border border-primary-foreground/10 p-8 hover:border-primary transition-all duration-300 hover:bg-background/10"
				>
					<div
						class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors"
					>
						<ValueIcon
							class="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors"
						/>
					</div>
					<h3 class="text-2xl font-display uppercase tracking-tight text-primary-foreground mb-3">
						{value.title}
					</h3>
					<p class="text-primary-foreground/70 leading-relaxed">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- VISION -->
<section class="py-20 md:py-28">
	<div class="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
		<div {@attach reveal()} class="lg:order-2">
			<div class="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
				<img
					src={aboutData.vision.image}
					alt={aboutData.vision.imageAlt}
					class="w-full h-full object-cover"
					loading="lazy"
					width={1280}
					height={960}
				/>
			</div>
		</div>
		<div {@attach reveal()} class="lg:order-1">
			<div class="flex items-center gap-3 mb-4">
				<Eye class="w-6 h-6 text-primary" />
				<span class="font-display uppercase tracking-[0.25em] text-sm text-primary">
					{aboutData.vision.eyebrow}
				</span>
			</div>
			<h2
				class="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight"
			>
				{aboutData.vision.heading}
				<span class="text-primary">{aboutData.vision.headingAccent}</span>
			</h2>
			<p class="text-lg text-muted-foreground leading-relaxed mb-6">
				{aboutData.vision.body}
			</p>
			<p class="font-display uppercase tracking-wider text-sm text-foreground mb-4">
				{aboutData.vision.bulletsLeadIn}
			</p>
			<ul class="space-y-3">
				{#each aboutData.vision.bullets as item (item)}
					<li class="flex items-start gap-3">
						<span class="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
						<span class="text-muted-foreground">{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- ACCOUNTABILITY -->
<section class="relative py-20 md:py-28 bg-primary overflow-hidden">
	<div class="absolute inset-0 opacity-10">
		<div
			class="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl"
		></div>
		<div class="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
	</div>
	<div class="container relative z-10">
		<div {@attach reveal({ y: 30 })} class="max-w-4xl mx-auto text-center">
			<span
				class="inline-block font-display uppercase tracking-[0.3em] text-sm text-primary-foreground/80 mb-6"
			>
				{aboutData.accountability.eyebrow}
			</span>
			<h2
				class="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground leading-tight mb-8"
			>
				{aboutData.accountability.heading}
			</h2>
			<p class="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
				{aboutData.accountability.body}
			</p>
		</div>
	</div>
</section>
