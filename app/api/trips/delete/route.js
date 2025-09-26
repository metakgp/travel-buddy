import Trip from "@/app/models/Trip";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import { checkAuth } from "@/app/utils/auth";

export async function DELETE(req) {
	try {
		const email = await checkAuth();

		req = await req.json();

		let { tripID } = req;
		tripID = "" + tripID;
		// if trip id is not a number
		if (!validator.isNumeric(tripID)) {
			throw new Error("Please give a valid trip ID!");
		}
		tripID = sanitize(tripID).trim();

		if (validator.isEmpty(tripID)) {
			throw new Error("Please give a trip ID!");
		}

		await connectToDatabase(); // redundant but okay

		const trip = await Trip.findOne({
			tripID: tripID,
		});

		if (!trip) {
			return NextResponse.json(
				{ message: "Trip not found!" },
				{ status: 404 }
			);
		}

		if (trip.email !== email) {
			return NextResponse.json(
				{ message: "You are not authorized to delete this trip!" },
				{ status: 401 }
			);
		}

		await Trip.deleteOne({
			tripID: tripID,
		});

		return NextResponse.json(
			{ message: "Trip deleted successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ message: "Something went wrong - Could not delete the trip." },
			{ status: 500 }
		);
	}
}
