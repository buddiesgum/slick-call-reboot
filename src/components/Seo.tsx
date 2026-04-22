import { Head } from "vite-react-ssg"
import seoData from "@/cms/seo.json"
import type { PageSeoData } from "./seo-types"

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

const { default: defaults } = seoData

const Seo = ({
	route,
	seoBlock,
	title,
	description,
	canonical,
	ogImage,
	ogImageAlt,
	ogImageWidth,
	ogImageHeight
}: SeoProps) => {
	const resolvedTitle = title ?? seoBlock?.title ?? defaults.title
	const resolvedDescription = description ?? seoBlock?.description ?? defaults.description
	const resolvedCanonical =
		canonical ?? seoBlock?.canonical ?? `${defaults.canonicalBase}${route === "/" ? "" : route}`

	// Resolve ogImage, ogImageWidth, ogImageHeight from the same tier so dimensions
	// are never mismatched with a different image. ogImageAlt falls back to the
	// default when the chosen tier omits it (generic alt is preferable to none).
	let resolvedOgImage: string
	let resolvedOgImageAlt: string
	let resolvedOgImageWidth: number | undefined
	let resolvedOgImageHeight: number | undefined

	if (ogImage !== undefined) {
		resolvedOgImage = ogImage
		resolvedOgImageAlt = ogImageAlt ?? defaults.ogImageAlt
		resolvedOgImageWidth = ogImageWidth
		resolvedOgImageHeight = ogImageHeight
	} else if (seoBlock?.ogImage !== undefined) {
		resolvedOgImage = seoBlock.ogImage
		resolvedOgImageAlt = seoBlock.ogImageAlt ?? defaults.ogImageAlt
		resolvedOgImageWidth = seoBlock.ogImageWidth
		resolvedOgImageHeight = seoBlock.ogImageHeight
	} else {
		resolvedOgImage = defaults.ogImage
		resolvedOgImageAlt = defaults.ogImageAlt
		resolvedOgImageWidth = defaults.ogImageWidth
		resolvedOgImageHeight = defaults.ogImageHeight
	}

	return (
		<Head>
			<title>{resolvedTitle}</title>
			<meta name="description" content={resolvedDescription} />
			<link rel="canonical" href={resolvedCanonical} />
			<meta property="og:title" content={resolvedTitle} />
			<meta property="og:description" content={resolvedDescription} />
			<meta property="og:url" content={resolvedCanonical} />
			<meta property="og:image" content={resolvedOgImage} />
			<meta property="og:image:alt" content={resolvedOgImageAlt} />
			{resolvedOgImageWidth !== undefined && (
				<meta property="og:image:width" content={String(resolvedOgImageWidth)} />
			)}
			{resolvedOgImageHeight !== undefined && (
				<meta property="og:image:height" content={String(resolvedOgImageHeight)} />
			)}
			<meta name="twitter:title" content={resolvedTitle} />
			<meta name="twitter:description" content={resolvedDescription} />
			<meta name="twitter:image" content={resolvedOgImage} />
		</Head>
	)
}

export default Seo
