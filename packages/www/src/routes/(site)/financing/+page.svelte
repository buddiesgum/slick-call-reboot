<script lang="ts">
	import { ArrowRight, Calculator } from "@lucide/svelte"
	import type { Attachment } from "svelte/attachments"
	import Seo from "$lib/components/Seo.svelte"
	import { reveal } from "$lib/attachments/reveal"
	import { getIcon } from "$lib/icons"
	import data from "$lib/cms/financing-page.json"

	const { hero, benefits, calculator, cta } = data

	/*
	 * pulled almost directly from https://www.enhancify.com/paymentcalculatorwidget/
	 */
	function loadPaymentCalculatorWidget(container: HTMLElement, signal: AbortSignal): void {
		const xhr = new XMLHttpRequest()
		signal.addEventListener("abort", () => xhr.abort())
		const params =
			"&defaultScheme=" +
			encodeURIComponent(container.dataset.defaultscheme ?? "") +
			"&color1=" +
			encodeURIComponent(container.dataset.color1 ?? "") +
			"&color2=" +
			encodeURIComponent(container.dataset.color2 ?? "") +
			"&coBrandedColor=" +
			encodeURIComponent(container.dataset.cobrandedcolor ?? "") +
			"&page=" +
			encodeURIComponent(container.dataset.page ?? "") +
			"&border=" +
			encodeURIComponent(container.dataset.border ?? "") +
			"&hideLink=" +
			encodeURIComponent(container.dataset.hidelink ?? "")
		const s = document.createElement("script")
		s.type = "text/javascript"
		s.src = "https://www.enhancify.com/build/js/paymentcalculatorwidget.js"
		container.append(s)
		const style = document.createElement("style")
		style.innerText =
			"@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;700;900&display=swap');"
		container.append(style)
		s.onload = function () {
			if (signal.aborted) return
			xhr.open("GET", "https://www.enhancify.com?siteaction=paymentcalculatorwidget" + params)
			xhr.send()
			xhr.onload = function () {
				if (signal.aborted) return
				if (xhr.status == 200) {
					const script_tag = document.createElement("script")
					script_tag.type = "text/javascript"
					script_tag.text = xhr.response
					container.append(script_tag)
				}
			}
		}
	}

	const paymentCalculator: Attachment<HTMLElement> = element => {
		const controller = new AbortController()
		loadPaymentCalculatorWidget(element, controller.signal)
		return () => controller.abort()
	}

	function scrollToCalculator(e: MouseEvent) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
		e.preventDefault()
		document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" })
		history.replaceState(null, "", "#calculator")
	}
</script>

<Seo route="/financing" seoBlock={data.seo} />

<!-- HERO -->
<section class="relative min-h-[55vh] flex items-center overflow-hidden">
	<div
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url({hero.image})"
		role="img"
		aria-label={hero.imageAlt}
	></div>
	<div
		class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40"
	></div>
	<div class="container relative z-10 py-20">
		<div {@attach reveal({ y: 30 })} class="max-w-2xl">
			<span class="inline-block text-primary font-display uppercase tracking-wider text-sm mb-4">
				{hero.eyebrow}
			</span>
			<h1
				class="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]"
			>
				{hero.title} <span class="text-primary">{hero.titleAccent}</span>
			</h1>
			<p class="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-lg">
				{hero.description}
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href={hero.primaryCta.path}
					class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
				>
					{hero.primaryCta.label}
					<ArrowRight class="w-4 h-4" />
				</a>
				<a
					href="#calculator"
					onclick={scrollToCalculator}
					class="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
				>
					{hero.secondaryCta.label}
					<Calculator class="w-4 h-4" />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- BENEFITS -->
<section class="py-16 md:py-20 bg-background">
	<div class="container">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each benefits.items as b, i (b.title)}
				{const BenefitIcon = getIcon(b.icon)}
				<div
					{@attach reveal({ delay: i * 0.08, y: 20 })}
					class="border border-border bg-card p-8 rounded-sm"
				>
					<BenefitIcon class="w-8 h-8 text-primary mb-4" />
					<h3 class="font-display uppercase text-lg tracking-wider text-foreground mb-2">
						{b.title}
					</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">{b.copy}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CALCULATOR WIDGET -->
<section id="calculator" class="py-16 md:py-24 section-dark">
	<div class="container">
		<div class="max-w-3xl mx-auto text-center mb-10">
			<h2 class="text-3xl md:text-5xl font-display uppercase tracking-tight">
				{calculator.heading} <span class="text-primary">{calculator.headingAccent}</span>
			</h2>
			<p class="mt-4 text-primary-foreground/70">{calculator.description}</p>
		</div>
		<div class="max-w-3xl mx-auto bg-background rounded-sm p-4 md:p-6 shadow-xl">
			<div
				{@attach paymentCalculator}
				id="paymentcalculatorwidget"
				data-defaultscheme="false"
				data-color1={calculator.color1}
				data-color2={calculator.color2}
				data-cobrandedcolor={calculator.coBrandedColor}
				data-border={String(calculator.border)}
				data-page={calculator.page}
				data-hidelink={calculator.hideLink}
			></div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-20 bg-primary">
	<div class="container text-center">
		<h2
			class="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4"
		>
			{cta.heading}
		</h2>
		<p class="text-primary-foreground/80 max-w-xl mx-auto mb-8">{cta.description}</p>
		<a
			href={cta.path}
			class="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
		>
			{cta.label}
			<ArrowRight class="w-4 h-4" />
		</a>
	</div>
</section>
