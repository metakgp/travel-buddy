import { Schema, model, models } from "mongoose";

// Form fields:
// i)	email – (Email) - string - format email
// ii)	trainNumber – (Train Number) - number
// iii)	date – (Departure Date) - string - format yyyy-mm-dd

const trainSchema = new Schema({
	email: {
		type: String,
		required: [true, "Please provide an email"],
	},
	trainNumber: {
		type: Number,
		required: [true, "Please provide a train number"],
	},
	date: {
		type: String,
		required: [true, "Please provide a departure date"],
	},
	trainID: {
		type: Number,
		required: [true, "Please provide a train ID"],
		unique: true,
	},
});

const Train = models.Train || model("Train", trainSchema);
export default Train;
