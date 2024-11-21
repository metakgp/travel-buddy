import checkUser from "@/app/utils/checkUser";
import { redirect } from "next/navigation";
import TrainForm from "./TrainForm";

export const metadata = {
	title: "Create Train Trip",
};

const Page = async () => {
	const user = await checkUser({ verify: false });

	if (!user) {
		redirect("/register");
	}

	return <TrainForm email={user.email} />;
};

export default Page;
