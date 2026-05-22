import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const ndviChartImg =
	"https://www.figma.com/api/mcp/asset/539db449-2858-4dac-8248-0b24858740b8";
const soilPieImg =
	"https://www.figma.com/api/mcp/asset/ce001f15-26e1-406a-aafe-82b48d6b93d7";

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

const soilLegend = [
	{ label: "Média", value: "142.080.910 ha (72,2%)", color: "#d7c5a5" },
	{ label: "Argilosa", value: "34.533.202 ha (17,5%)", color: "#aa8686" },
	{ label: "Arenosa", value: "16.763.620 ha (8,5%)", color: "#fffe73" },
	{ label: "Muito argilosa", value: "2.653.092 ha (1,3%)", color: "#a83800" },
	{ label: "Fragmentos grossos", value: "812.537 ha (0,4%)", color: "#ef737c" },
	{ label: "Siltosa", value: "904 ha (0%)", color: "#b5d6ae" },
];

const soilTypes = ["Solo tipo 1", "Solo tipo 2", "Solo tipo 3", "Solo tipo 4"];

export function SoilInfoCard() {
	return (
		<div className="flex flex-col gap-5 rounded-[15px] bg-[#fafafa] p-5">
			<h2 className="text-[16px] font-bold text-[#252525]">
				Informações do Solo
			</h2>

			<div className="rounded-[15px] bg-white shadow-[4px_4px_4px_0px_rgba(138,138,138,0.3)]">
				<Tabs defaultValue="kml1">
					<TabsList className="h-[30px] gap-0 rounded-none rounded-tl-[15px] rounded-tr-[15px] bg-transparent p-0">
						{(["kml1", "kml2", "kml3"] as const).map((key, i) => (
							<TabsTrigger
								key={key}
								value={key}
								className="h-[30px] rounded-none rounded-tl-[10px] rounded-tr-[10px] px-6 text-[11px] font-bold data-[state=active]:bg-[rgba(0,174,141,0.8)] data-[state=active]:text-white data-[state=inactive]:bg-[rgba(243,242,242,0.4)] data-[state=inactive]:text-[#3a3a3c] data-[state=inactive]:shadow-none"
							>
								KML {i + 1}
							</TabsTrigger>
						))}
					</TabsList>

					{(["kml1", "kml2", "kml3"] as const).map((key) => (
						<TabsContent key={key} value={key} className="m-0">
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
										<TableRow
											key={row.ano}
											className="border-b border-[#f0f0f0]"
										>
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

			<div className="flex flex-col gap-4">
				<h3 className="text-[14px] font-bold text-[#252525]">NDVI</h3>
				<div className="overflow-hidden rounded-[10px]">
					<img
						src={ndviChartImg}
						alt="Gráfico NDVI"
						className="h-[335px] w-full object-cover"
					/>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<span className="text-[14px] font-bold text-[#252525]">
					Informação do período:
				</span>
				<Input
					placeholder="Selecionar período"
					className="h-[36px] w-[170px] rounded-[10px] border-[rgba(138,138,138,0.3)] text-sm"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<span className="text-[14px] font-bold text-[#252525]">
						Tipo de Solo:
					</span>
					<Select defaultValue="Solo tipo 1">
						<SelectTrigger className="h-[36px] w-[170px] rounded-[10px] border-[rgba(138,138,138,0.3)] text-sm">
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
					<button type="button" className="text-[#8a8a8a] hover:text-[#252525]">
						<HelpCircle size={18} strokeWidth={1.5} />
					</button>
				</div>

				<div className="flex items-start gap-8">
					<img
						src={soilPieImg}
						alt="Distribuição de tipo de solo"
						className="size-[340px] shrink-0 object-cover"
					/>
					<div className="grid grid-cols-2 gap-x-10 gap-y-4 pt-4">
						{soilLegend.map(({ label, value, color }) => (
							<div key={label} className="flex items-start gap-2">
								<div
									className="mt-0.5 size-5 shrink-0 rounded-[2px]"
									style={{ backgroundColor: color }}
								/>
								<div>
									<p className="text-[14px] font-bold text-[#252525]">
										{value}
									</p>
									<p className="text-[14px] text-[#252525]">{label}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
