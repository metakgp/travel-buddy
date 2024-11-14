import Train from "@/app/models/Train";
import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import checkUser from "@/app/utils/checkUser";

export async function DELETE(req) {
	try {
		const user = await checkUser();

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

		let { trainID } = req;
		trainID = "" + trainID;
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
				{
					message: "Train Trip not found!",
				},
				{
					status: 404,
				}
			);
		}

		if (train.email !== user.email) {
			return NextResponse.json(
				{
					message:
						"You are not authorized to delete this train trip!",
				},
				{
					status: 401,
				}
			);
		}

		await Train.deleteOne({
			trainID: trainID,
		});

		return NextResponse.json(
			{
				message: "Train Trip deleted successfully!",
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
					"Something went wrong - Could not delete the train trip.",
			},
			{
				status: 500,
			}
		);
	}
}
