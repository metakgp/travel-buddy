import TrainDetails from "./TrainDetails";
import { requireUser } from "@/app/utils/auth";

export const metadata = {
	title: "Train Trip Details",
};

const Page = async ({ params }) => {
	await requireUser({ redirectPath: `/trains/train/${params.trainID}` });
	return <TrainDetails trainID={params.trainID} />;
};

export default Page;
