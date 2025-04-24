export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/app/lib/mongodb";
import Institute from "@/app/models/Institute";
import AuthForm from "./AuthForm";

export const metadata = {
	title: "Select Institute",
};

const Page = async () => {
	await connectToDatabase();

	// Return only names of Institues
	const institutes = await Institute.find({}, { _id: 0, name: 1, code: 1 });

	return <AuthForm institutes={JSON.parse(JSON.stringify(institutes))} />;
};

export default Page;
