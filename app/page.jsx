import Link from "next/link";

const Home = () => {
	return (
		<div className="container text-center mt-5">
			<h1 className="mb-4">Welcome to Travel Buddy</h1>
			<h3>Find your travel partners for your next trip or train ride</h3>
			<br />
			<div className="d-flex justify-content-center gap-3">
				<Link href="/trips" className="btn btn-primary btn-lg">
					Trips
				</Link>
				<Link href="/trains" className="btn btn-secondary btn-lg">
					Trains
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
