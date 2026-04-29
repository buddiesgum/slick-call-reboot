import { describe, it, expect } from "vitest"
import { buildProjectsPath } from "./projects-link"

describe("buildProjectsPath", () => {
	it("returns /projects unchanged when filters are omitted", () => {
		expect(buildProjectsPath()).toBe("/projects")
	})

	it("returns /projects unchanged when filters object is empty", () => {
		expect(buildProjectsPath({})).toBe("/projects")
	})

	it("returns /projects unchanged when both filter values are empty strings", () => {
		expect(buildProjectsPath({ major: "", minor: "" })).toBe("/projects")
	})

	it("appends only minor when major is absent", () => {
		expect(buildProjectsPath({ minor: "Plumbing" })).toBe("/projects?minor=Plumbing")
	})

	it("appends only major when minor is absent", () => {
		expect(buildProjectsPath({ major: "Commercial" })).toBe("/projects?major=Commercial")
	})

	it("appends both params when both are provided", () => {
		const result = buildProjectsPath({ major: "Commercial", minor: "Plumbing" })
		expect(result).toBe("/projects?major=Commercial&minor=Plumbing")
	})

	it("URL-encodes special characters", () => {
		const result = buildProjectsPath({ minor: "Water & Fire" })
		expect(result).toBe("/projects?minor=Water+%26+Fire")
	})
})
