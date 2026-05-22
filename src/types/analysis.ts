export type AnalysisStatus =
	| "Resultado Total"
	| "Resultado Parcial"
	| "Em Análise";

export interface Analysis {
	id: string;
	segurado: string;
	cpfCnpj: string;
	propriedade: string;
	estado: string;
	area: number;
	qtdKml: number;
	status: AnalysisStatus;
	dataAnalise: string;
}
