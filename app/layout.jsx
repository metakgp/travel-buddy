import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
	title: {
		template: "%s | Travel Buddy",
		default: "Travel Buddy",
	},
	description: "Find travel partners and plan your trips",
	description:
		"Find travel partners and plan your trips. Travel Buddy is a platform for IIT KGP students to find travel partners and plan trips together.",
	keywords: [
		"travel",
		"buddy",
		"iit",
		"kgp",
		"indian",
		"institute",
		"technology",
		"kharagpur",
		"kolkata",
		"trip",
		"partner",
		"find",
		"plan",
		"together",
		"train",
	],
	metadataBase: new URL("https://travel.metakgp.org"),
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<GoogleAnalytics gaId="G-Y0Z1ZF5667" />
			</head>
			<body>
				<div className="flex items-center justify-center min-h-screen bg-gray-100">
					{children}
				</div>
			</body>
		</html>
	);
}
