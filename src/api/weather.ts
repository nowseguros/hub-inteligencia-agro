import axios from "axios";
import type { GeocodingResult, WeatherData } from "@/types/weather";

const geocodingApi = axios.create({
	baseURL: "https://geocoding-api.open-meteo.com/v1",
});

const forecastApi = axios.create({
	baseURL: "https://api.open-meteo.com/v1",
});

interface RawGeocodingResponse {
	results?: Array<{
		id: number;
		name: string;
		latitude: number;
		longitude: number;
		country: string;
		admin1?: string;
	}>;
}

interface RawForecastResponse {
	current: {
		temperature_2m: number;
		apparent_temperature: number;
		weathercode: number;
		windspeed_10m: number;
	};
	hourly: {
		time: string[];
		temperature_2m: number[];
		weathercode: number[];
	};
	daily: {
		time: string[];
		weathercode: number[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
	};
}

export async function searchCities(name: string): Promise<GeocodingResult[]> {
	const { data } = await geocodingApi.get<RawGeocodingResponse>("/search", {
		params: { name, count: 5, language: "pt", format: "json" },
	});
	return (data.results ?? []).map((r) => ({
		id: r.id,
		name: r.name,
		latitude: r.latitude,
		longitude: r.longitude,
		country: r.country,
		admin1: r.admin1,
	}));
}

export async function fetchWeather(
	lat: number,
	lon: number,
	cityName: string,
): Promise<WeatherData> {
	const { data } = await forecastApi.get<RawForecastResponse>("/forecast", {
		params: {
			latitude: lat,
			longitude: lon,
			current: "temperature_2m,apparent_temperature,weathercode,windspeed_10m",
			hourly: "temperature_2m,weathercode",
			daily: "weathercode,temperature_2m_max,temperature_2m_min",
			timezone: "America/Sao_Paulo",
			forecast_days: 10,
		},
	});

	const now = new Date();
	const pad = (n: number) => String(n).padStart(2, "0");
	const currentTimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:00`;
	const startIdx = data.hourly.time.findIndex((t) => t >= currentTimeStr);
	const slice = startIdx >= 0 ? startIdx : 0;

	const hourly = data.hourly.time.slice(slice, slice + 24).map((time, i) => ({
		time,
		temperature: data.hourly.temperature_2m[slice + i],
		weathercode: data.hourly.weathercode[slice + i],
	}));

	const daily = data.daily.time.map((date, i) => ({
		date,
		weathercode: data.daily.weathercode[i],
		tempMax: data.daily.temperature_2m_max[i],
		tempMin: data.daily.temperature_2m_min[i],
	}));

	return {
		cityName,
		current: {
			temperature: data.current.temperature_2m,
			apparentTemperature: data.current.apparent_temperature,
			weathercode: data.current.weathercode,
			windspeed: data.current.windspeed_10m,
		},
		daily,
		hourly,
	};
}
