import GenerateOtpForm from "./GenerateOtpForm";

export const metadata = {
	title: "Request OTP for Email verification",
};

const Page = async ({ searchParams }) => {

	let { instituteCode } = searchParams;

	if (instituteCode) {
		instituteCode = instituteCode.split("?")[0];
	}

	return <GenerateOtpForm instituteCode={instituteCode} />;
};

export default Page;
