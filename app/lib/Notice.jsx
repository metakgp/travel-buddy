"use client";
import React, { useState, useEffect } from "react";

export default function Notice() {
	const [showPopup, setShowPopup] = useState(false);
	const [showBanner, setShowBanner] = useState(true);

	useEffect(() => {
		const hasSeenPopup = localStorage.getItem("metakgp_notice_seen");
		if (!hasSeenPopup) {
			setShowPopup(true);
		}
	}, []);

	const closePopup = () => {
		setShowPopup(false);
		localStorage.setItem("metakgp_notice_seen", "true");
	};

	return (
		<>
			{showBanner && (
				<div className="bg-red-600 text-white px-4 py-3 w-full relative z-40">
					<div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
						<div className="text-sm font-medium">
							<strong>URGENT:</strong> MetaKGP projects (including
							Travel Buddy) are at risk of shutting down due to
							lack of maintainers.{" "}
							<button
								onClick={() => setShowPopup(true)}
								className="underline hover:text-gray-200 ml-1"
							>
								Learn how you can help.
							</button>
						</div>
						{/* <button
							onClick={() => setShowBanner(false)}
							className="mt-2 sm:mt-0 text-white font-bold hover:text-gray-200 focus:outline-none"
							aria-label="Dismiss banner"
						>
							&times; Dismiss
						</button> */}
					</div>
				</div>
			)}

			{showPopup && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-3 sm:p-4">
					<div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-5 sm:p-8 text-gray-800 relative max-h-[90vh] overflow-y-auto">
						<button
							onClick={closePopup}
							className="absolute top-2 right-3 sm:top-4 sm:right-5 text-gray-400 hover:text-gray-800 focus:outline-none text-2xl font-bold"
							aria-label="Close popup"
						>
							&times;
						</button>
						<h2 className="text-xl sm:text-3xl font-extrabold mb-3 text-red-600 border-b pb-2 sm:pb-3 pr-4">
							Help Save MetaKGP Projects!
						</h2>
						<p className="mb-2 sm:mb-3 text-sm sm:text-lg leading-relaxed">
							Travel Buddy, along with several other MetaKGP
							open-source projects, is facing a critical
							situation. With little to no active maintainers,
							these initiatives are <strong>dying out</strong>.
						</p>
						<p className="mb-2 sm:mb-3 text-sm sm:text-lg font-bold text-gray-900">
							How you can help:
						</p>
						<ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 text-sm sm:text-base space-y-2 sm:space-y-3">
							<li>
								<strong>Contribute:</strong> Volunteer to be a
								maintainer and contribute through code
							</li>
							<li>
								<strong>Spread the word:</strong> Actively
								participate in using and promoting these tools
								within the campus community.
							</li>
							<li>
								<strong>Advocate:</strong> Urge the student
								representatives and admin to support this
								initiative and send regular email broadcasts to
								all students for better reach and adoption.
							</li>
						</ul>
						<p className="text-xs sm:text-base italic mb-5 sm:mb-8 text-gray-600 text-center">
							These projects run on community support. Let&apos;s
							keep the open-source spirit alive!
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
							<a
								href="https://github.com/metakgp/travel-buddy"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 text-center flex-1 whitespace-nowrap text-decoration-none text-sm sm:text-base"
							>
								GitHub Repo
							</a>
							<a
								href="https://slack.metakgp.org"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 text-center flex-1 whitespace-nowrap text-decoration-none text-sm sm:text-base"
							>
								Join our Slack
							</a>
							<button
								onClick={closePopup}
								className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 text-center flex-1 whitespace-nowrap text-decoration-none text-sm sm:text-base"
							>
								I&apos;ll Support!
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
