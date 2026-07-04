<script lang="ts">
	import Seo from "$lib/components/Seo.svelte"
	import SimpleServiceLayout from "$lib/components/SimpleServiceLayout.svelte"
	import ComplexServiceLayout from "$lib/components/ComplexServiceLayout.svelte"
	import type { PageProps } from "./$types"

	let { data }: PageProps = $props()
</script>

<!-- Explicit `title` prop applies the `content.title` fallback when `content.seo.title` is
     unset OR empty. `||` (not `??`): Sveltia writes "" for blank fields, and an empty
     `seo.title` must fall back to the service title, not silently hit the global SEO default. -->
<Seo
	route={`/${data.slug}`}
	title={data.content.seo?.title || data.content.title}
	seoBlock={data.content.seo}
/>

{#if data.content.layout.type === "complex"}
	<ComplexServiceLayout content={data.content.layout} />
{:else}
	<SimpleServiceLayout content={data.content.layout} />
{/if}
