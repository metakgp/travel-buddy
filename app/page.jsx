import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import User from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";

const Home = async () => {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("heimdall");

	if (!cookie) {
		redirect(
			"https://heimdall.metakgp.org/?redirect_url=https://travel.metakgp.org/"
		);
	}
	const jwt = cookie.value;

	// decode jwt
	const email = JSON.parse(atob(jwt.split(".")[1])).email; // get the user email from jwt

	await connectToDatabase();

	// const newUser = new User({
	// 	email: email,
	// 	name: "Saharsh Agrawal",
	// 	roll: "21IM3EP27",
	// 	number: "1234567890",
	// });
	// await newUser.save();

	const user = await User.findOne({
		email: email,
	});
	if (!user) {
		return "Sign Up required";
	}

	return (
		<div className="container text-center mt-5">
			<h1 className="mb-4">Welcome to Travel Buddy - {user.name}</h1>
			<h3>Find your travel partners for your next trip</h3>
			<br />
			<h6>
				Enter your trip details and find other travelers with similar
				plans - within 3 hours of your trip time
			</h6>
			<br />
			<div className="d-flex justify-content-center gap-3">
				<Link href="/create" className="btn btn-primary btn-lg">
					Enter Trip Details
				</Link>
				<Link href="/search" className="btn btn-secondary btn-lg">
					Check your Previous Entries
				</Link>
			</div>
			<footer className="mt-5">
				<p>
					Please note that this application is made to help KGPians
					with similiar travel plans. Any data submitted here will be
					visible to others who input a similiar time slot. Please
					consider before submitting any personal information.
				</p>
			</footer>
		</div>
	);
};

export default Home;
