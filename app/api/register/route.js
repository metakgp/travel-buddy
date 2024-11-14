import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import { checkCookie } from "@/app/utils/checkUser";
import User from "@/app/models/User";

export async function POST(req) {
	try {
		const email = await checkCookie();

		if (!email) {
			return NextResponse.json(
				{
					message: "You need to be logged in to register!",
				},
				{
					status: 403,
				}
			);
		}

		req = await req.json();

		// Form fields:
		// i)	name – (Full Name) - Text
		// ii)	roll – (Roll Number) – Text
		// iii)	number – (Mobile Number) – Text
		// iv)	email – (Institute Email) – Text

		let { name, roll, number } = req;

		name = sanitize(name).trim();
		roll = sanitize(roll).trim();
		number = sanitize(number).trim();

		if (
			validator.isEmpty(name) ||
			validator.isEmpty(roll) ||
			validator.isEmpty(number)
		) {
			throw new Error("Please fill all the fields!");
		}

		if (!validator.isLength(name, { min: 3, max: 50 })) {
			throw new Error("Name should be between 3 to 50 characters!");
		}

		if (number.length > 0 && number.length != 10) {
			throw new Error("Please enter a valid 10-digit phone number!");
		}

		await connectToDatabase(); // redundant but okay

		const newUser = new User({
			name: name,
			roll: roll,
			number: number,
			email: email,
		});

		await newUser.save();

		return NextResponse.json(
			{
				message: "Registration successful!",
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
					"Something went wrong - please try again later!",
			},
			{
				status: 500,
			}
		);
	}
}
