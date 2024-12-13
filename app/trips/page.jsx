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
				<Link href="/trips/create" className="btn btn-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
				>
					Enter New Trip Details
				</Link>
				<Link href="/trips/my-trips" className="btn btn-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
				>
					My Current Trips
				</Link>
			</div>
			<Link href="/" className="btn btn-lg text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
			>
				Back to Home
			</Link>
			<footer className="mt-5">
				<p>
					Please note that this application is made to help KGPians
					with similiar travel plans. Any data submitted here will be
					visible to others who input a similiar time slot. Please
					consider before submitting any personal information.
				</p>
				<Link href="https://github.com/metakgp/travel-buddy" className="btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337]
				 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none   focus:ring-yellow-500 font-medium rounded-full text-sm px-3 py-2 text-center transition-all duration-500">
					<div className="gap-3 flex flex-row">
						<img src='/assets/user.png' alt="Trip Icon" className="w-8 h-8" />
						<span> Contribute to the project </span>
					</div>
				</Link>
			</footer>
		</div>
	);
};

export default Page;
