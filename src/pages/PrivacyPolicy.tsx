import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import { Shield } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"
import data from "@/cms/privacy-policy-page.json"

const remarkPlugins = [remarkGfm]

const mdComponents: Components = {
	p: ({ children }) => <p className="text-foreground/80 leading-relaxed font-body">{children}</p>,
	ul: ({ children }) => (
		<ul className="list-disc list-inside space-y-1 ml-2 text-foreground/80 font-body">
			{children}
		</ul>
	),
	a: ({ href, children }) => (
		<a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
			{children}
		</a>
	),
}

const Md = ({ children }: { children: string }) => (
	<ReactMarkdown remarkPlugins={remarkPlugins} components={mdComponents}>
		{children}
	</ReactMarkdown>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<section className="mb-10">
		<h2 className="font-display uppercase text-2xl md:text-3xl tracking-wider text-foreground mb-4 border-l-4 border-primary pl-4">
			{title}
		</h2>
		<div className="space-y-4 text-foreground/80 leading-relaxed font-body">{children}</div>
	</section>
)

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<div className="mb-6">
		<h3 className="font-display uppercase text-base tracking-wider text-primary mb-2">{title}</h3>
		<div className="space-y-3 text-foreground/80 leading-relaxed font-body">{children}</div>
	</div>
)

const PrivacyPolicy = () => {
	return (
		<Layout>
			<Seo route="/privacy-policy" />
			{/* Hero */}
			<section className="section-dark py-20 md:py-28">
				<div className="container">
					<div className="flex items-center gap-3 mb-4">
						<Shield className="w-6 h-6 text-primary" />
						<span className="font-display uppercase text-xs tracking-[0.2em] text-primary">
							{data.hero.eyebrow}
						</span>
					</div>
					<h1 className="font-display uppercase text-4xl md:text-6xl tracking-wider text-background mb-4">
						{data.hero.title}
					</h1>
					<p className="text-background/70 font-body max-w-2xl">{data.hero.effectiveDate}</p>
				</div>
			</section>

			{/* Content */}
			<section className="py-16 md:py-20 bg-background">
				<div className="container max-w-4xl">
					{data.intro && (
						<div className="space-y-4 mb-10">
							<Md>{data.intro}</Md>
						</div>
					)}

					{data.sections.map((section, i) => (
						<Section key={i} title={section.title}>
							{section.intro && (
								<div className="space-y-3">
									<Md>{section.intro}</Md>
								</div>
							)}
							{section.subSections?.map((sub, j) => (
								<SubSection key={j} title={sub.title}>
									<Md>{sub.body}</Md>
								</SubSection>
							))}
						</Section>
					))}
				</div>
			</section>
		</Layout>
	)
}

export default PrivacyPolicy
