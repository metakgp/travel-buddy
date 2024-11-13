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

		let { name, year, roll, number, date, time, source, destination } = req;

		name = sanitize(name).trim();
		year = sanitize(year);
		roll = sanitize(roll).trim();
		number = sanitize(number).trim();
		date = sanitize(date).trim();
		time = sanitize(time);
		source = sanitize(source).trim();
		destination = sanitize(destination).trim();

		if (
			validator.isEmpty(name) ||
			!year ||
			validator.isEmpty(roll) ||
			validator.isEmpty(date) ||
			!time ||
			validator.isEmpty(source) ||
			validator.isEmpty(destination)
		) {
			throw new Error("Please fill all the fields!");
		}

		if (!validator.isLength(name, { min: 3, max: 50 })) {
			throw new Error("Name should be between 3 to 50 characters!");
		}

		if (number.length > 0 && number.length != 10) {
			throw new Error("Please enter a valid 10-digit phone number!");
		}

		const inputDate = new Date(date);
		const today = new Date();
		//set time zone to IST
		const ISTOffset = 330; // IST offset UTC +5:30
		today.setMinutes(today.getMinutes() + ISTOffset);
		// get only yyyy-mm-dd part of date
		const dateObj = new Date(today.toISOString().slice(0, 10));
		// check if date is in the future
		if (inputDate < dateObj) {
			throw new Error("Please enter a future date!");
		}

		if (source === destination) {
			throw new Error("Source and destination cannot be same!");
		}

		await connectToDatabase();

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
			name: name,
			year: year,
			roll: roll,
			number: number,
			date: date,
			time: time,
			source: source,
			destination: destination,
			tripID: tripID,
		});

		await newTrip.save();
		return NextResponse.json(
			{
				message:
					"Trip registered successfully! Please copy your Trip ID for future reference.",
				tripID: tripID,
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
					"Something went wrong - Could not submit your trip details.",
			},
			{
				status: 500,
			}
		);
	}
}
