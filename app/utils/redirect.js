export function safeRedirectPath(input, fallback = "/") {
	if (typeof input !== "string") return fallback;
	const value = input.trim();
	if (!value) return fallback;
	// Only allow same-origin relative paths.
	// Disallow protocol-relative URLs like "//evil.com".
	if (!value.startsWith("/") || value.startsWith("//")) return fallback;
	return value;
}
