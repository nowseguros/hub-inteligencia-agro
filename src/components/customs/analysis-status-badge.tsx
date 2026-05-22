import { cn } from "@/lib/utils";
import type { AnalysisStatus } from "@/types/analysis";

const statusConfig: Record<
	AnalysisStatus,
	{ label: string; bg: string; text: string }
> = {
	"Resultado Total": {
		label: "Resultado Total",
		bg: "bg-[#daf6db]",
		text: "text-[#00c507]",
	},
	"Resultado Parcial": {
		label: "Resultado Parcial",
		bg: "bg-[#d3f1f9]",
		text: "text-[#1ea1c4]",
	},
	"Em Análise": {
		label: "Em Análise",
		bg: "bg-[#fff4d3]",
		text: "text-[#e0a800]",
	},
};

interface AnalysisStatusBadgeProps {
	status: AnalysisStatus;
	className?: string;
}

export function AnalysisStatusBadge({
	status,
	className,
}: AnalysisStatusBadgeProps) {
	const config = statusConfig[status];
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center rounded-[20px] px-3 py-0.5 text-[11px]",
				config.bg,
				config.text,
				className,
			)}
		>
			{config.label}
		</span>
	);
}
