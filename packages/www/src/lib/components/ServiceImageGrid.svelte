<script lang="ts">
	import type { ServiceTile } from "$lib/services/services"
	import { reveal } from "$lib/attachments/reveal"

	let { services }: { services: ServiceTile[] } = $props()
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
	{#each services as service, i (service.title)}
		{const IconCmp = $derived(service.icon)}
		<div {@attach reveal({ delay: i * 0.06, y: 30 })}>
			<a
				href={service.path}
				class="group relative flex min-h-72 overflow-hidden border border-primary-foreground/10 hover:border-primary transition-all duration-300"
			>
				<img
					src={service.image}
					alt={service.imageAlt}
					class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					loading="lazy"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/75 to-secondary/25"
				></div>
				<div class="relative z-10 flex h-full flex-col justify-end p-7">
					<IconCmp class="w-10 h-10 text-primary mb-5 group-hover:scale-110 transition-transform" />
					<h3 class="text-2xl font-display uppercase tracking-tight mb-3 text-primary-foreground">
						{service.title}
					</h3>
					<p class="text-sm text-primary-foreground/75 leading-relaxed">{service.desc}</p>
				</div>
			</a>
		</div>
	{/each}
</div>
