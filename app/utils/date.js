export function today() {
	const today = new Date();
	//set time zone to IST
	const ISTOffset = 330; // IST offset UTC +5:30
	today.setMinutes(today.getMinutes() + ISTOffset);
	// get only yyyy-mm-dd part of date
	const dateObj = new Date(today.toISOString().slice(0, 10));
	return dateObj;
}
