import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { checkAuth } from "@/app/utils/auth";
import User from "@/app/models/User";
import Trip from "@/app/models/Trip";
import Train from "@/app/models/Train";
import { today } from "@/app/utils/date";

/**
 * GET /api/profile
 * Fetches the user's profile information along with their trips and trains
 */
export async function GET() {
	try {
		const email = await checkAuth();

		await connectToDatabase();

		// Fetch user information
		const user = await User.findOne({ email: email }).select(
			"-__v"
		);

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		// Get current date for filtering
		const currentDate = today().toISOString().slice(0, 10);

		// Fetch user's trips (both upcoming and past)
		const allTrips = await Trip.find({ email: email })
			.sort({ date: -1, time: -1 })
			.select("-__v");

		// Separate upcoming and past trips
		const upcomingTrips = allTrips.filter((trip) => {
			const tripDate = new Date(trip.date);
			const todayDate = new Date(currentDate);
			return tripDate >= todayDate;
		});

		const pastTrips = allTrips.filter((trip) => {
			const tripDate = new Date(trip.date);
			const todayDate = new Date(currentDate);
			return tripDate < todayDate;
		});

		// Fetch user's trains (both upcoming and past)
		const allTrains = await Train.find({ email: email })
			.sort({ date: -1 })
			.select("-__v");

		// Separate upcoming and past trains
		const upcomingTrains = allTrains.filter((train) => {
			const trainDate = new Date(train.date);
			const todayDate = new Date(currentDate);
			return trainDate >= todayDate;
		});

		const pastTrains = allTrains.filter((train) => {
			const trainDate = new Date(train.date);
			const todayDate = new Date(currentDate);
			return trainDate < todayDate;
		});

		// Calculate statistics
		const stats = {
			totalTrips: allTrips.length,
			upcomingTrips: upcomingTrips.length,
			pastTrips: pastTrips.length,
			totalTrains: allTrains.length,
			upcomingTrains: upcomingTrains.length,
			pastTrains: pastTrains.length,
		};

		return NextResponse.json(
			{
				message: "Profile fetched successfully",
				user: {
					name: user.name,
					email: user.email,
					roll: user.roll,
					number: user.number,
					instituteCode: user.instituteCode,
				},
				trips: {
					upcoming: upcomingTrips,
					past: pastTrips,
				},
				trains: {
					upcoming: upcomingTrains,
					past: pastTrains,
				},
				stats: stats,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching profile:", error);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - Could not fetch profile.",
			},
			{ status: error.message === "Unauthorized!" ? 401 : 500 }
		);
	}
}
