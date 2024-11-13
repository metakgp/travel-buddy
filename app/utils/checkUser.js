import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import User from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";
import Axios from "axios";

export default async function checkUser() {
	const email = await checkCookie();

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
			redirect(
				"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
			);
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
			redirect(
				"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
			);
		}

		return email;
	} catch (e) {
		console.log(e);
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}
}
