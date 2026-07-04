import type { Attachment } from "svelte/attachments"

export interface RevealOptions {
	/** Delay in seconds before the reveal transition starts. */
	delay?: number
	/** Initial translate-y offset in pixels. */
	y?: number
}

/**
 * Scroll-reveal attachment replicating the old framer-motion
 * `whileInView` pattern: fade in + translate up once the element enters
 * the viewport. Reveals immediately when `prefers-reduced-motion` is set.
 *
 * Usage: `<div {@attach reveal({ delay: 0.2 })}>…</div>`
 */
export function reveal({ delay = 0, y = 24 }: RevealOptions = {}): Attachment<HTMLElement> {
	return element => {
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

		if (reduceMotion || typeof IntersectionObserver === "undefined") {
			return
		}

		element.style.opacity = "0"
		element.style.transform = `translateY(${y}px)`
		element.style.transition = `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`

		const show = () => {
			element.style.opacity = "1"
			element.style.transform = "translateY(0)"
		}

		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						show()
						observer.unobserve(entry.target)
					}
				}
			},
			{ threshold: 0.1 }
		)

		observer.observe(element)

		return () => {
			observer.disconnect()
		}
	}
}
