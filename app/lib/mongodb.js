import mongoose from "mongoose";

export const connectToDatabase = async () => {
	try {
		// Check if already connected to the database
		if (mongoose.connection.readyState) {
			return;
		}

		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to database");
	} catch (error) {
		console.log("Error connecting to database: ", error);
	}
};
