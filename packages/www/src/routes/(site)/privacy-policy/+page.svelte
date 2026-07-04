<script lang="ts">
	import { Shield } from "@lucide/svelte"
	import { Marked } from "marked"
	import Seo from "$lib/components/Seo.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import data from "$lib/cms/privacy-policy-page.json"

	// GFM markdown renderer replicating the old react-markdown component
	// overrides: styled paragraphs, lists, and external links. Content is
	// CMS-authored and prerendered, so {@html} output is acceptable here.
	const marked = new Marked({
		gfm: true,
		renderer: {
			paragraph({ tokens }) {
				return `<p class="text-foreground/80 leading-relaxed font-body">${this.parser.parseInline(tokens)}</p>\n`
			},
			list(token) {
				const body = token.items.map(item => this.listitem(item)).join("")
				const tag = token.ordered ? "ol" : "ul"
				return `<${tag} class="list-disc list-inside space-y-1 ml-2 text-foreground/80 font-body">\n${body}</${tag}>\n`
			},
			link({ href, tokens }) {
				return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${this.parser.parseInline(tokens)}</a>`
			}
		}
	})

	const md = (src: string) => marked.parse(src, { async: false })
</script>

<Seo route="/privacy-policy" seoBlock={data.seo} />

<!-- Hero -->
<section class="section-dark py-20 md:py-28">
	<div class="container">
		<div {@attach reveal({ y: 20 })} class="flex items-center gap-3 mb-4">
			<Shield class="w-6 h-6 text-primary" />
			<span class="font-display uppercase text-xs tracking-[0.2em] text-primary">
				{data.hero.eyebrow}
			</span>
		</div>
		<h1
			{@attach reveal({ delay: 0.1, y: 30 })}
			class="font-display uppercase text-4xl md:text-6xl tracking-wider text-background mb-4"
		>
			{data.hero.title}
		</h1>
		<p {@attach reveal({ delay: 0.25, y: 20 })} class="text-background/70 font-body max-w-2xl">
			{data.hero.effectiveDate}
		</p>
	</div>
</section>

<!-- Content -->
<section class="py-16 md:py-20 bg-background">
	<div class="container max-w-4xl">
		{#if data.intro}
			<div class="space-y-4 mb-10">
				{@html md(data.intro)}
			</div>
		{/if}

		{#each data.sections as section (section.title)}
			<section class="mb-10">
				<h2
					class="font-display uppercase text-2xl md:text-3xl tracking-wider text-foreground mb-4 border-l-4 border-primary pl-4"
				>
					{section.title}
				</h2>
				<div class="space-y-4 text-foreground/80 leading-relaxed font-body">
					{#if section.intro}
						<div class="space-y-3">
							{@html md(section.intro)}
						</div>
					{/if}
					{#each section.subSections ?? [] as sub (sub.title)}
						<div class="mb-6">
							<h3 class="font-display uppercase text-base tracking-wider text-primary mb-2">
								{sub.title}
							</h3>
							<div class="space-y-3 text-foreground/80 leading-relaxed font-body">
								{@html md(sub.body)}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</section>
