<script lang="ts">
	import Phone from "@lucide/svelte/icons/phone"
	import MapPin from "@lucide/svelte/icons/map-pin"
	import footerData from "$lib/cms/footer.json"
	import { getLocationContext } from "$lib/location/location.svelte"
	import { posthog } from "$lib/posthog"

	const location = getLocationContext()
</script>

<footer class="section-dark py-12">
	<div class="container">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			<div>
				<img src={footerData.logo.image} alt={footerData.logo.alt} class="h-[67px] w-auto mb-4" />
				<p class="text-sm opacity-70 leading-relaxed">{footerData.tagline}</p>
			</div>
			<div>
				<h4 class="font-display uppercase text-sm tracking-wider mb-4 text-primary">
					{footerData.services.heading}
				</h4>
				<div class="flex flex-col gap-2">
					{#each footerData.services.links as link (link.path)}
						<a
							href={link.path}
							class="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
			<div>
				<h4 class="font-display uppercase text-sm tracking-wider mb-4 text-primary">
					{footerData.company.heading}
				</h4>
				<div class="flex flex-col gap-2">
					{#each footerData.company.links as link (link.path)}
						<a
							href={link.path}
							class="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
			<div>
				<h4 class="font-display uppercase text-sm tracking-wider mb-4 text-primary">
					{footerData.contact.heading} — {location.selected.label}
				</h4>
				<div class="flex flex-col gap-3">
					<div class="flex items-start gap-2 text-sm opacity-70">
						<MapPin class="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
						<span>{location.selected.address}</span>
					</div>
					<a
						href={location.selected.phone}
						class="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
					>
						<Phone class="w-4 h-4" />
						{location.selected.phoneDisplay}
					</a>
				</div>
			</div>
		</div>
		<div class="mt-10 pt-6 border-t border-muted-foreground/20 text-center text-xs opacity-50">
			{footerData.copyrightPrefix}
			{new Date().getFullYear()}
			{footerData.copyrightSuffix}
		</div>
	</div>
</footer>

<!-- Sticky Call Button -->
<a
	href={location.selected.phone}
	onclick={() => posthog.capture("floating_call_clicked")}
	class="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
	aria-label="Call Hukill's"
>
	<span class="absolute inset-0 rounded-full bg-primary animate-pulse-ring"></span>
	<Phone class="w-6 h-6 relative z-10" />
</a>
