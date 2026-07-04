<script lang="ts">
	import { page } from "$app/state"
	import type { Attachment } from "svelte/attachments"
	import { SvelteSet } from "svelte/reactivity"
	import { fly, slide } from "svelte/transition"
	import Menu from "@lucide/svelte/icons/menu"
	import ChevronDown from "@lucide/svelte/icons/chevron-down"
	import ChevronRight from "@lucide/svelte/icons/chevron-right"
	import * as Sheet from "$lib/components/ui/sheet"
	import LocationSelector from "$lib/components/LocationSelector.svelte"
	import headerData from "$lib/cms/header.json"

	type NavItem = {
		label: string
		path: string
		children?: NavItem[]
	}

	/** Recursively collect all descendant paths of a nav item (including its own). */
	function collectPaths(item: NavItem): string[] {
		const paths = [item.path]
		if (item.children) {
			for (const child of item.children) {
				paths.push(...collectPaths(child))
			}
		}
		return paths
	}

	/** Return true if the current pathname lives anywhere inside this nav item's subtree. */
	function isActive(item: NavItem, pathname: string): boolean {
		return collectPaths(item).includes(pathname)
	}

	const nav = headerData.nav as NavItem[]
	const { banner, logo, cta, secondaryCta } = headerData

	let mobileOpen = $state(false)
	// Desktop: which top-level dropdown path is open
	let desktopOpen = $state<string | null>(null)
	// Desktop: which nested submenu path is open
	let desktopSubOpen = $state<string | null>(null)
	// Mobile: set of item ids whose accordion is expanded
	const mobileExpanded = new SvelteSet<string>()

	const pathname = $derived(page.url.pathname)

	function closeDesktop() {
		desktopOpen = null
		desktopSubOpen = null
	}

	const HOVER_CLOSE_DELAY = 200

	/** Hover open/close with a grace period: close only fires if the pointer is still gone at expiry. */
	function hoverIntent(root: HTMLElement, open: () => void, close: () => void) {
		let timer: ReturnType<typeof setTimeout> | undefined
		function onMouseenter() {
			clearTimeout(timer)
			open()
		}
		function onMouseleave() {
			clearTimeout(timer)
			timer = setTimeout(() => {
				if (!root.matches(":hover")) close()
			}, HOVER_CLOSE_DELAY)
		}
		root.addEventListener("mouseenter", onMouseenter)
		root.addEventListener("mouseleave", onMouseleave)
		return () => {
			clearTimeout(timer)
			root.removeEventListener("mouseenter", onMouseenter)
			root.removeEventListener("mouseleave", onMouseleave)
		}
	}

	/** Top-level dropdown: hover intent + outside-mousedown dismiss (immediate). */
	function desktopDropdown(path: string): Attachment<HTMLElement> {
		return root => {
			const cleanupHover = hoverIntent(
				root,
				() => (desktopOpen = path),
				() => desktopOpen === path && closeDesktop()
			)
			function onDocumentMousedown(e: MouseEvent) {
				if (desktopOpen === path && !root.contains(e.target as Node)) closeDesktop()
			}
			document.addEventListener("mousedown", onDocumentMousedown)
			return () => {
				cleanupHover()
				document.removeEventListener("mousedown", onDocumentMousedown)
			}
		}
	}

	/** Nested flyout: hover intent only (outside-click is covered by the parent). */
	function desktopSubmenu(path: string): Attachment<HTMLElement> {
		return root =>
			hoverIntent(
				root,
				() => (desktopSubOpen = path),
				() => desktopSubOpen === path && (desktopSubOpen = null)
			)
	}

	function toggleMobileExpanded(id: string) {
		if (mobileExpanded.has(id)) {
			mobileExpanded.delete(id)
		} else {
			mobileExpanded.add(id)
		}
	}

	function closeMobile() {
		mobileOpen = false
	}
</script>

