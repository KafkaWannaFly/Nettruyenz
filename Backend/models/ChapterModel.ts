import mongoose from "./Preloader";

const Schema = mongoose.Schema;
const Id = Schema.Types.ObjectId;

const chapterSchema = new Schema(
	{
		id: String,
		images: [String],
		manga: String,
		uploader: String,
		// views: Number,
		// group: String,
		index: Number,
		tittle: String,
	},
	{
		timestamps: true,
	}
);

export interface Chapter {
	id?: string;
	images?: string[];
	manga?: string;
	index?: number;
	tittle?: string;
	uploader?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ChapterDto extends Chapter {
	views: number;
}

export const chapterModel = mongoose.model("Chapter", chapterSchema);
