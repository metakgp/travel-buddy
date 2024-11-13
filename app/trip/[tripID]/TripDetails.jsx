"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import mapping from "@/app/data.json";

const TripDetails = ({ tripID }) => {
	const router = useRouter();

	const [data, setData] = useState(null);

	const getDetails = async () => {
		const res = await fetch("/api/find", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tripID }),
		});
		if (res.ok) {
			const json = await res.json();
			setData(json);
		} else {
			const json = await res.json();
			alert(json.message);
			router.push("/");
		}
	};

	useEffect(() => {
		getDetails();
	}, [tripID]);

	const copyTripID = () => {
		if (data) {
			navigator.clipboard
				.writeText(data.trip.tripID)
				.then(() => {
					alert("Trip ID copied to clipboard!");
				})
				.catch((err) => {
					console.error("Failed to copy: ", err);
				});
		}
	};

	const handleCall = (number) => {
		window.open(`tel:${number}`);
	};

	const handleWhatsApp = (number) => {
		window.open(`https://wa.me/+91${number}`);
	};

	const deleteTrip = async (tripID) => {
		if (!confirm("Are you sure you want to delete this trip?")) return;

		const res = await fetch("/api/delete", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tripID }),
		});
		if (res.ok) {
			const json = await res.json();
			alert(json.message);
			router.push("/");
		} else {
			const json = await res.json();
			alert(json.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			{data ? (
				<div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
					<h2 className="text-2xl font-bold mb-4 text-center">
						Trip Details
					</h2>
					<h3 className="text-lg font-semibold">
						Trip ID:{" "}
						<span className="text-blue-600">
							{data.trip.tripID}
						</span>
						<button
							onClick={copyTripID}
							className="ml-2 text-sm text-white bg-blue-500 p-2 rounded hover:bg-blue-600 transition"
						>
							Copy Trip ID
						</button>
					</h3>
					<p>
						<strong>Name:</strong> {data.trip.name}
					</p>
					<p>
						<strong>Roll Number:</strong> {data.trip.roll}
					</p>
					<p>
						<strong>Mobile Number:</strong> {data.trip.number}
					</p>
					<p>
						<strong>Email: </strong> {data.trip.email}
					</p>
					<p>
						<strong>Source:</strong>{" "}
						{mapping.locations[data.trip.source]}
					</p>
					<p>
						<strong>Destination:</strong>{" "}
						{mapping.locations[data.trip.destination]}
					</p>
					<p>
						<strong>Date:</strong>{" "}
						{new Date(data.trip.date).toLocaleDateString()}
						&nbsp;&nbsp;
						<strong>Time Slot:</strong>{" "}
						{mapping.slots[data.trip.time]}
					</p>

					<h3 className="text-lg font-semibold mt-4">
						Common Trips (within 3 hours):
					</h3>
					<ul className="mt-2">
						{data.similiar.length === 0 && (
							<p>
								No common trips found! Please check again later.
							</p>
						)}
						{data.similiar.map((trip, idx) => (
							<li key={idx} className="border p-2">
								<p>
									<strong>Name:</strong> {trip.name}
								</p>
								<p>
									<strong>Roll Number:</strong> {trip.roll}
								</p>
								<p>
									<strong>Mobile Number:</strong>{" "}
									{trip.number}
									<button
										onClick={() =>
											handleCall(data.trip.number)
										}
										className="ml-2 bg-blue-500 text-white p-1 px-2 rounded"
									>
										Call
									</button>
									<button
										onClick={() =>
											handleWhatsApp(data.trip.number)
										}
										className="ml-2 bg-green-500 text-white p-1 px-2 rounded"
									>
										WhatsApp
									</button>
								</p>
								<p>
									<strong>Email: </strong>{" "}
									<a
										href={`mailto:${trip.email}`}
										target="_blank"
									>
										{trip.email}
									</a>
								</p>
								<p>
									<strong>Source:</strong>{" "}
									{mapping.locations[trip.source]}
								</p>
								<p>
									<strong>Destination:</strong>{" "}
									{mapping.locations[trip.destination]}
								</p>
								<p>
									<strong>Date:</strong>{" "}
									{new Date(trip.date).toLocaleDateString()}
									&nbsp;&nbsp;
									<strong>Time Slot:</strong>{" "}
									{mapping.slots[trip.time]}
								</p>
							</li>
						))}
					</ul>
					<button
						onClick={() => router.push("/")}
						className="mt-3 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
					>
						Back to Home
					</button>
					<button
						onClick={() => router.push("/my-trips")}
						className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
					>
						My Trips
					</button>
					<button
						onClick={() => deleteTrip(data.trip.tripID)}
						className="mt-2 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
					>
						Delete this Trip
					</button>
				</div>
			) : (
				<div className="flex items-center justify-center min-h-screen">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
				</div>
			)}
		</div>
	);
};

export default TripDetails;
