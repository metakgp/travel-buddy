import { redirect } from "next/navigation";
import RegForm from "./RegForm";
import { cookies } from "next/headers";

export const metadata = {
	title: "Register",
};

const Page = async ({ searchParams }) => {
	const { authCookie, authLink, verifyAuthLink } = searchParams;
	const cookieStore = cookies();
	const cookie = cookieStore.get(`${authCookie}`);

	if (!cookie) {
		redirect(
			`${authLink}?redirect_url=https://travel.metakgp.org/`
		);
	}

	const token = cookie.value;
	if (!token) {
		redirect(
			`${authLink}?redirect_url=https://travel.metakgp.org/`
		);
	}

	const email = JSON.parse(atob(token.split(".")[1])).email; // get the user email from jwt

	if (!email) {
		redirect(
			`${authLink}?redirect_url=https://travel.metakgp.org/`
		);
	}

	return <RegForm email={email} verifyAuthLink={verifyAuthLink} authCookie={authCookie} />;
};

export default Page;
