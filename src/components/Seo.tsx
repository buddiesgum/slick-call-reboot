import { Head } from "vite-react-ssg"
import seoData from "@/cms/seo.json"

interface SeoProps {
	route: string
	title?: string
	description?: string
	canonical?: string
	ogImage?: string
}

const { default: defaults, routes } = seoData

const Seo = ({ route, title, description, canonical, ogImage }: SeoProps) => {
	const routeEntry = routes.find((r) => r.path === route) as
		| { path: string; title?: string; description?: string; canonical?: string; ogImage?: string }
		| undefined

	const resolvedTitle = title ?? routeEntry?.title ?? defaults.title
	const resolvedDescription = description ?? routeEntry?.description ?? defaults.description
	const resolvedCanonical =
		canonical ?? routeEntry?.canonical ?? `${defaults.canonicalBase}${route === "/" ? "" : route}`
	const resolvedOgImage = ogImage ?? routeEntry?.ogImage ?? defaults.ogImage

	return (
		<Head>
			<title>{resolvedTitle}</title>
			<meta name="description" content={resolvedDescription} />
			<link rel="canonical" href={resolvedCanonical} />
			<meta property="og:title" content={resolvedTitle} />
			<meta property="og:description" content={resolvedDescription} />
			<meta property="og:url" content={resolvedCanonical} />
			<meta property="og:image" content={resolvedOgImage} />
			<meta property="og:image:alt" content={defaults.ogImageAlt} />
			<meta property="og:image:width" content={String(defaults.ogImageWidth)} />
			<meta property="og:image:height" content={String(defaults.ogImageHeight)} />
			<meta name="twitter:title" content={resolvedTitle} />
			<meta name="twitter:description" content={resolvedDescription} />
			<meta name="twitter:image" content={resolvedOgImage} />
		</Head>
	)
}

export default Seo
