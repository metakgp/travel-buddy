import MyTrips from "./MyTrips";
import { requireUser } from "@/app/utils/auth";

export const metadata = {
	title: "My Trips",
};

const Page = async () => {
	await requireUser({ redirectPath: "/trips/my-trips" });
	return <MyTrips />;
};

export default Page;
