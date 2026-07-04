<script lang="ts">
	import { ArrowRight, Building2 } from "@lucide/svelte"
	import Icon from "$lib/components/Icon.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { buildProjectsPath } from "$lib/projects-link"
	import type { ComplexLayout } from "$lib/services/service-pages"

	let { content }: { content: ComplexLayout } = $props()
</script>

<section class="relative min-h-[640px] flex items-center overflow-hidden section-dark">
	<img
		src={content.hero.image}
		alt={content.hero.imageAlt}
		class="absolute inset-0 w-full h-full object-cover opacity-35"
	/>
	<div
		class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40"
	></div>
	<div class="container relative z-10 py-24">
		<div {@attach reveal({ y: 30 })} class="max-w-4xl">
			{#if content.hero.eyebrow}
				<p class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-5">
					{content.hero.eyebrow}
				</p>
			{/if}
			<h1
				class="text-5xl md:text-8xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]"
			>
				{content.hero.title}
				{#if content.hero.titleAccent}
					<span class="text-primary">{content.hero.titleAccent}</span>
				{/if}
			</h1>
			{#if content.hero.subtitle}
				<p class="mt-8 text-lg md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
					{content.hero.subtitle}
				</p>
			{/if}
			{#if content.hero.primaryCta || content.hero.secondaryCta}
				<div class="mt-10 flex flex-wrap gap-4">
					{#if content.hero.primaryCta}
						<a
							href={content.hero.primaryCta.path}
							class="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-display uppercase text-sm tracking-wider rounded-sm hover:bg-primary/90 transition-colors"
						>
							{content.hero.primaryCta.label}
							<ArrowRight class="w-4 h-4" />
						</a>
					{/if}
					{#if content.hero.secondaryCta}
						<a
							href={buildProjectsPath(content.hero.secondaryCta.projectFilters)}
							class="inline-flex items-center gap-3 border-2 border-primary-foreground/30 text-primary-foreground px-7 py-4 font-display uppercase text-sm tracking-wider rounded-sm hover:bg-primary-foreground hover:text-secondary transition-colors"
						>
							{content.hero.secondaryCta.label}
							<ArrowRight class="w-4 h-4" />
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</section>

{#if content.scale}
	<section class="py-20 md:py-28 bg-background">
		<div class="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
			<div {@attach reveal({ y: 0 })}>
				{#if content.scale.eyebrow}
					<div class="flex items-center gap-3 mb-4">
						<Building2 class="w-6 h-6 text-primary" />
						<span class="font-display uppercase tracking-[0.25em] text-sm text-primary">
							{content.scale.eyebrow}
						</span>
					</div>
				{/if}
				<h2
					class="text-4xl md:text-6xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight"
				>
					{content.scale.heading}
				</h2>
				{#if content.scale.body}
					<p class="text-lg text-muted-foreground leading-relaxed">{content.scale.body}</p>
				{/if}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each content.scale.items as point, index (point.label)}
					<div
						{@attach reveal({ delay: index * 0.08, y: 30 })}
						class="border border-border bg-card p-6 hover:border-primary transition-colors"
					>
						<Icon name={point.icon} class="w-8 h-8 text-primary mb-5" />
						<h3 class="font-display uppercase tracking-tight text-2xl mb-3">
							{point.label}
						</h3>
						<p class="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if content.capabilities}
	<section class="section-dark py-20 md:py-28 relative overflow-hidden">
		<div
			class="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20"
		></div>
		<div class="container relative z-10">
			<div class="max-w-3xl mb-12">
				{#if content.capabilities.eyebrow}
					<p class="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
						{content.capabilities.eyebrow}
					</p>
				{/if}
				<h2
					class="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground leading-tight"
				>
					{content.capabilities.heading}
				</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10">
				{#each content.capabilities.items as item (item)}
					<div class="bg-secondary/90 p-6 min-h-32 flex items-end">
						<p class="font-display uppercase tracking-tight text-xl text-primary-foreground">
							{item}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
