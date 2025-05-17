/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			allowedOrigins: [
				"travel.metakgp.org",
				"travel_buddy",
				// Add any other domains or subdomains that might access your server actions
			],
		},
	},
};

module.exports = nextConfig;
