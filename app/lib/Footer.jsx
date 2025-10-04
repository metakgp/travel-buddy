import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-6 sm:mt-8">
			<p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
				Please note that this application is made to help students who
				wish to share thier ride with someone with similiar travel
				plans. Any data submitted here will be visible to others who
				input a similiar time slot. Please consider before submitting
				any personal information.
			</p>
			<Link
				href="https://github.com/metakgp/travel-buddy"
				className="inline-flex w-full md:w-auto items-center justify-center btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm sm:text-base px-4 sm:px-6 py-3 text-center transition-all duration-500"
			>
				<div className="gap-2 sm:gap-3 flex flex-row items-center">
					<Image
						src="/assets/user.png"
						alt="User Icon"
						className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
						width={32}
						height={32}
					/>
					<span> Contribute to the project </span>
				</div>
			</Link>
		</footer>
	);
}
