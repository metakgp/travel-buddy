import Trip from "@/app/models/Trip";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function POST(req) {
	try {
		req = await req.json();

		// Form fields:
		// i)	name – (Full Name) - Text
		// ii)	year – (Year) – drop down with mapping (1…n) and other
		// iii)	number – (Mobile Number) – number with check

		// iv)	date – (Departure Date) - string - format yyyy-mm-dd
		// v)	time – (Time) - drop down - 0-23
		// vi)	source – (Source) – drop down - 3 options: IIT, KGP, HWH, CCU
		// vii)	destination – (Destination) – drop down - 3 options: IIT, KGP, HWH, CCU

		let { tripID } = req;
		// if trip id is not a number
		if (!validator.isNumeric(tripID)) {
			throw new Error("Please give a valid trip ID!");
		}
		tripID = sanitize(tripID).trim();

		if (validator.isEmpty(tripID)) {
			throw new Error("Please give a trip ID!");
		}

		await connectToDatabase();

		const trip = await Trip.findOne({
			tripID: tripID,
		});

		if (!trip) {
			return NextResponse.json(
				{
					message: "Trip not found!",
				},
				{
					status: 404,
				}
			);
		}

		// Find all trips from same source and destination with 3 hours of difference, account for date change dues to time difference
		const source = trip.source;
		const destination = trip.destination;
		const tripDate = trip.date;
		const tripTime = trip.time;

		// Step 1: Calculate the previous and next dates
		const tripDateObj = new Date(tripDate);
		const prevDate = new Date(tripDateObj);
		prevDate.setDate(tripDateObj.getDate() - 1); // Day before the trip
		const nextDate = new Date(tripDateObj);
		nextDate.setDate(tripDateObj.getDate() + 1); // Day after the trip

		const prevDateStr = prevDate.toISOString().split("T")[0]; // Convert to "yyyy-mm-dd"
		const nextDateStr = nextDate.toISOString().split("T")[0];
		const tripDateStr = tripDateObj.toISOString().split("T")[0];

		// Step 2: Get all trips for tripDate, tripDate - 1, and tripDate + 1
		const allTrips = await Trip.find({
			source,
			destination,
			tripID: { $ne: tripID }, // Exclude the current trip
			date: { $in: [prevDateStr, tripDateStr, nextDateStr] },
		}).select("-_id -tripID"); // Exclude _id and tripID

		// Step 3: Convert all trips' times to hours since `prevDateStr` midnight
		const baseTime = new Date(prevDateStr).getTime(); // 12 AM of prevDateStr

		const convertToHoursSinceBase = (dateStr, time) => {
			const tripTime = new Date(dateStr).getTime() + time * 3600 * 1000; // Get time in milliseconds
			return (tripTime - baseTime) / (3600 * 1000); // Convert to hours since baseTime
		};

		const targetTripHours = convertToHoursSinceBase(tripDateStr, tripTime);

		// Step 4: Filter trips that are within 3 hours of the target trip
		const filteredTrips = allTrips.filter((trip) => {
			const tripHours = convertToHoursSinceBase(trip.date, trip.time);
			return Math.abs(tripHours - targetTripHours) <= 3;
		});

		return NextResponse.json(
			{
				message: "Trips found!",
				trip: trip,
				similiar: filteredTrips,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - Could not fetch trips.",
			},
			{
				status: 500,
			}
		);
	}
}