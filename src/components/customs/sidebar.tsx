import { Link, useRouterState } from "@tanstack/react-router";
import { FilePlus, House } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import nowLogo from "@/assets/now-logo.svg";

const navItems = [
	{ label: "Home", icon: House, to: "/" },
	{ label: "Nova Análise", icon: FilePlus, to: "/nova-analise" },
] as const;

// Indicator vertical center is calculated from the aside top:
//   pt-12 (48px) + logo h-[37px] + gap-10 (40px) = 125px nav top
//   each item h-10 (40px), gap-5 (20px) between items
//   item 1 center: 125 + 20 = 145  →  indicator top = 145 - 16 = 129
//   item 2 center: 125 + 40 + 20 + 20 = 205  →  indicator top = 205 - 16 = 189
const indicatorTop: Record<string, string> = {
	"/": "129px",
	"/nova-analise": "177px",
};

export function Sidebar() {
	const { location } = useRouterState();
	const pathname = location.pathname;

	return (
		<aside className="relative flex w-[261px] shrink-0 flex-col gap-10 rounded-[20px] bg-[#fafafa] px-6 pb-6 pt-12">
			<div
				className="absolute left-0 h-8 w-[9px] rounded-r-[10px] bg-[#00ae8d] transition-all duration-300"
				style={{ top: indicatorTop[pathname] ?? indicatorTop["/"] }}
			/>

			<img
				src={nowLogo}
				alt="Now"
				className="h-[37px] w-[122px] object-contain"
			/>

			<nav className="flex flex-col gap-2">
				{navItems.map(({ label, icon: Icon, to }) => {
					const isActive = pathname === to;
					return (
						<Link
							key={to}
							to={to}
							className={cn(
								"flex h-10 items-center gap-3 px-2 text-base transition-colors",
								isActive
									? "font-bold text-[#00ae8d]"
									: "font-normal text-[#252525] hover:text-[#00ae8d]",
							)}
						>
							<Icon
								size={24}
								weight={isActive ? "fill" : "regular"}
								className={isActive ? "text-[#00ae8d]" : ""}
							/>
							{label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
