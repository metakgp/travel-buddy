import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { HmacSHA256 } from "crypto-js";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { instituteDetails } from "@/app/utils/institute";

export async function POST(req) {
    try {
        req = await req.json();

        // Form fields:
        // i)	email – (Institute Email) – Text

        const { email, instituteCode } = req;

        const institute = await instituteDetails({ instituteCode });

        const emailDomain = email.split("@")[1];

        if (emailDomain != institute.domain) {
            throw new Error("Invalid email. Choose the correct institute.");
        }

        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        const expiryTime = Date.now() + 5 * 60 * 1000; // 5 mins

        const data = `${instituteCode}.${email}.${otp}`;

        const hashData = HmacSHA256(data, process.env.HASH_SECRET).toString() + "." + expiryTime;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SYSTEM_MAIL,
                pass: process.env.SYSTEM_MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.SYSTEM_MAIL,
            to: email,
            subject: 'OTP Code for Authentication',
            text: `Your OTP code is: ${otp}. This will expire at ${new Date(expiryTime).toLocaleString()}`
        };

        await transporter.sendMail(mailOptions);

        const cookieStore = cookies();

        cookieStore.set({
            name: "otpData",
            value: JSON.stringify({ email, hashData, instituteCode }),
            httpOnly: true,
            path: "/",
            maxAge: 5 * 60, // 5 mins
        });

        return NextResponse.json(
            {
                message: "OTP sent successfully! Please check your inbox.",
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