"use server";

import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function checkUser({ email }) {
	try {
		if (!email || email === "") {
			return null;
		}

		await connectToDatabase();

		const user = await User.findOne({
			email: email,
		});

		return user ? jwt.sign(email, process.env.JWT_SECRET) : null;
	} catch (error) {
		console.error("Error in checkUser:", error);
		return null;
	}
}

export async function verifyUser({ token }) {
	try {
		if (!token || token === "") {
			return null;
		}

		const email = jwt.verify(token, process.env.JWT_SECRET);

		const user = await checkUser({ email });

		return user ? email : null;
	} catch (error) {
		console.error("Error in verifyUser:", error);
		return null;
	}
}

export async function checkAuth() {
	try {
		const headersList = headers();
		const authorization = headersList.get("authorization");
		if (!authorization) {
			throw new Error("Unauthorized!");
		}

		const token = authorization.split(" ")[1];
		if (!token) {
			throw new Error("Unauthorized!");
		}

		const email = await verifyUser({ token });
		if (!email) {
			throw new Error("Unauthorized!");
		}

		return email;
	} catch (error) {
		console.error("Error in checkAuth:", error);
		throw new Error("Unauthorized!");
	}
}
