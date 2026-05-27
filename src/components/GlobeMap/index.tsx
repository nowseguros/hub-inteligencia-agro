import { useLocations } from "@/hooks/api/useLocations";
import type { GlobeLocation } from "@/types/globe";
import { GlobeMap } from "./GlobeMap";

const FALLBACK_LOCATIONS: GlobeLocation[] = [
	{ lat: -23.55, lng: -46.63, label: "SP" },
	{ lat: -19.92, lng: -43.94, label: "MG" },
	{ lat: -15.78, lng: -47.93, label: "GO" },
	{ lat: -20.44, lng: -54.65, label: "MS" },
	{ lat: -25.43, lng: -49.27, label: "PR" },
	{ lat: -22.91, lng: -43.17, label: "RJ" },
	{ lat: -12.97, lng: -38.5, label: "BA" },
	{ lat: -15.6, lng: -56.1, label: "MT" },
];

export function GlobeMapContainer() {
	const { data, isLoading, isError } = useLocations();

	if (isLoading) {
		return (
			<div className="flex size-full items-center justify-center">
				<div className="size-8 animate-spin rounded-full border-2 border-[#e8e8e8] border-t-[#00ae8d]" />
			</div>
		);
	}

	const locations =
		isError || !data || data.length === 0 ? FALLBACK_LOCATIONS : data;

	return <GlobeMap locations={locations} />;
}
