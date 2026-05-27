import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AppNavbar } from "@/components/customs/app-navbar";
import { LocationsCard } from "@/components/customs/locations-card";
import { Sidebar } from "@/components/customs/sidebar";
import { WeatherCard } from "@/components/customs/weather-card";

export const Route = createFileRoute("/_layout")({
	component: Layout,
});

function Layout() {
	const { pathname } = useLocation();
	const isHome = pathname === "/";

	return (
		<div className="flex min-h-screen gap-4 bg-white p-4">
			<Sidebar />

			<div className="flex flex-1 flex-col gap-4 overflow-hidden">
				<AppNavbar />

				{/*
				 * Sempre montado. Posicionamento fora da viewport em vez de display:none,
				 * que zeraria as dimensões do canvas e destruiria o contexto WebGL.
				 */}
				<div
					style={{
						position: isHome ? "relative" : "fixed",
						top: isHome ? "auto" : "-9999px",
						left: isHome ? "auto" : "-9999px",
						width: isHome ? "auto" : "400px",
						height: isHome ? "auto" : "400px",
						pointerEvents: isHome ? "auto" : "none",
						visibility: isHome ? "visible" : "hidden",
					}}
				>
					<div className="grid grid-cols-2 gap-4">
						<LocationsCard />
						<WeatherCard />
					</div>
				</div>

				<Outlet />
			</div>
		</div>
	);
}
