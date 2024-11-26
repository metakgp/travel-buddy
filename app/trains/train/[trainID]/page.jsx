import TrainDetails from "./TrainDetails";

export const metadata = {
	title: "Train Trip Details",
};

const Page = async ({ params }) => {
	const trainID = params.trainID;

	return <TrainDetails trainID={trainID} />;
};

export default Page;
