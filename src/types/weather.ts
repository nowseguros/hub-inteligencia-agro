export interface GeocodingResult {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	country: string;
	admin1?: string;
}

export interface CurrentWeather {
	temperature: number;
	apparentTemperature: number;
	weathercode: number;
	windspeed: number;
}

export interface DailyForecast {
	date: string;
	weathercode: number;
	tempMax: number;
	tempMin: number;
}

export interface HourlyForecast {
	time: string;
	temperature: number;
	weathercode: number;
}

export interface WeatherData {
	current: CurrentWeather;
	daily: DailyForecast[];
	hourly: HourlyForecast[];
	cityName: string;
}
