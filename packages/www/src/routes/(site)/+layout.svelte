<script lang="ts">
	import { onMount } from "svelte"
	import { TooltipProvider } from "$lib/components/ui/tooltip"
	import { Toaster } from "$lib/components/ui/sonner"
	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"
	import { LocationState, setLocationContext } from "$lib/location/location.svelte"

	let { children } = $props()

	const location = setLocationContext(new LocationState())

	onMount(() => {
		location.init()
	})
</script>

<TooltipProvider>
	<Toaster />
	<div class="flex min-h-screen flex-col">
		<Header />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
</TooltipProvider>
