import { Nav, NAV_COLORS } from "@/data/enums";
import { ConciergeBellIcon, MenuIcon, MessageCircleHeartIcon, ReceiptIcon } from "lucide-react";
import cn from 'classnames'

const NavIcons = {
	[Nav.RECEIPT]: ReceiptIcon,
	[Nav.ORDER]: ConciergeBellIcon,
	[Nav.MENU]: MenuIcon,
	[Nav.SURVEY]: MessageCircleHeartIcon
}

export function NavIcon({ nav }: { nav: Nav }) {
	const Icon = NavIcons[nav]
	return <Icon className={cn('text-lg', NAV_COLORS[nav])} />
}