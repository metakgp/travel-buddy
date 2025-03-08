import { connectToDatabase } from "@/app/lib/mongodb";
import TripDetails from "./TripDetails";
import Trip from "@/app/models/Trip";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Trip Details",
};

const Page = async ({ params }) => {
	const tripID = params.tripID;

	await connectToDatabase();

	const trip = await Trip.findOne({
		tripID: tripID
	});

	if(!trip){
		redirect('/');
	}
	
	const tripData = JSON.parse(JSON.stringify(trip));

	return <TripDetails tripID={tripID} email={tripData.email} />;
};

export default Page;
