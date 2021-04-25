import mongoose from "mongoose";
import {
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_USERNAME,
} from "../constants/EnvironmentConstants";

const Schema = mongoose.Schema;
const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

/**
 * Important! Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
 */
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default mongoose;
