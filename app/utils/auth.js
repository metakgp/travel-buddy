import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "travelbuddy";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function findUserByEmail(email) {
	if (!email) return null;

	await connectToDatabase();

	return User.findOne({ email: email });
}

export function signSessionToken(email) {
	return jwt.sign({ email }, process.env.JWT_SECRET, {
		expiresIn: SESSION_MAX_AGE,
	});
}

export function verifySessionToken(token) {
	if (!token) return null;

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		return payload;
	} catch (error) {
		console.error("Error verifying session token:", error);
		return null;
	}
}

export function getSessionCookie() {
	const cookieStore = cookies();
	return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export function setSessionCookie(token) {
	const cookieStore = cookies();
	cookieStore.set({
		name: SESSION_COOKIE,
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: SESSION_MAX_AGE,
		path: "/",
	});
}

export async function getSession() {
	const token = getSessionCookie();
	if (!token) return null;

	const payload = verifySessionToken(token);
	if (!payload?.email) return null;

	const user = await findUserByEmail(payload.email);
	if (!user) return null;

	return { email: payload.email };
}

export async function checkAuth() {
	const session = await getSession();
	if (!session) {
		throw new Error("Unauthorized!");
	}
	return session.email;
}

export async function requireUser({ redirectPath = "/" } = {}) {
	"use server";
	const session = await getSession();

	if (session) return session;

	redirect("/authenticate?redirect_url=" + encodeURIComponent(redirectPath));
}
