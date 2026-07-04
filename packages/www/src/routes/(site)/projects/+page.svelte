<script lang="ts">
	import { X, ArrowRight } from "@lucide/svelte"
	import { fade, fly, scale } from "svelte/transition"
	import { browser } from "$app/env"
	import { page } from "$app/state"
	import { goto } from "$app/navigation"
	import Seo from "$lib/components/Seo.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { projects, type Project } from "$lib/cms/projects"
	import projectsPage from "$lib/cms/projects-page.json"
	import { posthog } from "$lib/posthog"

	// Derive tag options from the CMS config so new tags (e.g. Septic) appear as
	// pills immediately, even before any project carries that tag.
	const majorTagOptions = ["All", ...projectsPage.majorTags]
	const minorTagOptions = ["All", ...projectsPage.minorTags]

	let selectedProject = $state<Project | null>(null)
	let lightboxImg = $state<string | null>(null)

	// Derive active filters from URL; silently fall back to "All" for unknown
	// values. Guarded with `browser` so prerendering never touches searchParams —
	// the prerendered HTML shows the unfiltered/default state.
	const activeMajor = $derived.by(() => {
		if (!browser) return "All"
		const raw = page.url.searchParams.get("major")
		return raw && majorTagOptions.includes(raw) ? raw : "All"
	})
	const activeMinor = $derived.by(() => {
		if (!browser) return "All"
		const raw = page.url.searchParams.get("minor")
		return raw && minorTagOptions.includes(raw) ? raw : "All"
	})

	function setFilter(key: "major" | "minor", value: string) {
		if (value !== "All")
			posthog.capture("project_filter_applied", { filter_type: key, filter_value: value })
		const next = new URL(page.url)
		if (value === "All") next.searchParams.delete(key)
		else next.searchParams.set(key, value)
		goto(next, { replaceState: true, noScroll: true, keepFocus: true })
	}

	const filtered = $derived(
		projects.filter(project => {
			const matchesMajor = activeMajor === "All" || project.majorTags.includes(activeMajor)
			const matchesMinor = activeMinor === "All" || project.minorTags.includes(activeMinor)

			return matchesMajor && matchesMinor
		})
	)

	const isFiltered = $derived(activeMajor !== "All" || activeMinor !== "All")
	const showFallback = $derived(isFiltered && filtered.length === 0)
	const visibleProjects = $derived(showFallback ? projects : filtered)
</script>

<Seo route="/projects" seoBlock={projectsPage.seo} />

<!-- Hero -->
<section class="relative py-24 md:py-32 overflow-hidden">
	<div class="absolute inset-0 bg-secondary"></div>
	<div
		class="absolute inset-0 opacity-20 bg-cover bg-center"
		style="background-image: url('{projectsPage.hero.image}')"
	></div>
	<div class="container relative z-10">
		<div>
			<h1
				{@attach reveal({ y: 30 })}
				class="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]"
			>
				{projectsPage.hero.eyebrow}
				<span class="text-primary">{projectsPage.hero.titleAccent}</span>
			</h1>
			<p
				{@attach reveal({ delay: 0.15, y: 20 })}
				class="mt-4 text-lg text-primary-foreground/60 max-w-xl"
			>
				{projectsPage.hero.description}
			</p>
		</div>
	</div>
</section>

<!-- Filters -->
<section
	class="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border"
