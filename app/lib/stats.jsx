import { headers } from "next/headers";

export default async function StatsSection({
	showTrips = false,
	showTrains = false,
}) {
	async function getStats(baseUrl) {
		try {
			const res = await fetch(`${baseUrl}/api/stats`, {
				// Force server-side fetch in Next.js app router
				cache: "no-store",
			});
			if (!res.ok) return null;
			const data = await res.json();
			return data?.stats ?? null;
		} catch (e) {
			console.error("Error fetching /api/stats:", e);
			return null;
		}
	}

	const h = headers();
	const host = h.get("x-forwarded-host") || h.get("host");
	const proto = h.get("x-forwarded-proto") || "http";
	const baseUrl = host ? `${proto}://${host}` : "http://localhost:3000";
	const stats = await getStats(baseUrl);

	return stats ? (
		<div className="flex justify-center gap-6 mb-4 flex-wrap">
			<div className="p-4 rounded-xl shadow bg-white/70 border border-amber-200 min-w-[250px]">
				<div className="text-3xl font-bold">{stats.users}</div>
				<div className="text-sm opacity-80">Registered users</div>
			</div>
			{showTrips && (
				<>
					<div className="p-4 rounded-xl shadow bg-white/70 border border-amber-200 min-w-[250px]">
						<div className="text-3xl font-bold">{stats.trips}</div>
						<div className="text-sm opacity-80">Trip listings</div>
					</div>
					<div className="p-4 rounded-xl shadow bg-white/70 border border-amber-200 min-w-[250px]">
						<div className="text-3xl font-bold">
							{stats.percentWithMatch}%
						</div>
						<div className="text-sm opacity-80">
							Trips with at least one match
						</div>
					</div>
				</>
			)}
			{showTrains && (
				<div className="p-4 rounded-xl shadow bg-white/70 border border-amber-200 min-w-[250px]">
					<div className="text-3xl font-bold">{stats.trains}</div>
					<div className="text-sm opacity-80">Train journeys</div>
				</div>
			)}
		</div>
	) : null;
}
