const globeImg =
	"https://www.figma.com/api/mcp/asset/d7310079-b3ea-4531-abab-85f5015b0bb8";
const pinImg =
	"https://www.figma.com/api/mcp/asset/628b20cc-04d8-4b8f-a824-e3e117c46933";

const pins = [
	{ id: "sp", top: "43%", left: "63%" },
	{ id: "mg", top: "39%", left: "60%" },
	{ id: "go", top: "50%", left: "57%" },
	{ id: "ms", top: "44%", left: "56%" },
	{ id: "pr", top: "39%", left: "62%" },
	{ id: "rj", top: "35%", left: "59%" },
	{ id: "ba", top: "40%", left: "65%" },
	{ id: "mt", top: "28%", left: "61%" },
];

export function LocationsCard() {
	return (
		<div className="flex flex-col gap-3 rounded-[15px] bg-[#fafafa] p-5">
			<h2 className="text-[15px] font-bold text-[#3a3a3c]">Localizações</h2>
			<div className="relative mx-auto h-[320px] w-full max-w-[363px]">
				<img
					src={globeImg}
					alt="Mapa mundi"
					className="size-full object-contain"
				/>
				{pins.map((pin) => (
					<img
						key={pin.id}
						src={pinImg}
						alt=""
						className="absolute size-8 -translate-x-1/2 -translate-y-1/2"
						style={{ top: pin.top, left: pin.left }}
					/>
				))}
			</div>
		</div>
	);
}
