import { NextResponse } from "next/server";
import sanitize from "mongo-sanitize";
import validator from "validator";
import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { cookies } from "next/headers";
import Axios from "axios";
import {
	findUserByEmail,
	signSessionToken,
	setSessionCookie,
} from "@/app/utils/auth";
import { instituteDetails } from "@/app/utils/institute";
import { safeRedirectPath } from "@/app/utils/redirect";

export async function GET(req) {
	try {
		const url = new URL(req.url);
		const instituteCode = url.searchParams.get("instituteCode");
		const redirectUrl = safeRedirectPath(
			url.searchParams.get("redirect_url"),
		);

		// If instituteCode is not provided, return 400
		if (!instituteCode) {
			return NextResponse.json(
				{ message: "Missing instituteCode!" },
				{ status: 400 },
			);
		}

		const institute = await instituteDetails({ instituteCode });
		const { authCookie, verifyAuthLink, authLink } = institute;

		const cookieStore = cookies();
		const cookie = cookieStore.get(authCookie);
		const finalRedirectUrl = redirectUrl
			? `https://travel.metakgp.org/register?instituteCode=${instituteCode}&redirect_url=${encodeURIComponent(
					redirectUrl,
				)}`
			: `https://travel.metakgp.org/register?instituteCode=${instituteCode}`;

		// If auth cookie is not present, return 403 with message to login and redirect link
		if (!cookie?.value) {
			return NextResponse.json(
				{
					message: "You need to be logged in to continue!",
					redirect:
						authLink +
						"?redirect_url=" +
						encodeURIComponent(finalRedirectUrl),
				},
				{ status: 403 },
			);
		}

		const ssoToken = cookie.value;
		let email;
		try {
			const response = await Axios.get(verifyAuthLink, {
				headers: {
					Cookie: Object.entries({ [authCookie]: ssoToken })
						.map(([key, value]) => `${key}=${value}`)
						.join("; "),
				},
			});
			email = response.data.email;
		} catch (e) {
			email = null;
		}

		// If email is not present in the response, return 403 with message to login and redirect link
		if (!email) {
			cookieStore.delete(authCookie);
			return NextResponse.json(
				{
					message: "You need to be logged in to continue!",
					redirect:
						authLink +
						"?redirect_url=" +
						encodeURIComponent(finalRedirectUrl),
				},
				{ status: 403 },
			);
		}

		const checkUser = await findUserByEmail(email);

		// If user is already registered, create a session and return 201 with message
		if (checkUser) {
			const sessionToken = signSessionToken(email);
			setSessionCookie(sessionToken);
			return NextResponse.json(
				{ message: "User already registered" },
				{ status: 201 },
			);
		}

		// If user is not registered, return 200 with email to prefill the registration form
		return NextResponse.json(
			{ message: "No Existing User found!", email: email },
			{ status: 200 },
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - please try again later!",
			},
			{ status: 500 },
		);
	}
}

export async function POST(req) {
	try {
		req = await req.json();

		// Form fields:
		// i)	name – (Full Name) - Text
		// ii)	roll – (Roll Number) – Text
		// iii)	number – (Mobile Number) – Text
		// iv)	email – (Institute Email) – Text
		// v)   instituteCode - (Institute Code) – Text

		let { name, roll, number, instituteCode } = req;

		const institute = await instituteDetails({ instituteCode });

		let { authCookie, verifyAuthLink } = institute;

		const cookieStore = cookies();

		const cookie = cookieStore.get(authCookie);
		if (!cookie) {
			return NextResponse.json(
				{ message: "You need to be logged in to register!" },
				{ status: 403 },
			);
		}

		const ssoToken = cookie.value;
		if (!ssoToken) {
			return NextResponse.json(
				{ message: "You need to be logged in to register!" },
				{ status: 403 },
			);
		}

		const response = await Axios.get(verifyAuthLink, {
			headers: {
				Cookie: Object.entries({ [authCookie]: ssoToken })
					.map(([key, value]) => `${key}=${value}`)
					.join("; "),
			},
		});
		const email = response.data.email;

		if (!email) {
			return NextResponse.json(
				{ message: "You need to be logged in to register!" },
				{ status: 403 },
			);
		}

		name = sanitize(name).trim();
		roll = sanitize(roll).trim();
		number = sanitize(number).trim();
		instituteCode = sanitize(instituteCode).trim();

		if (
			validator.isEmpty(name) ||
			validator.isEmpty(roll) ||
			validator.isEmpty(number) ||
			validator.isEmpty(instituteCode)
		) {
			throw new Error("Please fill all the fields!");
		}

		if (!validator.isLength(name, { min: 3, max: 50 })) {
			throw new Error("Name should be between 3 to 50 characters!");
		}

		if (number.length > 0 && number.length != 10) {
			throw new Error("Please enter a valid 10-digit phone number!");
		}

		await connectToDatabase();

		const checkUser = await findUserByEmail(email);

		if (checkUser) {
			return NextResponse.json(
				{ message: "User already registered! Please login." },
				{ status: 400 },
			);
		}

		const user = new User({
			name: name,
			roll: roll,
			number: number,
			email: email,
			instituteCode: instituteCode,
		});

		await user.save();

		const sessionToken = signSessionToken(email);
		setSessionCookie(sessionToken);

		return NextResponse.json(
			{ message: "Registration successful!" },
			{ status: 200 },
		);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{
				message:
					error.message ||
					"Something went wrong - please try again later!",
			},
			{ status: 500 },
		);
	}
}
