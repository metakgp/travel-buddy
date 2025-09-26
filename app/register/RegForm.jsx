"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/utils/Loading";

export default function RegForm({ email, instituteCode, redirectUrl = "/" }) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		roll: "",
		number: "",
		instituteCode,
	});

	useEffect(() => {
		const checkUser = async () => {
			setIsSubmitting(true);
			try {
				const res = await fetch("/api/register?email=" + email);
				if (!res.ok) {
					router.push(redirectUrl);
					return;
				}
			} finally {
				setIsSubmitting(false);
			}
		};
		checkUser();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name || !formData.roll || !formData.number) {
			alert("Please fill all the fields!");
			return;
		}

		if (!/^\d{10}$/.test(formData.number)) {
			alert(
				"Invalid mobile number! Please enter a valid 10 digit number."
			);
			return;
		}

		setIsSubmitting(true);

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(formData),
			});

			const json = await res.json();
			if (res.ok) {
				alert(json.message);
				router.push(redirectUrl);
				return;
			}

			alert(json.message);
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
