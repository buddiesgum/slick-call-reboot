<script lang="ts">
	import MapPin from "@lucide/svelte/icons/map-pin"
	import ChevronDown from "@lucide/svelte/icons/chevron-down"
	import { locations, getLocationContext } from "$lib/location/location.svelte"

	const location = getLocationContext()

	let open = $state(false)
	let root = $state<HTMLDivElement>()

	function onDocumentMousedown(e: MouseEvent) {
		if (root && !root.contains(e.target as Node)) open = false
	}
</script>

<svelte:document onmousedown={onDocumentMousedown} />

<div bind:this={root} class="relative">
	<button
		onclick={() => (open = !open)}
		class="flex items-center gap-1.5 text-xs font-body text-secondary-foreground/70 hover:text-primary transition-colors"
	>
		<MapPin class="w-3.5 h-3.5 text-primary" />
		<span class="hidden sm:inline">{location.selected.label}</span>
		<span class="sm:hidden">{location.selected.short}</span>
		<ChevronDown class={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
	</button>

	{#if open}
		<div
			class="absolute top-full left-0 mt-2 w-52 bg-popover border border-border rounded-md shadow-lg overflow-hidden z-50"
		>
			<div class="px-3 py-2 border-b border-border">
				<span class="text-[10px] font-display uppercase tracking-widest text-muted-foreground">
					Select Location
				</span>
			</div>
			{#each locations as loc (loc.id)}
				<button
					onclick={() => {
						location.setLocation(loc)
						open = false
					}}
					class={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors hover:bg-accent ${
						location.selected.id === loc.id ?
							"text-primary bg-accent/50"
						:	"text-popover-foreground"
					}`}
				>
					<MapPin class="w-3.5 h-3.5 flex-shrink-0" />
					{loc.label}
					{#if location.selected.id === loc.id}
						<span class="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
