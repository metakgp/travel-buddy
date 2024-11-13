import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import User from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";

export default async function checkUser() {
	const email = await checkCookie();

	await connectToDatabase();

	const user = await User.findOne({
		email: email,
	});

	return user;
}

export async function checkCookie() {
	const cookieStore = cookies();
	const cookie = cookieStore.get("heimdall");

	if (!cookie) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}
	const jwt = cookie.value;

	// decode jwt
	const email = JSON.parse(atob(jwt.split(".")[1])).email; // get the user email from jwt

	if (!email) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}

	return email;
}
