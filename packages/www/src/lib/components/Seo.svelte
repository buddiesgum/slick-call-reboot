<script lang="ts" module>
	export interface PageSeoData {
		title?: string
		description?: string
		canonical?: string
		ogImage?: string
		ogImageAlt?: string
		// `null` is allowed because CMS JSON emits null for unset number fields.
		ogImageWidth?: number | null
		ogImageHeight?: number | null
	}
</script>

<script lang="ts">
	import seoData from "$lib/cms/seo.json"

	interface SeoProps {
		route: string
		seoBlock?: PageSeoData
		title?: string
		description?: string
		canonical?: string
		ogImage?: string
		ogImageAlt?: string
		ogImageWidth?: number
		ogImageHeight?: number
	}

	let {
		route,
		seoBlock,
		title,
		description,
		canonical,
		ogImage,
		ogImageAlt,
		ogImageWidth,
		ogImageHeight
	}: SeoProps = $props()

	const defaults = seoData.default

	const emptyToUndefined = (value: string | undefined): string | undefined =>
		value === "" ? undefined : value

	const resolvedTitle = $derived(
		emptyToUndefined(title) ?? emptyToUndefined(seoBlock?.title) ?? defaults.title
	)
	const resolvedDescription = $derived(
		emptyToUndefined(description) ?? emptyToUndefined(seoBlock?.description) ?? defaults.description
	)
	const resolvedCanonical = $derived(
		emptyToUndefined(canonical) ??
			emptyToUndefined(seoBlock?.canonical) ??
			`${defaults.canonicalBase}${route === "/" ? "" : route}`
	)

	// Resolve ogImage, ogImageWidth, ogImageHeight from the same tier so dimensions
	// are never mismatched with a different image. ogImageAlt falls back to the
	// default when the chosen tier omits it (generic alt is preferable to none).
	const resolvedOg = $derived.by(() => {
		const normOgImage = emptyToUndefined(ogImage)
		const normSeoOgImage = emptyToUndefined(seoBlock?.ogImage)

		if (normOgImage !== undefined) {
			return {
				image: normOgImage,
				alt: emptyToUndefined(ogImageAlt) ?? defaults.ogImageAlt,
				width: ogImageWidth,
				height: ogImageHeight
			}
		}
		if (normSeoOgImage !== undefined) {
			return {
				image: normSeoOgImage,
				alt: emptyToUndefined(seoBlock?.ogImageAlt) ?? defaults.ogImageAlt,
				width: seoBlock?.ogImageWidth ?? undefined,
				height: seoBlock?.ogImageHeight ?? undefined
			}
		}
		return {
			image: defaults.ogImage,
			alt: defaults.ogImageAlt,
			width: defaults.ogImageWidth,
			height: defaults.ogImageHeight
		}
	})
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDescription} />
	<link rel="canonical" href={resolvedCanonical} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:url" content={resolvedCanonical} />
	<meta property="og:image" content={resolvedOg.image} />
	<meta property="og:image:alt" content={resolvedOg.alt} />
	{#if resolvedOg.width !== undefined}
		<meta property="og:image:width" content={String(resolvedOg.width)} />
	{/if}
	{#if resolvedOg.height !== undefined}
		<meta property="og:image:height" content={String(resolvedOg.height)} />
	{/if}
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={resolvedOg.image} />
</svelte:head>
