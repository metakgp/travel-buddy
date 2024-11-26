import Link from "next/link";

export const metadata = {
	title: "Trips",
};

const Page = () => {
	return (
		<div className="container text-center mt-5">
			<h1 className="mb-4">Welcome to Travel Buddy</h1>
			<h3>Find your travel partners for your next trip</h3>
			<br />
			<h6>
				Enter your trip details and find other travelers with similar
				plans - within +/- 3 hours of your own trip timing.
			</h6>
			<br />
			<div className="d-flex justify-content-center gap-3 align-items-center flex-wrap mb-3">
				<Link href="/trips/create" className="btn btn-primary btn-lg">
					Enter New Trip Details
				</Link>
				<Link href="/trips/my-trips" className="btn btn-primary btn-lg">
					My Current Trips
				</Link>
			</div>
			<Link href="/" className="btn btn-secondary btn-lg">
				Back to Home
			</Link>
			<footer className="mt-5">
				<p>
					Please note that this application is made to help KGPians
					with similiar travel plans. Any data submitted here will be
					visible to others who input a similiar time slot. Please
					consider before submitting any personal information.
				</p>
				<h4 className="mt-8">
					Contribute to the project{" "}
					<a
						href="https://github.com/metakgp/travel-buddy"
						target="_blank"
					>
						here
					</a>
				</h4>
			</footer>
		</div>
	);
};

export default Page;
