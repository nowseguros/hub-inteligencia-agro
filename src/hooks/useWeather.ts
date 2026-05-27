import { fetchWeather, searchCities } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export function useSearchCities(query: string) {
	return useQuery({
		queryKey: ["cities", query],
		queryFn: () => searchCities(query),
		enabled: query.length >= 2,
		staleTime: 1000 * 60 * 5,
	});
}

export function useWeather(lat: number, lon: number, cityName: string) {
	return useQuery({
		queryKey: ["weather", lat, lon],
		queryFn: () => fetchWeather(lat, lon, cityName),
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 30,
	});
}
