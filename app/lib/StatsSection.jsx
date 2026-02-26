"use client";

import { useEffect, useMemo, useState } from "react";

function StatCard({ label, value }) {
	return (
		<div className="p-4 rounded-xl shadow bg-white/70 border border-amber-200 min-w-[250px] text-center">
			<div className="text-3xl font-bold">{value}</div>
			<div className="text-sm opacity-80">{label}</div>
		</div>
	);
}

function StatCardSkeleton({ label }) {
	return (
		<div className="p-4 rounded-xl shadow bg-white/70 border border-amber-200 min-w-[250px] text-center">
			<div className="h-9 w-16 bg-gray-200 rounded animate-pulse mx-auto" />
			<div className="text-sm opacity-80 mt-2">{label}</div>
		</div>
	);
}

export default function StatsSection({
	showTrips = false,
	showTrains = false,
}) {
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);

	const cards = useMemo(() => {
		const base = [{ key: "users", label: "Registered users" }];
		if (showTrips) {
			base.push({ key: "trips", label: "Trip listings" });
			base.push({
				key: "percentWithMatch",
				label: "Trips with at least one match",
				suffix: "%",
			});
		}
		if (showTrains) base.push({ key: "trains", label: "Train journeys" });
		return base;
	}, [showTrips, showTrains]);

	useEffect(() => {
		let active = true;

		async function load() {
			setLoading(true);
			try {
				const res = await fetch("/api/stats", { cache: "no-store" });
				if (!res.ok) throw new Error("Failed to fetch stats");
				const data = await res.json();
				if (!active) return;
				setStats(data?.stats ?? null);
			} catch (e) {
				console.error("Error fetching /api/stats:", e);
				if (!active) return;
				setStats(null);
			} finally {
				if (active) setLoading(false);
			}
		}

		load();
		return () => {
			active = false;
		};
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center gap-6 mb-4 flex-wrap">
				{cards.map((c) => (
					<StatCardSkeleton key={c.key} label={c.label} />
				))}
			</div>
		);
	}

	if (!stats) return null;

	return (
		<div className="flex justify-center gap-6 mb-4 flex-wrap">
			{cards.map((c) => {
				const raw = stats?.[c.key];
				const value =
					raw === null || raw === undefined
						? "-"
						: `${raw}${c.suffix ?? ""}`;
				return <StatCard key={c.key} label={c.label} value={value} />;
			})}
		</div>
	);
}
