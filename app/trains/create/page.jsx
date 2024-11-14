import checkUser from "@/app/utils/checkUser";
import { redirect } from "next/navigation";
import TrainForm from "./TrainForm";

const Page = async () => {
	const user = await checkUser({ verify: false });

	if (!user) {
		redirect("/register");
	}

	return <TrainForm email={user.email} />;
};

export default Page;
