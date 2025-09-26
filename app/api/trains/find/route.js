import Train from "@/app/models/Train";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import { checkAuth } from "@/app/utils/auth";
import User from "@/app/models/User";
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

		// Return fields:
		// i)	email – (Email) - string - format email
		// ii)	trainNumber – (Train Number) - number
		// iii)	date – (Departure Date) - string - format yyyy-mm-dd

		let { trainID } = req;
		// if train id is not a number
		if (!validator.isNumeric(trainID)) {
			throw new Error("Please give a valid train trip ID!");
		}
		trainID = sanitize(trainID).trim();

		if (validator.isEmpty(trainID)) {
			throw new Error("Please give a train trip ID!");
		}

		await connectToDatabase(); // redundant but okay

		const train = await Train.findOne({
			trainID: trainID,
		});

		if (!train) {
			return NextResponse.json(
				{ message: "Train Trip not found!" },
				{ status: 404 }
			);
		}

		if (train.email !== email) {
			return NextResponse.json(
				{ message: "You are not authorized to see this train trip!" },
				{ status: 401 }
			);
		}

		// Find all trains from with same trainNumber and date
		const filteredTrains = await Train.find({
			trainNumber: train.trainNumber,
			date: train.date,
			trainID: { $ne: trainID },
		});

		// for all filtered trains, get the user details
		// for each train, get the user details
		// for each user, get the user details
		// return the train details and the user details

		const similiar = await Promise.all(
			filteredTrains.map(async (train) => {
				// Adding condition to keep up with legacy data
				if (train.email) {
					const user = await User.findOne({
						email: train.email,
					});
					return {
						...train._doc,
						name: user.name,
						roll: user.roll,
						number: user.number,
					};
				} else return train;
			})
		);

		const user = await User.findOne({
			email: email,
		});

		return NextResponse.json(
			{
				message: "Train Trips found!",
				train: {
					...train._doc,
					name: user.name,
					roll: user.roll,
					number: user.number,
				},
				similiar: similiar,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - Could not fetch train trips.",
			},
			{ status: 500 }
		);
	}
}
