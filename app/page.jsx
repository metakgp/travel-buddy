import Link from "next/link";
import checkUser from "@/app/utils/checkUser";

const Home = async () => {
	const user = await checkUser();

	return (
		<div className="container text-center mt-5">
			<h1 className="mb-4">
				Welcome to Travel Buddy {user && " - " + user.name}
			</h1>
			<h3>Find your travel partners for your next trip</h3>
			<br />
			<h6>
				Enter your trip details and find other travelers with similar
				plans - within 3 hours of your trip time
			</h6>
			<br />
			<div className="d-flex justify-content-center gap-3">
				<Link
					href={user ? "/create" : "/register"}
					className="btn btn-primary btn-lg"
				>
					Enter New Trip Details
				</Link>
				<Link
					href={user ? "/my-trips" : "/register"}
					className="btn btn-secondary btn-lg"
				>
					My Current Trips
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
