/**
 * Builds a /projects path with optional major/minor filter query params.
 *
 * @param filters   Optional object with `major` and/or `minor` tag values
 * @returns         "/projects" unchanged when no filters, otherwise "/projects?major=...&minor=..."
 *
 * @example
 * buildProjectsPath({ minor: "Plumbing" })                    // "/projects?minor=Plumbing"
 * buildProjectsPath({ major: "Commercial", minor: "Plumbing" }) // "/projects?major=Commercial&minor=Plumbing"
 * buildProjectsPath()                                          // "/projects"
 * buildProjectsPath({})                                        // "/projects"
 */
export function buildProjectsPath(filters?: { major?: string; minor?: string }): string {
	if (!filters) return "/projects"
	const params = new URLSearchParams()
	if (filters.major) params.set("major", filters.major)
	if (filters.minor) params.set("minor", filters.minor)
	const qs = params.toString()
	return qs ? `/projects?${qs}` : "/projects"
}
