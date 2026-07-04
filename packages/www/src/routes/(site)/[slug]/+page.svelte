<script lang="ts">
	import Seo from "$lib/components/Seo.svelte"
	import SimpleServiceLayout from "$lib/components/SimpleServiceLayout.svelte"
	import ComplexServiceLayout from "$lib/components/ComplexServiceLayout.svelte"
	import type { PageProps } from "./$types"

	let { data }: PageProps = $props()
</script>

<!-- Explicit `title` prop applies the `content.title` fallback when `content.seo.title` is unset. -->
<Seo
	route={`/${data.slug}`}
	title={data.content.seo?.title ?? data.content.title}
	seoBlock={data.content.seo}
/>

{#if data.content.layout.type === "complex"}
	<ComplexServiceLayout content={data.content.layout} />
{:else}
	<SimpleServiceLayout content={data.content.layout} />
{/if}
