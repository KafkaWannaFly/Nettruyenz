import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const rateSchema = new Schema(
	{
		// _id: String,
		username: String,
		manga: String,
		rate: Number,
		isDelete: Boolean,
	},
	{
		// _id: false,
		timestamps: true,
	}
);

const rateModel = mongoose.model("Rate", rateSchema);

export default rateModel;
