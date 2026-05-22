import { createFileRoute } from "@tanstack/react-router";
import { AppNavbar } from "@/components/customs/app-navbar";
import { LocationsCard } from "@/components/customs/locations-card";
import { RecentAnalysesTable } from "@/components/customs/recent-analyses-table";
import { Sidebar } from "@/components/customs/sidebar";
import { WeatherCard } from "@/components/customs/weather-card";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<div className="flex min-h-screen gap-4 bg-white p-4">
			<Sidebar />

			<div className="flex flex-1 flex-col gap-4 overflow-hidden">
				<AppNavbar />

				<div className="grid grid-cols-2 gap-4">
					<LocationsCard />
					<WeatherCard />
				</div>

				<RecentAnalysesTable />
			</div>
		</div>
	);
}
