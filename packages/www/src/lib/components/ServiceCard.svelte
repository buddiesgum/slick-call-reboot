<script lang="ts">
	import { reveal } from "$lib/attachments/reveal"

	interface ServiceCardProps {
		title: string
		description: string
		items?: string[]
		image: string
		imageAlt?: string
		reverse?: boolean
	}

	let { title, description, items, image, imageAlt, reverse }: ServiceCardProps = $props()
</script>

<div
	{@attach reveal({ y: 40 })}
	class={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
		reverse ? "lg:direction-rtl" : ""
	}`}
>
	<div class={reverse ? "lg:order-2" : ""}>
		<div class="aspect-[4/3] rounded-lg overflow-hidden">
			<img
				src={image}
				alt={imageAlt || title}
				class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
				loading="lazy"
			/>
		</div>
	</div>
	<div class={reverse ? "lg:order-1" : ""}>
		<h3 class="text-2xl md:text-3xl font-display uppercase tracking-tight text-primary mb-4">
			{title}
		</h3>
		<p class="text-muted-foreground leading-relaxed mb-4">{description}</p>
		{#if items && items.length > 0}
			<ul class="space-y-2">
				{#each items as item (item)}
					<li class="flex items-start gap-2 text-sm">
						<span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
