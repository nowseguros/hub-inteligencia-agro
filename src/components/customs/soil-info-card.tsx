import { HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import tipoSolo from "@/assets/tipo-solo.svg";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const landUseRows = [
	{
		ano: "2021",
		uso: "1º, 2º, 3º OU MAIS ANOS DE CULTIVO; ÁREA DE ABERTURA; POUSIO; CULTURA PERENE; CULTURA TEMPORÁRIA; MATA NATIVA",
	},
	{
		ano: "2022",
		uso: "1º, 2º, 3º OU MAIS ANOS DE CULTIVO; ÁREA DE ABERTURA; POUSIO; CULTURA PERENE; CULTURA TEMPORÁRIA; MATA NATIVA",
	},
	{
		ano: "2023",
		uso: "1º, 2º, 3º OU MAIS ANOS DE CULTIVO; ÁREA DE ABERTURA; POUSIO; CULTURA PERENE; CULTURA TEMPORÁRIA; MATA NATIVA",
	},
	{
		ano: "2024",
		uso: "1º, 2º, 3º OU MAIS ANOS DE CULTIVO; ÁREA DE ABERTURA; POUSIO; CULTURA PERENE; CULTURA TEMPORÁRIA; MATA NATIVA",
	},
	{
		ano: "2025",
		uso: "1º, 2º, 3º OU MAIS ANOS DE CULTIVO; ÁREA DE ABERTURA; POUSIO; CULTURA PERENE; CULTURA TEMPORÁRIA; MATA NATIVA",
	},
];

// Dados consolidados: usados no PieChart e na legenda
const soilData = [
	{ label: "Média", hectares: "142.080.910", percent: 72.2, color: "#d7c5a5" },
	{ label: "Argilosa", hectares: "34.533.202", percent: 17.5, color: "#aa8686" },
	{ label: "Arenosa", hectares: "16.763.620", percent: 8.5, color: "#fffe73" },
	{ label: "Muito argilosa", hectares: "2.653.092", percent: 1.3, color: "#a83800" },
	{ label: "Fragmentos grossos", hectares: "812.537", percent: 0.4, color: "#ef737c" },
	{ label: "Siltosa", hectares: "904", percent: 0.1, color: "#b5d6ae" },
];

// Dados mockados de NDVI — substituir por dados reais da API
const ndviData = [
	{ mes: "Jan", ndvi: 0.72 },
	{ mes: "Fev", ndvi: 0.68 },
	{ mes: "Mar", ndvi: 0.65 },
	{ mes: "Abr", ndvi: 0.58 },
	{ mes: "Mai", ndvi: 0.45 },
	{ mes: "Jun", ndvi: 0.32 },
	{ mes: "Jul", ndvi: 0.28 },
	{ mes: "Ago", ndvi: 0.35 },
	{ mes: "Set", ndvi: 0.52 },
	{ mes: "Out", ndvi: 0.63 },
	{ mes: "Nov", ndvi: 0.70 },
	{ mes: "Dez", ndvi: 0.74 },
];

const soilTypes = ["Solo tipo 1", "Solo tipo 2", "Solo tipo 3"];

const AXIS_STYLE = { fontSize: 11, fill: "#8a8a8a" };
const TOOLTIP_STYLE = {
	borderRadius: 8,
	border: "1px solid rgba(138,138,138,0.2)",
	fontSize: 12,
	color: "#252525",
};

export function SoilInfoCard() {
	const [showSoilInfo, setShowSoilInfo] = useState(false);

	return (
		<>
			{/* Bloco branco com título dentro */}
			<div className="overflow-hidden rounded-[15px] bg-white shadow-[4px_4px_4px_0px_rgba(138,138,138,0.3)]">
				<div className="px-5 pt-5 pb-4">
					<h2 className="text-[16px] font-bold text-[#252525]">
						Informações do Solo
					</h2>
				</div>

				{/* KML Tabs + Tabela */}
				<div className="px-5">
				<Tabs defaultValue="kml1">
					<TabsList className="h-7.5 gap-0 rounded-none rounded-tl-[10px] rounded-tr-[10px] bg-transparent p-0">
						{(["kml1", "kml2", "kml3"] as const).map((key, i) => (
							<TabsTrigger
								key={key}
								value={key}
								className="h-7.5 rounded-none rounded-tl-[10px] rounded-tr-[10px] px-6 text-[11px] font-bold data-[state=active]:bg-[rgba(0,174,141,0.8)] data-[state=active]:text-white data-[state=inactive]:bg-[rgba(243,242,242,0.4)] data-[state=inactive]:text-[#3a3a3c] data-[state=inactive]:shadow-none"
							>
								KML {i + 1}
							</TabsTrigger>
						))}
					</TabsList>

					{(["kml1", "kml2", "kml3"] as const).map((key) => (
						<TabsContent key={key} value={key} className="m-0 mt-0!">
							<Table>
								<TableHeader>
									<TableRow className="bg-[#f3f2f2] hover:bg-[#f3f2f2]">
										<TableHead className="w-24 text-[14px] font-bold text-[#8a8a8a]">
											Ano
										</TableHead>
										<TableHead className="text-[14px] font-bold text-[#8a8a8a]">
											Uso do Solo
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{landUseRows.map((row) => (
										<TableRow key={row.ano} className="border-b border-[#f0f0f0]">
											<TableCell className="text-[11px] text-[#252525]">
												{row.ano}
											</TableCell>
											<TableCell className="text-[11px] text-[#252525]">
												{row.uso}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TabsContent>
					))}
				</Tabs>
				</div>

				{/* Restante do conteúdo com padding */}
				<div className="flex flex-col gap-6 p-5">

					{/* NDVI */}
					<div className="flex flex-col gap-4">
						<h3 className="text-[14px] font-bold text-[#252525]">NDVI</h3>
						<div className="rounded-[10px] border border-[rgba(138,138,138,0.15)] p-4" style={{ minHeight: "280px" }}>
							<ResponsiveContainer width="100%" height={280}>
								<AreaChart data={ndviData}>
									<defs>
										<linearGradient id="gradNdvi" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#00ae8d" stopOpacity={0.3} />
											<stop offset="95%" stopColor="#00ae8d" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid vertical={false} stroke="rgba(138,138,138,0.15)" />
									<XAxis dataKey="mes" axisLine={false} tickLine={false} tick={AXIS_STYLE} />
									<YAxis
										axisLine={false}
										tickLine={false}
										tick={AXIS_STYLE}
										width={36}
										domain={[0, 1]}
										tickCount={6}
									/>
									<Tooltip
										contentStyle={TOOLTIP_STYLE}
										cursor={{ stroke: "rgba(138,138,138,0.2)" }}
										formatter={(v) => [typeof v === "number" ? v.toFixed(2) : String(v ?? ""), "NDVI"]}
									/>
									<Area
										type="monotone"
										dataKey="ndvi"
										name="NDVI"
										stroke="#00ae8d"
										strokeWidth={2}
										fill="url(#gradNdvi)"
										dot={false}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Período — apenas label, sem input */}
					<span className="text-[14px] font-bold text-[#252525]">
						Informação do período:
					</span>

					{/* Tipo de solo + PieChart */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<span className="text-[14px] font-bold text-[#252525]">
								Tipo de Solo:
							</span>
							<Select defaultValue="Solo tipo 1">
								<SelectTrigger className="h-9 w-42.5 rounded-[10px] border-[rgba(138,138,138,0.3)] text-sm">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{soilTypes.map((type) => (
										<SelectItem key={type} value={type} className="text-sm">
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<button
								type="button"
								onClick={() => setShowSoilInfo(true)}
								className="text-[#8a8a8a] transition-colors hover:text-[#00ae8d]"
							>
								<HelpCircle size={18} strokeWidth={1.5} />
							</button>
						</div>

						<div className="flex items-center gap-8">
							<div className="size-85 shrink-0">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={soilData}
											dataKey="percent"
											nameKey="label"
											cx="50%"
											cy="50%"
											outerRadius={150}
											innerRadius={70}
											strokeWidth={0}
										>
											{soilData.map((entry) => (
												<Cell key={entry.label} fill={entry.color} />
											))}
										</Pie>
										<Tooltip
											contentStyle={TOOLTIP_STYLE}
											itemStyle={{ color: "#252525" }}
											labelStyle={{ color: "#252525" }}
											formatter={(v, name) => [`${v ?? ""}%`, String(name ?? "")]}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>

							<div className="grid grid-cols-2 gap-x-10 gap-y-4 pt-4">
								{soilData.map(({ label, hectares, percent, color }) => (
									<div key={label} className="flex items-start gap-2">
										<div
											className="mt-0.5 size-5 shrink-0 rounded-xs"
											style={{ backgroundColor: color }}
										/>
										<div>
											<p className="text-[14px] font-bold text-[#252525]">
												{hectares} ha ({percent.toLocaleString("pt-BR")}%)
											</p>
											<p className="text-[14px] text-[#252525]">{label}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal — fora do bloco branco, fixed sobre tudo */}
			<AnimatePresence>
				{showSoilInfo && (
					<motion.div
						key="soil-info-backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
						onClick={() => setShowSoilInfo(false)}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.94, y: 8 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.94, y: 8 }}
							transition={{ type: "spring", stiffness: 300, damping: 24 }}
							onClick={(e) => e.stopPropagation()}
							className="relative flex w-120 flex-col items-center gap-4 rounded-[20px] border border-[#d9d9d9] bg-white p-6 shadow-[4px_4px_16px_0px_rgba(0,0,0,0.12)]"
						>
							<button
								type="button"
								onClick={() => setShowSoilInfo(false)}
								className="absolute right-4 top-4 text-[#8a8a8a] transition-colors hover:text-[#252525]"
							>
								<X size={16} strokeWidth={2} />
							</button>

							<h3 className="text-[15px] font-bold text-[#252525]">
								Tipos de Solo
							</h3>

							<img
								src={tipoSolo}
								alt="Classificação dos tipos de solo"
								className="w-full rounded-[10px]"
							/>

							<p className="text-center text-[12px] leading-relaxed text-[#8a8a8a]">
								A classificação do tipo de solo é baseada na textura e composição
								granulométrica. Solos argilosos retêm mais água, enquanto solos
								arenosos têm maior drenagem. O tipo influencia diretamente a
								capacidade de infiltração e a disponibilidade hídrica para as culturas.
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
