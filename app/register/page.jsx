import { redirect } from "next/navigation";
import RegForm from "./RegForm";
import { cookies } from "next/headers";

export const metadata = {
	title: "Register",
};

const Page = async () => {
	const cookieStore = cookies();
	const cookie = cookieStore.get("heimdall");

	if (!cookie) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}

	const token = cookie.value;
	if (!token) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}

	const email = JSON.parse(atob(token.split(".")[1])).email; // get the user email from jwt

	if (!email) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}

	return <RegForm email={email} />;
};

export default Page;
