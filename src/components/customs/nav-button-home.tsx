import { Link } from "@tanstack/react-router";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonHomeProps {
	className?: string;
}

export function NavButtonHome({ className }: NavButtonHomeProps) {
	return (
		<Button
			asChild
			variant="ghost"
			className={cn(
				"flex items-center gap-3 px-2 font-bold text-[#252525] text-base",
				className,
			)}
		>
			<Link to="/">
				<House size={24} strokeWidth={1.5} />
				<span>Home</span>
			</Link>
		</Button>
	);
}
