import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Institute from "@/app/models/Institute";

export async function GET() {
	try {
		await connectToDatabase(); // redundant but okay
        
        // Return only names of Institues
        const institutes = await Institute.find({}, { _id: 0, name: 1, code:1 }); 
		
		return NextResponse.json(
			{
				message: "List of Institutes",
				institutes: institutes,
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
					"Something went wrong - Could not fetch institutes.",
			},
			{
				status: 500,
			}
		);
	}
}
