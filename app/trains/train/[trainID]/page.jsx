import checkUser from "@/app/utils/checkUser";
import { redirect } from "next/navigation";
import TrainDetails from "./TrainDetails";

const Page = async ({ params }) => {
	const trainID = params.trainID;

	const user = await checkUser({ verify: false });

	if (!user) {
		redirect("/register");
	}

	return <TrainDetails trainID={trainID} />;
};

export default Page;
