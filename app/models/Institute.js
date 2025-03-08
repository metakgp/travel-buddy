import { Schema, model, models } from "mongoose";

// Institute Schema Fields:
// i) name: (Name of the Institute) - string - required
// ii) code: (Institute Code) - string - required
// iii) domain: (Email Domain for validation) - string - required
// iv) locations: (Institute Locations) - array of strings - required
// v) authLink: (URL to Get Authentication Link) - string - required
// vi) verifyAuthLink: (URL to Verify Authentication) - string - required
// vii) authCookie: (Cookie for Authentication) - string - required

const instituteSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please provide a name of the Institute"],
	},
    code: {
        type: String,
		required: [true, "Please provide a code of the Institute"],
    },
	domain: {
		type: String,
		required: [true, "Please provide a domain for the email"],
	},
	locations: {
		type: Object, 
		required: [true, "Please provide at least one location"],
	},
    authLink: {
        type: String,
        required: [true, "Please provide the URL to get the authentication link"],
    },
    verifyAuthLink: {
        type: String,
        required: [true, "Please provide the URL to verify authentication"],
    },
	authCookie: {
		type: String,
        required: [true, "Please provide the name of cookie"],
	}
});


const Institute = models.Institute || model("Institute", instituteSchema);
export default Institute;
