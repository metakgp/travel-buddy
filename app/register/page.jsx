import { redirect } from "next/navigation";
import RegForm from "./RegForm";
import { cookies } from "next/headers";
import { instituteDetails } from "@/app/utils/institute";
import { getSession } from "../utils/auth";

export const metadata = {
	title: "Register",
};

const Page = async ({ searchParams }) => {
	const session = await getSession();
	if (session?.email) {
		redirect(searchParams.redirect_url || "/");
	}

	const { instituteCode, redirect_url } = searchParams;

	const institute = await instituteDetails({ instituteCode });

	const { authCookie, authLink } = institute;

	const cookieStore = cookies();
	const cookie = cookieStore.get(authCookie);

	// Build the redirect URL for Heimdall with proper fallback
	const finalRedirectUrl = redirect_url
		? `https://travel.metakgp.org/register?instituteCode=${instituteCode}&redirect_url=${encodeURIComponent(
				redirect_url
		  )}`
		: `https://travel.metakgp.org/register?instituteCode=${instituteCode}`;

	if (!cookie) {
		redirect(
			authLink + "?redirect_url=" + encodeURIComponent(finalRedirectUrl)
		);
	}

	const ssoToken = cookie.value;
	if (!ssoToken) {
		redirect(
			authLink + "?redirect_url=" + encodeURIComponent(finalRedirectUrl)
		);
	}

	const email = JSON.parse(atob(ssoToken.split(".")[1])).email; // get the user email from jwt

	if (!email) {
		redirect(
			authLink + "?redirect_url=" + encodeURIComponent(finalRedirectUrl)
		);
	}

	return (
		<RegForm
			email={email}
			instituteCode={instituteCode}
			redirectUrl={redirect_url}
		/>
	);
};

export default Page;
