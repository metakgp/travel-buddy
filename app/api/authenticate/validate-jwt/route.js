import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        
        const cookieStore = cookies();
        
        const authCookie = req.headers.get("Cookie");

        if (!authCookie) {
            throw new Error("No cookies found in the request.");
        }

        const [authCookieName, token] = authCookie.split("=");

        if (!authCookieName || !token) {
            throw new Error("Authentication cookie not found.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const expiryTime = decoded.exp;
        const currentTime = Date.now();

        if (currentTime >= expiryTime * 1000) {
            cookieStore.delete("authCookieName");
            throw new Error("Authentication token has expired.");
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