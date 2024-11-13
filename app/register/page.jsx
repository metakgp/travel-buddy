import { redirect } from "next/navigation";
import checkUser, { checkCookie } from "../utils/checkUser";
import RegForm from "./RegForm";

const TripForm = async () => {
	const email = await checkCookie();

	const user = await checkUser();

	if (user) {
		redirect("/");
	}

	return <RegForm email={email} />;
};

export default TripForm;
