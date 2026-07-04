<script lang="ts">
	import "./layout.css"
	import favicon from "$lib/assets/favicon.svg"
	import { onMount } from "svelte"
	import { afterNavigate } from "$app/navigation"
	import { initPosthog, capturePageview } from "$lib/posthog"

	let { children } = $props()

	onMount(() => {
		initPosthog()
	})

	// capture_pageview is disabled in initPosthog; afterNavigate fires on
	// initial load AND client-side navigations, so this covers both exactly once.
	afterNavigate(() => {
		capturePageview()
	})
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{@render children()}
