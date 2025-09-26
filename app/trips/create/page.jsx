import TripForm from "./TripForm";
import { requireUser } from "@/app/utils/auth";

export const metadata = {
	title: "Create Trip",
};

const Page = async () => {
	const { email } = await requireUser({ redirectPath: "/trips/create" });
	return <TripForm email={email} />;
};

export default Page;
