import MyTrains from "./MyTrains";
import { requireUser } from "@/app/utils/auth";

export const metadata = {
	title: "My Train Trips",
};

const Page = async () => {
	await requireUser({ redirectPath: "/trains/my-trains" });
	return <MyTrains />;
};

export default Page;
