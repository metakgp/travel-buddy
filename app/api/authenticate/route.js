import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Institute from "@/app/models/Institute";

export async function POST(req) {
    try {
        await connectToDatabase(); // redundant but okay

        // Return fields:
        // i) name: (Name of the Institute) - string - required
        // ii) code: (Institute Code) - string - required
        // iii) domain: (Email Domain for validation) - string - required
        // iv) locations: (Institute Locations) - array of strings - required
        // v) authLink: (URL to Get Authentication Link) - string - required
        // vi) verifyAuthLink: (URL to Verify Authentication) - string - required

        req = await req.json();

        const { selectedInstituteCode } = req;

        if (!selectedInstituteCode) {
            return NextResponse.json(
                {
                    message: "Institute code is required."
                },
                {
                    status: 400
                }
            );
        }

        const institute = await Institute.findOne({
            code: selectedInstituteCode
        });

        if (!institute) {
            return NextResponse.json(
                {
                    message: "Institute not found."
                },
                {
                    status: 404
                }
            );
        }

        if (!institute.authLink || institute.authLink.trim() === "") {
            return NextResponse.json(
                {
                    message: "Authentication link is not available for this institute."
                },
                {
                    status: 400
                }
            );
        }

        return NextResponse.json(
            {
                message: "Institute found successfully.",
                institute: institute
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.log("Error:", error.message);
        return NextResponse.json(
            {
                message: error.message || "Something went wrong - Failed to found Institute",
            },
            {
                status: 500
            }
        );
    }
}
