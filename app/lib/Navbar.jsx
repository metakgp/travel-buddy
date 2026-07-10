"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		// Check if user is logged in by checking for session cookie
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const response = await fetch("/api/profile");
			setIsLoggedIn(response.ok);
		} catch {
			setIsLoggedIn(false);
		}
	};

	const handleLogout = async () => {
		// Clear session by calling logout endpoint (you may need to create this)
		document.cookie =
			"travelbuddy=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setIsLoggedIn(false);
		router.push("/");
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<Link href="/" className={styles.logo}>
					🚗 Travel Buddy
				</Link>

				<button
					className={styles.menuToggle}
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
				>
					☰
				</button>

				<div
					className={`${styles.navLinks} ${
						menuOpen ? styles.navLinksOpen : ""
					}`}
				>
					<Link
						href="/"
						className={
							pathname === "/" ? styles.activeLink : styles.link
						}
					>
						Home
					</Link>
					<Link
						href="/trips"
						className={
							pathname === "/trips"
								? styles.activeLink
								: styles.link
						}
					>
						Trips
					</Link>
					<Link
						href="/trains"
						className={
							pathname === "/trains"
								? styles.activeLink
								: styles.link
						}
					>
						Trains
					</Link>

					{isLoggedIn ? (
						<>
							<Link
								href="/profile"
								className={
									pathname === "/profile"
										? styles.activeLink
										: styles.link
								}
							>
								Profile
							</Link>
							<button
								onClick={handleLogout}
								className={styles.logoutBtn}
							>
								Logout
							</button>
						</>
					) : (
						<Link
							href="/authenticate"
							className={styles.loginBtn}
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
