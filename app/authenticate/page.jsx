import { connectToDatabase } from "@/app/lib/mongodb";
import Institute from "@/app/models/Institute";
import AuthForm from "./AuthForm";
import { headers } from "next/headers";

export const metadata = {
	title: "Select Institute",
};

const Page = async ({ searchParams }) => {

	const { redirect_path } = searchParams;

	const requestHeaders = headers();
	const host = requestHeaders.get('host');
	const protocol = requestHeaders.get('x-forwarded-proto') || 'http';
	const redirect_url = protocol + "://" + host + redirect_path;

	await connectToDatabase();

	// Return only names of Institues
	const institutes = await Institute.find({}, { _id: 0, name: 1, code: 1 });

	const institutesData = JSON.parse(JSON.stringify(institutes));

	return <AuthForm institutes={institutesData} redirect_url={redirect_url} />;
};

export default Page;
