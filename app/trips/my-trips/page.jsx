import checkUser from "@/app/utils/checkUser";
import { redirect } from "next/navigation";
import MyTrips from "./MyTrips";

const Page = async () => {
	const user = await checkUser();

	if (!user) {
		redirect("/register");
	}

	return <MyTrips />;
};

export default Page;
