<script lang="ts">
	import { ArrowRight } from "@lucide/svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { buildProjectsPath } from "$lib/projects-link"

	interface ServiceHeroProps {
		title: string
		subtitle?: string
		image: string
		imageAlt?: string
		cta?: {
			label: string
			projectFilters?: { major?: string; minor?: string }
		}
	}

	let { title, subtitle, image, imageAlt, cta }: ServiceHeroProps = $props()
</script>

<section class="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
	<div
		class="absolute inset-0 bg-cover bg-center"
		style={`background-image: url(${image})`}
		role="img"
		aria-label={imageAlt || title}
	></div>
	<div class="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/50"></div>
	<div class="container relative z-10">
		<h1
			{@attach reveal({ y: 30 })}
			class="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground"
		>
			{title}
		</h1>
		{#if subtitle}
			<p
				{@attach reveal({ delay: 0.2, y: 20 })}
				class="mt-4 text-lg md:text-xl text-primary-foreground/70 max-w-2xl"
			>
				{subtitle}
			</p>
		{/if}
		{#if cta}
			<div {@attach reveal({ delay: 0.35, y: 20 })} class="mt-8">
				<a
					href={buildProjectsPath(cta.projectFilters)}
					class="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-display uppercase text-sm tracking-wider rounded-sm hover:bg-primary/90 transition-colors"
				>
					{cta.label}
					<ArrowRight class="w-4 h-4" />
				</a>
			</div>
		{/if}
	</div>
</section>
