import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Phone, Menu, X, ChevronDown, ChevronRight, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import LocationSelector from "./LocationSelector"
import { useLocationContext } from "@/context/location-context"
import headerData from "@/cms/header.json"
import footerData from "@/cms/footer.json"

// ---------------------------------------------------------------------------
// Types derived from header.json shape
// ---------------------------------------------------------------------------

type NavItem = {
	label: string
	path: string
	children?: NavItem[]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [mobileOpen, setMobileOpen] = useState(false)
	// Desktop: track which top-level dropdown path is open
	const [desktopOpen, setDesktopOpen] = useState<string | null>(null)
	// Desktop: track which nested submenu path is open
	const [desktopSubOpen, setDesktopSubOpen] = useState<string | null>(null)
	// Mobile: Set of item paths whose accordion is expanded
	const [mobileExpanded, setMobileExpanded] = useState<Set<string>>(new Set())
	const location = useLocation()
	const { selected: currentLocation } = useLocationContext()
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDesktopOpen(null)
				setDesktopSubOpen(null)
			}
		}
		document.addEventListener("mousedown", handler)
		return () => document.removeEventListener("mousedown", handler)
	}, [])

	const toggleMobileExpanded = (id: string) => {
		setMobileExpanded((prev) => {
			const next = new Set(prev)
			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}
			return next
		})
	}

	const nav = headerData.nav as NavItem[]
	const { banner, logo, cta, secondaryCta } = headerData

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
				{/* Banner bar */}
				{banner.enabled && (
					<div>
						<div className="container flex justify-center py-1">
							<span className="text-[10px] sm:text-[11px] italic text-primary font-body tracking-wide">
								{banner.text}
							</span>
						</div>
					</div>
				)}

				<div className="container flex items-center justify-between h-14 md:h-18">
					{/* Logo + Location */}
					<div className="flex items-center gap-4">
						<Link to="/" className="flex-shrink-0">
							<img src={logo.image} alt={logo.alt} className="h-[46px] md:h-16 w-auto" />
						</Link>
						<div className="hidden sm:block h-6 w-px bg-secondary-foreground/20" />
						<LocationSelector />
					</div>

					{/* Desktop Nav */}
					<nav className="hidden lg:flex items-center gap-6">
						{nav.map((item) => {
							const hasChildren = !!item.children?.length
							const active = isActive(item, location.pathname)

							if (!hasChildren) {
								return (
									<Link
										key={item.path}
										to={item.path}
										className={`px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
											active ? "text-primary" : "text-secondary-foreground/80 hover:text-primary"
										}`}
									>
										{item.label}
									</Link>
								)
							}

							// Dropdown item
							const isOpen = desktopOpen === item.path
							return (
								<div
									key={item.path}
									ref={dropdownRef}
									className="relative"
									onMouseEnter={() => setDesktopOpen(item.path)}
									onMouseLeave={() => {
										setDesktopOpen(null)
										setDesktopSubOpen(null)
									}}
								>
									<button
										onClick={() => setDesktopOpen(isOpen ? null : item.path)}
										className={`flex items-center gap-1 px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
											active ? "text-primary" : "text-secondary-foreground/80 hover:text-primary"
										}`}
									>
										{item.label}
										<ChevronDown
											className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
										/>
									</button>

									<AnimatePresence>
										{isOpen && (
											<motion.div
												initial={{ opacity: 0, y: 4 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 4 }}
												transition={{ duration: 0.15 }}
												className="absolute top-full left-0 mt-1 w-52 bg-popover border border-border rounded-md shadow-xl z-50"
											>
												{item.children!.map((child) => {
													const hasSub = !!child.children?.length
													const childActive = isActive(child, location.pathname)
													const subOpen = desktopSubOpen === child.path
													return (
														<div
															key={child.path}
															className="relative"
															onMouseEnter={() => hasSub && setDesktopSubOpen(child.path)}
															onMouseLeave={() => hasSub && setDesktopSubOpen(null)}
														>
															<Link
																to={child.path}
																onClick={() => {
																	setDesktopOpen(null)
																	setDesktopSubOpen(null)
																}}
																className={`flex items-center justify-between px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors hover:bg-accent hover:text-primary ${
																	childActive ?
																		"text-primary bg-accent/50"
																	:	"text-popover-foreground"
																}`}
															>
																{child.label}
																{hasSub && <ChevronRight className="w-3.5 h-3.5 ml-2" />}
															</Link>

															{/* Nested submenu */}
															{hasSub && (
																<AnimatePresence>
																	{subOpen && (
																		<motion.div
																			initial={{ opacity: 0, x: -4 }}
																			animate={{ opacity: 1, x: 0 }}
																			exit={{ opacity: 0, x: -4 }}
																			transition={{ duration: 0.15 }}
																			className="absolute top-0 left-full w-56 bg-popover border border-border rounded-md shadow-xl overflow-hidden z-50"
																		>
																			{child.children!.map((sub) => (
																				<Link
																					key={sub.path}
																					to={sub.path}
																					onClick={() => {
																						setDesktopOpen(null)
																						setDesktopSubOpen(null)
																					}}
																					className={`block px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors hover:bg-accent hover:text-primary ${
																						location.pathname === sub.path ?
																							"text-primary bg-accent/50"
																						:	"text-popover-foreground"
																					}`}
																				>
																					{sub.label}
																				</Link>
																			))}
																		</motion.div>
																	)}
																</AnimatePresence>
															)}
														</div>
													)
												})}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							)
						})}

					<Link
						to={cta.path}
						className="ml-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
					>
						{cta.label}
					</Link>
					<Link
						to={secondaryCta.path}
						className={`ml-1 inline-flex items-center gap-2 border-2 px-5 py-2 font-display uppercase text-sm tracking-wider transition-colors rounded-sm ${
							location.pathname === secondaryCta.path ?
								"border-primary text-primary"
							:	"border-primary/60 text-secondary-foreground/90 hover:border-primary hover:text-primary"
						}`}
					>
						{secondaryCta.label}
					</Link>
				</nav>

					{/* Mobile menu button */}
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className="lg:hidden text-secondary-foreground p-2"
						aria-label="Toggle menu"
					>
						{mobileOpen ?
							<X className="w-6 h-6" />
						:	<Menu className="w-6 h-6" />}
					</button>
				</div>

				{/* Mobile Nav */}
				<AnimatePresence>
					{mobileOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="lg:hidden overflow-hidden bg-secondary"
						>
							<nav className="container flex flex-col py-4 gap-1">
								{nav.map((item, i) => {
									const id = String(i)
									const hasChildren = !!item.children?.length
									const active = isActive(item, location.pathname)
									const expanded = mobileExpanded.has(id)

									if (!hasChildren) {
										return (
											<Link
												key={id}
												to={item.path}
												onClick={() => setMobileOpen(false)}
												className={`px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
													active ? "text-primary" : (
														"text-secondary-foreground/80 hover:text-primary"
													)
												}`}
											>
												{item.label}
											</Link>
										)
									}

									return (
										<div key={id}>
											<button
												onClick={() => toggleMobileExpanded(id)}
												className={`w-full flex items-center justify-between px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
													active ? "text-primary" : "text-secondary-foreground/80"
												}`}
											>
												{item.label}
												<ChevronDown
													className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
												/>
											</button>

											<AnimatePresence>
												{expanded && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{ duration: 0.2 }}
														className="overflow-hidden"
													>
														{item.children!.map((child, j) => {
															const childId = `${id}.${j}`
															const hasSub = !!child.children?.length
															const childActive = isActive(child, location.pathname)
															const childExpanded = mobileExpanded.has(childId)

															if (!hasSub) {
																return (
																	<Link
																		key={childId}
																		to={child.path}
																		onClick={() => setMobileOpen(false)}
																		className={`block pl-8 pr-4 py-2.5 font-display text-sm uppercase tracking-wider transition-colors ${
																			childActive ? "text-primary" : (
																				"text-secondary-foreground/60 hover:text-primary"
																			)
																		}`}
																	>
																		{child.label}
																	</Link>
																)
															}

															return (
																<div key={childId}>
																	<button
																		onClick={() => toggleMobileExpanded(childId)}
																		className={`w-full flex items-center justify-between pl-8 pr-4 py-2.5 font-display text-sm uppercase tracking-wider transition-colors ${
																			childActive ? "text-primary" : (
																				"text-secondary-foreground/60 hover:text-primary"
																			)
																		}`}
																	>
																		{child.label}
																		<ChevronDown
																			className={`w-4 h-4 transition-transform ${childExpanded ? "rotate-180" : ""}`}
																		/>
																	</button>
																	<AnimatePresence>
																		{childExpanded && (
																			<motion.div
																				initial={{ height: 0, opacity: 0 }}
																				animate={{ height: "auto", opacity: 1 }}
																				exit={{ height: 0, opacity: 0 }}
																				transition={{ duration: 0.2 }}
																				className="overflow-hidden"
																			>
																				{child.children!.map((sub) => (
																					<Link
																						key={sub.path}
																						to={sub.path}
																						onClick={() => setMobileOpen(false)}
																						className={`block pl-12 pr-4 py-2 font-display text-xs uppercase tracking-wider transition-colors ${
																							location.pathname === sub.path ?
																								"text-primary"
																							:	"text-secondary-foreground/50 hover:text-primary"
																						}`}
																					>
																						{sub.label}
																					</Link>
																				))}
																			</motion.div>
																		)}
																	</AnimatePresence>
																</div>
															)
														})}
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									)
								})}

							<Link
								to={cta.path}
								onClick={() => setMobileOpen(false)}
								className="mx-4 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-display uppercase text-sm tracking-wider rounded-sm"
							>
								{cta.label}
							</Link>
							<Link
								to={secondaryCta.path}
								onClick={() => setMobileOpen(false)}
								className="mx-4 mt-2 inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-5 py-3 font-display uppercase text-sm tracking-wider rounded-sm"
							>
								{secondaryCta.label}
							</Link>
						</nav>
						</motion.div>
					)}
				</AnimatePresence>
			</header>

			{/* Main Content */}
			<main className="flex-1">{children}</main>

			{/* Footer */}
			<footer className="section-dark py-12">
				<div className="container">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						<div>
							<img
								src={footerData.logo.image}
								alt={footerData.logo.alt}
								className="h-[67px] w-auto mb-4"
							/>
							<p className="text-sm opacity-70 leading-relaxed">{footerData.tagline}</p>
						</div>
						<div>
							<h4 className="font-display uppercase text-sm tracking-wider mb-4 text-primary">
								{footerData.services.heading}
							</h4>
							<div className="flex flex-col gap-2">
								{footerData.services.links.map((link) => (
									<Link
										key={link.path}
										to={link.path}
										className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
						<div>
							<h4 className="font-display uppercase text-sm tracking-wider mb-4 text-primary">
								{footerData.company.heading}
							</h4>
							<div className="flex flex-col gap-2">
								{footerData.company.links.map((link) => (
									<Link
										key={link.path}
										to={link.path}
										className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
						<div>
							<h4 className="font-display uppercase text-sm tracking-wider mb-4 text-primary">
								{footerData.contact.heading} — {currentLocation.label}
							</h4>
							<div className="flex flex-col gap-3">
								<div className="flex items-start gap-2 text-sm opacity-70">
									<MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
									<span>{currentLocation.address}</span>
								</div>
								<a
									href={currentLocation.phone}
									className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
								>
									<Phone className="w-4 h-4" />
									{currentLocation.phoneDisplay}
								</a>
							</div>
						</div>
					</div>
					<div className="mt-10 pt-6 border-t border-muted-foreground/20 text-center text-xs opacity-50">
						{footerData.copyrightPrefix} {new Date().getFullYear()} {footerData.copyrightSuffix}
					</div>
				</div>
			</footer>

			{/* Sticky Call Button */}
			<a
				href={currentLocation.phone}
				className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
				aria-label="Call Hukill's"
			>
				<span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
				<Phone className="w-6 h-6 relative z-10" />
			</a>
		</div>
	)
}

export default Layout
