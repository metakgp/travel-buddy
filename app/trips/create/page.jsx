import checkUser from "@/app/utils/checkUser";
import { redirect } from "next/navigation";
import TripForm from "./TripForm";

const Page = async () => {
	const user = await checkUser({ verify: false });

	if (!user) {
		redirect("/register");
	}

	return <TripForm email={user.email} />;
};

export default Page;
