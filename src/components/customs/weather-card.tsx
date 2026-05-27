import {
	Cloud,
	CloudLightning,
	CloudRain,
	CloudSun,
	Snowflake,
	Sun,
} from "@phosphor-icons/react";
import { Calendar, Search } from "lucide-react";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useWeather, useSearchCities } from "@/hooks/useWeather";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useWeatherStore } from "@/zustand/weatherStore";

type WeatherIconType =
	| "sun"
	| "cloud-sun"
	| "cloud"
	| "cloud-rain"
	| "snowflake"
	| "cloud-lightning";

function getWeatherInfo(code: number): {
	label: string;
	iconType: WeatherIconType;
} {
	if (code === 0) return { label: "Céu limpo", iconType: "sun" };
	if (code <= 3) return { label: "Parcialmente nublado", iconType: "cloud-sun" };
	if (code <= 48) return { label: "Neblina", iconType: "cloud" };
	if (code <= 55) return { label: "Garoa", iconType: "cloud-rain" };
	if (code <= 65) return { label: "Chuva", iconType: "cloud-rain" };
	if (code <= 75) return { label: "Neve", iconType: "snowflake" };
	if (code <= 82) return { label: "Pancadas de chuva", iconType: "cloud-rain" };
	if (code === 95) return { label: "Tempestade", iconType: "cloud-lightning" };
	return { label: "Tempestade com granizo", iconType: "cloud-lightning" };
}

function WeatherIcon({
	type,
	size = 20,
}: {
	type: WeatherIconType;
	size?: number;
}) {
	const props = { size, weight: "light" as const };
	switch (type) {
		case "sun":
			return <Sun {...props} className="text-amber-400" />;
		case "cloud-sun":
			return <CloudSun {...props} className="text-amber-300" />;
		case "cloud":
			return <Cloud {...props} className="text-slate-400" />;
		case "cloud-rain":
			return <CloudRain {...props} className="text-blue-400" />;
		case "snowflake":
			return <Snowflake {...props} className="text-blue-300" />;
		case "cloud-lightning":
			return <CloudLightning {...props} className="text-slate-600" />;
	}
}

function formatHour(time: string, isFirst: boolean): string {
	if (isFirst) return "Agora";
	return `${time.split("T")[1].split(":")[0]}h`;
}

function formatDay(dateStr: string, index: number): string {
	if (index === 0) return "Hoje";
	const date = new Date(`${dateStr}T12:00:00`);
	const days = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];
	return days[date.getDay()];
}

function SkeletonBlock({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"animate-pulse rounded-md bg-[#e8e8e8]",
				className,
			)}
		/>
	);
}

const ABS_MIN = 10;
const ABS_MAX = 40;

