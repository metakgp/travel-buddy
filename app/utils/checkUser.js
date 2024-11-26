import { cookies } from "next/headers";
import User from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";
import Axios from "axios";

export default async function checkUser({ verify }) {
	const email = await checkCookie({ verify });

	if (!email) {
		return null;
	}

	await connectToDatabase();

	const user = await User.findOne({
		email: email,
	});

	return user;
}

export async function checkCookie({ verify }) {
	try {
		const cookieStore = cookies();
		const cookie = cookieStore.get("heimdall");

		if (!cookie) {
			return null;
		}

		const jwt = cookie.value;

		if (!jwt) {
			return null;
		}

		var email;
		if (false) {
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
			email = response.data.email;
			// console.log("verified email", email);
		} else {
			email = JSON.parse(atob(jwt.split(".")[1])).email; // get the user email from jwt
			// console.log("extracted email", email);
		}

		if (!email) {
			return null;
		}

		return email;
	} catch (e) {
		console.log(e);
		return null;
	}
}
