import Trip from "@/app/models/Trip";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import { checkAuth } from "@/app/utils/auth";
import { today } from "@/app/utils/date";

export async function POST(req) {
	try {
		const email = await checkAuth();

		req = await req.json();

		// Form fields:
		// i)	email – (Email) - string - format email
		// ii)	date – (Departure Date) - string - format yyyy-mm-dd
		// iii)	time – (Time) - drop down - 0-23
		// iv)	source – (Source) – drop down - 3 options: IIT, KGP, HWH, CCU
		// v)	destination – (Destination) – drop down - 3 options: IIT, KGP, HWH, CCU

		let { date, time, source, destination } = req;

		date = sanitize(date).trim();
		time = sanitize(time);
		source = sanitize(source).trim();
		destination = sanitize(destination).trim();

		if (
			validator.isEmpty(date) ||
			!time ||
			validator.isEmpty(source) ||
			validator.isEmpty(destination)
		) {
			throw new Error("Please fill all the fields!");
		}

		const inputDate = new Date(date);
		const dateObj = today();
		if (inputDate < dateObj) {
			throw new Error("Please enter a future date!");
		}

		if (source === destination) {
			throw new Error("Source and destination cannot be same!");
		}

		await connectToDatabase(); // redundant but okay

		let flag = true;
		let tripID;
		while (flag) {
			tripID = Math.floor(Math.random() * 900000) + 100000;
			tripID = tripID.toString();
			const trip = await Trip.findOne({
				tripID: tripID,
			});
			if (!trip) {
				flag = false;
			}
		}

		const newTrip = new Trip({
			email: email,
			date: date,
			time: time,
			source: source,
			destination: destination,
			tripID: tripID,
		});

		await newTrip.save();
		return NextResponse.json(
			{ message: "Trip saved successfully!", tripID: tripID },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - Could not submit your trip details.",
			},
			{ status: 500 }
		);
	}
}
