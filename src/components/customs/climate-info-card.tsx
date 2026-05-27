import { Filter } from "lucide-react";
import { useState } from "react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChartView = "pluviometrico" | "solar" | "ambos";

const viewOptions: { value: ChartView; label: string }[] = [
	{ value: "pluviometrico", label: "Visualizar índice pluviométrico" },
	{ value: "solar", label: "Visualizar índice solar" },
	{ value: "ambos", label: "Visualizar índice pluviométrico e solar" },
];

const chartLegend = [
	{ value: "pluviometrico" as ChartView, label: "Índice Pluviométrico", color: "#66cfeb" },
	{ value: "solar" as ChartView, label: "Índice Solar", color: "#00ae8d" },
];

// Dados mockados — substituir por dados reais da API
const tempData = [
	{ mes: "Jan", max: 32, min: 22 },
	{ mes: "Fev", max: 33, min: 23 },
	{ mes: "Mar", max: 31, min: 21 },
	{ mes: "Abr", max: 28, min: 18 },
	{ mes: "Mai", max: 25, min: 14 },
	{ mes: "Jun", max: 23, min: 12 },
	{ mes: "Jul", max: 23, min: 11 },
	{ mes: "Ago", max: 26, min: 13 },
	{ mes: "Set", max: 29, min: 16 },
	{ mes: "Out", max: 30, min: 19 },
	{ mes: "Nov", max: 31, min: 21 },
	{ mes: "Dez", max: 32, min: 22 },
];

const pluvSolarData = [
	{ mes: "Jan", pluviometrico: 210, solar: 5.8 },
	{ mes: "Fev", pluviometrico: 185, solar: 5.6 },
	{ mes: "Mar", pluviometrico: 160, solar: 5.2 },
	{ mes: "Abr", pluviometrico: 90, solar: 4.8 },
	{ mes: "Mai", pluviometrico: 55, solar: 4.2 },
	{ mes: "Jun", pluviometrico: 30, solar: 3.9 },
	{ mes: "Jul", pluviometrico: 25, solar: 4.1 },
	{ mes: "Ago", pluviometrico: 40, solar: 4.6 },
	{ mes: "Set", pluviometrico: 80, solar: 5.0 },
	{ mes: "Out", pluviometrico: 130, solar: 5.4 },
	{ mes: "Nov", pluviometrico: 175, solar: 5.7 },
	{ mes: "Dez", pluviometrico: 200, solar: 5.9 },
];

const AXIS_STYLE = { fontSize: 11, fill: "#8a8a8a" };
const GRID_STYLE = { vertical: false, stroke: "rgba(138,138,138,0.15)" };
const TOOLTIP_STYLE = {
	borderRadius: 8,
	border: "1px solid rgba(138,138,138,0.2)",
	fontSize: 12,
	color: "#252525",
};

export function ClimateInfoCard() {
	const [chartView, setChartView] = useState<ChartView>("ambos");

	const activeOption = viewOptions.find((o) => o.value === chartView);
	const showPluv = chartView === "ambos" || chartView === "pluviometrico";
	const showSolar = chartView === "ambos" || chartView === "solar";

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
							className="h-9 w-42.5 rounded-[10px] border-[rgba(138,138,138,0.3)] text-sm"
						/>
					</div>

					{/* Temperatura — AreaChart max/min */}
					<div className="flex flex-col gap-2">
						<h3 className="text-[14px] font-bold text-[#252525]">Temperatura</h3>
						<div className="rounded-[10px] border border-[rgba(138,138,138,0.15)] p-4" style={{ minHeight: "280px" }}>
							<ResponsiveContainer width="100%" height={280}>
								<AreaChart data={tempData}>
									<defs>
										<linearGradient id="gradMax" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
											<stop offset="95%" stopColor="#f97316" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="gradMin" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#66cfeb" stopOpacity={0.25} />
											<stop offset="95%" stopColor="#66cfeb" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid {...GRID_STYLE} />
									<XAxis dataKey="mes" axisLine={false} tickLine={false} tick={AXIS_STYLE} />
									<YAxis axisLine={false} tickLine={false} tick={AXIS_STYLE} width={36} unit="°" />
									<Tooltip
										contentStyle={TOOLTIP_STYLE}
										cursor={{ stroke: "rgba(138,138,138,0.2)" }}
										formatter={(v, name) => [
											`${v ?? ""}°C`,
											name === "max" ? "Máxima" : "Mínima",
										]}
									/>
									<Area
										type="monotone"
										dataKey="max"
										name="max"
										stroke="#f97316"
										strokeWidth={2}
										fill="url(#gradMax)"
										dot={false}
									/>
									<Area
										type="monotone"
										dataKey="min"
										name="min"
										stroke="#66cfeb"
										strokeWidth={2}
										fill="url(#gradMin)"
										dot={false}
									/>
								</AreaChart>
							</ResponsiveContainer>
							<div className="mt-2 flex items-center gap-6">
								<div className="flex items-center gap-2">
									<div className="h-0.75 w-5 rounded-full bg-[#f97316]" />
									<span className="text-[12px] text-[#8a8a8a]">Máxima</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-0.75 w-5 rounded-full bg-[#66cfeb]" />
									<span className="text-[12px] text-[#8a8a8a]">Mínima</span>
								</div>
							</div>
						</div>
					</div>

					{/* Pluviométrico e Solar — BarChart com filtro */}
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<h3 className="text-[14px] font-bold text-[#252525]">
								Índice Pluviométrico e Índice Solar
							</h3>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										size="sm"
										className="h-9 gap-2 rounded-[10px] border-[rgba(138,138,138,0.3)] text-[13px] text-[#252525]"
									>
										<Filter size={13} strokeWidth={1.5} />
										{activeOption?.label ?? "Visualizar índices pluv. e solar"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-63.5 rounded-[5px]">
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

						<div className="rounded-[10px] border border-[rgba(138,138,138,0.15)] p-4" style={{ minHeight: "280px" }}>
							<ResponsiveContainer width="100%" height={280}>
								<BarChart data={pluvSolarData} barCategoryGap="30%" barGap={4}>
									<CartesianGrid {...GRID_STYLE} />
									<XAxis dataKey="mes" axisLine={false} tickLine={false} tick={AXIS_STYLE} />
									<YAxis axisLine={false} tickLine={false} tick={AXIS_STYLE} width={36} />
									<Tooltip
										cursor={{ fill: "rgba(138,138,138,0.08)" }}
										contentStyle={TOOLTIP_STYLE}
									/>
									{showPluv && (
										<Bar
											dataKey="pluviometrico"
											name="Índice Pluviométrico"
											fill="#66cfeb"
											radius={[4, 4, 0, 0]}
										/>
									)}
									{showSolar && (
										<Bar
											dataKey="solar"
											name="Índice Solar"
											fill="#00ae8d"
											radius={[4, 4, 0, 0]}
										/>
									)}
								</BarChart>
							</ResponsiveContainer>
						</div>

						<div className="flex items-center gap-6">
							{chartLegend
								.filter((l) => chartView === "ambos" || l.value === chartView)
								.map(({ label, color }) => (
									<div key={label} className="flex items-center gap-2">
										<div className="size-5 rounded-xs" style={{ backgroundColor: color }} />
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
