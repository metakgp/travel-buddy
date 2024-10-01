import { Schema, model, models } from "mongoose";

// Form fields:
// i)	name – (Full Name) - Text
// ii)	year – (Year) – drop down with mapping (1…n) and other
// iii)	number – (Mobile Number) – number with check

// iv)	date – (Departure Date) - string - format yyyy-mm-dd
// v)	time – (Time) - drop down - 0-23
// vi)	source – (Source) – drop down - 3 options: IIT, KGP, HWH, CCU
// vii)	destination – (Destination) – drop down - 3 options: IIT, KGP, HWH, CCU

const tripSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please provide a name"],
	},
	year: {
		type: Number,
		required: [true, "Please provide a year"],
	},
	roll: {
		type: String,
		required: [true, "Please provide a roll number"],
	},
	number: {
		type: String,
		required: false,
	},
	date: {
		type: String,
		required: [true, "Please provide a date"],
	},
	time: {
		type: Number,
		required: [true, "Please provide a time"],
	},
	source: {
		type: String,
		required: [true, "Please provide a source"],
	},
	destination: {
		type: String,
		required: [true, "Please provide a destination"],
	},
	tripID: {
		type: Number,
		required: [true, "Please provide a trip ID"],
	},
});

const Trip = models.Trip || model("Trip", tripSchema);
export default Trip;
