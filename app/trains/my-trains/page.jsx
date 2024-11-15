import checkUser from "@/app/utils/checkUser";
import { redirect } from "next/navigation";
import MyTrains from "./MyTrains";

const Page = async () => {
	const user = await checkUser({ verify: false });

	if (!user) {
		redirect("/register");
	}

	return <MyTrains />;
};

export default Page;
