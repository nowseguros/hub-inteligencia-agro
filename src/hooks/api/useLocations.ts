import { useQuery } from "@tanstack/react-query";
import { fetchLocations } from "@/api/locations";

export function useLocations() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["locations"],
		queryFn: fetchLocations,
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 30,
	});

	return { data, isLoading, isError };
}
