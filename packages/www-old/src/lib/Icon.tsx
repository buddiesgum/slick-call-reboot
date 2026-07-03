/**
 * Drop-in JSX wrapper for the icon registry.
 * Usage: <Icon name="Hammer" className="size-6" />
 *
 * Kept in a .tsx file (separate from icons.ts) so the
 * react-refresh/only-export-components rule stays satisfied.
 */
import type { SVGProps } from "react"
import { getIcon, type IconName } from "./icons"

export function Icon({ name, ...props }: { name: IconName | undefined } & SVGProps<SVGSVGElement>) {
	const Cmp = getIcon(name)
	return <Cmp {...(props as SVGProps<SVGSVGElement>)} />
}
