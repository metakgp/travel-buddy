export default function Loading({ text = "" }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			{text && <span className="mt-4">{text}</span>}
		</div>
	);
}
