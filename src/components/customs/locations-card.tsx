import { Suspense, lazy } from "react";

const GlobeMapContainer = lazy(() =>
	import("@/components/GlobeMap").then((m) => ({ default: m.GlobeMapContainer })),
);

function GlobeFallback() {
	return (
		<div className="flex size-full items-center justify-center">
			<div className="size-8 animate-spin rounded-full border-2 border-[#e8e8e8] border-t-[#00ae8d]" />
		</div>
	);
}

export function LocationsCard() {
	return (
		<div className="flex flex-col gap-3 rounded-[15px] bg-[#fafafa] p-5">
			<h2 className="text-[15px] font-bold text-[#3a3a3c]">Localizações</h2>
			<div className="flex h-96 w-full items-center justify-center">
				<Suspense fallback={<GlobeFallback />}>
					<GlobeMapContainer />
				</Suspense>
			</div>
		</div>
	);
}
