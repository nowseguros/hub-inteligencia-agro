import {
	ChevronRight,
	Download,
	Eye,
	MoreHorizontal,
	RefreshCw,
	Search,
} from "lucide-react";
import { useState } from "react";
import { AnalysisStatusBadge } from "@/components/customs/analysis-status-badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Analysis } from "@/types/analysis";

const MOCK_DATA: Analysis[] = [
	{
		id: "0001",
		segurado: "João Marcelo Araújo",
		cpfCnpj: "123.456.789-00",
		propriedade: "Fazenda Vargem Bonita",
		estado: "SP",
		area: 1014,
		qtdKml: 3,
		status: "Resultado Total",
		dataAnalise: "05/05/2026",
	},
	{
		id: "0002",
		segurado: "Paulo Rodrigues",
		cpfCnpj: "46.973.571/0001-03",
		propriedade: "Fazenda Santa Maria",
		estado: "MG",
		area: 502,
		qtdKml: 2,
		status: "Resultado Parcial",
		dataAnalise: "04/05/2026",
	},
	{
		id: "0003",
		segurado: "João Batista Ribeiro",
		cpfCnpj: "123.456.789-00",
		propriedade: "Fazenda Santa Cruz",
		estado: "GO",
		area: 589,
		qtdKml: 1,
		status: "Resultado Total",
		dataAnalise: "30/04/2026",
	},
	{
		id: "0004",
		segurado: "Ana Maria da Costa",
		cpfCnpj: "123.456.789-00",
		propriedade: "Fazenda São José",
		estado: "GO",
		area: 745,
		qtdKml: 5,
		status: "Resultado Total",
		dataAnalise: "29/04/2026",
	},
	{
		id: "0005",
		segurado: "Juliana Pinheiro",
		cpfCnpj: "46.973.571/0001-03",
		propriedade: "Fazenda Boa Vista",
		estado: "MG",
		area: 921,
		qtdKml: 3,
		status: "Resultado Total",
		dataAnalise: "28/04/2026",
	},
];

const PAGE_SIZE = 5;
const TOTAL_PAGES = 5;

interface RecentAnalysesTableProps {
	data?: Analysis[];
}

export function RecentAnalysesTable({
	data = MOCK_DATA,
}: RecentAnalysesTableProps) {
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const filtered = data.filter(
		(row) =>
			row.segurado.toLowerCase().includes(search.toLowerCase()) ||
			row.cpfCnpj.includes(search),
	);

	return (
		<div className="flex flex-col gap-4 rounded-[15px] bg-[#fafafa] p-5">
			<h2 className="text-[15px] font-bold text-[#3a3a3c]">
				Análises Recentes
			</h2>

			<div className="relative w-[453px]">
				<Search
					size={16}
					strokeWidth={1.5}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] opacity-70"
				/>
				<Input
					placeholder="Buscar Nome, CPF ou CNPJ"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="h-[30px] rounded-[15px] border-none bg-[#fafafa] pl-9 text-sm shadow-none ring-1 ring-[#e5e5e5] placeholder:text-[#8a8a8a] focus-visible:ring-[#00ae8d]"
				/>
			</div>

			<div className="rounded-[15px] bg-white shadow-[4px_4px_4px_0px_rgba(138,138,138,0.3)]">
				<Table>
					<TableHeader>
						<TableRow className="bg-[#f3f2f2] hover:bg-[#f3f2f2]">
							<TableHead className="text-[13px] font-bold text-[#8a8a8a]">
								ID
							</TableHead>
							<TableHead className="text-[13px] font-bold text-[#8a8a8a]">
								Segurado
							</TableHead>
							<TableHead className="text-[13px] font-bold text-[#8a8a8a]">
								CPF/ CNPJ
							</TableHead>
							<TableHead className="text-[13px] font-bold text-[#8a8a8a]">
								Nome da Propriedade
							</TableHead>
							<TableHead className="text-center text-[13px] font-bold text-[#8a8a8a]">
								Estado
							</TableHead>
							<TableHead className="text-center text-[13px] font-bold text-[#8a8a8a]">
								Área (ha)
							</TableHead>
							<TableHead className="text-center text-[13px] font-bold text-[#8a8a8a]">
								Qtd. KML
							</TableHead>
							<TableHead className="text-center text-[13px] font-bold text-[#8a8a8a]">
								Status
							</TableHead>
							<TableHead className="text-center text-[13px] font-bold text-[#8a8a8a]">
								Data de Análise
							</TableHead>
							<TableHead className="text-center text-[13px] font-bold text-[#8a8a8a]">
								Opções
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filtered.slice(0, PAGE_SIZE).map((row) => (
							<TableRow
								key={row.id}
								className="border-b border-[#f0f0f0] text-[11px] text-[#3a3a3c]"
							>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.segurado}</TableCell>
								<TableCell>{row.cpfCnpj}</TableCell>
								<TableCell>{row.propriedade}</TableCell>
								<TableCell className="text-center">{row.estado}</TableCell>
								<TableCell className="text-center">
									{row.area.toLocaleString("pt-BR")}
								</TableCell>
								<TableCell className="text-center">
									{String(row.qtdKml).padStart(2, "0")}
								</TableCell>
								<TableCell className="text-center">
									<AnalysisStatusBadge status={row.status} />
								</TableCell>
								<TableCell className="text-center">{row.dataAnalise}</TableCell>
								<TableCell className="text-center">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="size-7">
												<MoreHorizontal size={15} strokeWidth={1.5} />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-[149px]">
											<DropdownMenuItem className="gap-2 text-[11px] text-[#8a8a8a]">
												<Download size={13} strokeWidth={1.5} />
												Baixar Arquivo
											</DropdownMenuItem>
											<DropdownMenuItem className="gap-2 text-[11px] text-[#8a8a8a]">
												<Eye size={13} strokeWidth={1.5} />
												Visualizar
											</DropdownMenuItem>
											<DropdownMenuItem className="gap-2 text-[11px] text-[#8a8a8a]">
												<RefreshCw size={13} strokeWidth={1.5} />
												Reanálise
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<div className="flex items-center justify-between px-4 py-3">
					<div className="flex items-center gap-1.5">
						{Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map(
							(page) => (
								<button
									key={page}
									type="button"
									onClick={() => setCurrentPage(page)}
									className={cn(
										"flex size-5 items-center justify-center rounded-[5px] text-[11px]",
										currentPage === page
											? "bg-[#00ae8d] font-bold text-white"
											: "border border-[#c6c6c6] text-[#8a8a8a]",
									)}
								>
									{page}
								</button>
							),
						)}
						<button
							type="button"
							className="flex size-5 items-center justify-center text-[#8a8a8a]"
						>
							<ChevronRight size={12} strokeWidth={2} />
						</button>
					</div>
					<div className="flex items-center gap-2 text-[10px] tracking-wide text-[#3a3a3c]">
						<span className="flex h-[17px] w-[26px] items-center justify-center rounded border border-[#d0d0d0] text-[10px]">
							05
						</span>
						<span>Linhas por página</span>
					</div>
				</div>
			</div>
		</div>
	);
}
