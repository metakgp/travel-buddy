import Image from "next/image";
import Link from "next/link";
import StatsSection from "./lib/StatsSection";
import Footer from "./lib/Footer";

const Home = () => {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center my-8 sm:my-12">
			<h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
				Welcome to Travel Buddy
			</h1>
			<h3 className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
				Find your travel partners to share your next trip with and{" "}
				<u>SAVE MONEY</u>!
			</h3>

			<div className="mb-6 sm:mb-10">
				<StatsSection showTrips={true} showTrains={true} />
			</div>

			<div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
				<Link
					href="/trips"
					className="inline-flex w-full md:w-auto items-center justify-center btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm sm:text-base px-4 sm:px-6 py-3 md:py-2 text-center transition-all duration-500"
				>
					<div className="gap-2 flex flex-row items-center">
						<Image
							src="/assets/trips.png"
							alt="Trip Icon"
							className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
							width={32}
							height={32}
						/>
						<span>Road Trips</span>
					</div>
				</Link>
				<Link
					href="/trains"
					className="inline-flex w-full md:w-auto items-center justify-center btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm sm:text-base px-4 sm:px-6 py-3 md:py-2 text-center transition-all duration-500"
				>
					<div className="gap-2 flex flex-row items-center">
						<Image
							src="/assets/train.png"
							alt="Train Icon"
							className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
							width={32}
							height={32}
						/>
						<span>Train Journeys</span>
					</div>
				</Link>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
