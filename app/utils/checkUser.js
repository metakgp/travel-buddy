import { cookies } from "next/headers";
import User from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";
import Axios from "axios";

export default async function checkUser() {
	const email = await checkCookie();

	if (!email) {
		return null;
	}

	await connectToDatabase();

	const user = await User.findOne({
		email: email,
	});

	return user;
}

export async function checkCookie() {
	try {
		const cookieStore = cookies();
		const cookie = cookieStore.get("heimdall");

		if (!cookie) {
			return null;
		}

		const jwt = cookie.value;

		const response = await Axios.get(
			"https://heimdall-api.metakgp.org/validate-jwt",
			{
				headers: {
					Cookie: Object.entries({
						heimdall: jwt,
					})
						.map(([key, value]) => `${key}=${value}`)
						.join("; "),
				},
			}
		);

		const email = response.data.email;

		if (!email) {
			return null;
		}

		return email;
	} catch (e) {
		console.log(e);
		return null;
	}
}
