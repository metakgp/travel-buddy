"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import data from "@/app/data.json";
import Loading from "@/app/utils/Loading";
import Link from "next/link";

const TripForm = ({ email }) => {
	const [formData, setFormData] = useState({
		date: "",
		time: "",
		source: "",
		destination: "",
	});

	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!formData.date ||
			!formData.time ||
			!formData.source ||
			!formData.destination
		) {
			alert("Please fill all the fields!");
			return;
		}

		if (formData.source === formData.destination) {
			alert("Source and destination cannot be same!");
			return;
		}

		setLoading(true);

		const res = await fetch("/api/trips/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		setLoading(false);

		if (res.ok) {
			const json = await res.json();
			alert(json.message);
			router.push(`/trips/trip/${json.tripID}`);
		} else {
			const json = await res.json();
			alert(json.message);
		}
	};

	return loading ? (
		<Loading />
	) : (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded shadow-md w-full max-w-md"
		>
			<h2 className="text-2xl font-bold mb-4 text-center">
				Create New Trip
			</h2>

			{/* Form fields */}
			<div className="mb-4">
				<label className="block text-gray-700">Email Address:</label>
				<input
					type="text"
					name="email"
					value={email}
					disabled
					className="border rounded-md p-2 w-full"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Departure Date:</label>
				<input
					type="date"
					name="date"
					value={formData.date}
					onChange={handleChange}
					required
					className="border rounded-md p-2 w-full"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Time Slot:</label>
				<select
					name="time"
					value={formData.time}
					onChange={handleChange}
					required
					className="border rounded-md p-2 w-full"
				>
					<option value="">Select Time Slot</option>
					{Object.keys(data.slots).map((slot) => (
						<option key={slot} value={slot}>
							{data.slots[slot]}
						</option>
					))}
				</select>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Source:</label>
				<select
					name="source"
					value={formData.source}
					onChange={handleChange}
					required
					className="border rounded-md p-2 w-full"
				>
					<option value="">Select Source</option>
					{Object.keys(data.locations).map((location) => (
						<option key={location} value={location}>
							{data.locations[location]}
						</option>
					))}
				</select>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Destination:</label>
				<select
					name="destination"
					value={formData.destination}
					onChange={handleChange}
					required
					className="border rounded-md p-2 w-full"
				>
					<option value="">Select Destination</option>
					{Object.keys(data.locations).map((location) => (
						<option key={location} value={location}>
							{data.locations[location]}
						</option>
					))}
				</select>
			</div>

			<div>
				<button type="submit" className="w-full btn btn-primary">
					Submit
				</button>

				<Link href="/trips">
					<button className="mt-4 w-full btn btn-secondary">
						Back to Trips Page
					</button>
				</Link>
			</div>
		</form>
	);
};

export default TripForm;
