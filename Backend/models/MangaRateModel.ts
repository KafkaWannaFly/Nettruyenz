import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const rateSchema = new Schema(
	{
		// _id: String,
		email: String,
		manga: String,
		rate: Number,
		isDeleted: Boolean,
	},
	{
		// _id: false,
		timestamps: true,
	}
);

export const mangaRateModel = mongoose.model("manga-rate", rateSchema);

export interface MangaRate {
	id?: string;
	email: string;
	manga: string;
	rate: number;
	isDeleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface MangaRateDto extends MangaRate {}
