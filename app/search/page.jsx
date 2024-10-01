"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SearchTrip = () => {
	const [tripID, setTripID] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const router = useRouter();

	useEffect(() => {
		// Check local storage for trip IDs
		const existingTrips = JSON.parse(localStorage.getItem("tripIDs")) || [];
		setSuggestions(existingTrips);
	}, [tripID]);

	const handleSearch = (id) => {
		router.push(`/trip/${id}`);
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow-lg p-4">
						<h2 className="text-center mb-4">
							Search Previous Trip
						</h2>
						<div className="form-group mb-3">
							<label htmlFor="tripID">Enter Trip ID</label>
							<input
								type="text"
								className="form-control"
								value={tripID}
								onChange={(e) => setTripID(e.target.value)}
								required
							/>

							{suggestions.length > 0 && (
								<ul className="list-group mt-2">
									Previous Trips:
									{suggestions.map((id) => (
										<li
											key={id}
											className="list-group-item list-group-item-action"
											onClick={() => handleSearch(id)}
											style={{ cursor: "pointer" }}
										>
											{id}
										</li>
									))}
								</ul>
							)}
						</div>
						<button
							className="btn btn-primary w-100"
							onClick={() => handleSearch(tripID)}
							disabled={!tripID} // Disable button if tripID is empty
						>
							Search
						</button>
						<button
							onClick={() => router.push("/")}
							className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
						>
							Back to Home
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchTrip;
