"use server";

import { connectToDatabase } from "@/app/lib/mongodb";
import Institute from "@/app/models/Institute";

export async function instituteDetails({ instituteCode }) {
    if (!instituteCode || instituteCode == "") {
        throw new Error("Institute code is required.");
    }
    await connectToDatabase();
    const institute = await Institute.findOne({
        code: instituteCode
    });
    // console.log(institute);
    if (!institute) {
        throw new Error("Institute not found.");
    }
    if (!institute.domain) {
		throw new Error("Institute authentication Email domain not found.");
	}
    if(!institute.authLink || institute.authLink.trim() == ""){
        throw new Error("Institute authentication URL not found.");
    }
    if(!institute.verifyAuthLink || institute.verifyAuthLink.trim() == ""){
        throw new Error("Institute authentication verification URL not found.");
    }
    if(!institute.authCookie){
        throw new Error("Institute authentication cookie not found.");
    }
    const data = JSON.parse(JSON.stringify(institute));
    return data;
}



