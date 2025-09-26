"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/app/utils/Loading";
import Link from "next/link";
import { today } from "@/app/utils/date";

const TrainForm = ({ email }) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		trainNumber: "",
		date: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.trainNumber || !formData.date) {
			alert("Please fill all the fields!");
			return;
		}

		setIsSubmitting(true);

		try {
			const res = await fetch("/api/trains", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				const json = await res.json();
				alert(json.message);
				router.push(`/trains/train/${json.trainID}`);
			} else {
				const json = await res.json();
				alert(json.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitting) {
		return <Loading />;
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded shadow-md w-full max-w-md"
		>
			<h2 className="text-2xl font-bold mb-4 text-center">
				Create New Train Trip
			</h2>
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
				<label className="block text-gray-700">Train Number:</label>
				<input
					type="text"
					name="trainNumber"
					value={formData.trainNumber}
					onChange={handleChange}
					required
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
					min={today().toISOString().slice(0, 10)}
					className="border rounded-md p-2 w-full"
				/>
			</div>
			<p>
				Please <Link href="/trips">add trip(s)</Link> separately to
				check for common trips to/from the stations.
			</p>
			<br />
			<div>
				<button type="submit" className="w-full btn btn-primary">
					Submit
				</button>

				<Link href="/trains">
					<button className="mt-4 w-full btn btn-secondary">
						Back to Trains Page
					</button>
				</Link>
			</div>
		</form>
	);
};

export default TrainForm;
