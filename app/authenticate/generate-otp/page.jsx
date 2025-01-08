import GenerateOtpForm from "./GenerateOtpForm";

export const metadata = {
	title: "Request OTP for Email verification",
};

const Page = async ({ searchParams }) => {

	let { instituteCode, redirect_url } = searchParams;

	if (instituteCode) {
		instituteCode = instituteCode.split("?")[0];
	}

	return <GenerateOtpForm instituteCode={instituteCode} redirect_url={redirect_url} />;
};

export default Page;
