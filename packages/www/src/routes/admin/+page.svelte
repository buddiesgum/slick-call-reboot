<script lang="ts">
	import { onMount } from "svelte"

	onMount(async () => {
		const { init } = await import("@sveltia/cms")
		const { config } = await import("$lib/admin/config")
		init({ config })
	})
</script>

<svelte:head>
	<title>Content Manager</title>
	<meta name="robots" content="noindex" />
</svelte:head>
