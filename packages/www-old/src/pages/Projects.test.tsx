import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Projects from "./Projects"

// Stub framer-motion to avoid layout/ResizeObserver issues in jsdom.
vi.mock("framer-motion", () => ({
	motion: new Proxy(
		{},
		{
			get:
				(_target, prop) =>
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				({ children, ...rest }: any) =>
					React.createElement(prop as string, rest, children)
		}
	),
	AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

// Stub Layout (needs HelmetProvider/QueryClientProvider) and Seo (needs HelmetProvider).
// We are only testing the filter logic, not the surrounding chrome.
vi.mock("@/components/Layout", () => ({
	default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))
vi.mock("@/components/Seo", () => ({
	default: () => null
}))

const renderProjects = (search = "") =>
	render(
		<MemoryRouter initialEntries={[`/projects${search}`]}>
			<Projects />
		</MemoryRouter>
	)

describe("Projects page — URL filter hydration", () => {
	it("shows all projects and 'All Projects' pill active when no params", () => {
		renderProjects()

		// All 3 project titles should be visible
		expect(screen.getByText("Foundation Repair — Fort Worth Residence")).toBeTruthy()
		expect(screen.getByText("Water Damage Restoration — Medford Office")).toBeTruthy()
		expect(screen.getByText("Full Kitchen Remodel — Historic Fort Worth Home")).toBeTruthy()

		// 'All Projects' major pill should have the active bg class
		const allMajorPill = screen.getByRole("button", { name: /all projects/i })
		expect(allMajorPill.className).toContain("bg-primary")
	})

	it("filters to Foundations projects when ?minor=Foundations", () => {
		renderProjects("?minor=Foundations")

		expect(screen.getByText("Foundation Repair — Fort Worth Residence")).toBeTruthy()
		expect(screen.queryByText("Water Damage Restoration — Medford Office")).toBeNull()
		expect(screen.queryByText("Full Kitchen Remodel — Historic Fort Worth Home")).toBeNull()

		// 'Foundations' minor pill should be active
		const foundationsPill = screen.getByRole("button", { name: /foundations/i })
		expect(foundationsPill.className).toContain("bg-primary")
	})

	it("filters to Commercial projects when ?major=Commercial", () => {
		renderProjects("?major=Commercial")

		expect(screen.getByText("Water Damage Restoration — Medford Office")).toBeTruthy()
		expect(screen.queryByText("Foundation Repair — Fort Worth Residence")).toBeNull()
		expect(screen.queryByText("Full Kitchen Remodel — Historic Fort Worth Home")).toBeNull()

		// 'Commercial' major pill should be active
		const commercialPill = screen.getByRole("button", { name: /commercial/i })
		expect(commercialPill.className).toContain("bg-primary")
	})

	it("silently falls back to All when ?major= is an unknown value", () => {
		renderProjects("?major=Bogus")

		// All projects shown
		expect(screen.getByText("Foundation Repair — Fort Worth Residence")).toBeTruthy()
		expect(screen.getByText("Water Damage Restoration — Medford Office")).toBeTruthy()
		expect(screen.getByText("Full Kitchen Remodel — Historic Fort Worth Home")).toBeTruthy()

		// 'All Projects' pill should be active, not 'Bogus' (which doesn't exist as a button)
		const allMajorPill = screen.getByRole("button", { name: /all projects/i })
		expect(allMajorPill.className).toContain("bg-primary")
	})

	it("shows the Septic pill even though no project currently uses it", () => {
		renderProjects()
		expect(screen.getByRole("button", { name: /septic/i })).toBeTruthy()
	})

	it("shows empty-state notice and full portfolio when filter has no matches (e.g. ?minor=Septic)", () => {
		renderProjects("?minor=Septic")

		// Empty-state copy visible
		expect(screen.getByText(/no projects yet in this category/i)).toBeTruthy()

		// Full portfolio still rendered below
		expect(screen.getByText("Foundation Repair — Fort Worth Residence")).toBeTruthy()
		expect(screen.getByText("Water Damage Restoration — Medford Office")).toBeTruthy()
		expect(screen.getByText("Full Kitchen Remodel — Historic Fort Worth Home")).toBeTruthy()

		// Septic pill still active
		const septicPill = screen.getByRole("button", { name: /septic/i })
		expect(septicPill.className).toContain("bg-primary")
	})
})

describe("Projects page — pill click updates filter", () => {
	it("clicking Residential major pill hides Commercial projects", () => {
		renderProjects()

		const residentialPill = screen.getByRole("button", { name: /residential/i })
		fireEvent.click(residentialPill)

		// Only residential projects should remain
		expect(screen.getByText("Foundation Repair — Fort Worth Residence")).toBeTruthy()
		expect(screen.getByText("Full Kitchen Remodel — Historic Fort Worth Home")).toBeTruthy()
		expect(screen.queryByText("Water Damage Restoration — Medford Office")).toBeNull()

		// Residential pill should now be active
		expect(residentialPill.className).toContain("bg-primary")
	})

	it("clicking 'All Projects' major pill after filtering restores all projects", () => {
		renderProjects("?major=Commercial")

		// Confirm filtered state
		expect(screen.queryByText("Foundation Repair — Fort Worth Residence")).toBeNull()

		const allMajorPill = screen.getByRole("button", { name: /all projects/i })
		fireEvent.click(allMajorPill)

		// All projects should be back
		expect(screen.getByText("Foundation Repair — Fort Worth Residence")).toBeTruthy()
		expect(screen.getByText("Water Damage Restoration — Medford Office")).toBeTruthy()
		expect(screen.getByText("Full Kitchen Remodel — Historic Fort Worth Home")).toBeTruthy()
	})
})
