import { redirect } from "next/navigation";
import checkUser, { checkCookie } from "../utils/checkUser";
import RegForm from "./RegForm";

const Page = async () => {
	const email = await checkCookie();

	if (!email) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}

	const user = await checkUser();

	if (user) {
		redirect("/");
	}

	return <RegForm email={email} />;
};

export default Page;
