import Link from "next/link";
import StatsSection from "../lib/StatsSection";
import Footer from "../lib/Footer";

export const metadata = {
	title: "Train Trips",
};

const Page = () => {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center my-8 sm:my-12">
			<h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
				Welcome to Travel Buddy
			</h1>
			<h3>
				Find your travel partners for your next train ride.{" "}
				<u>Find company and save money on your road trips</u>!
			</h3>
			<br />
			<h6>
				Enter your train journey details and find others on the same
				train.
				<br />
				<br />
				Please <Link href="/trips">Add Trip(s)</Link> seperately to find
				people with common trips to/from the stations.
			</h6>
			<br />
			<StatsSection showTrains={true} />
			<div className="d-flex justify-content-center gap-3 align-items-center flex-wrap mb-3">
				<Link
					href="/trains/create"
					className="btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
				>
					Enter New Train Details
				</Link>
				<Link
					href="/trains/my-trains"
					className="btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm px-4 py-2 text-center transition-all duration-500"
				>
					My Current Train Trips
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
