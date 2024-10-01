"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import data from "@/app/data.json";

const Loading = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
		</div>
	);
};

const TripForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		year: "",
		roll: "",
		number: "",
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

		setLoading(true);

		if (
			!formData.name ||
			!formData.year ||
			!formData.roll ||
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

		const res = await fetch("/api/register", {
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
			router.push(`/trip/${json.tripID}`);
		} else {
			const json = await res.json();
			alert(json.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			{loading ? (
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
						<label className="block text-gray-700">Name:</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="border rounded-md p-2 w-full"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">
							Year of Study:
						</label>
						<select
							name="year"
							value={formData.year}
							onChange={handleChange}
							required
							className="border rounded-md p-2 w-full"
						>
							<option value="">Select Year</option>
							{Object.keys(data.years).map((key) => (
								<option key={key} value={key}>
									{data.years[key]}
								</option>
							))}
						</select>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">
							Roll Number:
						</label>
						<input
							type="text"
							name="roll"
							value={formData.roll}
							onChange={handleChange}
							required
							className="border rounded-md p-2 w-full"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">
							Mobile Number (Optional):
						</label>
						<input
							type="text"
							name="number"
							value={formData.number}
							onChange={handleChange}
							className="border rounded-md p-2 w-full"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">
							Departure Date:
						</label>
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
						<label className="block text-gray-700">
							Time Slot:
						</label>
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
						<label className="block text-gray-700">
							Destination:
						</label>
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
						<button
							type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
						>
							Submit
						</button>

						<button
							onClick={() => router.push("/")}
							className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
						>
							Back to Home
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default TripForm;
