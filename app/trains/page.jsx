import Image from "next/image";
import Link from "next/link";
import StatsSection from "../lib/stats";

export const metadata = {
	title: "Train Trips",
};

const Page = () => {
	return (
		<div className="container text-center m-5">
			<h1 className="mb-4">Welcome to Travel Buddy</h1>
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
			<footer className="mt-5">
				<p>
					Please note that this application is made to help students
					who wish to share thier ride with someone with similiar
					travel plans. Any data submitted here will be visible to
					others who input a similiar time slot. Please consider
					before submitting any personal information.
				</p>
				<Link
					href="https://github.com/metakgp/travel-buddy"
					className="btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337]
				 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-yellow-500 font-medium rounded-full text-sm px-3 py-2 text-center transition-all duration-500"
				>
					<div className="gap-3 flex flex-row">
						<Image
							src="/assets/user.png"
							alt="Trip Icon"
							className="w-8 h-8"
							width={32}
							height={32}
						/>
						<span> Contribute to the project </span>
					</div>
				</Link>
			</footer>
		</div>
	);
};

export default Page;
