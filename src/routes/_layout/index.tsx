import { createFileRoute } from "@tanstack/react-router";
import { RecentAnalysesTable } from "@/components/customs/recent-analyses-table";

export const Route = createFileRoute("/_layout/")({
	component: HomePage,
});

function HomePage() {
	return <RecentAnalysesTable />;
}
