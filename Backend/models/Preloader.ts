import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

/**
 * Important! Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
 */
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default mongoose;
