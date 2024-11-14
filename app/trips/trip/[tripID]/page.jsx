import checkUser from "@/app/utils/checkUser";
import { redirect } from "next/navigation";
import TripDetails from "./TripDetails";

const Page = async ({ params }) => {
	const tripID = params.tripID;

	const user = await checkUser({ verify: false });

	if (!user) {
		redirect("/register");
	}

	return <TripDetails tripID={tripID} />;
};

export default Page;
