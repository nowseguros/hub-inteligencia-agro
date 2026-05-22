import {
	Calendar,
	Cloud,
	CloudSun,
	Moon,
	Search,
	Sun,
	Sunset,
} from "lucide-react";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type WeatherCondition = "sun" | "cloud-sun" | "cloud" | "sunset" | "moon";

interface HourlyItem {
	label: string;
	temp: string;
	condition: WeatherCondition;
	isSunset?: boolean;
}

interface DailyItem {
	day: string;
	minTemp: number;
	maxTemp: number;
	condition: WeatherCondition;
}

const hourlyForecast: HourlyItem[] = [
	{ label: "Agora", temp: "28º", condition: "sun" },
	{ label: "15h", temp: "28º", condition: "sun" },
	{ label: "16h", temp: "28º", condition: "cloud-sun" },
	{ label: "17h", temp: "27º", condition: "cloud-sun" },
	{ label: "17:37", temp: "Pôr do sol", condition: "sunset", isSunset: true },
	{ label: "18h", temp: "25º", condition: "cloud" },
	{ label: "19h", temp: "23º", condition: "moon" },
	{ label: "20h", temp: "22º", condition: "moon" },
	{ label: "21h", temp: "21º", condition: "moon" },
	{ label: "22h", temp: "20º", condition: "moon" },
	{ label: "23h", temp: "19º", condition: "moon" },
	{ label: "00h", temp: "18º", condition: "moon" },
];

const dailyForecast: DailyItem[] = [
	{ day: "Hoje", minTemp: 18, maxTemp: 29, condition: "sun" },
	{ day: "Ter.", minTemp: 17, maxTemp: 28, condition: "cloud-sun" },
	{ day: "Qua.", minTemp: 18, maxTemp: 29, condition: "sun" },
	{ day: "Qui.", minTemp: 16, maxTemp: 27, condition: "cloud-sun" },
	{ day: "Sex.", minTemp: 15, maxTemp: 25, condition: "cloud" },
	{ day: "Sáb.", minTemp: 14, maxTemp: 24, condition: "cloud" },
	{ day: "Dom.", minTemp: 17, maxTemp: 28, condition: "sun" },
	{ day: "Seg.", minTemp: 19, maxTemp: 30, condition: "sun" },
	{ day: "Ter.", minTemp: 18, maxTemp: 29, condition: "cloud-sun" },
	{ day: "Qua.", minTemp: 16, maxTemp: 26, condition: "cloud" },
];

const ABS_MIN = 10;
const ABS_MAX = 40;

function WeatherIcon({
	condition,
	size = 24,
}: {
	condition: WeatherCondition;
	size?: number;
}) {
	const props = { size, strokeWidth: 1.5 };
	switch (condition) {
		case "sun":
			return <Sun {...props} className="text-amber-400" />;
		case "cloud-sun":
			return <CloudSun {...props} className="text-amber-300" />;
		case "cloud":
			return <Cloud {...props} className="text-slate-400" />;
		case "sunset":
			return <Sunset {...props} className="text-orange-400" />;
		case "moon":
			return <Moon {...props} className="text-slate-500" />;
	}
}

export function WeatherCard() {
	const [city, setCity] = useState("");
	const [hasScrolled, setHasScrolled] = useState(false);

	const scrollRef = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({ container: scrollRef });

	// Spring suaviza o valor bruto do scroll para animações fluidas
	const smoothScrollY = useSpring(scrollY, { stiffness: 200, damping: 30, restDelta: 0.001 });

	// Sombra no separador header/cards cresce conforme rola
	const separatorOpacity = useTransform(smoothScrollY, [0, 40], [0, 1]);

	// Notifica quando o scroll começa para aplicar o indicador visual
	useMotionValueEvent(scrollY, "change", (v) => {
		setHasScrolled(v > 4);
	});

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
						value={city}
						onChange={(e) => setCity(e.target.value)}
						className="h-7.5 rounded-[15px] border-none bg-white pl-9 text-sm shadow-none placeholder:text-[#8a8a8a]"
					/>
				</div>

				<div className="text-center">
					<h2 className="text-2xl font-bold text-[#3a3a3c]">São Paulo</h2>
					<p className="text-5xl font-bold text-[#00ae8d]">28º</p>
					<p className="mt-1 font-bold text-[#8a8a8a]">Nublado</p>
					<div className="mt-1 flex justify-center gap-6 text-sm font-bold text-[#8a8a8a]">
						<span>Máx: 29º</span>
						<span>Mín: 18º</span>
					</div>
				</div>
			</div>

			{/* Separador animado — aparece ao começar o scroll */}
			<motion.div
				className="mx-5 shrink-0 border-t border-[rgba(58,58,60,0.12)]"
				style={{ opacity: separatorOpacity }}
			/>

			{/* ── SEÇÃO SCROLLÁVEL: cards de previsão ── */}
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
					{/* Previsão por hora — scroll horizontal invisível */}
					<motion.div
						className="rounded-[10px] bg-white p-3 shadow-[2px_2px_4px_0px_rgba(138,138,138,0.2)]"
						whileHover={{ scale: 1.01 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
						<p className="text-[10px] leading-3.5 text-[rgba(58,58,60,0.74)]">
							Previsão de condições ensolaradas por volta das 15:00. As rajadas
							de vento estão a 10km/h.
						</p>
						<div className="my-3 border-t border-[rgba(58,58,60,0.1)]" />
						<div className="flex gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
							{hourlyForecast.map((item) => (
								<div
									key={item.label}
									className="flex shrink-0 flex-col items-center gap-1"
								>
									<span className="text-[11px] text-[rgba(58,58,60,0.74)]">
										{item.label}
									</span>
									<WeatherIcon condition={item.condition} size={20} />
									<span
										className={cn(
											"text-[11px] text-[rgba(58,58,60,0.74)]",
											item.isSunset && "text-[9px]",
										)}
									>
										{item.temp}
									</span>
								</div>
							))}
						</div>
					</motion.div>

					{/* Previsão 10 dias */}
					<motion.div
						className="rounded-[10px] bg-white p-3 shadow-[2px_2px_4px_0px_rgba(138,138,138,0.2)]"
						whileHover={{ scale: 1.01 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
					>
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
							{dailyForecast.map((item, i) => {
								const minPct =
									((item.minTemp - ABS_MIN) / (ABS_MAX - ABS_MIN)) * 100;
								const maxPct =
									((item.maxTemp - ABS_MIN) / (ABS_MAX - ABS_MIN)) * 100;
								return (
									<div
										key={`${item.day}-${i}`}
										className={cn(
											"flex items-center gap-3 py-2",
											i > 0 && "border-t border-[rgba(58,58,60,0.07)]",
										)}
									>
										<span className="w-14 text-[11px] text-[rgba(58,58,60,0.74)]">
											{item.day}
										</span>
										<WeatherIcon condition={item.condition} size={18} />
										<span className="w-8 text-right text-[11px] text-[rgba(58,58,60,0.74)]">
											{item.minTemp}º
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
											{item.maxTemp}º
										</span>
									</div>
								);
							})}
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
