import { redirect } from "next/navigation";
import VerifyOtpForm from "./VerifyOtpForm";
import { cookies } from "next/headers";

export const metadata = {
	title: "Enter OTP for Email verification",
};

const Page = async ({ searchParams }) => {
	const { redirect_url } = searchParams;
	console.log(redirect_url);
	const cookieStore = cookies();
	const cookie = cookieStore.get("otpData");

	if (!cookie) {
		redirect("/authenticate/generate-otp");
	}

	const token = cookie.value;

	if (!token) {
		redirect("/authenticate/generate-otp");
	}

	const { email, hashData, instituteCode } = JSON.parse(token);

	if (!email || !hashData || !instituteCode) {
		redirect("/authenticate/generate-otp");
	}

	return <VerifyOtpForm 
		email={email} 
		hashData={hashData} 
		instituteCode={instituteCode} 
		redirect_url={redirect_url} 
	/>;
};

export default Page;
