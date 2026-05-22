import { Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const tempChartImg =
	"https://www.figma.com/api/mcp/asset/96b2398f-9ba5-4a2a-97d6-a6a7d51390e6";
const rainSolarChartImg =
	"https://www.figma.com/api/mcp/asset/34450435-dab3-4d9d-b89c-856f05ca0f7b";

type ChartView = "pluviometrico" | "solar" | "ambos";

const viewOptions: { value: ChartView; label: string }[] = [
	{ value: "pluviometrico", label: "Visualizar índice pluviométrico" },
	{ value: "solar", label: "Visualizar índice solar" },
	{ value: "ambos", label: "Visualizar índice pluviométrico e solar" },
];

const chartLegend: {
	value: ChartView | "ambos";
	label: string;
	color: string;
}[] = [
	{ value: "pluviometrico", label: "Índice Pluviométrico", color: "#66cfeb" },
	{ value: "solar", label: "Índice Solar", color: "#00ae8d" },
];

export function ClimateInfoCard() {
	const [chartView, setChartView] = useState<ChartView>("ambos");

	const activeOption = viewOptions.find((o) => o.value === chartView);

	return (
		<div className="flex flex-col gap-5 rounded-[15px] bg-[#fafafa] p-5">
			<h2 className="text-[16px] font-bold text-[#252525]">
				Informações do Clima
			</h2>

			<div className="rounded-[15px] bg-white p-5 shadow-[4px_4px_4px_0px_rgba(138,138,138,0.3)]">
				<div className="flex flex-col gap-6">
					<div className="flex items-center gap-3">
						<span className="text-[14px] font-bold text-[#252525]">
							Área (ha):
						</span>
						<Input
							placeholder=""
							className="h-[36px] w-[170px] rounded-[10px] border-[rgba(138,138,138,0.3)] text-sm"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<h3 className="text-[14px] font-bold text-[#252525]">
							Temperatura
						</h3>
						<div className="overflow-hidden rounded-[10px]">
							<img
								src={tempChartImg}
								alt="Gráfico de temperatura"
								className="h-[335px] w-full object-cover"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<h3 className="text-[14px] font-bold text-[#252525]">
								Índice Pluviométrico e Índice Solar
							</h3>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										size="sm"
										className="h-[36px] gap-2 rounded-[10px] border-[rgba(138,138,138,0.3)] text-[13px] text-[#252525]"
									>
										<Filter size={13} strokeWidth={1.5} />
										{activeOption?.label ?? "Visualizar índices pluv. e solar"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-[254px] rounded-[5px]"
								>
									{viewOptions.map(({ value, label }) => (
										<DropdownMenuItem
											key={value}
											onClick={() => setChartView(value)}
											className={cn(
												"text-[11px] text-[#8a8a8a]",
												chartView === value && "font-semibold text-[#252525]",
											)}
										>
											{label}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className="overflow-hidden rounded-[10px]">
							<img
								src={rainSolarChartImg}
								alt="Gráfico de índice pluviométrico e solar"
								className="h-[335px] w-full object-cover"
							/>
						</div>

						<div className="flex items-center gap-6">
							{chartLegend
								.filter((l) => chartView === "ambos" || l.value === chartView)
								.map(({ label, color }) => (
									<div key={label} className="flex items-center gap-2">
										<div
											className="size-5 rounded-[2px]"
											style={{ backgroundColor: color }}
										/>
										<span className="text-[14px] font-bold text-[#252525]">
											{label}
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