export function WeatherCard() {
	const { selectedCity, setSelectedCity } = useWeatherStore();
	const { data, isLoading, isError, refetch } = useWeather(
		selectedCity.latitude,
		selectedCity.longitude,
		selectedCity.name,
	);

	const [inputValue, setInputValue] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(inputValue), 400);
		return () => clearTimeout(timer);
	}, [inputValue]);

	const { data: cities } = useSearchCities(debouncedQuery);

	const scrollRef = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({ container: scrollRef });
	const smoothScrollY = useSpring(scrollY, {
		stiffness: 200,
		damping: 30,
		restDelta: 0.001,
	});
	const separatorOpacity = useTransform(smoothScrollY, [0, 40], [0, 1]);
	useMotionValueEvent(scrollY, "change", (v) => setHasScrolled(v > 4));

	const handleSelectCity = (city: (typeof cities)[number]) => {
		setSelectedCity(city);
		setInputValue("");
		setDebouncedQuery("");
		setShowDropdown(false);
	};

	const currentInfo = data ? getWeatherInfo(data.current.weathercode) : null;

	return (
		<div className="flex h-125 flex-col overflow-hidden rounded-[15px] bg-[#fafafa]">

			{/* ── SEÇÃO ESTÁTICA: search + cabeçalho do tempo ── */}
			<div className="shrink-0 px-5 pt-5 pb-4">
				<div className="relative mb-4">
					<Search
						size={16}
						strokeWidth={1.5}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a8a] opacity-70"
					/>
					<Input
						placeholder="Buscar cidade"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onFocus={() => setShowDropdown(true)}
						onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
						className="h-7.5 rounded-[15px] border-none bg-white pl-9 text-sm shadow-none placeholder:text-[#8a8a8a]"
					/>
					{showDropdown && cities && cities.length > 0 && (
						<div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-[10px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
							{cities.map((city) => (
								<button
									key={city.id}
									type="button"
									onMouseDown={() => handleSelectCity(city)}
									className="flex w-full flex-col px-4 py-2.5 text-left transition-colors hover:bg-[#f3f2f2]"
								>
									<span className="text-[13px] font-bold text-[#252525]">
										{city.name}
									</span>
									<span className="text-[11px] text-[#8a8a8a]">
										{[city.admin1, city.country].filter(Boolean).join(", ")}
									</span>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="text-center">
					<h2 className="text-2xl font-bold text-[#3a3a3c]">
						{selectedCity.name}
					</h2>
					{isLoading ? (
						<div className="mt-2 flex flex-col items-center gap-2">
							<SkeletonBlock className="h-12 w-24" />
							<SkeletonBlock className="h-5 w-32" />
							<SkeletonBlock className="h-4 w-40" />
						</div>
					) : isError ? (
						<div className="mt-2 flex flex-col items-center gap-2">
							<p className="text-sm text-[#8a8a8a]">
								Não foi possível carregar o clima
							</p>
							<button
								type="button"
								onClick={() => refetch()}
								className="text-xs font-bold text-[#00ae8d] hover:underline"
							>
								Tentar novamente
							</button>
						</div>
					) : data ? (
						<>
							<p className="text-5xl font-bold text-[#00ae8d]">
								{Math.round(data.current.temperature)}º
							</p>
							<p className="mt-1 font-bold text-[#8a8a8a]">
								{currentInfo?.label}
							</p>
							<div className="mt-1 flex justify-center gap-6 text-sm font-bold text-[#8a8a8a]">
								<span>Máx: {Math.round(data.daily[0].tempMax)}º</span>
								<span>Mín: {Math.round(data.daily[0].tempMin)}º</span>
							</div>
						</>
					) : null}
				</div>
			</div>

			{/* Separador animado */}
			<motion.div
				className="mx-5 shrink-0 border-t border-[rgba(58,58,60,0.12)]"
				style={{ opacity: separatorOpacity }}
			/>

			{/* ── SEÇÃO SCROLLÁVEL ── */}
			<div
				ref={scrollRef}
				className={cn(
					"flex-1 overflow-y-auto px-5 pb-5 [&::-webkit-scrollbar]:hidden",
					hasScrolled && "pt-3",
				)}
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 }}
					className="flex flex-col gap-4 pt-4"
				>
					{/* Previsão por hora */}
					<motion.div
						className="rounded-[10px] bg-white p-3 shadow-[2px_2px_4px_0px_rgba(138,138,138,0.2)]"
						whileHover={{ scale: 1.01 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						{isLoading ? (
							<div className="flex flex-col gap-3">
								<SkeletonBlock className="h-8 w-full" />
								<div className="flex gap-5">
									{["h0", "h1", "h2", "h3", "h4", "h5"].map((k) => (
										<SkeletonBlock
											key={k}
											className="h-14 w-10 shrink-0"
										/>
									))}
								</div>
							</div>
						) : data ? (
							<>
								<p className="text-[10px] leading-3.5 text-[rgba(58,58,60,0.74)]">
									Previsão de{" "}
									{getWeatherInfo(data.hourly[0]?.weathercode ?? 0).label.toLowerCase()}.
									{" "}Ventos a {Math.round(data.current.windspeed)}km/h.
								</p>
								<div className="my-3 border-t border-[rgba(58,58,60,0.1)]" />
								<div className="flex justify-between">
									{data.hourly.slice(0, 12).map((item, i) => (
										<div
											key={item.time}
											className="flex shrink-0 flex-col items-center gap-1"
										>
											<span className="text-[11px] text-[rgba(58,58,60,0.74)]">
												{formatHour(item.time, i === 0)}
											</span>
											<WeatherIcon
												type={getWeatherInfo(item.weathercode).iconType}
												size={20}
											/>
											<span className="text-[11px] text-[rgba(58,58,60,0.74)]">
												{Math.round(item.temperature)}º
											</span>
										</div>
									))}
								</div>
							</>
						) : null}
					</motion.div>

					{/* Previsão 10 dias */}
					<motion.div
						className="rounded-[10px] bg-white p-3 shadow-[2px_2px_4px_0px_rgba(138,138,138,0.2)]"
						whileHover={{ scale: 1.01 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						{isLoading ? (
							<div className="flex flex-col gap-2">
								{["d0", "d1", "d2", "d3", "d4"].map((k) => (
									<SkeletonBlock key={k} className="h-8 w-full" />
								))}
							</div>
						) : data ? (
							<>
								<div className="mb-3 flex items-center gap-1.5">
									<Calendar
										size={12}
										strokeWidth={1.5}
										className="text-[rgba(58,58,60,0.74)]"
									/>
									<span className="text-[10px] text-[rgba(58,58,60,0.74)]">
										Previsão para 10 dias
									</span>
								</div>
								<div className="flex flex-col">
									{data.daily.map((item, i) => {
										const minPct =
											((item.tempMin - ABS_MIN) / (ABS_MAX - ABS_MIN)) * 100;
										const maxPct =
											((item.tempMax - ABS_MIN) / (ABS_MAX - ABS_MIN)) * 100;
										return (
											<div
												key={item.date}
												className={cn(
													"flex items-center gap-3 py-2",
													i > 0 && "border-t border-[rgba(58,58,60,0.07)]",
												)}
											>
												<span className="w-14 text-[11px] text-[rgba(58,58,60,0.74)]">
													{formatDay(item.date, i)}
												</span>
												<WeatherIcon
													type={getWeatherInfo(item.weathercode).iconType}
													size={18}
												/>
												<span className="w-8 text-right text-[11px] text-[rgba(58,58,60,0.74)]">
													{Math.round(item.tempMin)}º
												</span>
												<div className="relative h-1 flex-1 rounded-full bg-[#e0e0e0]">
													<div
														className="absolute h-1 rounded-full bg-linear-to-r from-blue-300 to-orange-400"
														style={{
															left: `${minPct}%`,
															width: `${maxPct - minPct}%`,
														}}
													/>
												</div>
												<span className="w-8 text-[11px] text-[rgba(58,58,60,0.74)]">
													{Math.round(item.tempMax)}º
												</span>
											</div>
										);
									})}
								</div>
							</>
						) : null}
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
