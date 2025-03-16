"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/utils/Loading";
import { useRouter } from "next/navigation";
import { checkUser } from "@/app/utils/auth";

export default function RegForm({ email, instituteCode, redirect_url }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		name: "",
		roll: "",
		number: "",
		instituteCode: instituteCode
	});

	const check = async () => {
		if (localStorage.getItem("travelbuddy")) {
			router.push("/");
			return;
		}

		const user = await checkUser({ email });
		if (user) {
			localStorage.setItem("travelbuddy", user);
			router.push("/");
			return;
		}

		setLoading(false);
	};

	useEffect(() => {
		check();
	}, []);


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name || !formData.roll || !formData.number) {
			alert("Please fill all the fields!");
			return;
		}

		// check mobile number
		if (!/^\d{10}$/.test(formData.number)) {
			alert(
				"Invalid mobile number! Please enter a valid 10 digit number."
			);
			return;
		}

		setLoading(true);

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
			localStorage.setItem("travelbuddy", json.user);
			router.push(redirect_url);
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
				Create Account
			</h2>

			{/* Form fields */}
			<div className="mb-4">
				<label className="block text-gray-700">Full Name:</label>
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
				<label className="block text-gray-700">Roll Number:</label>
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
				<label className="block text-gray-700">Mobile Number:</label>
				<input
					type="text"
					name="number"
					value={formData.number}
					onChange={handleChange}
					className="border rounded-md p-2 w-full"
				/>
			</div>

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

			<div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
				>
					Submit
				</button>
			</div>
		</form>
	);
}
