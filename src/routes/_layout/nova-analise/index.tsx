import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ClimateInfoCard } from "@/components/customs/climate-info-card";
import { KmlUploadCard } from "@/components/customs/kml-upload-card";
import { LoadingOverlay } from "@/components/customs/loading-overlay";
import { SoilInfoCard } from "@/components/customs/soil-info-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_layout/nova-analise/")({
	component: NovaAnalisePage,
});

interface FormData {
	kmlFiles: File[];
	nomeCompleto: string;
	cpfCnpj: string;
	nomePropriedade: string;
	area: string;
	cidade: string;
	estado: string;
}

function isFormValid(form: FormData): boolean {
	return (
		form.kmlFiles.length > 0 &&
		form.nomeCompleto.trim() !== "" &&
		form.cpfCnpj.trim() !== "" &&
		form.nomePropriedade.trim() !== "" &&
		form.area.trim() !== "" &&
		form.cidade.trim() !== "" &&
		form.estado.trim() !== ""
	);
}

function NovaAnalisePage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState<FormData>({
		kmlFiles: [],
		nomeCompleto: "",
		cpfCnpj: "",
		nomePropriedade: "",
		area: "",
		cidade: "",
		estado: "",
	});

	function set(field: keyof Omit<FormData, "kmlFiles">) {
		return (e: React.ChangeEvent<HTMLInputElement>) =>
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!isFormValid(form)) return;
		setIsLoading(true);
		// TODO: substituir pelo useMutation real — chamar setIsLoading(false) no onSettled
		setTimeout(() => {
			setIsLoading(false);
			navigate({ to: "/" });
		}, 3000);
	}

	const valid = isFormValid(form);

	return (
		<>
			{isLoading && <LoadingOverlay />}

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<KmlUploadCard
					files={form.kmlFiles}
					onFilesChange={(files) =>
						setForm((prev) => ({ ...prev, kmlFiles: files }))
					}
				/>

				<div className="flex flex-col gap-4 rounded-[15px] bg-[#fafafa] p-5">
					<h2 className="text-[15px] font-bold text-[#3a3a3c]">
						Dados do Produtor
					</h2>
					<div className="flex gap-4">
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="nomeCompleto"
								className="text-[13px] font-bold text-[#3a3a3c]"
							>
								Nome Completo
							</label>
							<Input
								id="nomeCompleto"
								value={form.nomeCompleto}
								onChange={set("nomeCompleto")}
								className="h-9 w-94.5 rounded-[10px] border-[rgba(138,138,138,0.3)] bg-white text-sm"
							/>
						</div>
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="cpfCnpj"
								className="text-[13px] font-bold text-[#3a3a3c]"
							>
								CPF/CNPJ
							</label>
							<Input
								id="cpfCnpj"
								value={form.cpfCnpj}
								onChange={set("cpfCnpj")}
								placeholder="000.000.000-00"
								className="h-9 w-75 rounded-[10px] border-[rgba(138,138,138,0.3)] bg-white text-sm"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-5 rounded-[15px] bg-[#fafafa] p-5">
					<h2 className="text-[16px] font-bold text-[#252525]">
						Informações da Área
					</h2>
					<div className="flex flex-wrap gap-4">
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="nomePropriedade"
								className="text-[13px] font-bold text-[#3a3a3c]"
							>
								Nome da Propriedade
							</label>
							<Input
								id="nomePropriedade"
								value={form.nomePropriedade}
								onChange={set("nomePropriedade")}
								className="h-9 w-114.75 rounded-[10px] border-[rgba(138,138,138,0.3)] bg-white text-sm"
							/>
						</div>
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="area"
								className="text-[13px] font-bold text-[#3a3a3c]"
							>
								Área (ha)
							</label>
							<Input
								id="area"
								value={form.area}
								onChange={set("area")}
								type="number"
								min={0}
								className="h-9 w-42.5 rounded-[10px] border-[rgba(138,138,138,0.3)] bg-white text-sm"
							/>
						</div>
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="cidade"
								className="text-[13px] font-bold text-[#3a3a3c]"
							>
								Cidade
							</label>
							<Input
								id="cidade"
								value={form.cidade}
								onChange={set("cidade")}
								className="h-9 w-42.5 rounded-[10px] border-[rgba(138,138,138,0.3)] bg-white text-sm"
							/>
						</div>
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="estado"
								className="text-[13px] font-bold text-[#3a3a3c]"
							>
								Estado
							</label>
							<Input
								id="estado"
								value={form.estado}
								onChange={set("estado")}
								maxLength={2}
								className="h-9 w-27.75 rounded-[10px] border-[rgba(138,138,138,0.3)] bg-white text-sm uppercase"
							/>
						</div>
					</div>

					<SoilInfoCard />
				</div>

				<ClimateInfoCard />

				<div className="flex flex-col items-center gap-3 py-4">
					<Button
						type="submit"
						disabled={!valid}
						className="h-10 w-39.25 rounded-[10px] bg-[#00ae8d] text-[15px] font-bold text-white hover:bg-[#00957a] disabled:cursor-not-allowed disabled:opacity-40"
					>
						Gerar Análise
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={() => navigate({ to: "/" })}
						className="h-10 w-39.25 rounded-[10px] bg-[#d9d9d9] text-[15px] text-[#3a3a3c] hover:bg-[#c5c5c5]"
					>
						Voltar
					</Button>
				</div>
			</form>
		</>
	);
}
