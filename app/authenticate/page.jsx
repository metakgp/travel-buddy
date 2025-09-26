export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/app/lib/mongodb";
import Institute from "@/app/models/Institute";
import AuthForm from "./AuthForm";
import { getSession } from "@/app/utils/auth";

export const metadata = {
	title: "Select Institute",
};

const Page = async ({ searchParams }) => {
	const session = await getSession();
	if (session?.email) {
		redirect(searchParams.redirect_url || "/");
	}

	await connectToDatabase();

	// Return only names and codes of Institutes
	const institutes = await Institute.find({}, { _id: 0, name: 1, code: 1 });

	return (
		<AuthForm
			institutes={JSON.parse(JSON.stringify(institutes))}
			redirectUrl={searchParams.redirect_url}
		/>
	);
};

export default Page;
