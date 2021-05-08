import mongoose from "./Preloader";

const Schema = mongoose.Schema;

const viewSchema = new Schema(
	{
		email: String,
		manga: String,
		chapter: String,
	},
	{
		timestamps: true,
	}
);

export const mangaChapterViewModel = mongoose.model("view", viewSchema);

export interface MangaChapterView {
	id?: string;
	email: string;
	manga: string;
	chapter: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface MangaChapterViewDto extends MangaChapterView {}
