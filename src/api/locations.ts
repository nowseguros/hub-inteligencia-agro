import { instance } from "@/api/instance";
import type { GlobeLocation } from "@/types/globe";

export async function fetchLocations(): Promise<GlobeLocation[]> {
	const response = await instance.get<GlobeLocation[]>("/centroids");
	return response.data;
}
