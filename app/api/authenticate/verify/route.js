
import { NextResponse } from "next/server";
import { HmacSHA256 } from "crypto-js";
import validator from "validator";
import { cookies } from "next/headers";
import { instituteDetails } from "@/app/utils/institute";
import jwt from "jsonwebtoken";

const createJwt = (payload) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Set expiration time
    return token;
};

export async function POST(req) {
    try {
        req = await req.json();

        // Form fields:
        // i)	email – (Institute Email) – Text
        // ii)  hashData – (Hashed Data for OTP verification) – Text
        // iii) instituteCode - (Institute Code) – Text
        // iv)  otp - (Submitted OTP) - Text

        const cookieStore = cookies();

        const { email, hashData, instituteCode, otp } = req;

        if (
            validator.isEmpty(email) ||
            validator.isEmpty(hashData) ||
            validator.isEmpty(otp) ||
            validator.isEmpty(instituteCode)
        ) {
            throw new Error("Please fill all the fields!");
        }

        if (otp.length > 0 && otp.length != 6) {
            throw new Error("Please enter a valid 6-digit OTP!");
        }

        const hash = hashData.split('.');

        if (hash.length !== 2) {
            throw new Error("Invalid hash data format!");
        }

        const data = `${instituteCode}.${email}.${otp}`;

        const userHash = HmacSHA256(data, process.env.HASH_SECRET).toString();

        if (userHash !== hash[0]) {
            throw new Error("Verification failed try again.");
        }

        const expiryTime = parseInt(hash[1]);

        const currentTime = Date.now();

        if (currentTime > expiryTime) {
            cookieStore.delete("otpData");
            throw new Error("OTP has expired. Please request a new one.");
        }

        const institute = await instituteDetails({ instituteCode });

        const payload = { email };

        const token = createJwt(payload);

        cookieStore.set({
            name: institute.authCookie,
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60, // Temporary maxAge
        });

        cookieStore.delete("otpData");

        return NextResponse.json(
            {
                message: "OTP verified successfully!",
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