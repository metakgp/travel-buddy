import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
	title: "Travel Buddy",
	description: "Find travel partners and plan your trips",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
