import Link from "next/link";
import StatsSection from "../lib/StatsSection";
import Footer from "../lib/footer";

export const metadata = {
	title: "Trips",
};

const Page = async () => {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center my-8 sm:my-12">
			<h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
				Welcome to Travel Buddy
			</h1>
			<h3>
				Find your travel partners to share your next trip with and{" "}
				<u>SAVE MONEY</u>!
			</h3>
			<br />
			<h6>
				Enter your trip details and find others with similar plans -
				within +/- 3 hours of your own trip timing.
			</h6>
			<br />
			<StatsSection showTrips={true} />
			<div className="d-flex justify-content-center gap-3 align-items-center flex-wrap mb-3">
				<Link
					href="/trips/create"
					className="btn btn-lg text-white bg-gradient-to-br  from-[#D2691E] to-[#8e5337]  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
				>
					Enter New Trip Details
				</Link>
				<Link
					href="/trips/my-trips"
					className="btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
				>
					My Current Trips
				</Link>
			</div>
			<Link
				href="/"
				className="btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
			>
				Back to Home
			</Link>
			<Footer />
		</div>
	);
};

export default Page;