<header class="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
	<!-- Banner bar -->
	{#if banner.enabled}
		<div>
			<div class="container flex justify-center py-1">
				<span class="text-[10px] sm:text-[11px] italic text-primary font-body tracking-wide">
					{banner.text}
				</span>
			</div>
		</div>
	{/if}

	<div class="container flex items-center justify-between h-14 md:h-18">
		<!-- Logo + Location -->
		<div class="flex items-center gap-4">
			<a href="/" class="flex-shrink-0">
				<img src={logo.image} alt={logo.alt} class="h-[46px] md:h-16 w-auto" />
			</a>
			<div class="hidden sm:block h-6 w-px bg-secondary-foreground/20"></div>
			<LocationSelector />
		</div>

		<!-- Desktop Nav -->
		<nav class="hidden lg:flex items-center gap-6">
			{#each nav as item (item.path)}
				{const hasChildren = !!item.children?.length}
				{const active = $derived(isActive(item, pathname))}

				{#if !hasChildren}
					<a
						href={item.path}
						class={`px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
							active ? "text-primary" : "text-secondary-foreground/80 hover:text-primary"
						}`}
					>
						{item.label}
					</a>
				{:else}
					{const isOpen = $derived(desktopOpen === item.path)}
					<div class="relative" role="presentation" {@attach desktopDropdown(item.path)}>
						<button
							onclick={() => (desktopOpen = isOpen ? null : item.path)}
							class={`flex items-center gap-1 px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
								active ? "text-primary" : "text-secondary-foreground/80 hover:text-primary"
							}`}
						>
							{item.label}
							<ChevronDown
								class={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
							/>
						</button>

						{#if isOpen}
							<div
								transition:fly={{ y: 4, duration: 150 }}
								class="absolute top-full left-0 mt-1 w-52 bg-popover border border-border rounded-md shadow-xl z-50"
							>
								{#each item.children ?? [] as child (child.path)}
									{const hasSub = !!child.children?.length}
									{const childActive = $derived(isActive(child, pathname))}
									{const subOpen = $derived(desktopSubOpen === child.path)}
									<div
										class="relative"
										role="presentation"
										{@attach hasSub ? desktopSubmenu(child.path) : undefined}
									>
										<a
											href={child.path}
											onclick={closeDesktop}
											class={`flex items-center justify-between px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors hover:bg-accent hover:text-primary ${
												childActive ? "text-primary bg-accent/50" : "text-popover-foreground"
											}`}
										>
											{child.label}
											{#if hasSub}
												<ChevronRight class="w-3.5 h-3.5 ml-2" />
											{/if}
										</a>

										<!-- Nested submenu -->
										{#if hasSub && subOpen}
											<div
												transition:fly={{ x: -4, duration: 150 }}
												class="absolute top-0 left-full w-56 bg-popover border border-border rounded-md shadow-xl overflow-hidden z-50"
											>
												{#each child.children ?? [] as sub (sub.path)}
													<a
														href={sub.path}
														onclick={closeDesktop}
														class={`block px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors hover:bg-accent hover:text-primary ${
															pathname === sub.path ?
																"text-primary bg-accent/50"
															:	"text-popover-foreground"
														}`}
													>
														{sub.label}
													</a>
												{/each}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			{/each}

			<a
				href={cta.path}
				class="ml-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
			>
				{cta.label}
			</a>
			<a
				href={secondaryCta.path}
				class={`ml-1 inline-flex items-center gap-2 border-2 px-5 py-2 font-display uppercase text-sm tracking-wider transition-colors rounded-sm ${
					pathname === secondaryCta.path ?
						"border-primary text-primary"
					:	"border-primary/60 text-secondary-foreground/90 hover:border-primary hover:text-primary"
				}`}
			>
				{secondaryCta.label}
			</a>
		</nav>

		<!-- Mobile menu (Sheet) -->
		<Sheet.Root bind:open={mobileOpen}>
			<Sheet.Trigger class="lg:hidden text-secondary-foreground p-2" aria-label="Toggle menu">
				<Menu class="w-6 h-6" />
			</Sheet.Trigger>
			<Sheet.Content side="right" class="bg-secondary border-secondary w-80 overflow-y-auto">
				<nav class="flex flex-col py-8 gap-1">
					{#each nav as item, i (item.path)}
						{const id = String(i)}
						{const hasChildren = !!item.children?.length}
						{const active = $derived(isActive(item, pathname))}
						{const expanded = $derived(mobileExpanded.has(id))}

						{#if !hasChildren}
							<a
								href={item.path}
								onclick={closeMobile}
								class={`px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
									active ? "text-primary" : "text-secondary-foreground/80 hover:text-primary"
								}`}
							>
								{item.label}
							</a>
						{:else}
							<div>
								<button
									onclick={() => toggleMobileExpanded(id)}
									class={`w-full flex items-center justify-between px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
										active ? "text-primary" : "text-secondary-foreground/80"
									}`}
								>
									{item.label}
									<ChevronDown
										class={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
									/>
								</button>

								{#if expanded}
									<div transition:slide={{ duration: 200 }} class="overflow-hidden">
										{#each item.children ?? [] as child, j (child.path)}
											{const childId = `${id}.${j}`}
											{const hasSub = !!child.children?.length}
											{const childActive = $derived(isActive(child, pathname))}
											{const childExpanded = $derived(mobileExpanded.has(childId))}

											{#if !hasSub}
												<a
													href={child.path}
													onclick={closeMobile}
													class={`block pl-8 pr-4 py-2.5 font-display text-sm uppercase tracking-wider transition-colors ${
														childActive ? "text-primary" : (
															"text-secondary-foreground/60 hover:text-primary"
														)
													}`}
												>
													{child.label}
												</a>
											{:else}
												<div>
													<button
														onclick={() => toggleMobileExpanded(childId)}
														class={`w-full flex items-center justify-between pl-8 pr-4 py-2.5 font-display text-sm uppercase tracking-wider transition-colors ${
															childActive ? "text-primary" : (
																"text-secondary-foreground/60 hover:text-primary"
															)
														}`}
													>
														{child.label}
														<ChevronDown
															class={`w-4 h-4 transition-transform ${childExpanded ? "rotate-180" : ""}`}
														/>
													</button>
													{#if childExpanded}
														<div transition:slide={{ duration: 200 }} class="overflow-hidden">
															{#each child.children ?? [] as sub (sub.path)}
																<a
																	href={sub.path}
																	onclick={closeMobile}
																	class={`block pl-12 pr-4 py-2 font-display text-xs uppercase tracking-wider transition-colors ${
																		pathname === sub.path ?
																			"text-primary"
																		:	"text-secondary-foreground/50 hover:text-primary"
																	}`}
																>
																	{sub.label}
																</a>
															{/each}
														</div>
													{/if}
												</div>
											{/if}
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					{/each}

					<a
						href={cta.path}
						onclick={closeMobile}
						class="mx-4 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-display uppercase text-sm tracking-wider rounded-sm"
					>
						{cta.label}
					</a>
					<a
						href={secondaryCta.path}
						onclick={closeMobile}
						class="mx-4 mt-2 inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-5 py-3 font-display uppercase text-sm tracking-wider rounded-sm"
					>
						{secondaryCta.label}
					</a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>
