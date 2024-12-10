import Link from "next/link";

const Home = () => {
	return (
		<div className="container text-center mt-5">
			<h1 className="mb-4">Welcome to Travel Buddy</h1>
			<h3>Find your travel partners for your next trip or train ride</h3>
			<br />
			<div className="d-flex justify-content-center gap-3">
			<Link href="/trips" className="btn btn-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-full text-sm px-3 py-2 text-center transition-all duration-500"
				><div className="gap-2 flex flex-row">
				<img src='/assets/trips.png' alt="Trip Icon" className="w-8 h-8" />
				<span> Track My Trips </span></div>
				</Link>
				<Link href="/trains" className="btn btn-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-full text-sm px-3 py-2 text-center transition-all duration-500"
				><div className="gap-2 flex flex-row">
				<img src='/assets/train.png' alt="Trip Icon" className="w-8 h-8" />
				<span> Train Trails </span></div>
				</Link>
			</div>
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

export default Home;
