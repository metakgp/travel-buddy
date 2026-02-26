import { redirect } from "next/navigation";
import RegForm from "./RegForm";
import { getSession } from "../utils/auth";
import { safeRedirectPath } from "@/app/utils/redirect";

export const metadata = {
	title: "Register",
};

const Page = async ({ searchParams }) => {
	const { instituteCode, redirect_url } = searchParams;

	// If user is already logged in, redirect to the provided redirect_url
	const session = await getSession();
	if (session?.email) {
		redirect(safeRedirectPath(redirect_url));
	}

	// If instituteCode is not provided, redirect to authenticate page with provided redirect_url
	if (!instituteCode) {
		redirect(
			"/authenticate?redirect_url=" +
				encodeURIComponent(safeRedirectPath(redirect_url)),
		);
	}

	return (
		<RegForm
			instituteCode={instituteCode}
			redirectUrl={safeRedirectPath(redirect_url)}
		/>
	);
};

export default Page;
