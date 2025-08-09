//the nav button is the bas component for all the hovering view navigation buttons in the app.

import { Nav, NAV_COLORS, NAV_LABELS } from "@/data/enums"
import { NavIcon } from "./NavIcon"
import cn from 'classnames'

export type NavButtonProps = {
	nav: Nav,
}

export function NavButton({ nav }: NavButtonProps) {
	return <div className={cn(NAV_COLORS[nav])}>
		<NavIcon nav={nav} />
		<span className="font-bold">{NAV_LABELS[nav]}</span>
	</div>
}