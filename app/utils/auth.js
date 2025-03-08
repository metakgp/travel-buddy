"use server";

import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function checkUser({ email }) {
	if (!email || email === "") {
		return null;
	}

	await connectToDatabase();

	const user = await User.findOne({
		email: email,
	});

	return user ? jwt.sign(email, process.env.JWT_SECRET) : null;
}

export async function verifyUser({ token }) {
	if (!token || token === "") {
		return null;
	}

	const email = jwt.verify(token, process.env.JWT_SECRET);

	const user = await checkUser({ email });

	return user ? email : null;
}

export async function checkAuth() {
	const authorization = headers().get("authorization");
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
}