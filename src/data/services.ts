import {
	Building2,
	Droplets,
	Flame,
	Hammer,
	HardHat,
	Home,
	Landmark,
	Mountain,
	Search,
	Shield,
	ShowerHead,
	Wrench,
	type LucideIcon
} from "lucide-react"
import aboutHero from "@/assets/about-hero.jpg"
import aboutMission from "@/assets/about-mission.jpg"
import aboutValues from "@/assets/about-values.jpg"
import aboutVision from "@/assets/about-vision.jpg"

export type ServiceTile = {
	icon: LucideIcon
	title: string
	desc: string
	path: string
	image: string
}

export const featuredServices: ServiceTile[] = [
	{
		icon: Wrench,
		title: "Plumbing",
		desc: "Repairs, replacements, trenchless technology and more.",
		path: "/plumbing",
		image: aboutMission
	},
	{
		icon: Building2,
		title: "Commercial Plumbing",
		desc: "Large-scale water, sewer, septic, excavation, and utility work.",
		path: "/commercial-plumbing",
		image: aboutHero
	},
	{
		icon: Mountain,
		title: "Excavation",
		desc: "Trenching, septic prep, demolition and underground work.",
		path: "/excavation",
		image: aboutVision
	},
	{
		icon: Shield,
		title: "Restoration",
		desc: "Water, fire, and storm damage restoration — 24/7.",
		path: "/restoration",
		image: aboutValues
	},
	{
		icon: Home,
		title: "Remodels",
		desc: "Kitchens, baths, painting, cabinets and flooring.",
		path: "/remodels",
		image: aboutHero
	},
	{
		icon: Landmark,
		title: "Foundations",
		desc: "Push piers, crawl space repair, basement waterproofing.",
		path: "/foundations",
		image: aboutVision
	}
]

export const allServices: ServiceTile[] = [
	...featuredServices,
	{
		icon: ShowerHead,
		title: "Drain Cleaning",
		desc: "Clog removal, sewer cleaning, and dependable drain flow restoration.",
		path: "/drain-cleaning",
		image: aboutMission
	},
	{
		icon: Search,
		title: "Leak Detection",
		desc: "Targeted leak locating before small failures become expensive damage.",
		path: "/leak-detection",
		image: aboutValues
	},
	{
		icon: Flame,
		title: "Water Heaters",
		desc: "Water heater repair, replacement, maintenance, and installation.",
		path: "/water-heaters",
		image: aboutHero
	},
	{
		icon: Droplets,
		title: "Septic Services",
		desc: "Septic repairs, installs, sewer lines, and underground service work.",
		path: "/septic-services",
		image: aboutVision
	},
	{
		icon: HardHat,
		title: "New Build Plumbing",
		desc: "Ground-up plumbing systems for residential and commercial construction.",
		path: "/new-build-plumbing",
		image: aboutMission
	},
	{
		icon: Hammer,
		title: "Emergency Repairs",
		desc: "Urgent response when water, sewer, or structural issues cannot wait.",
		path: "/contact",
		image: aboutValues
	}
]
