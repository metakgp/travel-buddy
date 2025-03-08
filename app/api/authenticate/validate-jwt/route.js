import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { instituteDetails } from "@/app/utils/institute";

export async function GET(req) {
    try {
        
        const { searchParams } = new URL(req.url);

        const instituteCode = searchParams.get("instituteCode");

        const institute = await instituteDetails({ instituteCode });

        const { authCookie } = institute;
        
        const cookieStore = cookies();

        const cookie = cookieStore.get(authCookie);

        if (!cookie) {
            throw new Error("No JWT cookie found in the request.");
        }

        const token = cookie.value;

        if (!token) {
            throw new Error("No JWT session token found.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const expiryTime = decoded.exp;
        const currentTime = Date.now();

        if (currentTime >= expiryTime * 1000) {
            cookieStore.delete(cookie);
            throw new Error("JWT cookie token has expired.");
        }

        return NextResponse.json(
            {
                message: "Authentication successful.",
                email: decoded.email,
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