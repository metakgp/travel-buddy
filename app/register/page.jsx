import { redirect } from "next/navigation";
import checkUser, { checkCookie } from "@/app/utils/checkUser";
import RegForm from "./RegForm";

export const metadata = {
	title: "Register",
};

const Page = async () => {
	const email = await checkCookie({ verify: false });

	if (!email) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}

	const user = await checkUser({ verify: false });

	if (user) {
		redirect("/");
	}

	return <RegForm email={email} />;
};

export default Page;
