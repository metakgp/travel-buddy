import TripDetails from "./TripDetails";
import { requireUser } from "@/app/utils/auth";

export const metadata = {
	title: "Trip Details",
};

const Page = async ({ params }) => {
	await requireUser({ redirectPath: `/trips/trip/${params.tripID}` });
	return <TripDetails tripID={params.tripID} />;
};

export default Page;
