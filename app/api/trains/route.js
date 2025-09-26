import Train from "@/app/models/Train";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import { checkAuth } from "@/app/utils/auth";
import { today } from "@/app/utils/date";

export async function GET() {
	try {
		const email = await checkAuth();

		await connectToDatabase(); // redundant but okay

		// // Delete old entries
		// const dateObj = today();
		// await Train.deleteMany({
		// 	date: { $lt: dateObj.toISOString().slice(0, 10) },
		// });

		const trains = await Train.find({
			email: email,
		});

		return NextResponse.json(
			{ message: "Your Train Trips!", trains: trains },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - Could not fetch your train trips.",
			},
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	try {
		const email = await checkAuth();

		req = await req.json();

		// Form fields:
		// i)	email – (Email) - string - format email
		// ii)	trainNumber – (Train Number) - number
		// iii)	date – (Departure Date) - string - format yyyy-mm-dd

		let { trainNumber, date } = req;

		trainNumber = sanitize(trainNumber).trim();
		date = sanitize(date).trim();

		if (validator.isEmpty(date)) {
			console.log(trainNumber, date);
			throw new Error("Please fill all the fields!");
		}

		// five digit train number
		if (trainNumber.length !== 5 || !validator.isNumeric(trainNumber)) {
			throw new Error("Please enter a valid train number!");
		}

		const inputDate = new Date(date);
		const dateObj = today();
		// check if date is in the future
		if (inputDate < dateObj) {
			throw new Error("Please enter a future date!");
		}

		await connectToDatabase(); // redundant but okay

		let flag = true;
		let trainID;
		while (flag) {
			trainID = Math.floor(Math.random() * 900000) + 100000;
			trainID = trainID.toString();
			const train = await Train.findOne({
				trainID: trainID,
			});
			if (!train) {
				flag = false;
			}
		}

		const newTrain = new Train({
			email: email,
			trainNumber: trainNumber,
			date: date,
			trainID: trainID,
		});

		await newTrain.save();
		return NextResponse.json(
			{ message: "Train trip saved successfully!", trainID: trainID },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - Could not submit your train trip details.",
			},
			{ status: 500 }
		);
	}
}
