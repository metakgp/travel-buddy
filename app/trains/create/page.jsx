import TrainForm from "./TrainForm";
import { requireUser } from "@/app/utils/auth";

export const metadata = {
	title: "Create Train Trip",
};

const Page = async () => {
	const { email } = await requireUser({ redirectPath: "/trains/create" });
	return <TrainForm email={email} />;
};

export default Page;