>
	<div class="container flex flex-wrap items-center gap-2 py-3">
		<div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
			{#each majorTagOptions as tag (tag)}
				<button
					onclick={() => setFilter("major", tag)}
					class={`px-4 py-1.5 rounded-full text-xs font-display uppercase tracking-wider whitespace-nowrap transition-colors ${
						activeMajor === tag ?
							"bg-primary text-primary-foreground"
						:	"bg-muted text-muted-foreground hover:text-foreground"
					}`}
				>
					{tag === "All" ? projectsPage.filters.majorTagAllLabel : tag}
				</button>
			{/each}
		</div>
		<div class="h-6 w-px bg-border hidden sm:block"></div>
		<div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
			{#each minorTagOptions as tag (tag)}
				<button
					onclick={() => setFilter("minor", tag)}
					class={`px-4 py-1.5 rounded-full text-xs font-display uppercase tracking-wider whitespace-nowrap transition-colors ${
						activeMinor === tag ?
							"bg-primary text-primary-foreground"
						:	"bg-muted text-muted-foreground hover:text-foreground"
					}`}
				>
					{tag === "All" ? projectsPage.filters.minorTagAllLabel : tag}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Empty-state notice -->
{#if showFallback}
	<section class="container pt-12 pb-0 text-center">
		<h2 class="font-display uppercase tracking-tight text-2xl">
			{projectsPage.emptyState.heading}
		</h2>
		<p class="text-muted-foreground mt-2 max-w-xl mx-auto">
			{projectsPage.emptyState.body}
		</p>
	</section>
{/if}

<!-- Project Grid -->
<section class="py-16 md:py-24">
	<div class="container">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each visibleProjects as project (project.id)}
				<div
					transition:scale={{ duration: 300, start: 0.95 }}
					role="button"
					tabindex="0"
					onclick={() => {
						posthog.capture("project_opened", {
							project_id: project.id,
							project_title: project.title
						})
						selectedProject = project
					}}
					onkeydown={e => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault()
							selectedProject = project
						}
					}}
					class="group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
				>
					<div class="aspect-[16/10] overflow-hidden">
						<img
							src={project.heroImage}
							alt={project.title}
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
					</div>
					<div class="p-5">
						<span class="text-[10px] font-display uppercase tracking-widest text-primary">
							{project.minorTags[0]}
						</span>
						<h3
							class="text-lg font-display uppercase tracking-tight mt-1 mb-2 group-hover:text-primary transition-colors"
						>
							{project.title}
						</h3>
						<p class="text-sm text-muted-foreground line-clamp-2">
							{project.description}
						</p>
						<div
							class="mt-4 flex items-center gap-1 text-xs text-primary font-display uppercase tracking-wider"
						>
							{projectsPage.card.ctaLabel}
							<ArrowRight class="w-3 h-3" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Project Detail Modal -->
{#if selectedProject}
	{const project = $derived(selectedProject)}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[100] bg-secondary/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
		role="presentation"
		onclick={() => (selectedProject = null)}
	>
		<div
			transition:fly={{ duration: 300, y: 40 }}
			class="bg-background rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl"
			role="dialog"
			aria-modal="true"
			aria-label={project.title}
			tabindex="-1"
			onclick={e => e.stopPropagation()}
			onkeydown={e => {
				if (e.key === "Escape") selectedProject = null
			}}
		>
			<!-- Modal Hero -->
			<div class="relative aspect-[21/9] overflow-hidden">
				<img src={project.heroImage} alt={project.title} class="w-full h-full object-cover" />
				<div class="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"></div>
				<button
					onclick={() => (selectedProject = null)}
					class="absolute top-4 right-4 bg-secondary/60 backdrop-blur-sm text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
				>
					<X class="w-5 h-5" />
				</button>
			</div>

			<div class="p-6 md:p-10">
				<span class="text-[10px] font-display uppercase tracking-widest text-primary">
					{[project.minorTags[0], project.location].filter(Boolean).join(" · ")}
				</span>
				<h2 class="text-2xl md:text-4xl font-display uppercase tracking-tight mt-2 mb-6">
					{project.title}
				</h2>
				<p class="text-muted-foreground leading-relaxed mb-8">
					{project.description}
				</p>

				<!-- Video -->
				{#if project.videoUrl}
					<div class="mb-8 aspect-video rounded-lg overflow-hidden bg-muted">
						<iframe
							src={project.videoUrl}
							title={`${project.title} video`}
							class="w-full h-full"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
							loading="lazy"
						></iframe>
					</div>
				{/if}

				<!-- Gallery -->
				{#if project.gallery.length > 0}
					<div>
						<h4 class="font-display uppercase text-sm tracking-wider mb-4">
							{projectsPage.modal.galleryHeading}
						</h4>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
							{#each project.gallery as img, i (img)}
								<button
									onclick={() => (lightboxImg = img)}
									class="aspect-[4/3] rounded-md overflow-hidden hover:ring-2 ring-primary transition-all"
								>
									<img
										src={img}
										alt={`${project.title} gallery ${i + 1}`}
										class="w-full h-full object-cover"
									/>
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- Lightbox -->
{#if lightboxImg}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4"
		role="presentation"
		onclick={() => (lightboxImg = null)}
	>
		<button
			onclick={() => (lightboxImg = null)}
			class="absolute top-4 right-4 text-white/80 hover:text-white"
		>
			<X class="w-8 h-8" />
		</button>
		<img
			src={lightboxImg}
			alt="Full size"
			class="max-w-full max-h-[90vh] object-contain rounded-md"
		/>
	</div>
{/if}
