import { Head } from "vite-react-ssg"
import seoData from "@/cms/seo.json"

interface SeoProps {
	route: string
	title?: string
	description?: string
	canonical?: string
	ogImage?: string
	ogImageAlt?: string
	ogImageWidth?: number
	ogImageHeight?: number
}

const { default: defaults, routes } = seoData

const Seo = ({
	route,
	title,
	description,
	canonical,
	ogImage,
	ogImageAlt,
	ogImageWidth,
	ogImageHeight
}: SeoProps) => {
	const routeEntry = routes.find((r) => r.path === route) as
		| {
				path: string
				title?: string
				description?: string
				canonical?: string
				ogImage?: string
				ogImageAlt?: string
				ogImageWidth?: number
				ogImageHeight?: number
		  }
		| undefined

	const resolvedTitle = title ?? routeEntry?.title ?? defaults.title
	const resolvedDescription = description ?? routeEntry?.description ?? defaults.description
	const resolvedCanonical =
		canonical ?? routeEntry?.canonical ?? `${defaults.canonicalBase}${route === "/" ? "" : route}`

	// Resolve ogImage, ogImageAlt, ogImageWidth, ogImageHeight from the same tier so
	// dimensions are never mismatched with a different image.
	let resolvedOgImage: string
	let resolvedOgImageAlt: string
	let resolvedOgImageWidth: number | undefined
	let resolvedOgImageHeight: number | undefined

	if (ogImage !== undefined) {
		resolvedOgImage = ogImage
		resolvedOgImageAlt = ogImageAlt ?? defaults.ogImageAlt
		resolvedOgImageWidth = ogImageWidth
		resolvedOgImageHeight = ogImageHeight
	} else if (routeEntry?.ogImage !== undefined) {
		resolvedOgImage = routeEntry.ogImage
		resolvedOgImageAlt = routeEntry.ogImageAlt ?? defaults.ogImageAlt
		resolvedOgImageWidth = routeEntry.ogImageWidth
		resolvedOgImageHeight = routeEntry.ogImageHeight
	} else {
		resolvedOgImage = defaults.ogImage
		resolvedOgImageAlt = ogImageAlt ?? routeEntry?.ogImageAlt ?? defaults.ogImageAlt
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
