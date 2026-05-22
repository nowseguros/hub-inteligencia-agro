import { UserCircle } from "@phosphor-icons/react";

interface AppNavbarProps {
	userName?: string;
	userRole?: string;
}

export function AppNavbar({
	userName = "Eduardo A.",
	userRole = "Agro",
}: AppNavbarProps) {
	return (
		<header className="flex h-[60px] items-center justify-end gap-3 rounded-[15px] bg-[#fafafa] px-6">
			<UserCircle size={40} weight="fill" className="text-[#00ae8d]" />
			<div>
				<p className="text-sm font-medium text-[#252525]">{userName}</p>
				<p className="text-[11px] text-[#8a8a8a]">{userRole}</p>
			</div>
		</header>
	);
}
