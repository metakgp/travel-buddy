import { Schema, model, models } from "mongoose";

// Form fields:
// i)	email – (Email) - string - format email
// ii)	date – (Departure Date) - string - format yyyy-mm-dd
// iii)	time – (Time) - drop down - 0-23
// iv)	source – (Source) – drop down - 3 options: IIT, KGP, HWH, CCU
// v)	destination – (Destination) – drop down - 3 options: IIT, KGP, HWH, CCU

const tripSchema = new Schema({
	email: {
		type: String,
		required: [true, "Please provide an email"],
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
		unique: true,
	},
});

const Trip = models.Trip || model("Trip", tripSchema);
export default Trip;
