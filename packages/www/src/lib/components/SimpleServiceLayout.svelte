<script lang="ts">
	import type { SimpleLayout } from "$lib/services/service-pages"
	import ServiceHero from "$lib/components/ServiceHero.svelte"
	import ServiceCard from "$lib/components/ServiceCard.svelte"
	import ServiceEmergencyCta from "$lib/components/ServiceEmergencyCta.svelte"

	let { content }: { content: SimpleLayout } = $props()
</script>

<ServiceHero
	title={content.hero.title}
	subtitle={content.hero.subtitle}
	image={content.hero.image}
	imageAlt={content.hero.imageAlt}
	cta={content.hero.cta}
/>
<section class="py-16 md:py-24">
	<div class="container space-y-20">
		{#each content.cards as card (card.title)}
			<ServiceCard
				title={card.title}
				description={card.description}
				items={card.items}
				image={card.image}
				imageAlt={card.imageAlt}
				reverse={card.reverse}
			/>
		{/each}
	</div>
</section>
<ServiceEmergencyCta />
