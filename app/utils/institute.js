"use server";

import { connectToDatabase } from "@/app/lib/mongodb";
import Institute from "@/app/models/Institute";
import User from "@/app/models/User";

export async function instituteDetails({ instituteCode }) {
    if (!instituteCode || instituteCode == "") {
        throw new Error("Institute code is required.");
    }
    await connectToDatabase();
    const institute = await Institute.findOne({
        code: instituteCode
    });
    if (!institute) {
        throw new Error("Institute not found.");
    }
    if (!institute.domain) {
        throw new Error("Institute authentication Email domain not found.");
    }
    if (!institute.authLink || institute.authLink.trim() == "") {
        throw new Error("Institute authentication URL not found.");
    }
    if (!institute.verifyAuthLink || institute.verifyAuthLink.trim() == "") {
        throw new Error("Institute authentication verification URL not found.");
    }
    if (!institute.authCookie) {
        throw new Error("Institute authentication cookie not found.");
    }
    const data = JSON.parse(JSON.stringify(institute));
    return data;
}

export async function userInstituteDetails({ email }) {
    await connectToDatabase();
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        throw new Error("User not found.");
    }
    const institute = await instituteDetails({ instituteCode: user.instituteCode });
    return institute;
}

