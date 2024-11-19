import Train from "@/app/models/Train";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import checkUser from "@/app/utils/checkUser";

export async function POST(req) {
	try {
		const user = await checkUser({ verify: true });

		if (!user) {
			NextResponse.json(
				{
					message: "Invalid User!",
				},
				{
					status: 404,
				}
			);
		}

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
			email: user.email,
			trainNumber: trainNumber,
			date: date,
			trainID: trainID,
		});

		await newTrain.save();
		return NextResponse.json(
			{
				message: "Train trip saved successfully!",
				trainID: trainID,
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
					"Something went wrong - Could not submit your train trip details.",
			},
			{
				status: 500,
			}
		);
	}
}
