import Trip from "@/app/models/Trip";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function DELETE(req) {
	try {
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

		await Trip.deleteOne({
			tripID: tripID,
		});

		return NextResponse.json(
			{
				message: "Trip deleted successfully!",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message: "Something went wrong - Could not delete the trip.",
			},
			{
				status: 500,
			}
		);
	}
}
