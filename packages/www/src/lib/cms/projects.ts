export interface Project {
	id: string
	order: number
	title: string
	majorTags: string[]
	minorTags: string[]
	heroImage: string
	gallery: string[]
	videoUrl: string // "" when not set in CMS
	description: string
	location: string
}

const projectModules = import.meta.glob<Project>("./projects/*.json", {
	eager: true,
	import: "default"
})

export const projects: Project[] = Object.values(projectModules).sort(
	(a, b) => a.order - b.order || a.id.localeCompare(b.id)
)
