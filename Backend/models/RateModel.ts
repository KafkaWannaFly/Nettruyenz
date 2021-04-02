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

export const RateModel = mongoose.model("Rate", rateSchema);

export interface MangaRate {
	id?: string;
	username: string;
	manga: string;
	rate: number;
	isDelete?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
