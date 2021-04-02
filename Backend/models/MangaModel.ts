import mongoose from "./Preloader";
const Schema = mongoose.Schema;

const Id = Schema.Types.ObjectId;

const mangaSchema = new Schema(
	{
		id: String,
		names: [String],
		cover: String,
		creators: [String],
		tags: [String],
		// rating: Number,
		// rateNum: Number,
		// bookmarks: Number,
		// views: Number,
		status: Number,
		// groups: [String],
		description: String,
		// chapters: [String],
		// comments: [String],
	},
	{
		timestamps: true,
	}
);

export const MangaModel = mongoose.model("Manga", mangaSchema);

export enum MangaStatus {
	OnGoing,
	Complete,
	Dropped,
}

export interface Manga {
	id: string;
	names: string[];
	cover: string;
	tags: string[];
	creators?: string[];
	// rating?: number;
	// rateNum?: number;
	// bookmarks?: number;
	// views?: number;
	status?: number;
	description: string;
	// groups: string[];
	// chapters?: string[];
	// comments?: string[];
}
