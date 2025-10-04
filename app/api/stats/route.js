import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Trip from "@/app/models/Trip";
import User from "@/app/models/User";
import Train from "@/app/models/Train";

// GET /api/stats
// Returns platform usage stats:
// - users: total registered users
// - trips: total trip listings
// - matchedTrips: number of trips that have at least one match (same source/destination within +/- 3 hours, across adjacent days)
// - percentWithMatch: percentage of trips that have at least one match (rounded to nearest integer)
export async function GET() {
	try {
		await connectToDatabase();

		const [users, trips, trains] = await Promise.all([
			User.countDocuments({}),
			Trip.countDocuments({}),
			Train.countDocuments({}),
		]);

		if (trips === 0) {
			return NextResponse.json(
				{
					message: "OK",
					stats: {
						users,
						trips,
						matchedTrips: 0,
						percentWithMatch: 0,
						trains,
					},
				},
				{ status: 200 }
			);
		}

		// Fetch all trips with minimal fields for matching logic
		const tripsList = await Trip.find(
			{},
			{ _id: 0, tripID: 1, date: 1, time: 1, source: 1, destination: 1 }
		).lean();

		// Group by source+destination
		const groups = new Map();
		for (const t of tripsList) {
			const key = `${t.source}__${t.destination}`;
			if (!groups.has(key)) groups.set(key, []);
			// Normalize to an absolute UTC timestamp: yyyy-mm-dd (UTC midnight) + time hours
			const dayMs = Date.parse(t.date); // yyyy-mm-dd is treated as UTC midnight
			const ts = dayMs + (t.time || 0) * 3600 * 1000;
			groups.get(key).push({ id: t.tripID, ts });
		}

		const THREE_HOURS_MS = 3 * 3600 * 1000;
		const matched = new Set();

		// For each group, sort by timestamp and use a sliding window to mark matched trips
		for (const arr of groups.values()) {
			arr.sort((a, b) => a.ts - b.ts);
			let i = 0;
			for (let j = 0; j < arr.length; j++) {
				while (i < j && arr[j].ts - arr[i].ts > THREE_HOURS_MS) i++;
				if (j - i >= 1) {
					// All trips between i..j (inclusive) are within 3 hours of each other
					matched.add(arr[j].id);
					for (let k = i; k < j; k++) matched.add(arr[k].id);
				}
			}
		}

		const matchedTrips = matched.size;
		const percentWithMatch = Math.round((matchedTrips / trips) * 100);

		return NextResponse.json(
			{
				message: "OK",
				stats: { users, trips, matchedTrips, percentWithMatch, trains },
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("/api/stats error:", error);
		return NextResponse.json(
			{ message: "Failed to compute stats." },
			{ status: 500 }
		);
	}
}
