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

export interface BriefChapterDto {
	manga?: string;
	mangaNames?: string[];
	index?: number;
	tittle?: string;
	views: number;
	createdAt?: Date;
}

export function briefChapterDtoOf(data: any): BriefChapterDto {
	return {
		manga: data.manga,
		index: data.index,
		tittle: data.tittle,
		views: data.views,
		createdAt: data.createdAt,
		mangaNames: data.mangaNames,
	};
}

export const chapterModel = mongoose.model("Chapter", chapterSchema);
