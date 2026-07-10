"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/utils/Loading";
import styles from "./profile.module.css";

export default function ProfilePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [profileData, setProfileData] = useState(null);
	const [error, setError] = useState(null);
	const [activeTab, setActiveTab] = useState("upcoming"); // upcoming or past

	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/profile");

			if (response.status === 401) {
				router.push("/authenticate?redirect_url=/profile");
				return;
			}

			if (!response.ok) {
				throw new Error("Failed to fetch profile");
			}

			const data = await response.json();
			setProfileData(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteTrip = async (tripID) => {
		if (!confirm("Are you sure you want to delete this trip?")) return;

		try {
			const response = await fetch(`/api/trips/${tripID}`, {
				method: "DELETE",
			});

			if (response.ok) {
				// Refresh profile data
				fetchProfile();
			} else {
				alert("Failed to delete trip");
			}
		} catch (err) {
			alert("Error deleting trip");
		}
	};

	const handleDeleteTrain = async (trainID) => {
		if (!confirm("Are you sure you want to delete this train?")) return;

		try {
			const response = await fetch(`/api/trains/${trainID}`, {
				method: "DELETE",
			});

			if (response.ok) {
				// Refresh profile data
				fetchProfile();
			} else {
				alert("Failed to delete train");
			}
		} catch (err) {
			alert("Error deleting train");
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	const formatTime = (hour) => {
		const period = hour >= 12 ? "PM" : "AM";
		const displayHour = hour % 12 || 12;
		return `${displayHour}:00 ${period}`;
	};

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return (
			<div className={styles.errorContainer}>
				<h2>Error</h2>
				<p>{error}</p>
				<button onClick={() => router.push("/")}>Go Home</button>
			</div>
		);
	}

	if (!profileData) {
		return null;
	}

	const { user, trips, trains, stats } = profileData;
	const displayTrips =
		activeTab === "upcoming" ? trips.upcoming : trips.past;
	const displayTrains =
		activeTab === "upcoming" ? trains.upcoming : trains.past;

	return (
		<div className={styles.container}>
			{/* Profile Header */}
			<div className={styles.profileHeader}>
				<div className={styles.userInfo}>
					<h1>{user.name}</h1>
					<p className={styles.email}>{user.email}</p>
					<div className={styles.userDetails}>
						<span>Roll: {user.roll}</span>
						<span>•</span>
						<span>Phone: {user.number}</span>
					</div>
				</div>
			</div>

			{/* Statistics Cards */}
			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<h3>{stats.totalTrips}</h3>
					<p>Total Trips</p>
					<span className={styles.statDetail}>
						{stats.upcomingTrips} upcoming
					</span>
				</div>
				<div className={styles.statCard}>
					<h3>{stats.totalTrains}</h3>
					<p>Total Trains</p>
					<span className={styles.statDetail}>
						{stats.upcomingTrains} upcoming
					</span>
				</div>
				<div className={styles.statCard}>
					<h3>{stats.pastTrips + stats.pastTrains}</h3>
					<p>Completed Journeys</p>
					<span className={styles.statDetail}>
						{stats.pastTrips} trips, {stats.pastTrains} trains
					</span>
				</div>
			</div>

			{/* Tab Navigation */}
			<div className={styles.tabContainer}>
				<button
					className={`${styles.tab} ${
						activeTab === "upcoming" ? styles.activeTab : ""
					}`}
					onClick={() => setActiveTab("upcoming")}
				>
					Upcoming ({stats.upcomingTrips + stats.upcomingTrains})
				</button>
				<button
					className={`${styles.tab} ${
						activeTab === "past" ? styles.activeTab : ""
					}`}
					onClick={() => setActiveTab("past")}
				>
					Past ({stats.pastTrips + stats.pastTrains})
				</button>
			</div>

			{/* Trips Section */}
			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>
					🚗 Trips ({displayTrips.length})
				</h2>
				{displayTrips.length === 0 ? (
					<p className={styles.emptyMessage}>
						No {activeTab} trips found
					</p>
				) : (
					<div className={styles.cardGrid}>
						{displayTrips.map((trip) => (
							<div key={trip.tripID} className={styles.card}>
								<div className={styles.cardHeader}>
									<span className={styles.route}>
										{trip.source} → {trip.destination}
									</span>
									<button
										className={styles.deleteBtn}
										onClick={() =>
											handleDeleteTrip(trip.tripID)
										}
										title="Delete trip"
									>
										🗑️
									</button>
								</div>
								<div className={styles.cardBody}>
									<p className={styles.date}>
										📅 {formatDate(trip.date)}
									</p>
									<p className={styles.time}>
										🕐 {formatTime(trip.time)}
									</p>
								</div>
								<div className={styles.cardFooter}>
									<span className={styles.tripId}>
										ID: {trip.tripID}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Trains Section */}
			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>
					🚂 Trains ({displayTrains.length})
				</h2>
				{displayTrains.length === 0 ? (
					<p className={styles.emptyMessage}>
						No {activeTab} trains found
					</p>
				) : (
					<div className={styles.cardGrid}>
						{displayTrains.map((train) => (
							<div key={train.trainID} className={styles.card}>
								<div className={styles.cardHeader}>
									<span className={styles.trainNumber}>
										Train #{train.trainNumber}
									</span>
									<button
										className={styles.deleteBtn}
										onClick={() =>
											handleDeleteTrain(train.trainID)
										}
										title="Delete train"
									>
										🗑️
									</button>
								</div>
								<div className={styles.cardBody}>
									<p className={styles.date}>
										📅 {formatDate(train.date)}
									</p>
								</div>
								<div className={styles.cardFooter}>
									<span className={styles.trainId}>
										ID: {train.trainID}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Action Buttons */}
			<div className={styles.actionButtons}>
				<button
					className={styles.primaryBtn}
					onClick={() => router.push("/trips")}
				>
					Add New Trip
				</button>
				<button
					className={styles.primaryBtn}
					onClick={() => router.push("/trains")}
				>
					Add New Train
				</button>
			</div>
		</div>
	);
}
