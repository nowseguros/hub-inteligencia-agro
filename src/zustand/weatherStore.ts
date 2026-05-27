import { create } from "zustand";
import type { GeocodingResult } from "@/types/weather";

const SAO_PAULO: GeocodingResult = {
	id: 0,
	name: "São Paulo",
	latitude: -23.5505,
	longitude: -46.6333,
	country: "Brasil",
	admin1: "São Paulo",
};

interface WeatherStore {
	selectedCity: GeocodingResult;
	setSelectedCity: (city: GeocodingResult) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
	selectedCity: SAO_PAULO,
	setSelectedCity: (city) => set({ selectedCity: city }),
}));
