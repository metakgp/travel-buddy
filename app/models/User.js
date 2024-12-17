import { Schema, model, models } from "mongoose";

// Form fields:
// i)	name – (Full Name) - Text
// ii)	roll – (Roll Number) – Text
// iii)	number – (Mobile Number) – Text
// iv)	email – (Institute Email) – Text
// v)	instituteCode – (Institute Code) – Text

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please provide a name"],
	},
	roll: {
		type: String,
		required: [true, "Please provide a roll number"],
	},
	number: {
		type: String,
		required: [true, "Please provide a mobile number"],
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
	},
	instituteCode: {
		type: String,
		required: [true, "Please provide an institute code"],
		ref: 'Institute'
	}
});

const User = models.User || model("User", userSchema);
export default User;
