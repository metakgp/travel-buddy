import TripDetails from "./TripDetails";

export const metadata = {
	title: "Trip Details",
};

const Page = async ({ params }) => {
	const tripID = params.tripID;

	return <TripDetails tripID={tripID} />;
};

export default Page;
